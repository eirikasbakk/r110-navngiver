// r110Names.ts
// Ferdig normaliserte verdier (kan brukes direkte i navn)

export const NAME_OPTIONS: Record<string, string[]> = {
  // 3 Registrerte data
  rg: [
    "landmaaling",
    "skanning",
    "geologisk-kartlegging",
    "maalinger",
    "inspeksjon",
    "befaring",
    "registrert-paa-anlegg",
  ],

  // 4.2 Grunnlagsmodeller
  m_g: [
    "arealplansituasjon",
    "befolkning",
    "billeddata",
    "bygg",
    "eiendom",
    "forurensning",
    "friluftsliv",
    "grunnforhold",
    "kulturarv",
    "landskap",
    "naturmangfold",
    "naturressurser",
    "naering",
    "samfunnssikkerhet",
    "samferdsel",
    "terrengmodell",
    "teknisk-infrastruktur",
    "vann",
    "vaer-og-klima",
  ],

  // 4.3 Fagmodeller
  m_f: [
    "arealplan",
    "belysning",
    "bru",
    "bygninger",
    "elektro",
    "ferjekai",
    "gatemobler",
    "geologi",
    "geoteknikk",
    "grunnerverv",
    "konstruksjoner",
    "kulturminnevern",
    "massehandtering",
    "naturvern",
    "overvann",
    "rekkverk",
    "risikoreduksjon",
    "signal",
    "skilt",
    "steinssetting",
    "terrengforming",
    "tunnel",
    "vann-og-avloep",
    "veg",
    "vegetasjon",
    "vegoppmerking",
  ],

  // 5.2 Presentasjoner
  r_p: [
    "presentasjonsmodell",
    "animasjonsfilm",
    "manipulerte-bilder",
    "foto-og-video",
    "prosjektpresentasjoner",
  ],

  // 5.3 Datasett
  r_ds: [
    "stikningsdata",
    "maskinstyringsdata",
    "nvdb-og-fkb-grunnlag",
  ],

  // 5.4 Dokumenter
  r_d: [
    "tegninger",
    "rapporter",
  ],
};
``