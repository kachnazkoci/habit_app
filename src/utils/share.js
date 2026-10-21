function absoluteAssetUrl(assetPath) {
  return new URL(assetPath, window.location.href).href;
}

async function getShareFile(assetPath, title) {
  const response = await fetch(absoluteAssetUrl(assetPath));
  if (!response.ok) throw new Error(`Nelze načíst obrázek (${response.status}).`);
  const blob = await response.blob();
  const ext = (blob.type && blob.type.includes('png')) ? 'png' : 'jpg';
  const safeName = title.toLowerCase().replace(/[^a-z0-9áčďéěíňóřšťúůýž]+/gi, '-').replace(/^-|-$/g, '') || 'habit-app';
  return new File([blob], `${safeName}.${ext}`, { type: blob.type || 'image/png' });
}

export async function shareImage(assetPath, title, text = '') {
  const url = absoluteAssetUrl(assetPath);

  // On supported phones/tablets this opens the native share sheet. The image
  // itself is included, so Mail, Messages, Messenger, Instagram and other
  // installed apps can appear according to the device/app capabilities.
  if (navigator.share) {
    try {
      const file = await getShareFile(assetPath, title);
      if (!navigator.canShare || navigator.canShare({ files: [file] })) {
        await navigator.share({ title, text, files: [file] });
        return { shared: true };
      }
    } catch (error) {
      if (error?.name === 'AbortError') return { shared: false, cancelled: true };
      // Fall through to the link-sharing fallback below.
    }
  }

  showShareFallback({ url, title, text });
  return { shared: false };
}

function showShareFallback({ url, title, text }) {
  document.querySelector('.share-fallback-popover')?.remove();

  const popover = document.createElement('div');
  popover.className = 'share-fallback-popover';
  popover.setAttribute('role', 'dialog');
  popover.setAttribute('aria-label', `Sdílet ${title}`);
  popover.innerHTML = `
    <strong>Sdílet</strong>
    <button type="button" data-share-action="facebook">Facebook</button>
    <button type="button" data-share-action="messenger">Messenger</button>
    <button type="button" data-share-action="instagram">Instagram</button>
    <button type="button" data-share-action="mail">E-mail</button>
    <button type="button" data-share-action="copy">Kopírovat odkaz</button>
  `;
  document.body.appendChild(popover);

  const close = () => popover.remove();
  popover.addEventListener('click', async event => {
    const action = event.target.closest('[data-share-action]')?.dataset.shareAction;
    if (!action) return;

    if (action === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
    } else if (action === 'messenger') {
      if (navigator.share) {
        try { await navigator.share({ title, text, url }); } catch (_) {}
      } else {
        window.open('https://www.messenger.com/', '_blank', 'noopener,noreferrer');
      }
    } else if (action === 'instagram') {
      // Instagram does not expose a general web URL that can receive an
      // arbitrary local image. Open it and keep the image/link available to
      // the user; on mobile the native share sheet above is preferred.
      window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
    } else if (action === 'mail') {
      window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;
    } else if (action === 'copy') {
      try {
        await navigator.clipboard.writeText(url);
        const button = popover.querySelector('[data-share-action="copy"]');
        if (button) button.textContent = 'Odkaz zkopírován ✓';
      } catch (_) {
        window.prompt('Zkopíruj odkaz:', url);
      }
    }

    if (action !== 'copy') close();
  });

  requestAnimationFrame(() => {
    const rect = document.querySelector('.knowhow-share-button:focus')?.getBoundingClientRect();
    if (rect) {
      popover.style.top = `${Math.round(rect.bottom + 8)}px`;
      popover.style.left = `${Math.max(12, Math.round(rect.right - 190))}px`;
    }
  });
}
