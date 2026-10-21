import { setScreen } from "../state.js";
import { shareImage } from "../utils/share.js";

const topics = [
  {
    id: "laws",
    keywords: ['4 zákony', 'čtyři zákony', 'zákony změny chování', 'James Clear', 'zřejmost', 'podnět', 'touha', 'craving', 'reakce', 'response', 'odměna', 'reward', 'dobré návyky', 'zlozvyky', 'inverze', 'biologický věk', 'zdravé stárnutí', 'spánek', 'pohyb', 'výživa', 'stres'],
    title: "4 zákony změny chování",
    relatedIds: ['two-minutes', 'rewards-punishments', 'temptation-bundling', 'environment-design'],
    content: `
      <h2>Čtyři zákony změny chování podle Jamese Cleara</h2>
      <p>Čtyři zákony změny chování pro budování dobrých návyků jsou:</p>
      <div class="knowhow-laws-overview" role="table" aria-label="Čtyři zákony změny chování">
        <div class="knowhow-laws-row knowhow-laws-head" role="row">
          <div role="columnheader"></div>
          <div role="columnheader">Budování dobrých návyků</div>
          <div role="columnheader">Odstraňování zlozvyků</div>
        </div>

        <div class="knowhow-laws-row" role="row">
          <div class="knowhow-law-arrow" role="cell"><a href="#law-1" aria-label="Přejít na 1. zákon"><img src="assets/law-arrow-right.png" alt=""></a></div>
          <div role="cell"><a href="#law-1"><strong>1. Učiňte podnět nápadným</strong></a></div>
          <div role="cell"><strong>1. Učiňte podnět neviditelným</strong></div>
        </div>

        <div class="knowhow-laws-row" role="row">
          <div class="knowhow-law-arrow" role="cell"><a href="#law-2" aria-label="Přejít na 2. zákon"><img src="assets/law-arrow-right.png" alt=""></a></div>
          <div role="cell"><a href="#law-2"><strong>2. Učiňte touhu přitažlivou</strong></a></div>
          <div role="cell"><strong>2. Učiňte touhu nepřitažlivou</strong></div>
        </div>

        <div class="knowhow-laws-row" role="row">
          <div class="knowhow-law-arrow" role="cell"><a href="#law-3" aria-label="Přejít na 3. zákon"><img src="assets/law-arrow-right.png" alt=""></a></div>
          <div role="cell"><a href="#law-3"><strong>3. Učiňte reakci snadnou</strong></a></div>
          <div role="cell"><strong>3. Učiňte reakci obtížnou</strong></div>
        </div>

        <div class="knowhow-laws-row" role="row">
          <div class="knowhow-law-arrow" role="cell"><a href="#law-4" aria-label="Přejít na 4. zákon"><img src="assets/law-arrow-right.png" alt=""></a></div>
          <div role="cell"><a href="#law-4"><strong>4. Učiňte odměnu uspokojivou</strong></a></div>
          <div role="cell"><strong>4. Učiňte odměnu neuspokojivou</strong></div>
        </div>
      </div>

      <section id="law-1" class="knowhow-law-section">
        <h3>1. ZÁKON: Podnět (Cue)</h3>
        <p>Tento krok spouští proces v mozku. Určuje, čeho si všimnete.</p>
        <h4>Jak vytvořit dobrý návyk – Učiňte ho nápadným</h4>
        <p><strong>Příprava prostředí:</strong> Navrhněte své okolí tak, aby vás podněty k dobrému chování bily do očí. Chcete víc pít? Postavte si ráno plnou lahev vody přímo na pracovní stůl.</p>
        <p><strong>Spojování návyků:</strong> Navázejte nový návyk na ten stávající. Vzorec: <strong>Po [současný návyk] udělám [nový návyk].</strong> Například: „Poté, co si ráno uvařím kávu, budu 5 minut meditovat.“</p>
        <h4>Jak zlomit zlozvyk – Učiňte ho neviditelným</h4>
        <p><strong>Odstranění podnětů:</strong> Schovejte věci, které vás svádějí. Pokud trávíte příliš času na telefonu, dejte ho do jiné místnosti. Pokud jíte moc sladkostí, nekupujte je a nemějte je na očích v kuchyni.</p>
      </section>

      <section id="law-2" class="knowhow-law-section">
        <h3>2. ZÁKON: Touha (Craving)</h3>
        <p>Tento krok představuje motivační sílu. Nechcete samotný návyk, ale stav, který vám přinese.</p>
        <h4>Jak vytvořit dobrý návyk – Učiňte ho přitažlivým</h4>
        <p><strong>Spojování pokušení:</strong> Spojte činnost, kterou musíte udělat, s činností, kterou chcete udělat. Například: „Budu sledovat svůj oblíbený seriál pouze tehdy, když budu šlapat na rotopedu.“</p>
        <p><strong>Sociální vliv:</strong> Obklopte se lidmi, pro které je vaše požadované chování běžným standardem. Chcete víc číst? Vstupte do čtenářského klubu.</p>
        <h4>Jak zlomit zlozvyk – Učiňte ho nepřitažlivým</h4>
        <p><strong>Změna myšlení:</strong> Přerámujte své vnímání. Místo „Musím se vzdát kouření/nezdravého jídla“ si říkejte „Získávám tím svobodu, zdraví a více peněz“. Zvýrazněte si nevýhody daného zlozvyku.</p>
        <p><button type="button" class="knowhow-topic-link" data-topic="temptation-bundling">Více: Lákání na pokušení</button></p>
      </section>

      <section id="law-3" class="knowhow-law-section">
        <h3>3. ZÁKON: Reakce (Response)</h3>
        <p>Tento krok je samotné vykonání návyku – akce, kterou provedete.</p>
        <h4>Jak vytvořit dobrý návyk – Učiňte ho snadným</h4>
        <p><strong>Snížení tření:</strong> Odstraňte překážky, které stojí mezi vámi a akcí. Chcete jít ráno cvičit? Připravte si sportovní oblečení už večer vedle postele.</p>
        <p><strong>Pravidlo dvou minut:</strong> Každý nový návyk by měl v začátcích zabrat méně než dvě minuty. Cílem je začít. Místo „Uběhnu 5 kilometrů“ je cílem „Obuji si tenisky a vyjdu ven“.</p>
        <h4>Jak zlomit zlozvyk – Učiňte ho obtížným</h4>
        <p><strong>Zvýšení tření:</strong> Vytvořte mezi sebou a zlozvykem překážky. Chcete méně sledovat televizi? Po každém vypnutí ji vytáhněte ze zásuvky a ovladač schovejte do skříně.</p>
        <p><strong>Zavazující mechanismy:</strong> Udělejte rozhodnutí v přítomnosti, které vám znemožní zlozvyk v budoucnu (např. časovač na Wi-Fi, který v 23:00 vypne internet).</p>
        <p><button type="button" class="knowhow-topic-link" data-topic="two-minutes">Více: Pravidlo dvou minut</button></p>
      </section>

      <section id="law-4" class="knowhow-law-section">
        <h3>4. ZÁKON: Odměna (Reward)</h3>
        <p>Tento krok uzavírá smyčku a říká mozku, zda má toto chování v budoucnu opakovat.</p>
        <h4>Jak vytvořit dobrý návyk – Učiňte ho uspokojivým</h4>
        <p><strong>Okamžité uspokojení:</strong> Jelikož výsledky dobrých návyků přicházejí pozdě, odměňte se hned. Použijte vizuální sledování (např. přeškrtnutí dne v kalendáři) nebo si dopřejte drobnou radost, která neodporuje vašemu cíli.</p>
        <h4>Jak zlomit zlozvyk – Učiňte ho neuspokojivým</h4>
        <p><strong>Okamžitý trest:</strong> Zaveďte partnera pro odpovědnost nebo podepište smlouvu o návyku. Pokud zlozvyk porušíte, může následovat předem dohodnutý, bezpečný a přiměřený nepříjemný důsledek.</p>
        <p><button type="button" class="knowhow-topic-link" data-topic="rewards-punishments">Více: Odměny a tresty</button></p>
      </section>
    `
  },
  {
    id: "bad-habits",
    keywords: ['zlozvyk', 'špatný návyk', 'odstranit', 'zbavit', 'spouštěč', 'neatraktivní', 'obtížný', 'biologický věk', 'zdravé stárnutí', 'kouření', 'alkohol', 'spánek', 'pohyb', 'výživa'],
    title: "Jak se zbavit špatných návyků",
    relatedIds: ['environment-design', 'rewards-punishments', 'habit-contract', 'biological-age'],
    content: `
      <h2>Jak se zbavit špatných návyků?</h2>
      <p>James Clear používá pro odstranění zlozvyků inverzní (obrácenou) verzi 4 zákonů změny chování.</p>
      <ul>
        <li><strong>Učiňte podnět neviditelným:</strong> Odstraňte spouštěče z očí. (Např. schovejte telefon do jiné místnosti, když pracujete).</li>
        <li><strong>Učiňte návyk neatraktivním:</strong> Změňte své nastavení mysli. Zdůrazněte si výhody toho, když se zlozvyku vyhnete.</li>
        <li><strong>Učiňte návyk obtížným:</strong> Zvyšte tření. Vytvořte mezi sebou a zlozvykem překážky. (Např. odpojte televizi ze zásuvky a vyndejte baterie z ovladače).</li>
        <li><strong>Učiňte návyk neuspokojivým:</strong> Najděte si parťáka pro odpovědnost nebo uzavřete „smlouvu o návyku“. Když zlozvyk porušíte, musí následovat okamžitý trest nebo nepříjemný následek.</li>
      </ul>
    `
  },
  {
    id: "rewards-punishments",
    keywords: ['odměny', 'tresty', 'odměna', 'trest', '3. zákon', '4. zákon', 'uspokojivost', 'smlouva o návyku', 'habit contract', 'odpovědnost', 'biologický věk', 'zdravé stárnutí', 'konzistence', 'sebekontrola'],
    title: "Odměny a tresty",
    relatedIds: ['habit-contract', 'never-miss-twice', 'biological-age'],
    content: `
      <h2>Odměny a tresty</h2>
      <p>Tato témata úzce souvisejí především se <strong>3. a 4. zákonem změny chování</strong>. Odměna pomáhá dobrý návyk upevnit, zatímco nepříjemný bezprostřední následek může pomoci zlozvyk oslabit.</p>

      <h3>1. Odměny – jak návyk vytvořit</h3>
      <p>Odměny pomáhají mozku vyhodnotit chování jako užitečné a zvýšit pravděpodobnost, že ho zopakuje.</p>
      <ul>
        <li><strong>Okamžitá odměna:</strong> Drobné uspokojení bezprostředně po splnění návyku. Může to být například odškrtnutí políčka v aplikaci, oblíbený čaj nebo malý krok směrem k dlouhodobému cíli.</li>
        <li><strong>Dlouhodobá odměna:</strong> Skutečný výsledek – například zdravější tělo nebo finanční rezerva. Ta ale přichází příliš pozdě na to, aby sama o sobě vždy udržela motivaci na začátku.</li>
      </ul>

      <h3>2. Tresty – jak návyk zlomit</h3>
      <p>U nežádoucího chování může pomoci okamžitý nepříjemný následek. Čím vzdálenější je následek od samotného chování, tím hůře může fungovat jako zpětná vazba.</p>

      <h3>Smlouva o návyku (Habit Contract)</h3>
      <p>Písemná dohoda mezi vámi a partnerem pro odpovědnost, která předem stanoví, co se stane, pokud pravidlo porušíte.</p>
      <p><strong>Příklad:</strong> „Pokud dnes nepůjdu běhat, pošlu kamarádovi 500 Kč.“ Smyslem není trestat se za každou chybu, ale vytvořit <strong>jasný a bezprostřední důsledek</strong>, který pomůže změnit rozhodování.</p>

      <p><strong>Důležité:</strong> Trest by měl být přiměřený, bezpečný a předem dobrovolně zvolený. Cílem je podpořit změnu chování, ne vytvářet strach nebo sebepotrestání.</p>
      <p><button type="button" class="knowhow-topic-link" data-topic="habit-contract">Více: Smlouva o návyku</button></p>
    `
  },
  {
    id: "habit-contract",
    keywords: ['smlouva o návyku', 'habit contract', 'accountability partner', 'parťák pro odpovědnost', 'odpovědnost', 'trest', 'zlozvyk', 'biologický věk', 'zdravé stárnutí', 'konzistence'],
    title: "Smlouva o návyku (Habit Contract)",
    relatedIds: ['rewards-punishments', 'never-miss-twice'],
    content: `
      <h2>Smlouva o návyku (Habit Contract)</h2>
      <p>Smlouva o návyku je nástroj spojený se <strong>4. zákonem změny chování</strong> – „Učiňte návyk neuspokojivým“. Jde o písemnou nebo ústní dohodu, která vytváří předem známý a bezprostřední důsledek při porušení závazku.</p>
      <h3>Jak to funguje</h3>
      <p>Lidé přirozeně reagují na okamžité společenské nebo finanční důsledky. Pokud víte, že někdo váš závazek sleduje a že porušení dohody bude mít předem stanovený následek, může to změnit vaše rozhodování v daném okamžiku.</p>
      <h3>Parťák pro odpovědnost</h3>
      <p>Pro funkčnost je důležitý <strong>parťák pro odpovědnost (Accountability Partner)</strong>, který o dohodě ví a může ověřit, zda jste svůj závazek splnili.</p>
      <h3>Příklad</h3>
      <p>Napíšete smlouvu, že pokud si v neděli nepřipravíte jídlo do krabiček na celý týden, pošlete svému kamarádovi 1 000 Kč. Oba s podmínkou předem souhlasíte.</p>
      <h3>Důležité</h3>
      <p>Důsledek by měl být <strong>dobrovolný, bezpečný, přiměřený a předem jasně dohodnutý</strong>. Smyslem není sebepotrestání, ale vytvoření zpětné vazby, která pomůže změnit chování.</p>
    `
  },
  {
    id: "two-minutes",
    keywords: ['2 minuty', 'dvě minuty', 'začátek', 'mikrokrok', 'prokrastinace', 'odkládání', 'snadnost', 'biologický věk', 'pohyb', 'spánek', 'zdravé stárnutí', 'malý krok'],
    title: "Pravidlo dvou minut",
    relatedIds: ['daily-systems', 'habit-stacking', 'choice', 'biological-age'],
    content: `
      <figure class="two-minute-detail-visual" aria-label="Dvě minuty – nejmenší možná verze">
        <img src="assets/two-minutes-detail-hq.png" alt="Dvě minuty a digitální časovač nastavený na 02:00" loading="lazy">
      </figure>
      <p>Tento koncept říká, že nový návyk by měl při svém zahájení zabrat <strong>méně než dvě minuty</strong>.</p>
      <ul>
        <li><strong>Cíl:</strong> Překonat odkládání (prokrastinaci) a začít. Nejtěžší je totiž samotný začátek akce.</li>
        <li><strong>Jak to funguje:</strong> Velký cíl zjednodušíte na mikrokrok.
          <ul>
            <li><em>Chci uběhnout maraton</em> → <strong>Zavážu si běžecké boty.</strong></li>
            <li><em>Chci přečíst knihu týdně</em> → <strong>Přečtu si jednu stránku.</strong></li>
            <li><em>Chci hodinu studovat</em> → <strong>Otevřu si sešit.</strong></li>
          </ul>
        </li>
        <li><strong>Výsledek:</strong> Jakmile akci začnete, je mnohem snazší v ní pokračovat. Standardizujte návyk dříve, než ho začnete optimalizovat. Nemůžete vylepšit návyk, který neexistuje.</li>
      </ul>
    `
  },
  {
    id: "daily-systems",
    keywords: ['každodenní systémy', 'osobní plán', 'identita', 'spouštěč', 'prostředí', 'pravidlo 2 minut', 'odměna', 'biologický věk', 'zdravé stárnutí', 'spánek', 'pohyb', 'výživa', 'stres', 'cirkadiánní rytmus'],
    title: "Každodenní systémy",
    relatedIds: ['habit-stacking', 'identity-based-habits', 'two-minutes', 'biological-age'],
    content: `
      <h2>Jak vytvořit osobní plán konkrétního návyku?</h2>
      <p>Osobní plán podle Jamese Cleara se nezaměřuje na vzdálené cíle, ale na <strong>každodenní systémy</strong>. Níže je jednoduchá šablona, jak si takový plán pro jeden konkrétní návyk vytvořit.</p>

      <h3>1. KROK: Definujte svou novou identitu</h3>
      <p>Nezačínejte tím, co chcete dokázat, ale <strong>kým chcete být</strong>.</p>
      <ul>
        <li><em>Špatně:</em> Chci uběhnout maraton.</li>
        <li><em>Správně:</em> Chci se stát <strong>běžcem</strong> (člověkem, který nevynechává tréninky).</li>
        <li><em>Špatně:</em> Chci napsat knihu.</li>
        <li><em>Správně:</em> Chci se stát <strong>spisovatelem</strong> (člověkem, který denně píše).</li>
      </ul>

      <h3>2. KROK: Navrhněte spouštěč (Zákon zřejmosti)</h3>
      <p>Nenechávejte návyk na náhodě („až budu mít čas“). Spojte ho s konkrétním časem a místem, nebo s jiným, již zaběhnutým návykem (<strong>spojování návyků</strong>).</p>
      <p><strong>Vzorec:</strong> Po tom, co [STÁVAJÍCÍ NÁVYK], udělám [NOVÝ NÁVYK].</p>
      <ul>
        <li>Po tom, co si <strong>uvařím ranní kávu</strong>, otevřu si <strong>sešit s angličtinou</strong>.</li>
        <li>Po tom, co <strong>přijdu domů z práce</strong>, převléknu se do <strong>sportovního oblečení</strong>.</li>
      </ul>

      <h3>3. KROK: Připravte si prostředí (Zákon snadnosti)</h3>
      <p>Upravte své okolí tak, aby bylo zahájení návyku co nejjednodušší. Odstraňte překážky.</p>
      <ul>
        <li><strong>Čtení:</strong> Položte knihu přímo na polštář hned ráno, když stelete postel.</li>
        <li><strong>Cvičení:</strong> Připravte si podložku a činky doprostřed obývacího pokoje večer předem.</li>
      </ul>

      <h3>4. KROK: Aplikujte Pravidlo 2 minut</h3>
      <p>Zkraťte startovní krok tak, aby nebylo možné ho kvůli lenosti odmítnout. Cílem prvních týdnů je <strong>ukázat se</strong>, ne podat dokonalý výkon.</p>
      <ul>
        <li>Místo „budu 30 minut cvičit“ → <strong>budu 2 minuty dělat dřepy a kliky</strong>.</li>
        <li>Místo „vyřídím všechny e-maily“ → <strong>odpovím na 1 e-mail</strong>.</li>
      </ul>

      <h3>5. KROK: Zaveďte okamžitou odměnu (Zákon uspokojivosti)</h3>
      <p>Spojte náročný návyk s něčím příjemným nebo použijte viditelnou odměnu, například označení splněného dne v kalendáři.</p>
    `
  },
  {
    id: "habit-stacking",
    keywords: ['spojování návyků', 'řetězení návyků', 'habit stacking', 'spouštěč', 'stávající návyk', 'řetězec', 'biologický věk', 'spánek', 'pohyb', 'výživa', 'zdravé stárnutí'],
    title: "Spojování návyků",
    relatedIds: ['daily-systems', 'environment-design', 'two-minutes', 'nighttime-cortisol'],
    content: `
      <h2>Habit Stacking – Spojování návyků</h2>
      <p>Nový návyk můžete místo konkrétního času spojit s činností, kterou už dnes děláte zcela automaticky. Váš stávající návyk se stane <strong>spouštěčem</strong> pro nový návyk.</p>

      <h3>Základní vzorec</h3>
      <p><strong>„Po tom, co [STÁVAJÍCÍ NÁVYK], udělám [NOVÝ NÁVYK].“</strong></p>
      <ul>
        <li><strong>Cvičení:</strong> Po tom, co si zuji boty po příchodu z práce, se ihned převléknu do sportovního oblečení.</li>
        <li><strong>Vděčnost:</strong> Po tom, co si ráno sednu ke kávě, řeknu si jednu věc, za kterou jsem vděčný.</li>
        <li><strong>Dentální hygiena:</strong> Po tom, co si vyčistím zuby, použiji dentální nit.</li>
        <li><strong>Vztahy:</strong> Po tom, co si večer lehnu do postele, dám partnerovi pusu na dobrou noc.</li>
      </ul>

      <h3>4 pravidla pro úspěšné spojování</h3>
      <ol>
        <li><strong>Spouštěč musí být specifický.</strong> „Až budu mít pauzu“ je příliš vágní. Lepší je „Po tom, co zavřu notebook a vstanu od stolu na oběd…“.</li>
        <li><strong>Správné načasování a frekvence.</strong> Stávající návyk by měl mít stejnou frekvenci jako nový.</li>
        <li><strong>Vytvořte delší řetězec.</strong> Jakmile zvládnete dvě činnosti, můžete postupně přidat další.</li>
        <li><strong>Návyky k sobě musí pasovat.</strong> Zvažte energii, čas a náročnost. Někdy je lepší použít nejdříve pravidlo 2 minut.</li>
      </ol>

      <h3>Jak začít?</h3>
      <p>Sepište si několik věcí, které děláte každý den téměř bez přemýšlení – například vstávání, čištění zubů, ranní kávu, odchod z domu, zapnutí počítače, oběd, příchod domů, sprchu nebo zhasnutí světla. Právě tyto činnosti mohou být dobrými spouštěči.</p>
    `
  },
  {
    id: "consistency",
    keywords: ['konzistentnost', 'důslednost', 'disciplína', 'trpělivost', 'soustředění', 'vytrvalost', 'pravidelnost', 'malé kroky', 'výsledky', 'sebekázeň', 'stoicismus', 'atomové návyky'],
    title: "Konzistentnost",
    shareImage: "assets/consistency-knowhow-cz.png",
    relatedIds: ['daily-systems', 'habit-stacking', 'two-minutes', 'never-miss-twice', 'stoicism-atomic-habits'],
    content: `
      <div class="knowhow-consistency-hero knowhow-shareable-visual">
        <img src="assets/consistency-knowhow-cz.png" alt="Konzistentnost – malé kroky postupně vedou k výsledkům" loading="lazy">
        <button type="button" class="knowhow-share-image" data-share-image="assets/consistency-knowhow-cz.png" data-share-title="Konzistentnost" aria-label="Sdílet obrázek Konzistentnost" title="Sdílet">↗</button>
      </div>
      <p class="knowhow-lead">Věci, které vám změní život, jsou zřídkakdy vzrušující – disciplína, důslednost, soustředění, trpělivost a prostě to, že se objevíte, když se nikdo nedívá.</p>
      <p><strong>Jen tak dál.</strong> Vaše výsledky se budují potichu.</p>

      <h3>Konzistentnost je vzácná. Právě proto má takovou sílu.</h3>
      <p>Jednotlivý den nemusí vypadat dokonale. Důležitější je, co děláte znovu a znovu. Malé kroky, které se opakují dostatečně dlouho, mohou postupně vytvořit velkou změnu.</p>

      <h3>Nečekej na motivaci</h3>
      <p>Motivace přichází a odchází. Systém a jednoduchý návyk mohou zůstat. Pomáhá proto soustředit se na nejmenší verzi chování, kterou dokážete udělat i v obyčejný nebo náročný den.</p>
      <ul>
        <li><strong>Začni malým krokem.</strong> Když je začátek snadný, je větší šance, že se objevíš znovu.</li>
        <li><strong>Opakuj.</strong> Nesnaž se každý den překonat včerejšek.</li>
        <li><strong>Vracej se na cestu.</strong> Jeden vynechaný den nemusí znamenat konec.</li>
        <li><strong>Sleduj trend.</strong> Výsledky se často projeví až po delší době.</li>
      </ul>

      <h3>„Objevit se, když se nikdo nedívá“</h3>
      <p>Právě tehdy se buduje identita člověka, kterým se chceš stát. Nejde o dokonalost ani o výkon za každou cenu. Jde o opakované malé důkazy, že své hodnoty a záměry dokážeš převést do každodenního života.</p>

      <div class="knowhow-note"><strong>Malá myšlenka na závěr:</strong> Nemusíš dnes vidět celý výsledek. Stačí udělat další rozumný krok.</div>
    `
  },
  {
    id: "gratitude",
    keywords: ['vděčnost', 'musím', 'můžu', 'perspektiva', 'asociace', 'atraktivita', 'gratitude', 'biologický věk', 'stres', 'spánek', 'duševní zdraví', 'zdravé stárnutí'],
    title: "Vděčnost",
    relatedIds: ['stoicism-atomic-habits', 'nighttime-cortisol', 'biological-age'],
    content: `
      <h2>Vděčnost</h2>
      <p>Systém vděčnosti lze v souvislosti s návyky využít prakticky. Nejde jen o přemýšlení o hezkých věcech, ale o vědomé přenastavení pohledu na činnosti, které během dne děláme.</p>

      <h3>1. Změna slovníku: „Musím“ → „Můžu“</h3>
      <p>James Clear popisuje jednoduchou změnu slovníku: místo toho, abyste určitou činnost vnímali jako povinnost nebo břemeno, zkuste ji vnímat jako příležitost.</p>
      <ul>
        <li>Místo „<em>Musím jít ráno běhat.</em>“ → <strong>„Můžu jít ráno běhat a budovat svou fyzičku.“</strong></li>
        <li>Místo „<em>Musím udělat ten otravný pracovní report.</em>“ → <strong>„Můžu ten report udělat a ukázat své schopnosti.“</strong></li>
        <li>Místo „<em>Musím uvařit večeři pro rodinu.</em>“ → <strong>„Můžu uvařit večeři a postarat se o své blízké.“</strong></li>
      </ul>
      <p>Smyslem není předstírat, že povinnost neexistuje. Jde o změnu perspektivy: stejnou situaci lze vnímat jako břemeno, nebo jako možnost něco dělat, zažít či budovat.</p>

      <h3>2. Přenastavení asociací</h3>
      <p>Pokud chcete, aby pro vás byl určitý návyk přitažlivější, můžete změnit asociace, které s ním máte. Zaměřte se na to, <strong>co vám daná činnost umožňuje</strong>, nikoli pouze na to, co vám bere.</p>
      <p>Clear uvádí příklad člověka na invalidním vozíku, který svou situaci nevnímal jako omezení, ale jako prostředek, který mu umožňuje opustit domov. Podobný posun perspektivy lze použít i u běžných každodenních činností.</p>

      <h3>💡 Praktický tip</h3>
      <p>Vyberte si jeden pravidelný okamžik, který už ve vašem dni existuje, a připojte k němu krátkou větu vděčnosti. Nemusí jít o dlouhé přemýšlení.</p>
      <p><strong>Příklad:</strong> „Po tom, co si sednu k večeři, řeknu nahlas jednu věc, která se mi dnes povedla nebo za kterou jsem vděčný.“</p>
      <p>Právě tento příklad James Clear popisuje jako svůj dlouhodobý rituál. Jeho výhodou je malá náročnost a pevné spojení s již existujícím návykem – večeří.</p>

      <div class="knowhow-links">
        <div><strong>Zdroje:</strong></div>
        <div><a href="https://jamesclear.com/how-to-be-thankful" target="_blank" rel="noopener noreferrer">James Clear – How to Be Thankful For Your Life by Changing Just One Word</a></div>
        <div><a href="https://jamesclear.com/gratitude-habit" target="_blank" rel="noopener noreferrer">James Clear – Use This Simple Daily Gratitude Habit to Be Grateful Every Day</a></div>
      </div>
    `
  },
  {
    id: "stoicism-atomic-habits",
    keywords: ['stoicismus', 'stoik', 'atomové návyky', '1 %', 'prokopé', 'dichotomie kontroly', 'amor fati', 'identita', 'charakter', 'sebeovládání', 'ranní příprava', 'večerní reflexe', 'biologický věk', 'zdravé stárnutí', 'stres', 'spánek'],
    title: "Atomové návyky a Stoicismus",
    relatedIds: ['gratitude', 'identity', 'choice', 'biological-age'],
    content: `
      <h2>Stoicismus a Atomové návyky</h2>
      <p>Obě filozofie staví na myšlence, že velký životní posun nevzniká náhlým zábleskem geniality, ale každodenní, mravenčí prací na sobě samém.</p>

      <h3>Základní principy stoicismu (ve zkratce)</h3>
      <ul>
        <li><strong>Dichotomie kontroly:</strong> Rozdělení světa na věci, které můžete ovlivnit (vlastní myšlenky, činy, reakce), a ty, které neovlivníte (počasí, chování druhých, minulost).</li>
        <li><strong>Soustředění na přítomnost:</strong> Minulost už neexistuje, budoucnost je nejistá, jediné pole působnosti je teď.</li>
        <li><strong>Rozvoj charakteru (Ctnost):</strong> Hlavním cílem života je jednat moudře, odvážně, spravedlivě a sebeřízeně.</li>
        <li><strong>Přijetí osudu (Amor Fati):</strong> Milovat a přijímat vše, co přichází, a brát překážky jako příležitost k růstu.</li>
      </ul>

      <h3>Propojení s Atomovými návyky</h3>
      <ul>
        <li><strong>Zlepšení o 1 % každý den:</strong> Clearova hlavní teze říká, že pokud se každý den zlepšíte o 1 %, za rok budete přibližně 37krát lepší. Stoici tomu říkali <strong>Prokopé</strong> – neustálý progres; filozofie není jednorázový cíl, ale celoživotní cesta drobných zlepšení.</li>
        <li><strong>Zaměření na proces, ne na výsledek:</strong> Stoik se nesoustředí na to, zda vyhraje závod (to nemá plně pod kontrolou), ale na to, aby trénoval nejlépe, jak dovede. Clear identicky radí: zapomeňte na cíle, budujte systémy.</li>
        <li><strong>Identita jako základ:</strong> V Atomových návycích měníte své chování tím, že změníte to, kým jste (např. „jsem nekouřící člověk“, ne „zkouším přestat kouřit“). Stoici denně trénovali svou mysl, aby jejich identita byla pevná jako skála.</li>
        <li><strong>Sebeovládání a prostředí:</strong> Stoicismus učí odolat okamžitým pokušením pro vyšší dobro. James Clear k tomu dává praktický návod: upravte své prostředí tak, aby dobré návyky byly viditelné a ty špatné neviditelné.</li>
      </ul>

      <h3>Každodenní stoická praxe inspirovaná oběma směry</h3>
      <ul>
        <li><strong>Ranní příprava:</strong> Clear doporučuje plánovat návyky dopředu. Stoik Marcus Aurelius si každé ráno připomínal, s jakými těžkými lidmi se může potkat, aby ho to nepřekvapilo.</li>
        <li><strong>Večerní reflexe:</strong> Stoici si večer psali deník a analyzovali své činy. V kontextu Atomových návyků jde o skvělý způsob sledování návyků (habit tracking), kdy vyhodnocujete, zda jste dnes byli věrní své identitě.</li>
      </ul>
    `
  },
  {
    id: "identity",
    keywords: ['identita', 'kým se stát', 'výsledky', 'procesy', 'kdo', 'nová identita', 'malá vítězství', 'biologický věk', 'zdravé stárnutí', 'pohyb', 'spánek', 'výživa'],
    title: "Budování identity",
    relatedIds: ['identity-based-habits', 'daily-systems', 'biological-age'],
    content: `
      <h2>Budování identity</h2>
      <h3>Jak funguje budování identity?</h3>
      <p>Skutečná změna chování není o tom, čeho chcete <em>dosáhnout</em> (výsledky), ale o tom, kým se chcete <em>stát</em> (identita).</p>
      <p>James Clear rozlišuje 3 vrstvy změny:</p>
      <ol>
        <li><strong>Výsledky (Co):</strong> Zaměření na cíle (např. <em>chci zhubnout</em>).</li>
        <li><strong>Procesy (Jak):</strong> Zaměření na systémy a rutinu (např. <em>začnu chodit do fitka</em>).</li>
        <li><strong>Identita (Kdo):</strong> Zaměření na to, v co věříte a jak vidíte sami sebe (např. <em>jsem sportovec</em>).</li>
      </ol>
      <h3>Jak změnit identitu ve 2 krocích:</h3>
      <ol>
        <li><strong>Rozhodněte se, jakým typem člověka chcete být.</strong> (Např. chci být spisovatel, chci být zdravý člověk).</li>
        <li><strong>Dokazujte to sami sobě malými vítězstvími.</strong> Každý čin, který uděláte, je hlasem pro vaši novou identitu. Když napíšete jednu stránku, hlasujete pro identitu spisovatele. Když si vyberete zdravé jídlo, hlasujete pro identitu zdravého člověka.</li>
      </ol>
    `
  },
  {
    id: "valley-of-disappointment",
    keywords: ['údolí zklamání', 'valley of disappointment', 'výsledky', 'pokrok', 'složené úročení', 'amor fati', 'biologický věk', 'zdravé stárnutí', 'dlouhodobost', 'konzistence'],
    title: "Údolí zklamání",
    relatedIds: ['never-miss-twice', 'habit-tracker', 'biological-age'],
    content: `
      <h2>Údolí zklamání (Valley of Disappointment)</h2>
      <p>Období na začátku cesty, kdy investujete úsilí, ale nevidíte odpovídající výsledky. Lineární očekávání se potkává s nelineární realitou složeného úročení.</p>
      <h3>Praktická rada</h3>
      <p>Přestaňte se vážit nebo kontrolovat bankovní účet každý den. Zaveďte si pravidlo: <strong>„Soustředím se pouze na dnešní splněný úkol.“</strong></p>
      <h3>Využití v praxi</h3>
      <p>Pokud začínáte s psaním knihy, neřešte po týdnu počet stránek. Vaším jediným cílem může být sedět 20 minut u počítače. Výsledky se mohou projevit až později a někdy skokově.</p>
      <h3>Stoická vazba</h3>
      <p><strong>Amor Fati</strong> – přijímání své cesty i s jejími zkouškami. Stoický přístup připomíná, že růst vyžaduje čas a že nemáme plně pod kontrolou, kdy se výsledek objeví.</p>
    `
  },
  {
    id: "habit-tracker",
    keywords: ['sledování návyků', 'habit tracker', 'tracker', 'kalendář', 'pokrok', 'večerní reflexe', 'biologický věk', 'zdravé stárnutí', 'konzistence', 'spánek', 'pohyb', 'výživa'],
    title: "Sledování návyků (Habit Tracking)",
    relatedIds: ['never-miss-twice', 'daily-systems', 'biological-age'],
    content: `
      <h2>Sledování návyků (Habit Tracking)</h2>
      <p>Vizuální měření toho, zda jste návyk splnili. Nejčastěji jde o tabulku, aplikaci v telefonu nebo prosté křížkování v kalendáři.</p>
      <h3>Jak to funguje</h3>
      <p>Tracker poskytuje okamžitý důkaz o vašem pokroku a může vytvořit vizuální řetězec, který nechcete přerušit. Právě proto může být odškrtnutí samo o sobě malou okamžitou odměnou.</p>
      <h3>Praktická rada</h3>
      <p>Udělejte tracker co nejjednodušší. Stačí papírový kalendář na zdi, aplikace nebo jednoduché odškrtnutí v této aplikaci. Záznam proveďte ideálně ihned po dokončení aktivity.</p>
      <h3>Využití v praxi</h3>
      <p>Chcete-li pít více vody, dejte si na stůl sklenici a jednoduchý tracker. Jakmile ji vypijete, udělejte si záznam. Vizuální uspokojení z dokončeného dne může pomoci pokračovat.</p>
      <h3>Never Miss Twice</h3>
      <p>Jedno vynechání je nehoda. Snažte se ale nedopustit, aby se z něj stala série. Když nemůžete splnit plnou verzi návyku, vraťte se alespoň k jeho velmi malé, proveditelné verzi.</p>
      <h3>Stoická vazba</h3>
      <p><strong>Večerní reflexe.</strong> Přehledný záznam vám může ukázat realitu vašeho jednání bez příkras a výmluv.</p>
    `
  },
  {
    id: "never-miss-twice",
    keywords: ['nepřetrhnout řetěz', "don't break the chain", 'never miss twice', 'kontinuita', 'disciplína', 'sebeovládání', 'biologický věk', 'zdravé stárnutí', 'konzistence', 'návrat k návyku'],
    title: "Nepřetrhnout řetěz",
    relatedIds: ['habit-tracker', 'rewards-punishments', 'choice', 'biological-age'],
    content: `
      <h2>Nepřetrhnout řetěz (Don't Break the Chain / Never Miss Twice)</h2>
      <p>Jedno vynechání může být nehoda. Dvě vynechání za sebou už mohou začít vytvářet nový vzorec chování. Smyslem proto není dokonalost, ale rychlý návrat k návyku.</p>
      <h3>Praktická rada</h3>
      <p>Když máte špatný den, jste unavení nebo nemáte ideální podmínky, použijte nouzovou, extrémně zkrácenou verzi návyku. Hlavní je udržet kontinuitu.</p>
      <h3>Využití v praxi</h3>
      <p>Máte naplánovaný 45minutový běh, ale venku prší a necítíte se dobře? Vyběhněte třeba jen na 5 minut. Nemusí jít o plnohodnotný trénink – důležité je zachovat identitu člověka, který běhá.</p>
      <h3>Stoická vazba</h3>
      <p><strong>Disciplína a sebeovládání (Temperance).</strong> Stoický přístup nehledá dokonalé podmínky, ale pracuje s tím, co je právě k dispozici.</p>
    `
  },
  {
    id: "environment-design",
    keywords: ['architektura prostředí', 'environment design', 'prostředí', 'tření', 'spouštěče', 'pokušení', 'biologický věk', 'zdravé stárnutí', 'spánek', 'výživa', 'pohyb', 'kouření', 'alkohol'],
    title: "Architektura prostředí",
    relatedIds: ['habit-stacking', 'bad-habits', 'nighttime-cortisol', 'biological-age'],
    content: `
      <h2>Architektura prostředí (Environment Design)</h2>
      <p>Záměrná změna fyzického nebo digitálního prostoru tak, aby se dobré návyky staly nejsnazší volbou a ty špatné co nejobtížnější.</p>
      <h3>Praktická rada</h3>
      <p>Snižte tření u dobrých návyků a zvyšte ho u špatných. Schovejte pokušení z dohledu a vystavte nástroje, které podporují žádoucí chování.</p>
      <h3>Využití v praxi</h3>
      <p>Chcete večer číst místo sledování televize? Dejte knihu přímo na polštář a ovladač mimo dosah. Chcete jíst zdravě? Dejte ovoce doprostřed stolu a sladkosti méně dostupně.</p>
      <h3>Stoická vazba</h3>
      <p><strong>Dichotomie kontroly.</strong> Nemusíme mít pod kontrolou všechny vnější podněty, ale můžeme rozumně upravit prostředí, kterému se vystavujeme.</p>
    `
  },
  {
    id: "identity-based-habits",
    keywords: ['návyky založené na identitě', 'identity-based habits', 'identita', 'kdo chci být', 'charakter', 'biologický věk', 'zdravé stárnutí', 'pohyb', 'spánek', 'výživa'],
    title: "Návyky založené na identitě",
    relatedIds: ['identity', 'daily-systems', 'biological-age'],
    content: `
      <h2>Návyky založené na identitě (Identity-Based Habits)</h2>
      <p>Nejhlubší úroveň změny chování. Nezaměřujete se pouze na to, čeho chcete dosáhnout, ale na to, <strong>kým chcete být</strong>.</p>
      <h3>Praktická rada</h3>
      <p>Při rozhodování se zeptejte: <strong>„Co by v této situaci udělal člověk, kterým chci být?“</strong> Každý správný čin je hlasem pro vaši novou identitu.</p>
      <h3>Využití v praxi</h3>
      <p>Místo cíle „chci uběhnout maraton“ si budujte identitu „jsem aktivní člověk“. Když se vám nechce vstát z gauče, tato identita může být praktičtějším vodítkem než vzdálený výsledek.</p>
      <h3>Stoická vazba</h3>
      <p><strong>Život v souladu s ctností.</strong> Charakter se ukazuje v našich volbách a činech, zejména v přítomném okamžiku.</p>
    `
  },
  {
    id: "temptation-bundling",
    keywords: ['lákání na pokušení', 'temptation bundling', 'spojování lákadel', 'Premackův princip', 'odměna', 'motivace', 'potěšení', 'atraktivita', 'biologický věk', 'pohyb', 'spánek', 'výživa', 'zdravé stárnutí'],
    title: "Lákání na pokušení (Temptation Bundling)",
    relatedIds: ['laws', 'goldilocks-rule', 'choice'],
    content: `
      <h2>Lákání na pokušení (Temptation Bundling)</h2>
      <p>Tato technika propojuje psychologii motivace s okamžitým uspokojením. Spojuje činnost, kterou <strong>potřebujete dělat</strong>, s činností, kterou <strong>chcete dělat</strong>.</p>
      <h3>Jak to funguje</h3>
      <p>Využívá tzv. <strong>Premackův princip</strong>: pravděpodobnější chování může posílit méně pravděpodobné chování. Příjemná činnost se tak stane motivací přímo během vykonávání návyku.</p>
      <h3>Vzorec</h3>
      <p><strong>„Po tom, co udělám [NÁVYK, KTERÝ POTŘEBUJU], udělám [NÁVYK, KTERÝ CHCI].“</strong></p>
      <h3>Příklady</h3>
      <ul>
        <li>Budu sledovat svůj oblíbený seriál pouze tehdy, když budu šlapat na rotopedu.</li>
        <li>Budu poslouchat svůj oblíbený podcast pouze při žehlení prádla.</li>
      </ul>
    `
  },
  {
    id: "goldilocks-rule",
    keywords: ['pravidlo zlatovlásky', 'goldilocks rule', 'flow', 'obtížnost', 'motivace', 'výzva', 'prokopé', 'biologický věk', 'pohyb', 'kondice', 'zdravé stárnutí'],
    title: "Pravidlo Zlatovlásky",
    relatedIds: ['two-minutes', 'habit-stacking', 'biological-age'],
    content: `
      <h2>Pravidlo Zlatovlásky (Goldilocks Rule)</h2>
      <p>Člověk často zažívá největší motivaci a soustředění, když je úkol na hranici jeho současných schopností – není ani příliš snadný, ani příliš těžký.</p>
      <h3>Praktická rada</h3>
      <p>Průběžně kalibrujte obtížnost. Jakmile se návyk stane příliš snadným, můžete náročnost mírně zvýšit. Pokud vás úkol paralyzuje, zjednodušte ho.</p>
      <h3>Využití v praxi</h3>
      <p>Pokud se učíte cizí jazyk a jednoduché texty už nudí, ale odborné články jsou příliš těžké, najděte si materiál mezi nimi – například zjednodušené čtení pro úroveň B1/B2.</p>
      <h3>Stoická vazba</h3>
      <p><strong>Prokopé – neustálý pokrok.</strong> Přiměřené výzvy mohou člověka posouvat, aniž by ho zbytečně zahltíly.</p>
    `
  },
  {
    id: "nighttime-cortisol",
    keywords: ['nighttime cortisol', 'nightime cortisol', 'noční kortizol', 'večer', 'spánek', 'usínání', 'potraviny', 'banán', 'čokoláda', 'dýňová semínka', 'třešně', 'kiwi', 'heřmánkový čaj', 'cottage cheese', 'tvaroh', 'skořice', 'mléko', 'med', 'hořčík', 'tryptofan', 'zinek', 'melatonin', 'apigenin', 'kurkumin', 'polyfenoly', 'biologický věk', 'zdravé stárnutí', 'regenerace', 'cirkadiánní rytmus', 'stres'],
    title: "Nightime Cortisol",
    relatedIds: ['walking', 'breakfast', 'biological-age', 'environment-design'],
    content: `
      <h2>Nightime Cortisol – potraviny a večerní rutina</h2>
      <p class="knowhow-lead">Přehled potravin, které se často spojují s podporou klidného večera, spánku nebo příjmem některých živin důležitých pro nervový systém.</p>
      <div class="nighttime-cortisol-context"><h3>Kortizol, stres a večerní rovnováha</h3><p>Kortizol je přirozený hormon, který pomáhá regulovat denní rytmus, energii a reakci na zátěž. Problémem není každý jeho vzestup, ale dlouhodobý stres a nedostatek regenerace, které mohou ovlivnit spánek, náladu, trávení i celkové zdraví. Žádná jednotlivá potravina kortizol sama „nevypne“; smysl má kombinace dostatečného a pestrého jídla, přiměřeného pohybu, denního světla a pravidelného spánku.</p><p>Pokud jsi vyčerpaná a špatně spíš, nemusí být další náročný trénink tím, co právě potřebuješ. Zkus klidnou procházku, načasuj kofein podle vlastní tolerance a dopřej si před spaním čas na zklidnění. Hořčík ani byliny nejsou univerzálním lékem na stres; u doplňků zohledni léky, zdravotní stav a případné kontraindikace.</p></div>
      <h3 class="knowhow-food-heading">Nejlepší potraviny na snížení nočního kortizolu</h3>
      <div class="knowhow-food-grid">
        <article class="knowhow-food-card">
          <img src="assets/nighttime-foods/banana.png" alt="Banán" loading="lazy">
          <h4>Banán</h4>
          <p><a class="knowhow-substance-link" href="#substance-magnesium">Hořčík</a> a <a class="knowhow-substance-link" href="#substance-tryptophan">tryptofan</a>.</p>
        </article>
        <article class="knowhow-food-card">
          <img src="assets/nighttime-foods/dark-chocolate.png" alt="Tmavá čokoláda" loading="lazy">
          <h4>Tmavá čokoláda <small>(malé množství)</small></h4>
          <p>Obsahuje <a class="knowhow-substance-link" href="#substance-cocoa-flavanols">kakaové flavanoly a další polyfenoly</a>. Pozdě večer ale nemusí vyhovovat každému.</p>
        </article>
        <article class="knowhow-food-card">
          <img src="assets/nighttime-foods/pumpkin-seeds.png" alt="Dýňová semínka" loading="lazy">
          <h4>Dýňová semínka</h4>
          <p><a class="knowhow-substance-link" href="#substance-magnesium">Hořčík</a> + <a class="knowhow-substance-link" href="#substance-zinc">zinek</a>.</p>
        </article>
        <article class="knowhow-food-card">
          <img src="assets/nighttime-foods/butternut-squash.png" alt="Máslová dýně" loading="lazy">
          <h4>Dýně máslová</h4>
          <p><a class="knowhow-substance-link" href="#substance-carbohydrates">Komplexní sacharidy</a> a energie.</p>
        </article>
        <article class="knowhow-food-card">
          <img src="assets/nighttime-foods/golden-milk.png" alt="Zlaté mléko" loading="lazy">
          <h4>Zlaté mléko <small>(kurkuma, zázvor, skořice)</small></h4>
          <p><a class="knowhow-substance-link" href="#substance-curcumin">Kurkumin</a>, <a class="knowhow-substance-link" href="#substance-ginger">zázvorové látky</a> a <a class="knowhow-substance-link" href="#substance-cinnamon">skořicové polyfenoly</a>.</p>
        </article>
        <article class="knowhow-food-card">
          <img src="assets/nighttime-foods/pear.png" alt="Hruška" loading="lazy">
          <h4>Hruška</h4>
          <p>Lehká potravina, která může být vhodná jako večerní svačina.</p>
        </article>
        <article class="knowhow-food-card">
          <img src="assets/nighttime-foods/cherries.png" alt="Třešně" loading="lazy">
          <h4>Třešně</h4>
          <p>Zejména kyselé třešně jsou zkoumány v souvislosti s <a class="knowhow-substance-link" href="#substance-melatonin">melatoninem</a> a spánkem.</p>
        </article>
        <article class="knowhow-food-card">
          <img src="assets/nighttime-foods/kiwi.png" alt="Kiwi" loading="lazy">
          <h4>Kiwi</h4>
          <p>Je zkoumáno v souvislosti s kvalitou spánku a obsahem různých bioaktivních látek.</p>
        </article>
        <article class="knowhow-food-card">
          <img src="assets/nighttime-foods/chamomile-tea.png" alt="Heřmánkový čaj" loading="lazy">
          <h4>Heřmánkový čaj</h4>
          <p>Obsahuje mimo jiné <a class="knowhow-substance-link" href="#substance-apigenin">apigenin</a>; tradičně se používá jako uklidňující večerní nápoj.</p>
        </article>
        <article class="knowhow-food-card">
          <img src="assets/nighttime-foods/cottage-cheese.png" alt="Tvaroh" loading="lazy">
          <h4>Tvaroh</h4>
          <p>Zdroj bílkovin; obsahuje také <a class="knowhow-substance-link" href="#substance-tryptophan">tryptofan</a>.</p>
        </article>
        <article class="knowhow-food-card">
          <img src="assets/nighttime-foods/cinnamon.png" alt="Skořice" loading="lazy">
          <h4>Skořice</h4>
          <p>Obsahuje <a class="knowhow-substance-link" href="#substance-cinnamon">polyfenoly a další bioaktivní látky</a>.</p>
        </article>
        <article class="knowhow-food-card">
          <img src="assets/nighttime-foods/milk-honey.png" alt="Mléko a med" loading="lazy">
          <h4>Mléko + med</h4>
          <p>Mléko obsahuje <a class="knowhow-substance-link" href="#substance-tryptophan">tryptofan</a>; med dodává <a class="knowhow-substance-link" href="#substance-carbohydrates">sacharidy</a>.</p>
        </article>
      </div>

      <h3>Jak z toho udělat návyk?</h3>
      <p>Nemusíš každý večer jíst všechno. Vyber si jednu jednoduchou variantu a spoj ji s konkrétním večerním spouštěčem.</p>
      <p><strong>Příklad:</strong> „Po vyčištění zubů si připravím svůj klidný večerní nápoj.“ Nebo: „Po večeři si připravím malou večerní svačinu a potom odložím telefon.“</p>
      <p><strong>Princip Atomových návyků:</strong> Nejde o dokonalou potravinu. Důležitější je vytvořit jednoduchý, opakovatelný večerní systém, který podporuje pravidelnost a připraví tě na spánek.</p>

      <h3 id="nighttime-substances">Látky a živiny zmíněné v přehledu</h3>
      <p>Jednotlivé látky nejsou samostatným „lékem na kortizol“. Níže je stručné vysvětlení, proč se v souvislosti se spánkem, stresem nebo večerní výživou vůbec zmiňují.</p>
      <div class="knowhow-substance-index" aria-label="Přehled látek">
        <a href="#substance-magnesium">Hořčík</a>
        <a href="#substance-tryptophan">Tryptofan</a>
        <a href="#substance-zinc">Zinek</a>
        <a href="#substance-carbohydrates">Sacharidy</a>
        <a href="#substance-cocoa-flavanols">Kakaové flavanoly</a>
        <a href="#substance-curcumin">Kurkumin</a>
        <a href="#substance-ginger">Zázvorové látky</a>
        <a href="#substance-cinnamon">Skořicové polyfenoly</a>
        <a href="#substance-melatonin">Melatonin</a>
        <a href="#substance-apigenin">Apigenin</a>
      </div>

      <div class="knowhow-substance-list">
        <section id="substance-magnesium" class="knowhow-substance">
          <h4>Hořčík</h4>
          <p>Minerál důležitý pro nervový systém, svaly a řadu enzymatických reakcí. Stav hořčíku byl ve studiích spojován se spánkem, ale důkazy, že samotné doplňování hořčíku spolehlivě zlepšuje spánek, jsou zatím nejisté.</p>
        </section>
        <section id="substance-tryptophan" class="knowhow-substance">
          <h4>Tryptofan</h4>
          <p>Esenciální aminokyselina, z níž organismus vytváří mimo jiné serotonin a melatonin. Výzkum naznačuje možný vztah mezi příjmem tryptofanu a některými parametry spánku, nejde však o jednoduché pravidlo „více tryptofanu = lepší spánek“.</p>
        </section>
        <section id="substance-zinc" class="knowhow-substance">
          <h4>Zinek</h4>
          <p>Stopový prvek důležitý pro imunitu, metabolismus a mnoho enzymů. Jeho stav byl v některých studiích spojen s parametry spánku, ale nelze z toho vyvozovat, že zinek sám o sobě snižuje noční kortizol.</p>
        </section>
        <section id="substance-carbohydrates" class="knowhow-substance">
          <h4>Sacharidy</h4>
          <p>Hlavní zdroj energie. Večer mohou být součástí běžného jídla nebo malé svačiny; jejich význam pro spánek závisí na celkovém jídelníčku, množství a individuální toleranci. Označení „komplexní“ obvykle znamená sacharidy přirozeně spojené s vlákninou a dalšími složkami potraviny.</p>
        </section>
        <section id="substance-cocoa-flavanols" class="knowhow-substance">
          <h4>Kakaové flavanoly a polyfenoly</h4>
          <p>Bioaktivní rostlinné látky obsažené v kakau. Zkoumají se pro jejich antioxidační a další účinky; neznamená to však, že večerní čokoláda automaticky snižuje kortizol. Tmavá čokoláda navíc může obsahovat kofein a theobromin, takže pozdní konzumace nemusí být pro každého vhodná.</p>
        </section>
        <section id="substance-curcumin" class="knowhow-substance">
          <h4>Kurkumin</h4>
          <p>Jedna z hlavních bioaktivních látek kurkumy. Je známý především v souvislosti s výzkumem zánětlivých a oxidačních procesů. V běžném jídle jde především o součást koření, nikoli o ověřenou metodu snižování kortizolu.</p>
        </section>
        <section id="substance-ginger" class="knowhow-substance">
          <h4>Zázvorové látky</h4>
          <p>Zázvor obsahuje například gingeroly a další bioaktivní látky. Tradičně se používá v nápojích a jídle; jeho vztah ke stresu a spánku je předmětem výzkumu, ale není důvod jej považovat za samostatnou léčbu zvýšeného kortizolu.</p>
        </section>
        <section id="substance-cinnamon" class="knowhow-substance">
          <h4>Skořicové polyfenoly</h4>
          <p>Skořice obsahuje řadu rostlinných polyfenolů a aromatických sloučenin. Mohou být zajímavé z hlediska metabolismu a antioxidačních vlastností, ale běžné použití skořice není prokázanou metodou ke snížení nočního kortizolu.</p>
        </section>
        <section id="substance-melatonin" class="knowhow-substance">
          <h4>Melatonin</h4>
          <p>Hormon, který pomáhá řídit cirkadiánní rytmus a načasování spánku. Kyselé třešně obsahují melatonin a jejich vliv na některé ukazatele spánku byl zkoumán; výsledky nelze jednoduše přenést na každého člověka.</p>
        </section>
        <section id="substance-apigenin" class="knowhow-substance">
          <h4>Apigenin</h4>
          <p>Rostlinný flavonoid přítomný mimo jiné v heřmánku. Je zkoumán pro své působení na nervový systém a potenciálně uklidňující účinky, ale kvalita důkazů u lidí je omezená.</p>
        </section>
      </div>

      <div class="knowhow-note"><strong>Důležitá poznámka:</strong> Potraviny samy o sobě nejsou spolehlivým „lékem na vysoký kortizol“. Kortizol má přirozený denní rytmus a jeho večerní hladinu ovlivňuje řada faktorů, zejména spánek, stres, světlo, aktivita a celkový režim. Tento přehled proto ber jako inspiraci pro klidnější večerní rutinu, ne jako léčebné doporučení.</div>
    `
  },


  {
    id: "biological-age",
    keywords: ['biologický věk', 'biologické stárnutí', 'zdravé stárnutí', 'healthy aging', 'dlouhověkost', 'healthspan', 'spánek', 'kvalitní spánek', 'pohyb', 'fyzická aktivita', 'silový trénink', 'kondice', 'VO2max', 'výživa', 'strava', 'bílkoviny', 'vláknina', 'metabolismus', 'glukóza', 'inzulinová citlivost', 'srdce', 'krevní tlak', 'stres', 'regenerace', 'cirkadiánní rytmus', 'ranní světlo', 'kouření', 'tabák', 'alkohol', 'sociální vztahy', 'mozek', 'svaly', 'tělesná kompozice', 'epigenetické hodiny', 'DNA methylace'],
    title: "Biologický věk a zdravé stárnutí",
    source: "WHO: Ageing and health; WHO Europe: healthy ageing, pohyb a výživa; přehledová literatura o spánku a biologickém stárnutí.",
    relatedIds: ['walking', 'nighttime-cortisol', 'breakfast', 'strength', 'circuit', 'choice', 'stoicism-atomic-habits', 'habit-tracker'],
    content: `
      <h2>Biologický věk a zdravé stárnutí</h2>
      <p class="knowhow-lead">Chronologický věk říká, kolik let uplynulo od narození. <strong>Biologický věk</strong> je zastřešující pojem pro snahu popsat, jak rychle se v organismu mění funkce a biologické procesy. Existuje více způsobů jeho odhadu a různé metody nemusí dát stejný výsledek.</p>

      <div class="knowhow-aging-highlight">
        <strong>Nejde o honbu za jedním číslem.</strong>
        <span>Mnohem užitečnější je ptát se: <em>Co můžu dlouhodobě dělat pro to, abych zůstala co nejdéle zdravá, silná a funkční?</em></span>
      </div>

      <h3>🧬 Co může zdravé stárnutí ovlivňovat?</h3>
      <p>Neexistuje jeden návyk, který by „otočil biologické hodiny“. Zdravé stárnutí je výsledkem mnoha vlivů, které se navzájem doplňují. Velký smysl proto dává pracovat s oblastmi, které už v aplikaci máme.</p>

      <div class="knowhow-aging-grid">
        <article><h4>🏃 Pohyb</h4><p>Pravidelný pohyb podporuje kondici, svaly, mobilitu a kardiometabolické zdraví. Nemusí to být vždy trénink – počítá se i chůze, jízda na kole nebo běžný pohyb během dne.</p><button type="button" class="knowhow-topic-link" data-topic="walking">Otevřít: Chůze</button></article>
        <article><h4>💪 Svaly a síla</h4><p>Udržování svalové síly je důležité pro funkční schopnost a samostatnost. Proto má smysl kombinovat běžný pohyb s pravidelným posilováním.</p><button type="button" class="knowhow-topic-link" data-topic="breakfast">Související: Snídaně a bílkoviny</button></article>
        <article><h4>😴 Spánek</h4><p>Kvalitní spánek je součástí regenerace, regulace metabolismu a cirkadiánního rytmu. Poruchy spánku jsou spojovány také s biologickými procesy souvisejícími se stárnutím.</p><button type="button" class="knowhow-topic-link" data-topic="nighttime-cortisol">Otevřít: Nightime Cortisol</button></article>
        <article><h4>🥗 Výživa</h4><p>Důležitější než jedna „anti-aging“ potravina je dlouhodobě pestrá a vyvážená strava s dostatkem kvalitních potravin, vlákniny a přiměřeným příjmem energie.</p><button type="button" class="knowhow-topic-link" data-topic="breakfast">Otevřít: Snídaně</button></article>
        <article><h4>🫀 Metabolické a kardiovaskulární zdraví</h4><p>Krevní tlak, metabolické zdraví, pohyb, strava a tělesná kompozice se navzájem ovlivňují. Smyslem není sledovat každý ukazatel denně, ale vytvářet podmínky pro dlouhodobé zdraví.</p><button type="button" class="knowhow-topic-link" data-topic="walking">Související: Chůze</button></article>
        <article><h4>🧘 Stres a psychická pohoda</h4><p>Dlouhodobý stres může zasahovat do spánku, chování i regenerace. Pomáhá budovat návyky, které podporují odpočinek, smysluplnou aktivitu a schopnost reagovat na situace s odstupem.</p><button type="button" class="knowhow-topic-link" data-topic="stoicism-atomic-habits">Otevřít: Atomové návyky a Stoicismus</button></article>
        <article><h4>🚭 Kouření a alkohol</h4><p>U zdravého stárnutí má velký význam také omezování známých rizik. Nekouření a co nejnižší konzumace alkoholu mají mnohem pevnější oporu v prevenci onemocnění než různé „anti-aging“ doplňky.</p><button type="button" class="knowhow-topic-link" data-topic="bad-habits">Související: Jak se zbavit špatných návyků</button></article>
        <article><h4>👥 Sociální a mentální život</h4><p>Zdravé stárnutí není jen o svalech a biomarkerech. Důležité jsou také vztahy, smysluplné aktivity, učení a prostředí, které člověku umožňuje zůstat aktivní a zapojený.</p><button type="button" class="knowhow-topic-link" data-topic="gratitude">Související: Vděčnost</button></article>
      </div>

      <h3>😴 Proč sem patří právě spánek?</h3>
      <p>Spánek je krásný příklad propojení několika oblastí. Ovlivňuje denní rytmus, regeneraci a fungování během dne; současně pohyb, ranní světlo, stres a večerní prostředí ovlivňují spánek. Proto nechceme vytvářet samostatné „ostrovy“ informací, ale jednu propojenou síť.</p>
      <p><button type="button" class="knowhow-topic-link" data-topic="nighttime-cortisol">→ Přejít na Nightime Cortisol</button></p>

      <h3>🔗 Jedna oblast může pomáhat jiné</h3>
      <ul>
        <li><strong>Ranní světlo + pohyb</strong> → mohou podpořit pravidelný denní rytmus.</li>
        <li><strong>Pohyb</strong> → podporuje kondici a může být užitečný i pro spánek.</li>
        <li><strong>Silový trénink + dostatek bílkovin</strong> → dávají smysl společně při péči o svaly.</li>
        <li><strong>Výživa + pohyb</strong> → společně zapadají do péče o metabolické zdraví.</li>
        <li><strong>Stres + spánek</strong> → často se navzájem ovlivňují, takže změna jedné oblasti může usnadnit druhou.</li>
        <li><strong>Návyky</strong> → propojí všechny tyto oblasti do něčeho, co se dá skutečně dělat dlouhodobě.</li>
      </ul>

      <h3>🌱 Jak začít bez „anti-aging“ extrémů?</h3>
      <ol>
        <li>Vyber jednu oblast, kde máš největší prostor ke zlepšení.</li>
        <li>Zmenši ji na konkrétní návyk, který dokážeš opakovat.</li>
        <li>Urči si <strong>kdy a kde</strong> ho uděláš.</li>
        <li>Když původní plán nevyjde, využij princip <strong>Možnosti výběru</strong> a najdi jinou rozumnou variantu.</li>
        <li>Sleduj trend v čase, ne jeden špatný nebo dobrý den.</li>
      </ol>
      <p><button type="button" class="knowhow-topic-link" data-topic="choice">→ Otevřít: Možnost výběru</button></p>

      <div class="knowhow-note"><strong>Důležitá poznámka:</strong> „Biologický věk“ není jedno univerzální měření. Některé testy používají epigenetické hodiny a další biomarkery, ale jejich výsledky je potřeba interpretovat opatrně. Cílem této kapitoly není slibovat konkrétní počet „let dolů“, ale ukázat návyky a oblasti, které mají význam pro zdravé stárnutí a délku života ve zdraví.</div>

      <div class="knowhow-sources"><strong>Vybrané zdroje:</strong> WHO – Ageing and health; WHO Europe – zdravé stárnutí, pohyb a výživa; přehledová literatura o vztahu spánku a biologického stárnutí.</div>
    `
  },

  {
    id: "choice",
    keywords: ['možnost výběru', 'volba', 'rozhodnutí', 'motivace', 'energie', 'únava', 'cvičení', 'pohyb', 'procházka', 'zdraví', 'sebevědomí', 'sebeúcta', 'životní prostředí', 'ekologie', 'kolo', 'auto', 'biologický věk', 'zdravé stárnutí', 'spánek', 'výživa', 'stres', 'regenerace'],
    title: "Možnost výběru",
    relatedIds: ['two-minutes', 'walking', 'nighttime-cortisol', 'biological-age'],
    source: "Ilustrační motivační materiál; zdravotní a behaviorální tvrzení jsou formulována jako obecné principy, nikoli jako záruka výsledku.",
    content: `
      <h2>Možnost výběru</h2>
      <p class="knowhow-lead"><strong>Nehledám důvody, hledám způsoby.</strong> Když původní plán nevyjde, stále může existovat jiná cesta. Smyslem není hledat výmluvy ani se za každou cenu přemáhat, ale hledat <strong>rozumnou alternativu, která je v dané situaci skutečně možná.</strong></p>

      <div class="choice-infographic"><img src="assets/choice-infographic-cz.png" alt="Možnost výběru: pět běžných překážek a jejich proveditelné alternativy" loading="lazy"></div>

      <h3>Stejný cíl, jiná cesta</h3>
      <p>Člověk nemusí mít vždy ideální podmínky. Posilovna může být zavřená, den může být nabitý, energie může být nízká nebo původní plán může překazit počasí či jiná povinnost. To ale automaticky neznamená, že nezbývá nic.</p>
      <p><strong>Možnost výběru znamená hledat další proveditelnou variantu.</strong> Někdy je to kratší cvičení, jindy svižná chůze, jednodušší jídlo nebo menší verze návyku.</p>

      <h3>Nejde o výčitku</h3>
      <p>Možnost výběru není důvodem k obviňování. Pokud je člověk nemocný, přetížený nebo potřebuje regeneraci, může být nejlepší volbou odpočinek. Rozhodnutí pro zdraví není vždycky „víc výkonu“. Může to být i spánek, klid, jídlo, které člověku sedí, nebo obyčejný den bez tréninku.</p>

      <h3>Proč na malých volbách záleží?</h3>
      <p>Jedno rozhodnutí obvykle nic zásadního nezmění. Opakované malé volby ale mohou postupně vytvořit prostředí, ve kterém je zdravější chování snazší. Právě tady se možnost výběru propojuje s budováním návyků: <strong>když jedna cesta nefunguje, hledá se jiná, kterou lze dlouhodobě opakovat.</strong></p>

      <h3>Jak z toho udělat návyk?</h3>
      <ol>
        <li>Rozpoznat situace, ve kterých původní plán často selhává.</li>
        <li>Předem si připravit <strong>jednu menší nebo jinou variantu</strong>.</li>
        <li>Rozhodnout, kdy a kde se alternativní verze může uskutečnit.</li>
        <li>Po splnění si všimnout samotného faktu: <strong>i změněný plán se podařilo uskutečnit.</strong></li>
      </ol>
      <p><button type="button" class="knowhow-topic-link" data-topic="two-minutes">Více: Pravidlo dvou minut</button></p>
      <p><button type="button" class="knowhow-topic-link" data-topic="daily-systems">Více: Každodenní systémy</button></p>
      <p><button type="button" class="knowhow-topic-link" data-topic="habit-stacking">Více: Spojování návyků</button></p>

      <div class="knowhow-note"><strong>Jedna věta na závěr:</strong> Když jedna cesta nefunguje, nemusí skončit celý záměr. Může se změnit způsob, jakým se k němu člověk dostane.</div>
    `
  },

  {
    id: "walking",
    keywords: ['chůze', 'chození', 'kroky', '10000 kroků', 'po jídle', 'ranní světlo', 'japonská chůze', 'kopec', 'zátěž', 'batoh', 'walking', 'biologický věk', 'zdravé stárnutí', 'pohyb', 'kondice', 'srdce', 'metabolismus', 'glukóza', 'spánek', 'cirkadiánní rytmus'],
    title: "Chůze",
    shareImage: "assets/sR2.png",
    relatedIds: ['biological-age', 'nighttime-cortisol', 'choice', 'breakfast'],
    content: `
      <h2>7 tipů pro zefektivnění chůze</h2>
      <div class="personal-topic-visual walking-personal">
        <div class="personal-topic-avatar knowhow-shareable-visual"><img src="assets/sR2.png" alt="Chůze – původní schválený obrázek" loading="lazy"><button type="button" class="knowhow-share-image" data-share-image="assets/sR2.png" data-share-title="Chůze" aria-label="Sdílet obrázek Chůze" title="Sdílet">↗</button></div>
        <div class="personal-topic-context"><span class="personal-topic-icon">👟</span><strong>Chůze</strong><span>Každý krok se počítá.</span></div>
      </div>
      <p class="knowhow-lead">Chůze je jednoduchý způsob, jak během dne přidat pohyb bez nutnosti plánovat dlouhý trénink. Nemusíš všechno zvládnout najednou – důležité je, aby se pohyb stal přirozenou součástí dne.</p>
      <ol>
        <li><strong>Přestaň cílit na 10k kroků.</strong><br>10 000 není magická hranice. Pokud se běžně pohybuješ kolem 3–4 tisíc kroků, může být dobrým cílem postupně se dostat třeba k 8 tisícům. Jako pružný orientační cíl může posloužit přibližně 56 000 kroků za týden.</li>
        <li><strong>Choď po jídle.</strong><br>I krátká 2–5minutová procházka může být užitečná pro omezení vzestupu glukózy po jídle. Když máš čas, zkus 10–15 minut.</li>
        <li><strong>Choď ráno.</strong><br>Ranní pobyt venku pomáhá nastavit cirkadiánní rytmus. Nemusíš nikam spěchat – stačí se ráno chvíli projít. Do slunce se samozřejmě nedívej přímo.</li>
        <li><strong>Vyzkoušej „japonskou chůzi“.</strong><br>Střídej například 3 minuty volně a 3 minuty svižně. Opakuj zhruba 30 minut. Intervaly si můžeš určovat podle orientačních bodů na trase.</li>
        <li><strong>Choď do kopce.</strong><br>Mírné stoupání zvýší náročnost a zapojí více hýždě, stehna a lýtka. Nemusíš hledat prudký kopec – i 10–15 minut mírného stoupání může být zajímavou změnou.</li>
        <li><strong>Přidej trochu zátěže.</strong><br>Lehký batoh může chůzi postupně ztížit. Začni opravdu lehce a zátěž přidávej až tehdy, když je chůze pohodlná a bez bolesti.</li>
        <li><strong>Udělej z chůze součást dne.</strong><br>Schody místo výtahu, zaparkování o kus dál, pěší cesta pro menší nákup nebo krátká procházka během telefonátu – právě tyto malé příležitosti se mohou během týdne nasčítat.</li>
      </ol>
      <h3>Nejde jen o číslo na hodinkách</h3>
      <p>Chůze může přispět k energetickému výdeji, kondici, lepší regulaci glukózy i pravidelnému dennímu rytmu. A její velká výhoda? Dá se rozdělit na malé části, které se snadněji vejdou do běžného dne.</p>
      <p><strong>Malý krok se počítá.</strong> Když dnes nemáš čas na trénink, nemusíš si vybírat mezi „hodinou cvičení“ a ničím. Někdy je o trochu lepší možnost prostě se projít.</p>
      <section class="walking-everyday-benefits">
        <h2>Proč je chůze tak podceňovaná?</h2>
        <ul>
          <li><strong>Pomáhá zvýšit denní energetický výdej.</strong> U 10 000 kroků se často uvádí přibližně 300–500 kcal, skutečné číslo se ale výrazně liší podle tělesné hmotnosti, tempa, terénu a délky kroku.</li>
          <li><strong>Může být příjemným způsobem, jak se hýbat i ve stresovém období.</strong> Klidná až svižná chůze může podpořit uvolnění a nemusí představovat takovou zátěž jako intenzivní trénink.</li>
          <li><strong>Podporuje náladu.</strong> Pravidelný pohyb venku může zlepšovat náladu a psychickou pohodu; nenahrazuje ale automaticky odbornou péči ani předepsanou léčbu.</li>
          <li><strong>Je snadné ji rozdělit do menších částí.</strong> Krátké procházky po jídle, během telefonátu nebo cestou na schůzku se mohou během dne nasčítat.</li>
          <li><strong>Obvykle nevyžaduje dlouhou regeneraci.</strong> Intenzitu přizpůsob svým možnostem a bolesti nebo neobvyklé příznaky nepřecházej.</li>
        </ul>
        <h3>Ale buďme realističtí…</h3>
        <p>Dostat se na 10 000 kroků, když pracuješ u počítače a máš milion dalších povinností, může být náročné. Nemusíš začínat deseti tisíci. Přidej třeba 5–10 minut chůze k tomu, co už během dne děláš, a postupně hledej další příležitosti.</p>
      </section>
    `
  },
  {
    id: "breakfast",
    keywords: ['snídaně', 'snídaně pro cíl', 'soustředění', 'focus', 'svaly', 'budování svalů', 'střevo', 'střevní zdraví', 'pleť', 'kůže', 'imunita', 'stres', 'protein', 'bílkoviny', 'leucin', 'omega 3', 'EPA', 'DHA', 'antokyany', 'vláknina', 'hořčík', 'zinek', 'selen', 'vitamin C', 'biologický věk', 'zdravé stárnutí', 'výživa', 'metabolismus', 'srdce', 'spánek'],
    title: "Snídaně",
    relatedIds: ['biological-age', 'nighttime-cortisol', 'walking'],
    source: "Výživové principy a přehled odborné literatury; obrázky jídel jsou použity jako ilustrace.",
    content: `
      <h2>Snídaně podle toho, na co právě cílíš</h2>
      <p class="knowhow-lead">Snídaně nemusí vypadat každý den stejně. Můžeš ji jednoduše přizpůsobit tomu, co od dopoledne potřebuješ: soustředění, podporu svalů, trávení, pokožku, imunitu nebo klidnější start dne.</p>

      <div class="knowhow-note breakfast-principle"><strong>Jednoduchý princip:</strong> Neexistuje jedna „dokonalá“ snídaně. Důležitější je, aby zapadala do tvého cíle, chutnala ti a byla dostatečně jednoduchá na opakování.</div>

      <div class="knowhow-breakfast-grid">
        <article class="knowhow-breakfast-card">
          <div class="knowhow-breakfast-image"><img src="assets/breakfast-focus.jpg" alt="Losos s avokádem a borůvkami" loading="lazy"></div>
          <h3>🧠 Soustředění</h3>
          <p><strong>Losos + avokádo + borůvky</strong></p>
          <p>Kombinace poskytuje kvalitní bílkoviny a <a class="knowhow-substance-link" href="#breakfast-epa-dha">EPA a DHA</a>, k tomu <a class="knowhow-substance-link" href="#breakfast-mufa">mononenasycené tuky</a> z avokáda a <a class="knowhow-substance-link" href="#breakfast-anthocyanins">antokyany</a> z borůvek. Tyto látky jsou zajímavé pro normální funkci mozku, i když účinky stravy na kognitivní výkon nejsou tak jednoduché, jak může podobná grafika naznačovat.</p>
        </article>

        <article class="knowhow-breakfast-card">
          <div class="knowhow-breakfast-image"><img src="assets/breakfast-muscle.jpg" alt="Mleté hovězí maso s vejci a avokádem" loading="lazy"></div>
          <h3>💪 Budování svalů</h3>
          <p><strong>Hovězí maso + vejce + avokádo</strong></p>
          <p>Hlavní roli zde hrají kompletní <a class="knowhow-substance-link" href="#breakfast-protein">bílkoviny</a> a <a class="knowhow-substance-link" href="#breakfast-leucine">leucin</a>. Právě dostatek kvalitních bílkovin v jednotlivých jídlech je praktičtější cíl než hledání jedné „zázračné“ potraviny.</p>
        </article>

        <article class="knowhow-breakfast-card">
          <div class="knowhow-breakfast-image"><img src="assets/breakfast-gut.jpg" alt="Kysané zelí s řeckým jogurtem a avokádem" loading="lazy"></div>
          <h3>🦠 Střevní zdraví</h3>
          <p><strong>Kysané zelí + řecký jogurt + avokádo</strong></p>
          <p>Fermentované potraviny mohou přinášet živé mikroorganismy, pokud jsou skutečně živé a výrobek nebyl tepelně ošetřen. <a class="knowhow-substance-link" href="#breakfast-fermented-cultures">Fermentační kultury</a> a <a class="knowhow-substance-link" href="#breakfast-fiber">vláknina</a> jsou zajímavou součástí pestré stravy pro střevní mikrobiotu.</p>
        </article>

        <article class="knowhow-breakfast-card">
          <div class="knowhow-breakfast-image"><img src="assets/breakfast-skin.jpg" alt="Tvaroh s borůvkami a dýňovými semínky" loading="lazy"></div>
          <h3>✨ Pokožka</h3>
          <p><strong>Tvaroh + borůvky + dýňová semínka</strong></p>
          <p>Dobře se tu doplňují <a class="knowhow-substance-link" href="#breakfast-protein">bílkoviny</a>, <a class="knowhow-substance-link" href="#breakfast-vitamin-c">vitamin C</a> z ovoce a <a class="knowhow-substance-link" href="#breakfast-zinc">zinek</a> ze semínek. Vitamin C je potřebný pro tvorbu kolagenu a zinek přispívá k udržení normálního stavu kůže.</p>
        </article>

        <article class="knowhow-breakfast-card">
          <div class="knowhow-breakfast-image"><img src="assets/breakfast-immune.jpg" alt="Vejce se špenátem a avokádem" loading="lazy"></div>
          <h3>🛡️ Podpora imunity</h3>
          <p><strong>Vejce + špenát + avokádo</strong></p>
          <p>Vejce přinášejí mimo jiné <a class="knowhow-substance-link" href="#breakfast-zinc">zinek</a> a <a class="knowhow-substance-link" href="#breakfast-selenium">selen</a>; špenát obsahuje <a class="knowhow-substance-link" href="#breakfast-carotenoids">karotenoidy</a>, z nichž některé tělo využívá jako prekurzory <a class="knowhow-substance-link" href="#breakfast-vitamin-a">vitaminu A</a>. Tuk z avokáda může zlepšit vstřebávání karotenoidů rozpustných v tucích.</p>
        </article>

        <article class="knowhow-breakfast-card">
          <div class="knowhow-breakfast-image"><img src="assets/breakfast-stress.jpg" alt="Řecký jogurt s makadamovými ořechy a borůvkami" loading="lazy"></div>
          <h3>🌿 Klidnější start dne</h3>
          <p><strong>Řecký jogurt + makadamové ořechy + borůvky</strong></p>
          <p>Jde hlavně o sytou kombinaci <a class="knowhow-substance-link" href="#breakfast-protein">bílkovin</a>, tuků a rostlinných látek. Makadamové ořechy obsahují také <a class="knowhow-substance-link" href="#breakfast-magnesium">hořčík</a>. Není ale správné tvrdit, že tato snídaně sama o sobě „snižuje stres“ nebo kortizol.</p>
        </article>
      </div>

      <h3>Jak z toho udělat jednoduchý návyk?</h3>
      <ol>
        <li>Vyber si <strong>jeden cíl</strong>, který je pro tebe aktuálně důležitý.</li>
        <li>Vyber jednu snídani, která ti chutná a kterou zvládneš připravit bez zbytečného tření.</li>
        <li>Připrav si večer alespoň jednu část – například vejce, jogurt, misku nebo suroviny.</li>
        <li>Po týdnu si všimni, jak se cítíš, jak snadno snídani opakuješ a zda ti opravdu sedí.</li>
      </ol>
      <p><strong>Nemusíš jíst přesně tyto kombinace.</strong> Ber je jako stavebnici: kvalitní zdroj bílkovin + ovoce nebo zelenina + podle cíle vhodný zdroj tuků, vlákniny a dalších živin.</p>

      <h3 id="breakfast-substances">Látky a živiny zmíněné výše</h3>
      <p>Jednotlivé položky níže vysvětlují, proč se objevily v doporučeních. Nejde o seznam „účinných látek“, které by samy o sobě léčily nebo garantovaly určitý výsledek.</p>
      <div class="knowhow-substance-index" aria-label="Přehled látek a živin">
        <a href="#breakfast-protein">Bílkoviny</a>
        <a href="#breakfast-leucine">Leucin</a>
        <a href="#breakfast-epa-dha">EPA a DHA</a>
        <a href="#breakfast-anthocyanins">Antokyany</a>
        <a href="#breakfast-mufa">Mononenasycené tuky</a>
        <a href="#breakfast-fermented-cultures">Fermentační kultury</a>
        <a href="#breakfast-fiber">Vláknina</a>
        <a href="#breakfast-vitamin-c">Vitamin C</a>
        <a href="#breakfast-zinc">Zinek</a>
        <a href="#breakfast-selenium">Selen</a>
        <a href="#breakfast-vitamin-a">Vitamin A</a>
        <a href="#breakfast-carotenoids">Karotenoidy</a>
        <a href="#breakfast-magnesium">Hořčík</a>
      </div>

      <div class="knowhow-substance-list">
        <section id="breakfast-protein" class="knowhow-substance"><h4>Bílkoviny</h4><p>Bílkoviny dodávají aminokyseliny potřebné pro obnovu a tvorbu tkání. Pro svaly je důležitý hlavně celkový příjem bílkovin, jejich kvalita a pravidelné rozložení během dne; samotná snídaně není magický okamžik.</p></section>
        <section id="breakfast-leucine" class="knowhow-substance"><h4>Leucin</h4><p>Esenciální aminokyselina, která patří mezi signály podílející se na stimulaci syntézy svalových bílkovin. Nachází se ve vyšším množství například v mléčných výrobcích, vejcích a mase.</p></section>
        <section id="breakfast-epa-dha" class="knowhow-substance"><h4>EPA a DHA</h4><p>Dlouhořetězcové omega-3 mastné kyseliny. DHA je významnou součástí buněčných membrán v mozku. Výzkum vztahu omega-3 a kognice je zajímavý, ale výsledky klinických studií nejsou jednotné – proto je vhodnější mluvit o podpoře zdravého jídelníčku než o „zvýšení výkonu mozku“.</p></section>
        <section id="breakfast-anthocyanins" class="knowhow-substance"><h4>Antokyany</h4><p>Skupina rostlinných pigmentů patřících mezi flavonoidy. Najdeš je například v borůvkách a dalších tmavě zbarvených plodech. Jsou předmětem výzkumu kvůli jejich biologickým účinkům.</p></section>
        <section id="breakfast-mufa" class="knowhow-substance"><h4>Mononenasycené tuky</h4><p>Typ nenasycených mastných kyselin, kterých je hodně například v avokádu, olivovém oleji a některých ořeších. Jsou součástí jídelníčku, který bývá spojován s příznivým kardiometabolickým profilem.</p></section>
        <section id="breakfast-fermented-cultures" class="knowhow-substance"><h4>Fermentační kultury</h4><p>U některých fermentovaných potravin mohou být přítomné živé mikroorganismy. Jejich množství a složení závisí na konkrétním výrobku a zpracování. Fermentované potraviny mohou být zajímavou součástí pestré stravy, ale nejde o univerzální „probiotikum“.</p></section>
        <section id="breakfast-fiber" class="knowhow-substance"><h4>Vláknina</h4><p>Nestravitelná část rostlinných potravin. Některé druhy vlákniny slouží jako substrát pro střevní mikroorganismy. Postupné zvyšování příjmu vlákniny a dostatek tekutin bývá praktičtější než honba za jedinou „superpotravinou“.</p></section>
        <section id="breakfast-vitamin-c" class="knowhow-substance"><h4>Vitamin C</h4><p>Vitamin potřebný mimo jiné pro normální tvorbu kolagenu, který je důležitý pro kůži a pojivové tkáně. Významným zdrojem jsou ovoce a zelenina.</p></section>
        <section id="breakfast-zinc" class="knowhow-substance"><h4>Zinek</h4><p>Stopový prvek, který přispívá k normální funkci imunitního systému a pomáhá udržovat normální stav kůže. Bohatými zdroji jsou například maso, vejce a dýňová semínka.</p></section>
        <section id="breakfast-selenium" class="knowhow-substance"><h4>Selen</h4><p>Stopový prvek důležitý pro normální funkci imunitního systému a ochranu buněk před oxidačním stresem. Obsah v potravinách se může výrazně lišit podle půdy a krmiva.</p></section>
        <section id="breakfast-vitamin-a" class="knowhow-substance"><h4>Vitamin A</h4><p>Vitamin důležitý mimo jiné pro normální funkci imunitního systému a udržení normálního stavu kůže a sliznic. Zelená listová zelenina obsahuje karotenoidy, z nichž některé mohou sloužit jako jeho prekurzory.</p></section>
        <section id="breakfast-carotenoids" class="knowhow-substance"><h4>Karotenoidy</h4><p>Skupina rostlinných pigmentů. Některé, například beta-karoten, může tělo přeměňovat na vitamin A. Vstřebávání karotenoidů rozpustných v tucích může být lepší, když je jídlo obsahuje také trochu tuku.</p></section>
        <section id="breakfast-magnesium" class="knowhow-substance"><h4>Hořčík</h4><p>Minerál potřebný pro řadu enzymatických reakcí, normální činnost svalů a nervového systému. Makadamové ořechy, semínka a další ořechy mohou přispívat k jeho příjmu.</p></section>
      </div>

      <div class="knowhow-note"><strong>Malá brzda proti marketingu:</strong> Obrázky mohou vypadat přesvědčivěji než samotné důkazy. Žádná z těchto snídaní sama o sobě nezaručí lepší soustředění, svaly, pleť, imunitu ani méně stresu. Smyslem je nabídnout jednoduché a nutričně rozumné možnosti, které se dají dlouhodobě opakovat.</div>
    `
  },
  {
    id: "plate",
    keywords: ['talíř', 'sestavování talíře', 'vyvážený talíř', 'zelenina', 'bílkoviny', 'sacharidy', 'zdravé tuky', 'dlaň', 'pěst', 'hrst', 'palec', 'porce', 'výživa', 'zdravý životní styl'],
    title: "Jak si sestavovat talíř",
    shareImage: "assets/plate-formula-cz-transparent.png",
    relatedIds: ['breakfast', 'foods-worth-noticing', 'biological-age', 'nighttime-cortisol', 'walking'],
    source: "WHO: zdravá strava a zásady vyváženého jídelníčku; viz také související témata v Know HOW.",
    content: `
      <h2>Jak si sestavovat talíř</h2>
      <p class="knowhow-lead">Jednoduchá pomůcka pro běžný život. Nejde o dietu, přesné počítání ani o „dokonalý“ talíř – jde o způsob, jak si postupně vytvořit dobrý odhad porce a pestrého jídla.</p>
      <div class="portion-guide portion-guide-clean" aria-label="Jednoduchá pomůcka pro porce">
        <div class="portion-guide-title">Jednoduchá pomůcka pro porce</div>
        <div class="portion-guide-subtitle">Použij vlastní ruku jako orientační měřítko. Nejde o přesnou váhu.</div>
        <div class="portion-guide-row">
          <div class="portion-item"><div class="portion-icon portion-protein"><img src="assets/portion-hands/palm.png" alt="Dlaň"></div><strong>1 dlaň</strong><b>BÍLKOVINY</b></div>
          <span class="portion-plus">+</span>
          <div class="portion-item"><div class="portion-icon portion-veg"><img src="assets/portion-hands/fists.png" alt="Pěsti"></div><strong>2 pěsti</strong><b>ZELENINA</b></div>
          <span class="portion-plus">+</span>
          <div class="portion-item"><div class="portion-icon portion-carb"><img src="assets/portion-hands/cupped.png" alt="Hrst"></div><strong>1 hrst</strong><b>SACHARIDY</b></div>
          <span class="portion-plus">+</span>
          <div class="portion-item"><div class="portion-icon portion-fat"><img src="assets/portion-hands/thumb.png" alt="Palec"></div><strong>1 palec</strong><b>ZDRAVÉ TUKY</b></div>
        </div>
        <div class="portion-guide-foot">Sestav talíř: bílkoviny + zelenina + sacharidy + zdravé tuky.</div>
      </div>
      <div class="plate-balance-visual knowhow-shareable-visual">
        <img src="assets/plate-formula-cz.png" alt="Vyvážený talíř – přehledná ilustrace složení jídla" loading="lazy">
        <button type="button" class="knowhow-share-image" data-share-image="assets/plate-formula-cz.png" data-share-title="Talíř v rovnováze" aria-label="Sdílet obrázek Talíř v rovnováze" title="Sdílet">↗</button>
      </div>
      <h3>Jak může vypadat vyvážený talíř</h3>
      <p class="plate-explainer">Vedle orientační pomůcky pro porce můžeš využít také názorné rozdělení talíře podle jednotlivých skupin potravin.</p>
      <h3>Čtyři jednoduché orientační míry</h3>
            <div class="knowhow-note"><strong>Ruce nejsou přesná váha.</strong> Je to praktická pomůcka, která se přirozeně mění podle velikosti těla. Pokud máš větší hlad, více pohybu nebo jinou potřebu, porci můžeš upravit.</div>
      <h3>Jak začít bez počítání</h3>
      <ol>
        <li>Začni zeleninou a zdrojem bílkovin.</li>
        <li>Přidej sacharidovou přílohu podle aktivity, hladu a chuti.</li>
        <li>Doplň přiměřené množství tuku.</li>
        <li>Jez v klidu a vnímej, kdy máš dost.</li>
        <li>Střídej potraviny a barvy – žádná jednotlivá potravina nemusí být „zázračná“.</li>
      </ol>
      <h3>Příklady talířů</h3>
      <div class="plate-examples">
        <article><h4>🍳 Snídaně</h4><p>Vejce · avokádo · rajčata · špenát · celozrnný chléb</p></article>
        <article><h4>🐟 Oběd / večeře</h4><p>Losos · quinoa · brokolice · salát · avokádo</p></article>
        <article><h4>🌯 Rychlá varianta</h4><p>Kuřecí maso · tortilla · zelenina · jogurtový dresink</p></article>
      </div>
      <p><strong>Časem se z pomůcky může stát intuice.</strong> Čím častěji podobný princip používáš, tím méně potřebuješ přemýšlet nad každým gramem a každou kalorií.</p>
    `
  },
  {
    id: "strength",
    keywords: ['silový trénink', 'síla', 'svaly', 'posilování', 'ženy po 30', 'dlouhověkost', 'funkční síla', 'zdravé stárnutí'],
    title: "Silový trénink",
    shareImage: "assets/sila-visual.png",
    relatedIds: ['circuit', 'walking', 'biological-age'],
    source: "WHO: fyzická aktivita a posilování hlavních svalových skupin alespoň 2 dny týdně.",
    content: `
      <h2>Silový trénink</h2>
      <p class="knowhow-lead">Nejde o vzhled. Jde o sílu, stabilitu, odolnost a schopnost zvládat běžný život s větší rezervou.</p>
      <div class="personal-topic-visual strength-personal no-person-visual">
        <img class="strength-topic-image" src="assets/sila-visual.png" alt="Činky a vybavení pro silový trénink" loading="lazy">
        <div class="personal-topic-context"><span class="personal-topic-icon">🏋️</span><strong>Silový trénink</strong><span>Síla pro běžný život.</span></div>
      </div>
      <div class="knowhow-note"><strong>Po 30 nemusíš „dohnat“ žádné číslo.</strong> Smyslem je průběžně pečovat o svaly, sílu a funkčnost těla.</div>
      <h3>Proč má smysl?</h3>
      <ul><li>pomáhá udržovat a rozvíjet svalovou sílu,</li><li>podporuje funkčnost a zdraví kostí,</li><li>usnadňuje běžné činnosti, jako jsou schody, nákupy nebo výlety,</li><li>vytváří tělesnou rezervu pro další roky života.</li></ul>
      <h3>Kolikrát týdně?</h3>
      <p>Pro zdravé dospělé doporučuje WHO posilování hlavních svalových skupin alespoň <strong>2 dny v týdnu</strong>. Nemusí to znamenat dlouhé tréninky. Začni úrovní, která je pro tebe zvládnutelná, a postupně přidávej.</p>
      <p><button type="button" class="knowhow-topic-link" data-topic="circuit">→ Přejít na Kruhový trénink</button></p>
    `
  },
  {
    id: "circuit",
    keywords: ['kruhový trénink', 'silový trénink', 'šest pohybů', 'dřep', 'svislý tah', 'přítah', 'hip hinge', 'klik', 'tlak nad hlavu', 'funkční trénink'],
    title: "Kruhový trénink",
    relatedIds: ['strength', 'walking', 'biological-age'],
    source: "WHO: fyzická aktivita; principy silového tréninku a progresivního zatížení.",
    content: `
      <h2>Kruhový trénink</h2>
      <p class="knowhow-lead">Praktický způsob, jak v jednom tréninku procvičit celé tělo. Vyber varianty cviků podle své úrovně a postupně je přizpůsobuj.</p>
      <div class="circuit-intro-card">
        <div><span class="knowhow-section-kicker">CELÉ TĚLO</span><h3>Šest základních pohybů</h3><p>Nemusíš memorovat desítky cviků. Vyber jednu zvládnutelnou variantu každého pohybu a postupně ji ztěžuj.</p></div>
        <div class="circuit-intro-badge">🔁<strong>2× týdně</strong><span>je dobrý začátek</span></div>
      </div>
      <div class="circuit-exercise-list">
        ${circuitExercise(1, 'Dřepová varianta', 'Tlačení vzhůru ze země nohama', 'Dřepy, výpady, výstupy na bednu i dřepy s váhou patří sem.', 'Začátečník: dřep na židli · Pokročilý: goblet dřep · Pokročilý+: split dřep', 'Zpomal. Čím déle opakování trvá, tím déle svaly pracují.', 'kruhovy_trenink_1.png')}
        ${circuitExercise(2, 'Svislý tah', 'Tažení něčeho z výšky dolů', 'Taháš směrem dolů – pracují záda, široký sval zádový a biceps.', 'Začátečník: tah s gumou vsedě · Pokročilý: přítahy s gumou · Pokročilý+: shyb', 'Snaž se cítit práci zad, ne jen rukou.', 'kruhovy_trenink_2.png')}
        ${circuitExercise(3, 'Horizontální tah', 'Tažení něčeho k hrudníku', 'Přítahy jsou jedním z hlavních pohybů pro horní část zad.', 'Začátečník: lehký přítah · Pokročilý: přítah jednoručky · Pokročilý+: těžší varianta', 'Zvyšuj zátěž postupně. Poslední opakování mohou být náročná, ale technika zůstává čistá.', 'kruhovy_trenink_3.png')}
        ${circuitExercise(4, 'Pohyb v kyčlích', 'Předklon v kyčlích pro zvednutí zátěže', 'Posiluje zadní stranu těla – hýždě, hamstringy a spodní záda.', 'Začátečník: glute bridge · Pokročilý: B-stance RDL · Pokročilý+: RDL ve stoje', 'Cítíš tah v bedrech? Sniž zátěž a vrať se k technice pohybu v kyčlích.', 'kruhovy_trenink_4.png')}
        ${circuitExercise(5, 'Klik', 'Tlačení od těla', 'Zapojíš prsní svaly, ramena a triceps. Variantou může být stůl, lavička i podlaha.', 'Začátečník: klik o stůl · Pokročilý: klik o lavičku · Pokročilý+: klik ze země', 'Zpevni celé tělo a drž pánev i trup v jedné linii.', 'kruhovy_trenink_5.png')}
        ${circuitExercise(6, 'Svislý tlak', 'Tlačení něčeho nad hlavu', 'Posiluje ramena a triceps a učí stabilní práci celého těla.', 'Začátečník: tlaky vsedě · Pokročilý: tlaky ve stoje · Pokročilý+: těžší váha', 'Pokud se ozývají záda, sniž zátěž a soustřeď se na kontrolovaný pohyb.', 'kruhovy_trenink_6.png')}
      </div>
      <section class="circuit-build-card">
        <div><span class="knowhow-section-kicker">JAK Z TOHO UDĚLAT TRÉNINK</span><h3>Jednoduchý kruh, který se dá opravdu opakovat.</h3></div>
        <div class="circuit-build-grid">
          <div><b>① Vyber</b><span>1 variantu každého ze 6 pohybů.</span></div>
          <div><b>② Cvič</b><span>2–3 série podle úrovně a času.</span></div>
          <div><b>③ Odpočívej</b><span>Klidně alespoň 1 minutu, aby další série byla kvalitní.</span></div>
          <div><b>④ Postupně přidávej</b><span>Opakování, rozsah nebo zátěž – vždy jen o něco.</span></div>
        </div>
      </section>
      <div class="knowhow-note"><strong>Nemusíš cvičit do vyčerpání.</strong> Smyslem je pravidelnost, přiměřená zátěž a postupné zlepšování.</div>
      <p><button type="button" class="knowhow-topic-link" data-topic="strength">→ Více o silovém tréninku</button></p>
    `
  },
  {
    id: "foods-worth-noticing",
    keywords: ['bílkoviny', 'protein', 'leucin', 'syrovátka', 'whey', 'sardinky', 'omega-3', 'hovězí maso', 'vejce', 'vaječné bílky', 'ústřice', 'zinek', 'batáty', 'antokyany', 'psyllium', 'vláknina', 'sytost', 'trávení', 'svaly', 'zdraví'],
    title: "Potraviny, které stojí za pozornost",
    relatedIds: ['plate', 'strength', 'biological-age', 'walking', 'breakfast'],
    source: "PubMed: bílkoviny a svalová syntéza; omega-3 a svalový metabolismus; psyllium a metabolické zdraví; antokyany a glykemické ukazatele.",
    content: `
      <h2>Potraviny, které stojí za pozornost</h2>
      <p class="knowhow-lead">Nejsou to „zázračné potraviny“. Jsou to běžné potraviny nebo praktické suroviny, které mají zajímavé nutriční vlastnosti. Smyslem je vědět, co přinášejí a kam se mohou hodit do pestrého jídelníčku.</p>
      <div class="protein-food-intro"><strong>Co obsahují?</strong><span>A hlavně: <b>co jejich jednotlivé živiny v těle dělají?</b></span></div>
      <div class="protein-food-grid protein-food-grid-clean">
        <article class="protein-food-card"><img src="assets/protein-foods/01.png" alt="Vaječné bílky v keramické misce" loading="lazy"><h3>Vaječné bílky</h3><p class="protein-food-subtitle">Vysoce kvalitní bílkoviny</p><div class="protein-tags"><span>Bílkoviny</span><span>Leucin</span></div><p><strong>Co umí:</strong> jsou koncentrovaným zdrojem bílkovin s velmi nízkým obsahem tuku. Celé vejce ale přináší i další živiny, takže není důvod žloutek automaticky vyřazovat.</p></article>
        <article class="protein-food-card"><img src="assets/protein-foods/02.png" alt="Syrovátkový protein v odměrce" loading="lazy"><h3>Syrovátkový protein</h3><p class="protein-food-subtitle">Bílkoviny + esenciální aminokyseliny – leucin</p><div class="protein-tags"><span>Bílkoviny</span><span>Leucin</span><span>EAA</span></div><p><strong>Co umí:</strong> je praktický a dobře stravitelný zdroj bílkovin s vysokým obsahem esenciálních aminokyselin. Hodí se zejména tehdy, když je obtížné pokrýt potřebu bílkovin běžným jídlem.</p></article>
        <article class="protein-food-card"><img src="assets/protein-foods/03.png" alt="Fialové batáty na dřevěném prkénku" loading="lazy"><h3>Fialové batáty</h3><p class="protein-food-subtitle">Sacharidy + vláknina + antioxidanty</p><div class="protein-tags"><span>Sacharidy</span><span>Vláknina</span><span>Antokyany</span></div><p><strong>Co umí:</strong> jsou zajímavou barevnou přílohou a zdrojem vlákniny a polyfenolů. Antokyany se zkoumají pro možné příznivé účinky na metabolické zdraví; nejde o samostatnou léčbu ani „spalovač“.</p></article>
        <article class="protein-food-card"><img src="assets/protein-foods/04.png" alt="Psyllium v dřevěné misce" loading="lazy"><h3>Psyllium</h3><p class="protein-food-subtitle">Rozpustná vláknina + gelotvorné látky</p><div class="protein-tags"><span>Rozpustná vláknina</span><span>Gel</span></div><p><strong>Co umí:</strong> po smíchání s vodou vytváří viskózní gel. Může podpořit pocit sytosti, pravidelnost stolice a některé ukazatele metabolismu. Při užívání je důležitý dostatek tekutin.</p></article>
        <article class="protein-food-card"><img src="assets/protein-foods/05.png" alt="Čerstvé ústřice s citronem" loading="lazy"><h3>Ústřice</h3><p class="protein-food-subtitle">Bílkoviny + zinek + vitamin B12</p><div class="protein-tags"><span>Bílkoviny</span><span>Zinek</span><span>Vitamin B12</span></div><p><strong>Co umí:</strong> jsou významným zdrojem zinku a vitaminu B12. Tyto živiny podporují normální fungování imunitního systému a energetický metabolismus.</p></article>
        <article class="protein-food-card"><img src="assets/protein-foods/06.png" alt="Miska čerstvé listové zeleniny" loading="lazy"><h3>Listová zelenina</h3><p class="protein-food-subtitle">Vitaminy + minerály + antioxidanty</p><div class="protein-tags"><span>Vitaminy</span><span>Minerály</span><span>Antioxidanty</span></div><p><strong>Co umí:</strong> je bohatým zdrojem vitaminů, minerálů a antioxidantů. Podporuje pestrost jídelníčku a přirozeně doplňuje běžná jídla.</p></article>
      </div>
      <h3>Jak si z toho něco odnést?</h3>
      <div class="protein-food-summary">
        <article><b>💪 Pro svaly</b><span>Pravidelný příjem kvalitních bílkovin + silový trénink tvoří mnohem důležitější základ než hledání jedné „nejlepší“ potraviny.</span></article>
        <article><b>🧠 Pro metabolické zdraví</b><span>Vláknina, pestrá zelenina, ovoce, luštěniny, celozrnné potraviny a ryby mají v jídelníčku své místo.</span></article>
        <article><b>🌿 Pro trávení</b><span>Vláknina a dostatek tekutin podporují normální fungování trávicího systému. Psyllium je jedna z možností, ne povinnost.</span></article>
      </div>
      <div class="protein-food-note"><strong>Malá brzda proti „superfood“ marketingu:</strong> Jedna potravina zdravý životní styl neudělá. Důležitější je celý jídelníček, pravidelný pohyb, spánek a to, co dokážeš dlouhodobě žít.</div>
      <h3>📚 Co jsme použili jako zdroje</h3>
      <ul class="protein-sources">
        <li><a href="https://pubmed.ncbi.nlm.nih.gov/22301837/" target="_blank" rel="noopener">Bílkoviny a podpora svalové hypertrofie</a></li>
        <li><a href="https://pubmed.ncbi.nlm.nih.gov/38777807/" target="_blank" rel="noopener">Omega‑3 a syntéza svalových bílkovin – systematický přehled</a></li>
        <li><a href="https://pubmed.ncbi.nlm.nih.gov/40871607/" target="_blank" rel="noopener">Syrovátkový protein + cvičení – systematický přehled a meta-analýza</a></li>
        <li><a href="https://pubmed.ncbi.nlm.nih.gov/33233081/" target="_blank" rel="noopener">Antokyany a ukazatele metabolismu glukózy – meta-analýza</a></li>
        <li><a href="https://pubmed.ncbi.nlm.nih.gov/38844885/" target="_blank" rel="noopener">Psyllium a metabolické ukazatele – meta-analýza RCT</a></li>
        <li><a href="https://pubmed.ncbi.nlm.nih.gov/41697448/" target="_blank" rel="noopener">Psyllium – přehled účinků a bezpečnosti</a></li>
        <li><a href="https://ods.od.nih.gov/factsheets/Zinc-HealthProfessional/" target="_blank" rel="noopener">NIH ODS: zinek – funkce, zdroje a bezpečnost</a></li>
      </ul>
    `
  },
  {
    id: "hydration",
    keywords: ['hydratace', 'voda', 'pitný režim', 'tekutiny', 'pití', 'dehydratace', 'minerály', 'teplota', 'sport'],
    title: "Hydratace",
    relatedIds: ['healthy-lifestyle-30', 'walking', 'strength'],
    content: `
      <div class="knowhow-topic-hero-image"><img src="assets/hydratace.png" alt="Hydratace – voda s citronem a mátou" loading="lazy"></div>
      <h2>Hydratace</h2>
      <p class="knowhow-lead">Dostatek tekutin pomáhá udržovat normální fungování těla. Není potřeba pít podle pevného magického čísla – potřeba se mění podle velikosti těla, jídla, počasí, pohybu a dalších okolností.</p>
      <h3>Jednoduchý přístup</h3>
      <ul>
        <li>Měj vodu snadno dostupnou během dne.</li>
        <li>Všímej si žízně a barvy moči jako praktických vodítek.</li>
        <li>Při delším nebo intenzivním pohybu a v horku počítej s vyšší potřebou tekutin.</li>
        <li>Nemusíš do vody přidávat citron nebo mátu – je to jen způsob, jak si pití zpříjemnit.</li>
      </ul>
      <div class="knowhow-note"><strong>Malý krok:</strong> Polož si sklenici nebo láhev vody tam, kde ji během dne opravdu uvidíš.</div>
    `
  },
  {
    id: "relationships",
    keywords: ['vztahy', 'blízkost', 'přátelství', 'rodina', 'partnerství', 'sociální vazby', 'samota', 'podpora', 'komunita', 'dlouhověkost', 'zdravé stárnutí', 'psychická pohoda'],
    title: "Vztahy a blízkost",
    relatedIds: ['gratitude', 'healthy-lifestyle-30', 'biological-age'],
    content: `
      <div class="knowhow-topic-hero-image"><img src="assets/srdce-les.png" alt="Srdce vytvořené z korun stromů v lese" loading="lazy"></div>
      <h2>Vztahy a blízkost</h2>
      <p class="knowhow-lead">Dlouhý a kvalitní život není jen o jídle, pohybu a spánku. Důležitou součástí dobře prožitého života jsou také lidé, se kterými můžeme sdílet radost, starosti, obyčejné chvíle i vzájemnou podporu.</p>
      <h3>Pěstuj vztahy pozitivně</h3>
      <p>Nejde o počet kontaktů ani o představu, že každý vztah musí být dokonalý. Mnohem důležitější je mít prostor pro bezpečné, respektující a smysluplné vztahy.</p>
      <div class="lifestyle-grid relationships-grid">
        <article><b>❤️ Buď v kontaktu</b><span>Ozvi se člověku, na kterém ti záleží. Krátká zpráva nebo telefonát může být úplně dostačující.</span></article>
        <article><b>🤝 Sdílej čas</b><span>Společná procházka, jídlo, sport nebo obyčejné posezení vytvářejí prostor pro blízkost.</span></article>
        <article><b>👂 Poslouchej</b><span>Skutečný zájem o druhého člověka je jedním z nejjednodušších způsobů, jak vztah posilovat.</span></article>
        <article><b>🌿 Pečuj i o sebe</b><span>Zdravý vztah neznamená neustále dávat. Patří do něj hranice, respekt a možnost říct, co potřebuješ.</span></article>
      </div>
      <div class="relationships-followup">
      <h3>Vztahy a dlouhověkost</h3>
      <p>Výzkum dlouhodobě spojuje kvalitu sociálních vazeb s lepším zdravím a životní pohodou. Přesný mechanismus je složitý a neznamená to, že dobré vztahy samy o sobě zaručí delší život. Smyslem je vnímat vztahy jako jednu z oblastí, o kterou stojí za to pečovat společně s pohybem, výživou, spánkem a psychickou pohodou.</p>
      <div class="knowhow-note"><strong>Malý krok:</strong> Dnes se ozvi jednomu člověku, se kterým je ti dobře. Nemusíš nic řešit. Jen buď chvíli v kontaktu.</div>
      </div>
    `
  },

  {
    id: "healthy-lifestyle-30",
    keywords: ['zdravý životní styl', 'životní styl po 30', 'zdraví', 'energie', 'spánek', 'pohyb', 'výživa', 'síla', 'chůze', 'stres', 'voda', 'denní světlo', 'návyky', 'dlouhověkost', 'zdravé stárnutí'],
    title: "Zdravý životní styl po 30",
    relatedIds: ['plate', 'foods-worth-noticing', 'strength', 'walking', 'nighttime-cortisol', 'biological-age', 'two-minutes'],
    source: "WHO: zdravá strava, fyzická aktivita, zdravé stárnutí; James Clear: Atomové návyky.",
    content: `
      <h2>Zdravý životní styl po 30</h2>
      <p class="knowhow-lead">Po třicítce není potřeba začínat „od nuly“. Mnohem užitečnější je postupně skládat běžný život z věcí, které podporují zdraví, energii, sílu, regeneraci a psychickou pohodu.</p>
      <div class="lifestyle-intro"><strong>Nejde o dokonalost.</strong><span>Jde o malé volby, které se dají opakovat i v obyčejném týdnu.</span></div>
      <div class="lifestyle-grid">
        <article><b>🥗 Jídlo</b><span>Stav běžná jídla na pestré kombinaci zeleniny, bílkovin, sacharidů a kvalitních tuků.</span><button type="button" class="knowhow-topic-link" data-topic="plate">Jak si sestavovat talíř →</button></article>
        <article><b>💪 Síla</b><span>Pečuj o svaly a funkční sílu. Nemusíš trénovat každý den.</span><button type="button" class="knowhow-topic-link" data-topic="strength">Silový trénink →</button></article>
        <article><b>🚶 Pohyb</b><span>Choď, jezdi na kole, sportuj nebo se hýbej způsobem, který tě baví.</span><button type="button" class="knowhow-topic-link" data-topic="walking">Chůze →</button></article>
        <article><b>😴 Regenerace</b><span>Spánek a odpočinek nejsou ztracený čas. Jsou součástí péče o tělo.</span><button type="button" class="knowhow-topic-link" data-topic="nighttime-cortisol">Večerní režim →</button></article>
        <article><b>☀️ Denní rytmus</b><span>Ranní a denní světlo, pravidelný režim a pobyt venku pomáhají ukotvit den.</span><button type="button" class="knowhow-topic-link" data-topic="biological-age">Zdravé stárnutí →</button></article>
        <article><b>🧠 Psychická pohoda</b><span>Stres, vztahy, vděčnost a čas na sebe patří ke zdraví stejně jako pohyb.</span><button type="button" class="knowhow-topic-link" data-topic="gratitude">Vděčnost →</button></article>
      </div>
      <h3>Nemusíš změnit všechno najednou</h3>
      <p>Vyber jednu oblast, která ti právě teď dává největší smysl. Zmenši první krok tak, aby byl snadno proveditelný, a nech ho postupně zapadnout do běžného dne.</p>
      <p><button type="button" class="knowhow-topic-link" data-topic="two-minutes">→ Pravidlo dvou minut</button> &nbsp; <button type="button" class="knowhow-topic-link" data-topic="habit-stacking">→ Spojování návyků</button></p>
      <div class="lifestyle-final"><strong>Pečuj o tělo, mysl i svůj život.</strong><span>Ne proto, abys byla „lepší verzí“ sebe sama. Proto, aby se ti v tvém vlastním životě dobře žilo.</span></div>
    `
  },

  {
    id: "cortisol",
    keywords: ['kortizol', 'kortisol', 'stres', 'stresové břicho', 'nafouknutí', 'únava', 'mozková mlha', 'spánek', 'chuť na sex', 'trávení', 'ranní světlo', 'hořčík', 'ashwagandha', 'rhodiola'],
    title: "KORTISOL",
    shareImage: "assets/nighttime-cortisol-cz.png",
    relatedIds: ['nighttime-cortisol', 'walking', 'gratitude', 'healthy-lifestyle-30'],
    content: `
      <div class="knowhow-topic-hero-image"><img src="assets/nighttime-cortisol-cz.png" alt="Kortizol, stres a regenerace" loading="lazy"></div>
      <h2>Kortizol, stres a rovnováha</h2>
      <p class="knowhow-lead">Kortizol je přirozený hormon, který pomáhá regulovat denní rytmus, energii a reakci na zátěž. Problémem není každý vzestup kortizolu, ale dlouhodobý stres a nedostatek regenerace, které mohou ovlivnit spánek, náladu, trávení i celkové zdraví.</p>
      <h3>Znaky, kterými ti tělo může naznačovat, že je pod přílišnou zátěží</h3>
      <ul class="cortisol-signs"><li>Tik v oku</li><li>Mozková mlha</li><li>Potíže se spánkem</li><li>Menší chuť na sex</li><li>Potíže se zažíváním</li><li>Nevysvětlené bolesti</li><li>Časté nachlazení nebo jiné nemoci</li><li>Přibírání na váze, někdy výrazněji v oblasti břicha</li></ul>
      <div class="knowhow-note"><strong>Důležité:</strong> Tyto příznaky samy o sobě nepotvrzují zvýšený kortizol. Mohou mít řadu jiných příčin. Pokud přetrvávají, zhoršují se nebo tě omezují, prober je s lékařem.</div>
      <h3>1. Změň styl cvičení – někdy je méně více</h3>
      <ul><li><strong>Nezvyšuj intenzitu za každou cenu.</strong> Pokud jsi vyčerpaná a špatně spíš, další náročný trénink nemusí být tím, co právě potřebuješ. HIIT nemusíš automaticky vyřadit; přizpůsob intenzitu své kondici a regeneraci.</li><li><strong>Zařaď chůzi.</strong> Zkus každodenní 20minutovou svižnou procházku nebo klidnou jógu. Pohyb může podpořit náladu a pomoci zvládat stres.</li></ul>
      <h3>2. Uprav stravovací návyky</h3>
      <ul><li><strong>Vyhýbej se hladovění a dlouhodobě nedostatečnému příjmu energie.</strong> Jez dostatečně a pestře; podle svých potřeb zařazuj bílkoviny, sacharidy, vlákninu i tuky. Drastické omezování jídla není dobrým základem péče o zdraví.</li><li><strong>Kávu si načasuj podle toho, jak se cítíš.</strong> Pokud ti káva nalačno způsobuje nevolnost, nervozitu nebo třes, dej si ji až po jídle. Reakce na kofein je individuální; omez ho zejména tehdy, když narušuje spánek.</li><li><strong>Jez pestře.</strong> Zelenina, ovoce, luštěniny, celozrnné potraviny, ořechy a ryby mohou být součástí vyváženého jídelníčku. Žádná jednotlivá potravina ale sama o sobě kortizol „nevypne“.</li></ul>
      <h3>3. Podpoř spánek a biorytmus</h3>
      <ul><li><strong>Ranní světlo:</strong> Pokud můžeš, vyjdi po probuzení na denní světlo. Pomáhá ukotvit cirkadiánní rytmus; nedívej se přímo do slunce.</li><li><strong>Zklidnění před spaním:</strong> Zkus poslední hodinu před ulehnutím omezit práci a obsah, který tě rozrušuje. Telefon nemusíš odložit za každou cenu – důležité je, aby ti večerní návyky nebraly spánek.</li><li><strong>Chraň čas na regeneraci:</strong> Pravidelný čas usínání, klidnější večer a realistický denní plán mohou pomoci víc než snaha dělat všechno dokonale.</li></ul>
      <h3>4. Doplňky a byliny s rozvahou</h3>
      <p>Hořčík může být užitečný při nedostatečném příjmu nebo v určitých situacích, není ale univerzálním lékem na stres. U ashwagandhy a rhodioly jsou důkazy i bezpečnostní omezení různé; mohou mít interakce a nejsou vhodné pro každého. Při užívání léků, v těhotenství nebo při zdravotních potížích se poraď s lékařem či lékárníkem.</p>
      <div class="knowhow-note"><strong>Začni jednoduše:</strong> pravidelné jídlo, přiměřený pohyb, denní světlo, spánek a chvíle bez tlaku. Cílem není „odplavit kortizol“, ale vytvořit podmínky pro lepší regeneraci.</div>
    `
  },
  {
    id: "power-of-food",
    keywords: ['the power of food', 'síla jídla', 'potravinové citlivosti', 'zánět', 'zdravé střevo', 'propustné střevo', 'lepek', 'cukr', 'umělá sladidla', 'trávicí enzymy', 'eliminační dieta', 'olivový olej'],
    title: "Síla jídla",
    relatedIds: ['plate', 'breakfast', 'foods-worth-noticing', 'hydration'],
    content: `
      <blockquote class="food-power-quote">„Jídlo, které jíš, může být buď nejbezpečnější a nejúčinnější formou léku, nebo nejpomalejší formou jedu.“</blockquote>
      <h2>Jak přistupovat k potravinovým citlivostem</h2>
      <p class="knowhow-lead">Trávicí potíže mohou mít mnoho příčin. Místo plošného vyřazování potravin je vhodné hledat souvislosti, postupovat systematicky a při přetrvávajících potížích se poradit s odborníkem.</p>
      <h3>Co může pomoci při řešení potravinových potíží</h3>
      <ul><li><strong>Všímej si potravin, po kterých se opakovaně necítíš dobře.</strong> Zapisuj si jídlo a příznaky, ale nedělej závěry z jediného dne.</li><li><strong>Podpoř trávení běžnými návyky.</strong> Jez v klidu, dostatečně pij a dbej na pestrý příjem vlákniny podle své tolerance.</li><li><strong>Eliminační dietu plánuj opatrně.</strong> Dlouhodobé vyřazování celých skupin potravin může vést k nedostatku živin. Pokud ji zkoušíš, ideálně s nutričním terapeutem či lékařem.</li><li><strong>Trávicí enzymy nejsou univerzálním řešením.</strong> Smysl mají u některých konkrétních potíží, ne automaticky u každého nadýmání.</li><li><strong>Pečuj o spánek a zvládání stresu.</strong> Nervová soustava a trávení spolu komunikují, i když stres není jedinou příčinou zažívacích potíží.</li><li><strong>Dbej na dostatek živin.</strong> Pestrost jídelníčku je obvykle lepší základ než mnoho doplňků najednou.</li></ul>
      <h3>Potraviny a složky, jejichž nadbytek může být problematický</h3>
      <ul><li>Vysoce průmyslově zpracované potraviny s vysokým obsahem soli, cukru nebo nasycených tuků</li><li>Rafinované sacharidy a přidaný cukr v nadměrném množství</li><li>Trans tuky, pokud se ve výrobku vyskytují</li><li>Průmyslově zpracované masné výrobky</li><li>Nadměrný příjem alkoholu</li><li>Potraviny, na které má konkrétní člověk alergii nebo prokázanou nesnášenlivost</li></ul>
      <p>Lepek, mléčné výrobky, ryby, semenné oleje ani potravinářská aditiva nejsou automaticky škodlivé pro každého. Důležitý je kontext, množství, celkový jídelníček a individuální zdravotní stav. Při podezření na celiakii nevyřazuj lepek před vyšetřením bez konzultace s lékařem.</p>
      <h3>Zdravé střevo vs. zvýšená střevní propustnost</h3>
      <p>Střevní bariéra běžně pomáhá vstřebávat živiny a brání průniku nežádoucích látek. Zvýšená střevní propustnost se zkoumá u různých onemocnění, ale populární pojem „leaky gut“ bývá často používán příliš volně. Samotné nadýmání nebo únava tuto diagnózu nepotvrzují.</p>
      <div class="gut-barrier-comparison" role="img" aria-label="Schematické srovnání: zdravá střevní bariéra drží částice v lumen střeva, při zvýšené propustnosti mohou některé částice procházet bariérou.">
        <div class="gut-barrier-panel healthy"><h4>Zdravá střevní bariéra</h4><div class="gut-lumen"><span class="gut-particle p1"></span><span class="gut-particle p2"></span><span class="gut-particle p3"></span><div class="gut-wall"><i></i><i></i><i></i><i></i><i></i></div><div class="gut-underlayer"></div></div><p>Bariéra je selektivní a pomáhá regulovat, co prochází do těla.</p></div>
        <div class="gut-barrier-panel leaky"><h4>Zvýšená propustnost</h4><div class="gut-lumen"><span class="gut-particle p1"></span><span class="gut-particle p2"></span><span class="gut-particle p3"></span><span class="gut-particle p4"></span><div class="gut-wall"><i></i><i></i><i></i><i></i><i></i></div><div class="gut-underlayer"><b class="gut-crossing c1"></b><b class="gut-crossing c2"></b></div></div><p>V určitých zdravotních stavech může být průchod bariérou zvýšený.</p></div>
      </div>
      <p class="gut-animation-caption">Zjednodušené schéma pro vysvětlení principu, nikoli diagnostický test.</p>
      <div class="knowhow-note"><strong>Hlavní princip:</strong> stav na pestrém, dostatečném jídelníčku a konkrétní potíže řeš cíleně. Čím přísnější omezení, tím důležitější je mít pro ně dobrý důvod.</div>
    `
  },
  {
    id: "general-facts",
    keywords: ['všeobecná fakta', 'ranní světlo', 'hořčík', 'cukr', 'spánek', 'chůze po jídle', 'bílkoviny', 'olivový olej', 'polyfenoly', 'zdravé stárnutí'],
    title: "Všeobecná fakta",
    relatedIds: ['walking', 'breakfast', 'plate', 'nighttime-cortisol', 'hydration'],
    content: `
      <h2>Malé návyky, které podporují zdraví</h2>
      <div class="general-facts-list">
        <article><h3>☀️ Dopřej si ranní světlo</h3><p>Ranní denní světlo pomáhá ukotvit cirkadiánní rytmus a může podpořit bdělost během dne.</p></article>
        <article><h3>🥬 Dbej na dostatek hořčíku</h3><p>Upřednostni potravinové zdroje, například luštěniny, ořechy, semínka a celozrnné obiloviny. Doplňky mají smysl zejména tehdy, když je k nim důvod.</p></article>
        <article><h3>🍬 Omez nadbytek přidaného cukru</h3><p>Nemusíš se bát každého sladkého jídla. Dlouhodobě se vyplatí omezovat hlavně častý nadbytek přidaného cukru.</p></article>
        <article><h3>😴 Dopřej si 7–9 hodin spánku</h3><p>Pro mnoho dospělých je to užitečné orientační rozmezí; potřeba se liší. Důležitá je také kvalita a pravidelnost spánku.</p></article>
        <article><h3>🚶 Projdi se po jídle</h3><p>I krátká procházka po jídle může podpořit regulaci krevního cukru a přirozeně přidat pohyb do dne.</p></article>
        <article><h3>💪 Jez dostatek bílkovin</h3><p>Bílkoviny jsou důležité pro svaly a řadu tělesných funkcí. Potřeba závisí na věku, aktivitě a zdravotním stavu.</p></article>
        <article><h3>🫒 Vybírej kvalitní olivový olej</h3><p>Extra panenský olivový olej obsahuje nenasycené tuky a polyfenoly. Používej ho jako součást pestré stravy, ne jako zázračný lék.</p></article>
      </div>
      <div class="knowhow-note"><strong>Nemusíš změnit všechno přes noc.</strong> Začni jedním návykem, který dokážeš opakovat, a postupně na něm stav.</div>
    `
  },
  {
    id: "routine-90-10",
    keywords: ['pravidlo 90/10', '90 10', 'rutina', 'flexibilita', 'disciplína', 'nouzové dny', 'návyky', 'vyhoření', 'udržitelnost'],
    title: "Pravidlo 90/10 pro rutiny",
    relatedIds: ['daily-systems', 'habit-stacking', 'two-minutes', 'never-miss-twice'],
    content: `
      <h2>Rutiny mají sloužit životu, ne ho řídit</h2>
      <p class="knowhow-lead">Dobrá rutina je soubor činností, které ti pomáhají pravidelně dělat to, na čem ti záleží. Může podporovat zdraví, práci i vztahy – ale neměla by se stát zdrojem neustálého stresu.</p>
      <p>Příliš rigidní plán může začít překážet: nečekaná práce, dlouhý rozhovor, náročný večer nebo zpoždění pak vyvolají pocit, že je celý den ztracený. Problém není rutina samotná, ale představa, že ji musíš pokaždé dodržet dokonale.</p>
      <h3>Pravidlo 90/10</h3>
      <div class="routine-9010-grid"><article><h3>90 % · Disciplína</h3><p>Většinu času se drž běžné struktury a návyků, které ti prospívají.</p></article><article><h3>10 % · Flexibilita</h3><p>Nech prostor spontánním událostem, odpočinku a tomu, že život někdy změní plán. Procenta jsou metafora, ne povinnost něco přesně počítat.</p></article></div>
      <h3>Jak může vypadat 90 %</h3><ul><li>Strukturované pracovní bloky a chvíle soustředění</li><li>Čas pro rodinu bez telefonu</li><li>Společná jídla nebo procházky</li><li>Silový trénink, běh či jiný pohyb přizpůsobený kondici</li><li>Večerní rituál, který pomáhá zklidnit den</li></ul>
      <h3>A jak vypadá 10 %</h3><ul><li>Přijmeš spontánní pozvání nebo zajímavý rozhovor</li><li>Přizpůsobíš plán drobným komplikacím</li><li>Zvolíš minimální smysluplnou verzi návyku</li><li>Někdy si dopřeješ den volna bez pocitu viny a další den se vrátíš</li></ul>
      <blockquote class="routine-quote">„Nejlepší rutina je ta, kterou můžeš porušit.“</blockquote>
      <p>Flexibilita může pomoci udržitelnosti. Když vynecháš, neznamená to, že jsi selhala. Důležitá je schopnost vrátit se k tomu, co ti dává smysl.</p>
      <h3>Tři otázky, které si můžeš položit</h3><ol><li>Nechráním svou rutinu na úkor života, který právě probíhá?</li><li>Když zítra vynechám, jak rychle se dokážu vrátit zpět?</li><li>Jaká je dostatečně dobrá verze zítřka?</li></ol>
      <div class="knowhow-note"><strong>Nemusíš mít dokonalý den, aby tvoje rutina fungovala.</strong> Když život něco naruší, udělej minimum, které dává smysl, přijmi situaci a vrať se k rutině, až to půjde. Rutina má podporovat tvůj život. Neměla by se stát jeho pánem.</div>
    `
  },
  {
    id: "stubborn-belly-fat",
    keywords: ['odolný břišní tuk', 'břišní tuk', 'tuk na břiše', 'stres', 'spánek', 'kortizol', 'pohyb', 'strava', 'tělesná kompozice'],
    title: "Odolný břišní tuk",
    relatedIds: ['cortisol', 'walking', 'plate', 'strength', 'nighttime-cortisol'],
    content: `
      <div class="knowhow-topic-hero-image"><img src="assets/fat-loss-comic-cz.png" alt="Ilustrace k tématu odolného břišního tuku" loading="lazy"></div>
      <h2>Odolný břišní tuk: co je dobré vědět</h2>
      <p class="knowhow-lead">Tuk v oblasti břicha ovlivňuje genetika, věk, hormony, spánek, stres, pohyb, stravování i celkový zdravotní stav. Neexistuje jeden cvik ani jedna potravina, která by cíleně spalovala tuk právě na břiše.</p>
      <h3>Co má dlouhodobě největší smysl</h3>
      <ul><li>Jez dostatečně a pravidelně; vyhýbej se hladovění a drastickým dietám.</li><li>Zařazuj chůzi a další pohyb, který můžeš dlouhodobě udržet.</li><li>Buduj a udržuj svaly pomocí přiměřeného silového tréninku.</li><li>Chraň spánek a dopřej si regeneraci.</li><li>Všímej si stresu a hledej způsoby, jak ho zvládat.</li></ul>
      <p>Samotné přibírání v oblasti břicha nepotvrzuje zvýšený kortizol. Pokud se hmotnost nebo obvod pasu mění nevysvětlitelně či rychle, prober to s lékařem. Cílem je zdraví a udržitelný přístup, ne trestání těla.</p>
      <p><button type="button" class="knowhow-topic-link" data-topic="cortisol">Související: KORTISOL →</button> &nbsp; <button type="button" class="knowhow-topic-link" data-topic="walking">Chůze →</button></p>
    `
  },

  {
    id: "emotions",
    keywords: ['emoce', 'duševní pohoda', 'vnitřní klid', 'laskavost k sobě', 'sebehodnota', 'vztahy', 'důvěra', 'náročné období', 'stres', 'spiritualita'],
    title: "Emoce",
    relatedIds: ['gratitude', 'relationships', 'cortisol', 'routine-90-10'],
    content: `
      <div class="knowhow-topic-hero-image"><img src="assets/emotions-autumn-tea.png" alt="Hrnek čaje na tmavém dřevěném stole u otevřeného okna s podzimní přírodou, horami a jezerem" loading="lazy"></div>
      <h2>Emoce</h2>
      <blockquote class="emotions-opening-quote">„Pláč je jen způsob, jakým tvé oči promlouvají, když tvá ústa nedokážou vysvětlit, jak moc je tvé srdce zlomené.“</blockquote>
      <p class="knowhow-lead">Ne každé období života je snadné. Někdy jsme unavené, citlivější, zahlcené emocemi nebo máme pocit, že nezvládáme tolik, kolik bychom chtěly. To ale neznamená, že jsme slabé nebo že děláme něco špatně.</p>
      <p>Dovol si zpomalit. Nemusíš mít vždy všechno vyřešené, všem rozumět ani být každý den tou nejlepší verzí sebe sama. <strong>Nezaměňuj péči o sebe za slabost a disciplínu za trestání sebe sama.</strong></p>
      <p>Když přichází těžké období, dopřej si klid, dostatek odpočinku a prostor pro vlastní emoce. Nemusíš se nutit do pozitivního myšlení ani předstírat, že je všechno v pořádku. Někdy je největším krokem vpřed právě to, že na sebe přestaneš tlačit.</p>
      <p><strong>Buď k sobě stejně laskavá, jako bys byla k člověku, kterého miluješ.</strong> Nemusíš si zasloužit odpočinek výkonem. Nemusíš se trestat za to, že něco nevyšlo. A nemusíš mít všechno pod kontrolou, abys mohla být v pořádku.</p>
      <div class="emotions-quote-list">
        <section><span aria-hidden="true">➜</span><div><h4>Ne každý je tu proto, aby se posouval vpřed</h4><p>Právě jsem slyšela někoho říct: „Bohužel někteří lidé sem nebyli přivedeni proto, aby se vyvíjeli. Jsou tu proto, aby ti připomněli, jak to vypadá, když se nevyvíjíš ty.“ A to dává velký smysl.</p></div></section>
        <section><span aria-hidden="true">➜</span><div><h4>Na věku nezáleží tolik jako na chování</h4><p>Můžeš potkat kluka, kterému je 35, a muže, kterému je 23. <strong>Na věku nezáleží, záleží na chování.</strong></p></div></section>
        <section><span aria-hidden="true">➜</span><div><h4>Letos se nechci stát někým jiným</h4><p>Letos se nesnažím stát novým člověkem. Chci se jen cítit šťastnější, klidnější a jistější v tom, kým už jsem. <strong>Méně tlaku, méně pochybností o sobě a více důvěry v sebe samu a svou cestu.</strong> To je to, co si letos vybírám.</p></div></section>
        <section><span aria-hidden="true">➜</span><div><h4>Všímej si i toho, co lidé neříkají</h4><p>Lidé, kteří mají vysokou duchovní inteligenci, nečtou jen slova. Vnímají nálady, energii, atmosféru a řeč těla. Jejich smysly jsou mimořádně citlivé. Možná toho moc neřeknou, ale všimnou si všeho.</p></div></section>
        <section><span aria-hidden="true">➜</span><div><h4>Vyber si člověka, se kterým chceš sdílet i maličkosti</h4><p>Pokud si s někým nerada povídáš, neber si ho. Potřebuješ mít intenzivní, téměř dětskou touhu vyprávět mu o podivném psovi na autobusové zastávce, o tom, jak jsi málem zakopla na rohu ulice, nebo se jen smát tomu, jak příšerná byla snídaně. Protože život se nakonec může stát nesmírně nudným a <strong>správný člověk způsobí, že i obyčejné okamžiky stojí za to sdílet.</strong></p></div></section>
        <section><span aria-hidden="true">➜</span><div><h4>Důvěřuj člověku, který nad vším příliš přemýšlí</h4><p>Teď už chápu, proč ten starý muž řekl: „Důvěřuj člověku, který všechno příliš rozebírá a říká, že tě miluje. <strong>Promyslel všechny důvody, proč by tě milovat neměl, a přesto tě miluje.</strong>“ Tak tohle je hluboké.</p></div></section>
        <section><span aria-hidden="true">➜</span><div><h4>Nezapomeň, za co jsi kdysi prosila</h4><p>Pokud ses za něco kdysi modlila se slzami v očích, neoslavuj to v nočních klubech a barech. Vrať slávu tomu, komu náleží.</p></div></section>
        <section><span aria-hidden="true">➜</span><div><h4>Až přijde to pravé, možná pochopíš, proč jsi musela něco ztratit</h4><p>„Až od Boha přijde náhrada za to, co jsi ztratila, zapomeneš na to, o co jsi přišla.“</p></div></section>
      </div>
      <p class="knowhow-source-note">Inspirace uvedená v předloze: <em>Stop Letting Everything Affect You</em> — Daniel Chidiac.</p>
      <div class="knowhow-note"><strong>Malý krok:</strong> Zastav se na chvíli, uvař si čaj a zeptej se sama sebe: „Co teď potřebuji — ne co bych podle sebe měla zvládnout?“</div>
    `
  }


];

export function searchKnowHowTopics(query = "") {
  const normalize = value => String(value || "").toLocaleLowerCase("cs-CZ").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const q = normalize(query.trim());
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  return topics.map(topic => {
    const plainContent = topic.content.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ");
    const haystack = normalize([topic.title, ...(topic.keywords || []), plainContent].join(" "));
    const score = terms.reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0), 0);
    return { id: topic.id, title: topic.title, score };
  }).filter(topic => topic.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, "cs-CZ"))
    .slice(0, 8);
}

function circuitExercise(number, title, subtitle, description, levels, tip, image) {
  return `<article class="circuit-exercise-card">
    <div class="circuit-exercise-image knowhow-shareable-visual"><img src="assets/circuit/${image}" alt="${title}" loading="lazy"><button type="button" class="knowhow-share-image" data-share-image="assets/circuit/${image}" data-share-title="${title}" aria-label="Sdílet obrázek ${title}" title="Sdílet">↗</button></div>
    <div class="circuit-exercise-copy"><div class="circuit-number">${number}</div><div><h3>${title}</h3><strong>${subtitle}</strong><p>${description}</p><p class="circuit-levels"><b>Úrovně:</b><br>${levels}</p></div></div>
    <aside class="circuit-tip"><span>💡</span><div><strong>Tip!</strong><p>${tip}</p></div></aside>
  </article>`;
}

export function renderKnowHow(container, rerender, topicId = null) {
  if (topicId) {
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return renderKnowHow(container, rerender);

    container.innerHTML = `
      <section class="card knowhow-detail">
        <div class="knowhow-detail-header">
          <a class="knowhow-detail-brand" href="#home" aria-label="Habit APP – úvodní stránka" title="Habit APP">
            <img src="assets/habit-app-logo.png" alt="Habit App" />
          </a>
          <span class="knowhow-detail-section">» Know HOW «</span>
          <button id="knowhow-back" class="knowhow-back" type="button" aria-label="Zpět do knihovny Know HOW" title="Zpět do knihovny">←</button>
          ${topic.shareImage ? `<button type="button" class="knowhow-share-button" data-share-image="${topic.shareImage}" data-share-title="${topic.title}" aria-label="Sdílet ${topic.title}" title="Sdílet">↗</button>` : ""}
        </div>
        <article class="knowhow-article">
          ${topic.content}
        </article>
        <div class="knowhow-keywords">
          <strong>Klíčová slova:</strong>
          <div class="knowhow-keyword-list">${(topic.keywords || []).slice(0, 14).map(k => `<button type="button" class="knowhow-keyword" data-keyword="${k.replace(/"/g, '&quot;')}">${k}</button>`).join('')}</div>
        </div>
        <div class="knowhow-related">
          <h3>🔗 Související témata</h3>
          <div class="knowhow-related-grid"></div>
        </div>
        <div class="knowhow-source">${topic.source || 'Zdroj: James Clear, <em>Atomové návyky</em> a související materiály'}</div>
      </section>
    `;

    container.querySelector("#knowhow-back").onclick = () => { setScreen("knowhow"); rerender(); };

    container.querySelectorAll(".knowhow-topic-link").forEach(link => {
      link.onclick = () => { setScreen("knowhow", link.dataset.topic); rerender(); };
    });

    container.querySelectorAll("[data-share-image]").forEach(button => {
      button.onclick = async event => {
        event.stopPropagation();
        await shareImage(button.dataset.shareImage, button.dataset.shareTitle || topic.title, `Know HOW · ${button.dataset.shareTitle || topic.title}`);
      };
    });

    container.querySelectorAll(".knowhow-keyword").forEach(button => {
      button.onclick = () => {
        setScreen("knowhow"); rerender();
        requestAnimationFrame(() => {
          const input = container.querySelector("#knowhow-search-input");
          const overlay = container.querySelector("#knowhow-search");
          if (input && overlay) {
            overlay.classList.remove("hidden");
            overlay.setAttribute("aria-hidden", "false");
            input.value = button.dataset.keyword;
            input.dispatchEvent(new Event("input"));
            input.focus();
          }
        });
      };
    });

    const relatedGrid = container.querySelector(".knowhow-related-grid");
    const relatedIds = topic.relatedIds || [];
    const relatedTopics = relatedIds.map(id => topics.find(t => t.id === id)).filter(Boolean);
    relatedGrid.innerHTML = relatedTopics.map(item => `<button type="button" class="knowhow-related-card" data-topic="${item.id}"><strong>${item.title}</strong><span>${(item.keywords || []).slice(0, 4).join(" · ")}</span></button>`).join("");
    relatedGrid.querySelectorAll("button").forEach(button => {
      button.onclick = () => { setScreen("knowhow", button.dataset.topic); rerender(); };
    });
    requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })));
    return;
  }

  const categoryMeta = {
    emotions: { label: "Emoce a duševní pohoda", icon: "♡", short: "Emoce" },
    health: { label: "Tělo a zdraví", icon: "✚", short: "Zdraví" },
    food: { label: "Výživa", icon: "🥗", short: "Výživa" },
    movement: { label: "Pohyb a kondice", icon: "🏃", short: "Pohyb" },
    habits: { label: "Návyky a osobní rozvoj", icon: "✓", short: "Návyky" },
    relationships: { label: "Vztahy a životní rovnováha", icon: "♡", short: "Vztahy" }
  };

  const topicCategory = {
    laws: "habits", "bad-habits": "habits", "rewards-punishments": "habits", "habit-contract": "habits",
    "two-minutes": "habits", "daily-systems": "habits", "habit-stacking": "habits", "habit-tracker": "habits",
    "never-miss-twice": "habits", "environment-design": "habits", "identity-based-habits": "habits",
    "temptation-bundling": "habits", "goldilocks-rule": "habits", consistency: "habits", identity: "habits", "valley-of-disappointment": "habits",
    breakfast: "food", plate: "food", "foods-worth-noticing": "food", "power-of-food": "food", hydration: "food",
    "general-facts": "health", "nighttime-cortisol": "health", cortisol: "health", "biological-age": "health", "healthy-lifestyle-30": "health", "stubborn-belly-fat": "health",
    walking: "movement", strength: "movement", circuit: "movement",
    gratitude: "emotions", "stoicism-atomic-habits": "emotions", choice: "emotions", emotions: "emotions",
    relationships: "relationships", "routine-90-10": "habits"
  };

  const featured = [
    { id: "plate", kicker: "Jídlo", image: "assets/plate-formula-cz.png", text: "Jednoduše, vyváženě a dlouhodobě.", noPerson: false },
    { id: "walking", kicker: "Pohyb", image: "assets/nature-quiet.svg", text: "Chůze jako přirozená součást dne.", noPerson: false },
    { id: "nighttime-cortisol", kicker: "Spánek", image: "assets/night-scene.svg", text: "Klidnější večer a prostor pro regeneraci.", noPerson: false },
    { id: "two-minutes", kicker: "Návyky", image: "assets/two-minute-clock.svg", text: "Začni nejmenší možnou verzí.", noPerson: false }
  ];

  const allTopics = topics.map(topic => ({ ...topic, category: topicCategory[topic.id] || "habits" }));
  const sortAZ = list => [...list].sort((a, b) => a.title.localeCompare(b.title, "cs-CZ"));

  container.innerHTML = `
    <section class="knowhow-page">
      <div class="knowhow-heading">
        <div class="knowhow-heading-top">
          <div class="knowhow-heading-identity">
            <div>
            <span class="knowhow-eyebrow">💡 Praktická knihovna</span>
            <h2>Naše Know HOW</h2>
            <p class="knowhow-intro">Praktické rady a tipy, které mohou pomoct pečovat o tělo, mysl a každodenní život. Vyber si téma, které tě dnes oslovuje – nejde o dokonalost, ale o možnosti, které se dají postupně začlenit do života.</p>
            </div>
          </div>
          <button id="knowhow-search-open" class="knowhow-search-open" type="button">⌕ <span>Hledat téma…</span></button>
        </div>
      </div>

      <div class="knowhow-category-strip" role="tablist" aria-label="Kategorie Know HOW">
        <button type="button" class="knowhow-category-chip active" data-category="all"><span>▦</span> Všechna témata</button>
        ${Object.entries(categoryMeta).map(([id, meta]) => `<button type="button" class="knowhow-category-chip" data-category="${id}"><span>${meta.icon}</span> ${meta.short}</button>`).join("")}
      </div>

      <section class="knowhow-featured" id="knowhow-featured">
        <div class="knowhow-section-title">
          <div><span class="knowhow-section-kicker">Doporučené</span><h3>Témata, která stojí za pozornost</h3></div>
          <span class="knowhow-section-note">Vybráno pro snadný začátek</span>
        </div>
        <div class="knowhow-featured-grid">
          ${featured.map(item => {
            const topic = topics.find(t => t.id === item.id);
            return `<button type="button" class="knowhow-featured-card" data-topic="${item.id}">
              ${item.noPerson ? `<div class="knowhow-featured-visual no-person"><img src="${item.image}" alt="" loading="lazy"><span>${item.visual}</span></div>` : `<img src="${item.image}" alt="" loading="lazy">`}
              <div class="knowhow-featured-body"><span>${item.kicker}</span><strong>${topic?.title || ""}</strong><p>${item.text}</p><i>♡</i></div>
            </button>`;
          }).join("")}
        </div>
      </section>

      <section class="knowhow-library">
        <div class="knowhow-section-title knowhow-library-header">
          <div><span class="knowhow-section-kicker">Knihovna</span><h3>Všechna témata</h3></div>
          <div class="knowhow-view-toggle" role="group" aria-label="Řazení témat">
            <button type="button" class="active" data-view="categories">☷ Podle kategorií</button>
            <button type="button" data-view="az">A–Ž Abecedně</button>
          </div>
        </div>
        <div id="knowhow-library-content"></div>
      </section>

      <div class="knowhow-bottom-note">
        <strong>🌿 Nemusíš vědět všechno.</strong>
        <span>Vyber si jednu věc, která ti právě teď dává smysl. Know HOW je tu jako knihovna možností, ne jako seznam povinností.</span>
      </div>
    </section>

    <div id="knowhow-search" class="knowhow-search hidden" aria-hidden="true">
      <div class="knowhow-search-panel">
        <div class="knowhow-search-header">
          <button id="knowhow-search-close" class="knowhow-back" type="button" aria-label="Zpět">←</button>
          <h2>Hledám něco konkrétního</h2>
        </div>
        <div class="knowhow-search-box"><input id="knowhow-search-input" type="search" placeholder="Např. jak začít s novým návykem…" autocomplete="off"></div>
        <div class="knowhow-search-hints" id="knowhow-search-hints">Zkus třeba: spánek · biologický věk · pohyb · svaly · výživa · stres · začátek · identita</div>
        <div id="knowhow-search-results" class="knowhow-search-results"></div>
      </div>
    </div>
  `;

  const libraryContent = container.querySelector("#knowhow-library-content");
  const categoryButtons = [...container.querySelectorAll(".knowhow-category-chip")];
  const viewButtons = [...container.querySelectorAll(".knowhow-view-toggle button")];
  let selectedCategory = "all";
  let currentView = "categories";

  function topicButton(topic) {
    const meta = categoryMeta[topic.category];
    return `<button type="button" class="knowhow-library-item" data-topic="${topic.id}">
      <span class="knowhow-library-icon">${meta.icon}</span>
      <span class="knowhow-library-copy"><strong>${topic.title}</strong><small>${meta.label}</small></span>
      <span class="knowhow-library-arrow">›</span>
    </button>`;
  }

  function renderLibrary() {
    let visible = selectedCategory === "all" ? allTopics : allTopics.filter(t => t.category === selectedCategory);
    if (currentView === "az") {
      libraryContent.innerHTML = `<div class="knowhow-library-list">${sortAZ(visible).map(topicButton).join("")}</div>`;
    } else {
      const categories = selectedCategory === "all" ? Object.keys(categoryMeta) : [selectedCategory];
      libraryContent.innerHTML = categories.map(category => {
        const items = sortAZ(visible.filter(t => t.category === category));
        if (!items.length) return "";
        const meta = categoryMeta[category];
        return `<section class="knowhow-category-section"><div class="knowhow-category-title"><span>${meta.icon}</span><div><h4>${meta.label}</h4><small>${items.length} ${items.length === 1 ? "téma" : items.length < 5 ? "témata" : "témat"}</small></div></div><div class="knowhow-library-list">${items.map(topicButton).join("")}</div></section>`;
      }).join("");
    }
    libraryContent.querySelectorAll("[data-topic]").forEach(button => {
      button.onclick = () => { setScreen("knowhow", button.dataset.topic); rerender(); };
    });
  }

  const featuredSection = container.querySelector("#knowhow-featured");
  const libraryHeading = container.querySelector(".knowhow-library-header h3");
  const libraryKicker = container.querySelector(".knowhow-library-header .knowhow-section-kicker");

  categoryButtons.forEach(button => {
    button.onclick = () => {
      selectedCategory = button.dataset.category;
      categoryButtons.forEach(b => b.classList.toggle("active", b === button));
      if (selectedCategory === "all") {
        featuredSection.hidden = false;
        libraryKicker.textContent = "Knihovna";
        libraryHeading.textContent = "Všechna témata";
      } else {
        featuredSection.hidden = true;
        const meta = categoryMeta[selectedCategory];
        libraryKicker.textContent = meta.short;
        libraryHeading.textContent = `Témata: ${meta.label}`;
      }
      renderLibrary();
    };
  });

  viewButtons.forEach(button => {
    button.onclick = () => {
      currentView = button.dataset.view;
      viewButtons.forEach(b => b.classList.toggle("active", b === button));
      renderLibrary();
    };
  });

  container.querySelectorAll(".knowhow-featured-card").forEach(button => {
    button.onclick = () => { setScreen("knowhow", button.dataset.topic); rerender(); };
  });

  const searchOverlay = container.querySelector("#knowhow-search");
  const searchInput = container.querySelector("#knowhow-search-input");
  const searchResults = container.querySelector("#knowhow-search-results");
  const normalize = value => value.toLocaleLowerCase("cs-CZ").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  function renderSearchResults(query = "") {
    const q = normalize(query.trim());
    if (!q) {
      searchResults.innerHTML = "<p class=\"knowhow-search-empty\">Začni psát, například „jak začít“, „zlozvyk“ nebo „2 minuty“.</p>";
      return;
    }
    const terms = q.split(/\s+/).filter(Boolean);
    const results = allTopics.map(topic => {
      const haystack = normalize([topic.title, ...(topic.keywords || []), topic.content.replace(/<[^>]*>/g, " ")].join(" "));
      const score = terms.reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0), 0);
      return { topic, score };
    }).filter(result => result.score > 0).sort((a, b) => b.score - a.score || a.topic.title.localeCompare(b.topic.title, "cs-CZ"));
    searchResults.innerHTML = results.length ? results.map(({ topic }) => `<button type="button" class="knowhow-search-result" data-topic="${topic.id}"><strong>${topic.title}</strong><span>${categoryMeta[topic.category].label}</span></button>`).join("") : "<p class=\"knowhow-search-empty\">Nic přesně jsem nenašel. Zkus jiné slovo nebo jednodušší popis problému.</p>";
    searchResults.querySelectorAll("[data-topic]").forEach(button => {
      button.onclick = () => { searchOverlay.classList.add("hidden"); searchOverlay.setAttribute("aria-hidden", "true"); setScreen("knowhow", button.dataset.topic); rerender(); };
    });
  }

  container.querySelector("#knowhow-search-open").onclick = () => {
    searchOverlay.classList.remove("hidden");
    searchOverlay.setAttribute("aria-hidden", "false");
    searchInput.value = "";
    renderSearchResults();
    requestAnimationFrame(() => searchInput.focus());
  };
  container.querySelector("#knowhow-search-close").onclick = () => {
    searchOverlay.classList.add("hidden");
    searchOverlay.setAttribute("aria-hidden", "true");
  };
  searchInput.oninput = () => renderSearchResults(searchInput.value);

  renderLibrary();
  requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })));
}
