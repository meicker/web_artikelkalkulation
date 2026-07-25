// Content for all PriceCalc Pro guides (Ratgeber). Consumed by scripts/build-guides.mjs.
// The pillar (Handelskalkulation) stays hand-written; these are the cluster articles.

export const PILLAR = {
  de: { slug: "handelskalkulation.html", label: "Handelskalkulation" },
  en: { slug: "pricing-guide.html", label: "Retail pricing" },
};

export const APP = "https://apps.shopify.com/pricecalcpro";

export const GUIDES = [
  // 1) Kalkulationsfaktor -----------------------------------------------------
  {
    key: "faktor",
    graphic: "guide-factor",
    de: {
      slug: "kalkulationsfaktor-bestimmen.html",
      label: "Kalkulationsfaktor bestimmen",
      title: "Kalkulationsfaktor bestimmen: so findest du deinen Faktor",
      desc: "Kalkulationsfaktor berechnen und richtig bestimmen: aus bestehenden Preisen ableiten oder aus deinen Kosten aufbauen – mit Beispiel und Formel.",
      read: "Ratgeber · Lesezeit ca. 4 Min.",
      galt: "Kalkulationsfaktor: Faktor aus Verkaufs- und Einkaufspreis ableiten und Verkaufspreis aus dem Faktor berechnen.",
      lead: "Der Kalkulationsfaktor ist die einfachste Art, Verkaufspreise zu bestimmen: Einkaufspreis × Faktor = Verkaufspreis. Die Kunst liegt darin, den <strong>richtigen</strong> Faktor zu finden – hier erfährst du, wie.",
      sections: [
        { h: "Was ist der Kalkulationsfaktor?", html: `<p>Der Kalkulationsfaktor ist eine einzige Zahl, mit der du den Einkaufspreis multiplizierst, um zum Verkaufspreis zu kommen. Er bündelt alle Aufschläge – Kosten, Gewinn und Steuer – in einem Wert. Ein Faktor von 2,3 bedeutet: Der Verkaufspreis ist das 2,3-Fache des Einkaufspreises.</p>` },
        { h: "Faktor aus bestehenden Preisen ableiten", html: `<p>Wenn du schon Verkaufspreise hast, rechnest du rückwärts: <strong>Faktor = Verkaufspreis ÷ Einkaufspreis</strong>. Beispiel: 36,66 € ÷ 15,94 € = ×2,30. So findest du heraus, mit welchem Faktor du bisher tatsächlich kalkuliert hast – oft ist der über das Sortiment sehr uneinheitlich.</p>` },
        { h: "Faktor aus deinen Kosten aufbauen", html: `<p>Sauberer ist es, den Faktor aus den echten Kosten herzuleiten: Schlage auf den Einkaufspreis deine Handlungskosten, deinen Gewinnzuschlag und – bei Bruttopreisen – die Mehrwertsteuer auf. Das Ergebnis geteilt durch den Einkaufspreis ergibt deinen Mindestfaktor. Alles darunter bedeutet Verlust.</p>` },
        { h: "Ein Faktor oder viele?", html: `<p>Ein einheitlicher Faktor ist schnell, passt aber selten für alle Warengruppen. Produkte mit hohem Handling oder geringem Wareneinsatz brauchen einen höheren Faktor. Lege den Faktor daher pro Kollektion oder sogar pro Produkt fest – nicht pauschal fürs ganze Sortiment.</p>` },
      ],
      faq: [
        ["Was ist ein guter Kalkulationsfaktor?", "Das hängt von Branche und Kostenstruktur ab. Im Einzelhandel sind Faktoren zwischen 2 und 3 verbreitet – leite ihn aber aus deinen echten Kosten ab, statt zu raten."],
        ["Wie rechne ich den Faktor aus einem vorhandenen Preis?", "Faktor = Verkaufspreis ÷ Einkaufspreis. Beispiel: 36,66 € ÷ 15,94 € = 2,30."],
        ["Faktor netto oder brutto?", "Rechne mit Netto-Preisen und schlage die MwSt separat auf. So bleibt der Faktor unabhängig vom Steuersatz vergleichbar."],
      ],
      cta: {
        title: "Faktor setzen – automatisch in Shopify",
        text: "PriceCalc Pro speichert deinen Kalkulationsfaktor pro Variante, leitet ihn bei Bedarf aus bestehenden Preisen ab und berechnet den Verkaufspreis direkt in Shopify.",
      },
      related: ["aufschlag", "einkaufspreise"],
    },
    en: {
      slug: "calculation-factor.html",
      label: "Calculation factor",
      title: "How to Determine Your Calculation Factor",
      desc: "Calculate and set the right calculation factor: derive it from existing prices or build it up from your costs — with an example and formula.",
      read: "Guide · approx. 4 min read",
      galt: "Calculation factor: derive the factor from sale and cost price, and calculate the sell price from the factor.",
      lead: "The calculation factor is the simplest way to set sell prices: cost price × factor = sell price. The art is finding the <strong>right</strong> factor — here's how.",
      sections: [
        { h: "What is the calculation factor?", html: `<p>The calculation factor is a single number you multiply the cost price by to reach the sell price. It bundles all markups — costs, profit and tax — into one value. A factor of 2.3 means the sell price is 2.3× the cost price.</p>` },
        { h: "Derive the factor from existing prices", html: `<p>If you already have sell prices, work backwards: <strong>factor = sell price ÷ cost price</strong>. Example: €36.66 ÷ €15.94 = ×2.30. This reveals the factor you have actually been using — often very inconsistent across the catalog.</p>` },
        { h: "Build the factor up from your costs", html: `<p>The cleaner way is to derive the factor from real costs: add your handling costs, profit margin and — for gross prices — VAT to the cost price. Divide the result by the cost price and you get your minimum factor. Anything below it means a loss.</p>` },
        { h: "One factor or many?", html: `<p>A single factor is fast but rarely fits every product group. Items with high handling or low goods value need a higher factor. Set the factor per collection or even per product — not one blanket value for the whole catalog.</p>` },
      ],
      faq: [
        ["What is a good calculation factor?", "It depends on your industry and cost structure. In retail, factors between 2 and 3 are common — but derive it from your real costs rather than guessing."],
        ["How do I get the factor from an existing price?", "Factor = sell price ÷ cost price. Example: €36.66 ÷ €15.94 = 2.30."],
        ["Factor on net or gross?", "Calculate with net prices and add VAT separately, so the factor stays comparable regardless of the tax rate."],
      ],
      cta: {
        title: "Set the factor — automatically in Shopify",
        text: "PriceCalc Pro stores your calculation factor per variant, derives it from existing prices when needed, and calculates the sell price straight in Shopify.",
      },
      related: ["aufschlag", "einkaufspreise"],
    },
  },

  // 2) Aufschlag vs. Handelsspanne -------------------------------------------
  {
    key: "aufschlag",
    graphic: "guide-margin",
    de: {
      slug: "aufschlag-handelsspanne.html",
      label: "Aufschlag vs. Handelsspanne",
      title: "Aufschlag vs. Handelsspanne: Marge richtig berechnen",
      desc: "Aufschlag (Markup) und Handelsspanne (Marge) einfach erklärt: gleicher Gewinn, unterschiedliche Prozentbasis – mit Formeln und Beispiel.",
      read: "Ratgeber · Lesezeit ca. 3 Min.",
      galt: "Aufschlag (bezogen auf den Einkaufspreis) ergibt 150 %, Handelsspanne (bezogen auf den Verkaufspreis) 60 % – bei gleichem Gewinn.",
      lead: "„Ich habe 50 % Aufschlag“ – aber ist das die Marge? Aufschlag und Handelsspanne sind <strong>nicht dasselbe</strong>. Wer sie verwechselt, verkalkuliert sich. Hier ist der Unterschied in einer Minute.",
      sections: [
        { h: "Der entscheidende Unterschied", html: `<p>Beide messen deinen Gewinn – aber auf unterschiedlicher Basis. Der <strong>Aufschlag</strong> (Markup) bezieht den Gewinn auf den <strong>Einkaufspreis</strong>, die <strong>Handelsspanne</strong> (Marge) auf den <strong>Verkaufspreis</strong>. Derselbe Euro-Gewinn ergibt so zwei sehr verschiedene Prozentzahlen.</p>` },
        { h: "Die Formeln", html: `<p><strong>Aufschlag = (Verkaufspreis − Einkaufspreis) ÷ Einkaufspreis</strong><br /><strong>Handelsspanne = (Verkaufspreis − Einkaufspreis) ÷ Verkaufspreis</strong></p><p>Beispiel: EK 10 €, VK 25 €, Gewinn 15 €. Aufschlag = 15 ÷ 10 = 150 %. Handelsspanne = 15 ÷ 25 = 60 %.</p>` },
        { h: "Warum das wichtig ist", html: `<p>Wenn du mit „50 % Marge" kalkulierst, aber eigentlich 50 % Aufschlag meinst, ist dein Verkaufspreis zu niedrig. Für die Rentabilität zählt die Handelsspanne – sie sagt dir, wie viel von jedem verkauften Euro als Rohgewinn bleibt.</p>` },
      ],
      faq: [
        ["Was ist der Unterschied zwischen Marge und Aufschlag?", "Der Aufschlag bezieht den Gewinn auf den Einkaufspreis, die Marge (Handelsspanne) auf den Verkaufspreis. Gleicher Gewinn, unterschiedliche Prozentbasis."],
        ["Wie rechne ich vom Aufschlag zur Marge?", "Marge = Aufschlag ÷ (1 + Aufschlag). Beispiel: 150 % Aufschlag → 1,5 ÷ 2,5 = 60 % Marge."],
        ["Welche Kennzahl soll ich nutzen?", "Für die Rentabilität die Handelsspanne (Marge). Den Aufschlag nutzt man eher zum schnellen Kalkulieren des Verkaufspreises."],
      ],
      cta: {
        title: "Marge im Blick behalten",
        text: "In der erweiterten Kalkulation von PriceCalc Pro siehst du Netto-, Brutto- und Margenwerte pro Produkt – so kalkulierst du nie unter Wert.",
      },
      related: ["faktor", "mwst"],
    },
    en: {
      slug: "markup-vs-margin.html",
      label: "Markup vs. margin",
      title: "Markup vs. Margin: Calculate Your Profit Correctly",
      desc: "Markup and margin explained simply: same profit, different percentage base — with formulas and an example.",
      read: "Guide · approx. 3 min read",
      galt: "Markup (based on the cost price) is 150%, margin (based on the sell price) is 60% — for the same profit.",
      lead: "\"I have a 50% markup\" — but is that the margin? Markup and margin are <strong>not the same</strong>. Confuse them and you'll misprice. Here's the difference in one minute.",
      sections: [
        { h: "The key difference", html: `<p>Both measure your profit — but on a different base. <strong>Markup</strong> relates the profit to the <strong>cost price</strong>; <strong>margin</strong> relates it to the <strong>sell price</strong>. The same euro profit yields two very different percentages.</p>` },
        { h: "The formulas", html: `<p><strong>Markup = (sell price − cost price) ÷ cost price</strong><br /><strong>Margin = (sell price − cost price) ÷ sell price</strong></p><p>Example: cost €10, sale €25, profit €15. Markup = 15 ÷ 10 = 150%. Margin = 15 ÷ 25 = 60%.</p>` },
        { h: "Why it matters", html: `<p>If you calculate with "50% margin" but actually mean 50% markup, your sell price is too low. For profitability, margin is what counts — it tells you how much of every euro sold remains as gross profit.</p>` },
      ],
      faq: [
        ["What is the difference between margin and markup?", "Markup relates profit to the cost price, margin relates it to the sell price. Same profit, different percentage base."],
        ["How do I convert markup to margin?", "Margin = markup ÷ (1 + markup). Example: 150% markup → 1.5 ÷ 2.5 = 60% margin."],
        ["Which figure should I use?", "Use margin for profitability. Markup is handy for quickly deriving the sell price."],
      ],
      cta: {
        title: "Keep your margin in view",
        text: "In PriceCalc Pro's extended calculation you see net, gross and margin figures per product — so you never sell below value.",
      },
      related: ["faktor", "mwst"],
    },
  },

  // 3) Mehrwertsteuer ---------------------------------------------------------
  {
    key: "mwst",
    graphic: "guide-vat",
    de: {
      slug: "mehrwertsteuer-onlineshop.html",
      label: "Mehrwertsteuer im Onlineshop",
      title: "Mehrwertsteuer im Onlineshop richtig berechnen (19 % / 7 %)",
      desc: "MwSt im Onlineshop richtig kalkulieren: Netto zu Brutto, Normalsatz 19 % und ermäßigter Satz 7 % – mit Formel und Beispiel.",
      read: "Ratgeber · Lesezeit ca. 3 Min.",
      galt: "Nettopreis 19,48 € × 1,19 ergibt 23,20 € brutto (19 %); × 1,07 ergibt 20,84 € (ermäßigt 7 %).",
      lead: "Der Preis, den deine Kundschaft sieht, ist der <strong>Bruttopreis</strong> – inklusive Mehrwertsteuer. Damit deine Marge stimmt, kalkulierst du netto und schlägst die Steuer erst am Ende auf.",
      sections: [
        { h: "Netto, Brutto und die MwSt", html: `<p>Der Nettopreis ist dein kalkulierter Preis ohne Steuer. Der Bruttopreis ist der Endpreis mit Steuer. Die Formel: <strong>Netto × (1 + Steuersatz) = Brutto</strong>. Beispiel: 19,48 € × 1,19 = 23,20 € (bei 19 %).</p>` },
        { h: "Normalsatz oder ermäßigter Satz?", html: `<p>In Deutschland gilt meist der Normalsatz von <strong>19 %</strong>. Für bestimmte Waren – etwa viele Lebensmittel oder Bücher – gilt der ermäßigte Satz von <strong>7 %</strong>. Der richtige Satz hängt vom Produkt ab und sollte pro Artikel korrekt hinterlegt sein.</p>` },
        { h: "Häufiger Fehler: brutto kalkulieren", html: `<p>Wer direkt mit Bruttopreisen rechnet, vermischt Marge und Steuer. Kalkuliere immer in Netto-Stufen und schlage die MwSt zuletzt auf – so bleibt deine Marge unabhängig vom Steuersatz sauber und vergleichbar.</p>` },
      ],
      faq: [
        ["Wie rechne ich netto in brutto um?", "Brutto = Netto × (1 + Steuersatz). Bei 19 %: Netto × 1,19. Bei 7 %: Netto × 1,07."],
        ["Wann gilt der ermäßigte Satz von 7 %?", "Für bestimmte Produktgruppen wie viele Lebensmittel, Bücher oder Zeitschriften. Prüfe die Zuordnung pro Produkt."],
        ["Ist die MwSt-Berechnung eine Steuerberatung?", "Nein. Dieser Ratgeber und die App ersetzen keine steuerliche Beratung – im Zweifel den Steuerberater fragen."],
      ],
      cta: {
        title: "MwSt pro Produkt – in einem Klick",
        text: "PriceCalc Pro speichert den Steuersatz (Normal oder ermäßigt) pro Produkt und rechnet den Bruttopreis automatisch aus dem Nettopreis.",
      },
      related: ["aufschlag", "runden"],
    },
    en: {
      slug: "vat-online-shop.html",
      label: "VAT in your online shop",
      title: "How to Calculate VAT in Your Online Shop (19% / 7%)",
      desc: "Calculate VAT correctly: net to gross, standard rate 19% and reduced rate 7% — with formula and example.",
      read: "Guide · approx. 3 min read",
      galt: "Net price €19.48 × 1.19 gives €23.20 gross (19%); × 1.07 gives €20.84 (reduced 7%).",
      lead: "The price your customers see is the <strong>gross price</strong> — including VAT. To keep your margin right, calculate net and add the tax only at the end.",
      sections: [
        { h: "Net, gross and VAT", html: `<p>The net price is your calculated price without tax. The gross price is the final price with tax. The formula: <strong>net × (1 + tax rate) = gross</strong>. Example: €19.48 × 1.19 = €23.20 (at 19%).</p>` },
        { h: "Standard or reduced rate?", html: `<p>In Germany the standard rate of <strong>19%</strong> usually applies. For certain goods — such as many foods or books — the reduced rate of <strong>7%</strong> applies. The correct rate depends on the product and should be set per item.</p>` },
        { h: "Common mistake: calculating on gross", html: `<p>Calculating directly with gross prices mixes margin and tax. Always calculate in net steps and add VAT last — so your margin stays clean and comparable regardless of the rate.</p>` },
      ],
      faq: [
        ["How do I convert net to gross?", "Gross = net × (1 + tax rate). At 19%: net × 1.19. At 7%: net × 1.07."],
        ["When does the reduced 7% rate apply?", "For certain product groups such as many foods, books or magazines. Check the classification per product."],
        ["Is this tax advice?", "No. This guide and the app do not replace professional tax advice — when in doubt, ask your tax advisor."],
      ],
      cta: {
        title: "VAT per product — in one click",
        text: "PriceCalc Pro stores the tax rate (standard or reduced) per product and calculates the gross price automatically from the net price.",
      },
      related: ["aufschlag", "runden"],
    },
  },

  // 4) Preise runden ----------------------------------------------------------
  {
    key: "runden",
    graphic: "guide-rounding",
    de: {
      slug: "preise-runden-preispsychologie.html",
      label: "Preise runden & Preispsychologie",
      title: "Preise runden: Preispsychologie & saubere Endpreise",
      desc: "Verkaufspreise sauber runden: auf 0,05 €, 0,10 € oder psychologische Schwellen wie x,99 – warum und wie du nach der MwSt rundest.",
      read: "Ratgeber · Lesezeit ca. 3 Min.",
      galt: "Berechneter Preis 23,17 € wird gerundet: auf 0,05 € = 23,20 €, auf 1,00 € = 23,00 €, psychologisch = 22,99 €.",
      lead: "23,17 € wirkt willkürlich. Gerundete Endpreise sehen professioneller aus und verkaufen besser. Hier erfährst du, worauf du rundest – und warum <strong>nach</strong> der MwSt.",
      sections: [
        { h: "Warum runden?", html: `<p>Berechnete Preise haben oft krumme Nachkommastellen. Gerundete Preise wirken bewusst gesetzt und schaffen Vertrauen. Zusätzlich nutzt du Preispsychologie: Schwellenpreise wie 19,99 € statt 20,00 € wirken deutlich günstiger, obwohl der Unterschied nur ein Cent ist.</p>` },
        { h: "Auf welche Schritte runden?", html: `<p>Übliche Rundungsschritte sind <strong>0,05 €</strong>, <strong>0,10 €</strong>, <strong>0,50 €</strong> und <strong>1,00 €</strong>. Für psychologische Preise setzt du gezielt auf x,99 oder x,95. Wichtig ist Einheitlichkeit über das Sortiment – nicht mal so, mal so.</p>` },
        { h: "Immer nach der MwSt runden", html: `<p>Runde erst den <strong>Bruttopreis</strong>, nicht den Nettopreis. Sonst stimmt der Endpreis nach Aufschlag der Steuer wieder nicht. Erst rechnen, dann als letzten Schritt runden.</p>` },
      ],
      faq: [
        ["Auf welche Beträge sollte ich runden?", "Häufig auf 0,05 € oder 0,10 €, oder auf psychologische Schwellen wie x,99 €. Wichtig ist, es einheitlich zu machen."],
        ["Runde ich netto oder brutto?", "Immer den Bruttopreis (nach MwSt), damit der Endpreis für die Kundschaft stimmt."],
        ["Bringen Schwellenpreise wirklich mehr?", "Preispsychologisch wirken 19,99 € günstiger als 20,00 €. Ob es für dein Sortiment passt, solltest du testen."],
      ],
      cta: {
        title: "Rundung automatisch anwenden",
        text: "PriceCalc Pro rundet berechnete Verkaufspreise beim Speichern auf den von dir gewählten Schritt – konsistent über dein ganzes Sortiment.",
      },
      related: ["mwst", "faktor"],
    },
    en: {
      slug: "price-rounding.html",
      label: "Price rounding",
      title: "Price Rounding: Psychology & Clean End Prices",
      desc: "Round sell prices cleanly: to €0.05, €0.10 or psychological thresholds like x.99 — why and how to round after VAT.",
      read: "Guide · approx. 3 min read",
      galt: "Calculated price €23.17 is rounded: to €0.05 = €23.20, to €1.00 = €23.00, psychological = €22.99.",
      lead: "€23.17 looks arbitrary. Rounded end prices look more professional and sell better. Here's what to round to — and why <strong>after</strong> VAT.",
      sections: [
        { h: "Why round?", html: `<p>Calculated prices often have odd decimals. Rounded prices look deliberate and build trust. On top of that you can use pricing psychology: threshold prices like €19.99 instead of €20.00 feel noticeably cheaper, even though the difference is a single cent.</p>` },
        { h: "What steps to round to", html: `<p>Common rounding steps are <strong>€0.05</strong>, <strong>€0.10</strong>, <strong>€0.50</strong> and <strong>€1.00</strong>. For psychological prices you deliberately target x.99 or x.95. Consistency across the catalog matters — not one way here and another there.</p>` },
        { h: "Always round after VAT", html: `<p>Round the <strong>gross price</strong>, not the net price. Otherwise the end price won't be clean once tax is added. Calculate first, then round as the final step.</p>` },
      ],
      faq: [
        ["What amounts should I round to?", "Often to €0.05 or €0.10, or to psychological thresholds like x.99. The key is to keep it consistent."],
        ["Do I round net or gross?", "Always the gross price (after VAT), so the end price is clean for customers."],
        ["Do threshold prices really help?", "Psychologically, €19.99 feels cheaper than €20.00. Whether it fits your catalog is worth testing."],
      ],
      cta: {
        title: "Apply rounding automatically",
        text: "PriceCalc Pro rounds calculated sell prices to your chosen step on save — consistently across your whole catalog.",
      },
      related: ["mwst", "faktor"],
    },
  },

  // 5) Skonto & Rabatte -------------------------------------------------------
  {
    key: "skonto",
    graphic: "guide-skonto",
    de: {
      slug: "skonto-rabatte-kalkulieren.html",
      label: "Skonto & Rabatte einkalkulieren",
      title: "Skonto & Rabatte richtig einkalkulieren",
      desc: "Skonto und Rabatte in die Preiskalkulation einrechnen: mit einem Puffer bleibt die Marge auch nach Nachlass erhalten – mit Formel und Beispiel.",
      read: "Ratgeber · Lesezeit ca. 3 Min.",
      galt: "Zielpreis 100 € ÷ (1 − 3 %) = 103,09 € Listenpreis; nach 3 % Skonto bleiben wieder 100 €.",
      lead: "Wer Skonto oder Rabatte gewährt, verschenkt Marge – es sei denn, er hat sie vorher <strong>einkalkuliert</strong>. Mit einem kleinen Puffer bleibt dein Zielpreis auch nach Nachlass erhalten.",
      sections: [
        { h: "Das Problem mit Nachlässen", html: `<p>Gibst du 3 % Skonto auf einen Preis, der schon knapp kalkuliert ist, geht der Nachlass direkt von deiner Marge ab. Bei kleinen Margen kann das den Gewinn komplett auffressen.</p>` },
        { h: "Die Lösung: ein Puffer", html: `<p>Kalkuliere den Nachlass vorab ein, indem du deinen Zielpreis durch (1 − Nachlass) teilst: <strong>Listenpreis = Zielpreis ÷ (1 − Skonto %)</strong>. Beispiel: 100 € ÷ (1 − 3 %) = 103,09 €. Nach 3 % Skonto landest du wieder bei deinen 100 €.</p>` },
        { h: "Puffer für mehrere Nachlässe", html: `<p>Gewährst du Skonto <em>und</em> Mengenrabatt, rechne beide Puffer ein. Wichtig: Der Puffer gehört in die Kalkulation vor der Mehrwertsteuer – als eigene Stufe zwischen Bar- und Nettopreis.</p>` },
      ],
      faq: [
        ["Wie kalkuliere ich Skonto ein?", "Teile deinen Zielpreis durch (1 − Skonto %). Beispiel: 100 € ÷ 0,97 = 103,09 € Listenpreis."],
        ["Was ist der Unterschied zwischen Skonto und Rabatt?", "Skonto ist ein Nachlass für schnelle Zahlung, Rabatt ein allgemeiner Preisnachlass. Beide sollten einkalkuliert werden."],
        ["Wo gehört der Puffer in die Kalkulation?", "Als eigene Stufe vor der Mehrwertsteuer – zwischen Bar- und Nettopreis."],
      ],
      cta: {
        title: "Puffer als eigene Stufe",
        text: "Die 5-stufige Kalkulation von PriceCalc Pro enthält einen eigenen Puffer für Skonto und Rabatte – so bleibt deine Marge auch nach Nachlass stabil.",
      },
      related: ["mwst", "aufschlag"],
    },
    en: {
      slug: "cash-discount.html",
      label: "Cash discount & rebates",
      title: "Factoring Cash Discounts & Rebates Into Your Prices",
      desc: "Build cash discounts and rebates into your pricing: a buffer keeps your margin intact even after a discount — with formula and example.",
      read: "Guide · approx. 3 min read",
      galt: "Target price €100 ÷ (1 − 3%) = €103.09 list price; after a 3% discount you're back to €100.",
      lead: "Granting a cash discount or rebate gives away margin — unless you <strong>factor it in</strong> beforehand. With a small buffer your target price survives the discount.",
      sections: [
        { h: "The problem with discounts", html: `<p>Give 3% cash discount on a price that is already tight and the discount comes straight off your margin. With small margins that can wipe out the profit entirely.</p>` },
        { h: "The fix: a buffer", html: `<p>Factor the discount in upfront by dividing your target price by (1 − discount): <strong>list price = target price ÷ (1 − discount %)</strong>. Example: €100 ÷ (1 − 3%) = €103.09. After a 3% discount you're back at your €100.</p>` },
        { h: "Buffer for multiple discounts", html: `<p>If you grant a cash discount <em>and</em> a volume rebate, build in both buffers. Important: the buffer belongs in the calculation before VAT — as its own step between base and net price.</p>` },
      ],
      faq: [
        ["How do I factor in a cash discount?", "Divide your target price by (1 − discount %). Example: €100 ÷ 0.97 = €103.09 list price."],
        ["What's the difference between cash discount and rebate?", "A cash discount rewards fast payment; a rebate is a general price reduction. Both should be factored in."],
        ["Where does the buffer belong?", "As its own step before VAT — between the base and net price."],
      ],
      cta: {
        title: "Buffer as its own step",
        text: "PriceCalc Pro's 5-step calculation includes a dedicated buffer for cash discounts and rebates — so your margin stays stable even after a discount.",
      },
      related: ["mwst", "aufschlag"],
    },
  },

  // 6) Einkaufspreise in Shopify ---------------------------------------------
  {
    key: "einkaufspreise",
    screenshot: "assets/img/screen-einkaufspreise.png",
    de: {
      slug: "einkaufspreise-shopify.html",
      label: "Einkaufspreise in Shopify",
      title: "Einkaufspreise (Unit Cost) in Shopify verwalten",
      desc: "Einkaufspreise in Shopify richtig pflegen: Was der Unit Cost ist, wo Shopify ihn speichert und wie du EK-Preise über das ganze Sortiment aktuell hältst.",
      read: "Ratgeber · Lesezeit ca. 4 Min.",
      galt: "Der Einkaufspreise-Tab von PriceCalc Pro mit Produktliste, Filtern und Status-Badges.",
      lead: "Ohne saubere Einkaufspreise ist jede Kalkulation Raten. Shopify speichert den Einkaufspreis als <strong>Unit Cost</strong> je Variante – hier erfährst du, wie du ihn effizient pflegst.",
      sections: [
        { h: "Was ist der Unit Cost?", html: `<p>Der Unit Cost (Kosten pro Artikel) ist Shopifys Feld für den Einkaufspreis einer Variante. Er liegt im Inventar jeder Variante und ist die Basis jeder Kalkulation. Ohne gepflegten Unit Cost kennst du deine Marge nicht.</p>` },
        { h: "Warum EK-Preise oft veralten", html: `<p>Lieferanten ändern Preise, neue Varianten kommen ohne Kosten dazu, Altbestände haben Lücken. Über hunderte Varianten wird die Pflege schnell unübersichtlich – besonders, wenn man jede Variante einzeln in Shopify öffnen muss.</p>` },
        { h: "EK-Preise effizient pflegen", html: `<p>Effizienter ist eine Übersicht, in der du alle Varianten siehst, nach Kollektion, Hersteller oder Tag filterst und Preise einzeln oder im Batch aktualisierst. Ein Status zeigt dir sofort, welche Varianten noch keinen Einkaufspreis haben.</p>` },
      ],
      faq: [
        ["Wo speichert Shopify den Einkaufspreis?", "Als „Cost per item“ (Unit Cost) im Inventar jeder Variante."],
        ["Kann ich Einkaufspreise per Excel aktualisieren?", "Ja – exportiere die Artikel, pflege die EK-Preise offline und importiere sie wieder. Mehr dazu im Ratgeber zur Excel-Massenänderung."],
        ["Sieht die Kundschaft den Einkaufspreis?", "Nein. Der Unit Cost ist interne Information und wird im Shop nicht angezeigt."],
      ],
      cta: {
        title: "Einkaufspreise zentral verwalten",
        text: "PriceCalc Pro zeigt alle Varianten mit ihrem Unit Cost, filtert nach Kollektion, Hersteller, Tag und SKU und speichert Änderungen einzeln oder im Batch – direkt in Shopify.",
      },
      related: ["excel", "faktor"],
    },
    en: {
      slug: "cost-prices-shopify.html",
      label: "Cost prices in Shopify",
      title: "Managing Purchase Prices (Unit Cost) in Shopify",
      desc: "Keep purchase prices in Shopify clean: what unit cost is, where Shopify stores it, and how to keep cost prices up to date across the catalog.",
      read: "Guide · approx. 4 min read",
      galt: "The purchase prices tab of PriceCalc Pro with product list, filters and status badges.",
      lead: "Without clean purchase prices, every calculation is guesswork. Shopify stores the purchase price as <strong>unit cost</strong> per variant — here's how to maintain it efficiently.",
      sections: [
        { h: "What is unit cost?", html: `<p>Unit cost (cost per item) is Shopify's field for the purchase price of a variant. It sits in each variant's inventory and is the basis of every calculation. Without a maintained unit cost you don't know your margin.</p>` },
        { h: "Why cost prices go stale", html: `<p>Suppliers change prices, new variants arrive without a cost, old stock has gaps. Across hundreds of variants, upkeep quickly gets messy — especially if you have to open each variant in Shopify individually.</p>` },
        { h: "Maintain cost prices efficiently", html: `<p>It's more efficient to have one overview where you see all variants, filter by collection, vendor or tag, and update prices individually or in a batch. A status shows you instantly which variants still have no cost price.</p>` },
      ],
      faq: [
        ["Where does Shopify store the purchase price?", "As \"Cost per item\" (unit cost) in each variant's inventory."],
        ["Can I update cost prices via Excel?", "Yes — export the items, edit the cost prices offline and re-import. See the guide on bulk price changes via Excel."],
        ["Do customers see the purchase price?", "No. Unit cost is internal information and is not shown in the shop."],
      ],
      cta: {
        title: "Manage cost prices centrally",
        text: "PriceCalc Pro shows all variants with their unit cost, filters by collection, vendor, tag and SKU, and saves changes individually or in a batch — straight in Shopify.",
      },
      related: ["excel", "faktor"],
    },
  },

  // 7) Preise per Excel -------------------------------------------------------
  {
    key: "excel",
    screenshot: "assets/img/screen-einkaufspreise.png",
    de: {
      slug: "preise-excel-shopify.html",
      label: "Preise per Excel ändern",
      title: "Preise in Shopify per Excel massenhaft ändern",
      desc: "Preise in Shopify per Excel massenhaft ändern: EK-Preise exportieren, offline pflegen und nur echte Änderungen importieren – sicher mit Backup.",
      read: "Ratgeber · Lesezeit ca. 4 Min.",
      galt: "Excel-Export und -Import der Einkaufspreise in PriceCalc Pro.",
      lead: "Hunderte Preise einzeln in Shopify zu ändern, kostet Stunden. Mit Excel pflegst du sie offline in Ruhe und spielst sie in einem Rutsch zurück – wenn du ein paar Dinge beachtest.",
      sections: [
        { h: "Warum Excel für Massenänderungen?", html: `<p>In einer Tabelle siehst du viele Preise auf einen Blick, kannst mit Formeln arbeiten (z. B. alle Preise + 5 %) und Änderungen prüfen, bevor sie live gehen. Das ist schneller und übersichtlicher als das Einzel-Editieren im Shopify-Admin.</p>` },
        { h: "Der sichere Ablauf", html: `<p>1. Artikel als Excel exportieren. 2. Nur die Preisspalte bearbeiten – IDs unverändert lassen. 3. Datei importieren. Gut ist, wenn nur <strong>tatsächliche Änderungen</strong> übernommen werden und identische Werte übersprungen werden – das vermeidet unnötige Schreibvorgänge.</p>` },
        { h: "Vorsicht bei Preisänderungen", html: `<p>Massenänderungen sind mächtig – und dauerhaft. Ein Zahlendreher betrifft sofort viele Artikel. Erstelle deshalb <strong>vor</strong> jedem Import eine Datensicherung und prüfe das Import-Protokoll auf Fehlerzeilen.</p>` },
      ],
      faq: [
        ["Wie ändere ich viele Preise auf einmal in Shopify?", "Exportiere die Artikel als Excel, pflege die Preise offline und importiere die Datei wieder. Nur geänderte Zeilen werden übernommen."],
        ["Was passiert mit fehlerhaften Zeilen?", "Gute Tools listen Fehlerzeilen im Protokoll auf und überspringen sie, statt falsche Werte zu schreiben."],
        ["Sollte ich vorher sichern?", "Unbedingt. Preisänderungen sind dauerhaft – vor dem Import immer ein Backup erstellen."],
      ],
      cta: {
        title: "Excel-Import mit Prüfung",
        text: "PriceCalc Pro exportiert deine Artikel als .xlsx und importiert nur echte Änderungen – Fehlerzeilen werden protokolliert, ein Backup wird auf Wunsch automatisch erstellt.",
      },
      related: ["einkaufspreise", "backup"],
    },
    en: {
      slug: "bulk-prices-excel.html",
      label: "Bulk prices via Excel",
      title: "Bulk-Change Prices in Shopify via Excel",
      desc: "Bulk-change prices in Shopify via Excel: export cost prices, edit offline and import only real changes — safely, with a backup.",
      read: "Guide · approx. 4 min read",
      galt: "Excel export and import of purchase prices in PriceCalc Pro.",
      lead: "Changing hundreds of prices one by one in Shopify takes hours. With Excel you edit them offline in peace and push them back in one go — if you keep a few things in mind.",
      sections: [
        { h: "Why Excel for bulk changes?", html: `<p>In a spreadsheet you see many prices at once, can use formulas (e.g. all prices + 5%) and review changes before they go live. That's faster and clearer than editing one by one in the Shopify admin.</p>` },
        { h: "The safe workflow", html: `<p>1. Export items as Excel. 2. Edit only the price column — leave IDs untouched. 3. Import the file. It's ideal when only <strong>actual changes</strong> are applied and identical values are skipped — that avoids unnecessary writes.</p>` },
        { h: "Careful with price changes", html: `<p>Bulk changes are powerful — and permanent. A typo instantly affects many items. So create a backup <strong>before</strong> every import and check the import log for error rows.</p>` },
      ],
      faq: [
        ["How do I change many prices at once in Shopify?", "Export the items as Excel, edit the prices offline and import the file. Only changed rows are applied."],
        ["What happens to faulty rows?", "Good tools list error rows in the log and skip them instead of writing wrong values."],
        ["Should I back up first?", "Absolutely. Price changes are permanent — always create a backup before importing."],
      ],
      cta: {
        title: "Excel import with checks",
        text: "PriceCalc Pro exports your items as .xlsx and imports only real changes — error rows are logged, and a backup is created automatically on request.",
      },
      related: ["einkaufspreise", "backup"],
    },
  },

  // 8) Preise anpassen bei EK-Erhöhung ---------------------------------------
  {
    key: "anpassen",
    graphic: "guide-step",
    de: {
      slug: "preise-anpassen-einkauf.html",
      label: "Preise nach EK-Erhöhung anpassen",
      title: "Preise anpassen, wenn der Einkaufspreis steigt",
      desc: "Wenn der Lieferant erhöht: Verkaufspreise schnell und konsistent nachziehen, ohne die Marge zu verlieren – so erkennst und aktualisierst du betroffene Artikel.",
      read: "Ratgeber · Lesezeit ca. 3 Min.",
      galt: "Die 5-stufige Kalkulation: steigt der EK, verschiebt sich die ganze Kette bis zum Bruttopreis.",
      lead: "Steigt der Einkaufspreis und der Verkaufspreis bleibt gleich, sinkt deine Marge – oft unbemerkt. Wer die Kette kennt, zieht Preise schnell und richtig nach.",
      sections: [
        { h: "Warum stille Preiserhöhungen gefährlich sind", html: `<p>Lieferanten erhöhen oft nur einzelne Positionen. Bleibt dein Verkaufspreis, frisst die EK-Erhöhung direkt die Marge. Über viele Artikel summiert sich das zu echtem Geld – ohne dass es im Umsatz auffällt.</p>` },
        { h: "Betroffene Artikel erkennen", html: `<p>Der Schlüssel ist, zu wissen, wo sich der Einkaufspreis seit der letzten Kalkulation geändert hat. Vergleicht man den kalkulierten Referenzpreis mit dem aktuellen, fallen genau die Artikel auf, die neu gerechnet werden müssen.</p>` },
        { h: "Konsistent nachziehen", html: `<p>Statt Preise wild zu erhöhen, wendest du deinen Faktor oder die 5-Stufen-Kalkulation erneut auf den neuen Einkaufspreis an. So bleibt deine Marge exakt gleich – nachvollziehbar über das ganze Sortiment.</p>` },
      ],
      faq: [
        ["Wie ziehe ich Preise nach einer EK-Erhöhung nach?", "Wende deinen Faktor bzw. deine Kalkulation erneut auf den neuen Einkaufspreis an – so bleibt die Marge konstant."],
        ["Wie finde ich betroffene Artikel?", "Vergleiche den zuletzt kalkulierten Referenzpreis mit dem aktuellen EK. Wo es abweicht, ist Handlungsbedarf."],
        ["Muss ich alle Preise gleichzeitig ändern?", "Nein – aber je länger du wartest, desto länger verkaufst du mit reduzierter Marge."],
      ],
      cta: {
        title: "EK-Änderungen automatisch erkennen",
        text: "PriceCalc Pro markiert Produkte, deren Einkaufspreis sich seit der letzten Kalkulation geändert hat, und berechnet den neuen Verkaufspreis auf Knopfdruck.",
      },
      related: ["faktor", "einkaufspreise"],
    },
    en: {
      slug: "adjust-prices-cost-increase.html",
      label: "Adjust prices on cost rise",
      title: "Adjusting Prices When Your Cost Price Rises",
      desc: "When your supplier raises prices: update sell prices quickly and consistently without losing margin — how to spot and update affected items.",
      read: "Guide · approx. 3 min read",
      galt: "The 5-step calculation: when the cost rises, the whole chain shifts up to the gross price.",
      lead: "If the cost price rises and the sell price stays the same, your margin drops — often unnoticed. Knowing the chain lets you update prices quickly and correctly.",
      sections: [
        { h: "Why silent cost increases are dangerous", html: `<p>Suppliers often raise only individual items. If your sell price stays put, the cost increase eats straight into margin. Across many items that adds up to real money — without showing up in revenue.</p>` },
        { h: "Spotting affected items", html: `<p>The key is knowing where the cost price has changed since the last calculation. Comparing the calculated reference price with the current one surfaces exactly the items that need recalculating.</p>` },
        { h: "Update consistently", html: `<p>Instead of raising prices randomly, reapply your factor or 5-step calculation to the new cost price. Your margin stays exactly the same — traceably across the whole catalog.</p>` },
      ],
      faq: [
        ["How do I update prices after a cost increase?", "Reapply your factor or calculation to the new cost price — this keeps the margin constant."],
        ["How do I find affected items?", "Compare the last calculated reference price with the current cost. Where it differs, action is needed."],
        ["Do I have to change all prices at once?", "No — but the longer you wait, the longer you sell at a reduced margin."],
      ],
      cta: {
        title: "Detect cost changes automatically",
        text: "PriceCalc Pro flags products whose cost price has changed since the last calculation and computes the new sell price at the press of a button.",
      },
      related: ["faktor", "einkaufspreise"],
    },
  },

  // 9) Datensicherung ---------------------------------------------------------
  {
    key: "backup",
    screenshot: "assets/img/screen-sicherung.png",
    de: {
      slug: "datensicherung-preise-shopify.html",
      label: "Datensicherung vor Preisänderungen",
      title: "Datensicherung vor Massen-Preisänderungen in Shopify",
      desc: "Warum du vor jeder Massen-Preisänderung in Shopify sicherst – und wie eine Rücksicherung mit Prüfung funktioniert. Preisänderungen sind dauerhaft.",
      read: "Ratgeber · Lesezeit ca. 3 Min.",
      galt: "Der Sicherungs-Tab von PriceCalc Pro mit Export-Optionen und Rücksicherung.",
      lead: "Preisänderungen in Shopify sind <strong>dauerhaft</strong> und lassen sich nicht per Klick zurücknehmen. Ein Fehler bei 500 Artikeln kann teuer werden – eine Sicherung ist deine Versicherung.",
      sections: [
        { h: "Warum Preisänderungen riskant sind", html: `<p>Anders als ein Entwurf werden gespeicherte Preise sofort im Shop wirksam. Ein falscher Faktor, ein Zahlendreher im Import oder eine versehentliche Batch-Änderung – und hunderte Preise sind falsch, ohne einfachen Rückweg.</p>` },
        { h: "Was eine gute Sicherung enthält", html: `<p>Eine vollständige Sicherung enthält EK-Preis, Verkaufspreis und Kalkulationsfaktor aller Varianten – am besten als Datei, die du lokal aufbewahrst. So kannst du jederzeit zum letzten sauberen Stand zurück.</p>` },
        { h: "Rücksicherung mit Prüfung", html: `<p>Beim Zurückspielen willst du nicht blind alles überschreiben. Ideal ist eine Diff-Ansicht, die dir jede Abweichung zeigt und einzelne Einträge an- und abwählen lässt – so korrigierst du gezielt nur das Nötige.</p>` },
      ],
      faq: [
        ["Kann ich Preisänderungen in Shopify rückgängig machen?", "Nicht per Klick. Gespeicherte Preise sind dauerhaft – nur eine vorher erstellte Sicherung erlaubt eine saubere Rücksicherung."],
        ["Was sollte eine Preis-Sicherung enthalten?", "EK-Preis, Verkaufspreis und Kalkulationsfaktor aller Varianten, als lokale Datei."],
        ["Wie funktioniert eine Rücksicherung?", "Idealerweise mit Diff-Ansicht: Du siehst jede Änderung und wählst aus, was zurückgespielt wird."],
      ],
      cta: {
        title: "Automatisch sichern vor dem Speichern",
        text: "PriceCalc Pro erstellt auf Wunsch vor jeder Änderung ein Backup und bietet eine Rücksicherung mit Diff-Ansicht – jede Preisänderung bleibt kontrollierbar.",
      },
      related: ["excel", "anpassen"],
    },
    en: {
      slug: "backup-before-price-changes.html",
      label: "Backup before price changes",
      title: "Backing Up Before Bulk Price Changes in Shopify",
      desc: "Why to back up before every bulk price change in Shopify — and how a restore with review works. Price changes are permanent.",
      read: "Guide · approx. 3 min read",
      galt: "The backup tab of PriceCalc Pro with export options and restore.",
      lead: "Price changes in Shopify are <strong>permanent</strong> and can't be undone with a click. A mistake across 500 items can get expensive — a backup is your insurance.",
      sections: [
        { h: "Why price changes are risky", html: `<p>Unlike a draft, saved prices take effect in the shop immediately. A wrong factor, a typo in an import or an accidental batch change — and hundreds of prices are wrong, with no easy way back.</p>` },
        { h: "What a good backup contains", html: `<p>A full backup contains the cost price, sell price and calculation factor of all variants — ideally as a file you keep locally. That way you can return to the last clean state at any time.</p>` },
        { h: "Restore with review", html: `<p>When restoring, you don't want to blindly overwrite everything. Ideal is a diff view that shows every difference and lets you select or deselect individual entries — so you fix only what's needed.</p>` },
      ],
      faq: [
        ["Can I undo price changes in Shopify?", "Not with a click. Saved prices are permanent — only a backup made beforehand allows a clean restore."],
        ["What should a price backup contain?", "The cost price, sell price and calculation factor of all variants, as a local file."],
        ["How does a restore work?", "Ideally with a diff view: you see every change and choose what gets restored."],
      ],
      cta: {
        title: "Back up automatically before saving",
        text: "PriceCalc Pro creates a backup before every change on request and offers a restore with a diff view — every price change stays under control.",
      },
      related: ["excel", "anpassen"],
    },
  },
];
