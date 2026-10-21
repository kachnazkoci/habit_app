# Habit APP v57 — vyšší spodní karty

Tato verze navazuje na v56 a upravuje pouze proporce dvou spodních doporučených karet.

- Karty Konzistentnost a Dvě minuty zůstávají vedle sebe (1 × 2) na desktopu.
- Karty jsou vyšší (poměr 4:5), aby obsah nebyl stlačen do širokého výřezu.
- Obrázky používají `object-fit: contain`, takže se zobrazí celé původní grafiky bez ořezání.
- Na menších obrazovkách zůstávají obě karty vedle sebe, na velmi úzkých displejích se skládají pod sebe.
- Zachována stávající tlačítka, `data-screen` a `data-topic`; odkazy nebyly měněny.
- CSS cache-busting je aktualizován na `v57-home`.

## Spuštění
Otevři tuto složku jako projekt ve VS Code a spusť `index.html` přes Live Server.
