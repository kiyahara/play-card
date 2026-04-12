export interface ResponseGrandArchive {
  data: DetailCardGrandArchive[];
  has_more: number;
  order: string;
  page: number;
  page_size: number;
  paginated_cards_count: number;
  sort: string;
  total_cards: number;
  total_pages: number;
}

export interface CostGrandArchiveInterface {
  type: string;
  value: string;
}
export interface LegalityItemGA {
  limit: number;
}

export interface LegalityGA {
  [key: string]: LegalityItemGA;
}

export interface SetsGA {
  created_at: Date;
  id: string;
  language: string;
  last_update: Date;
  name: string;
  prefix: string;
  release_date: Date;
}

export interface CirculationGA {
  created_at: Date;
  edition_id: string;
  foil: boolean;
  kind: string;
  last_update: Date;
  population: number;
  population_operator: string;
  printing: boolean;
  uuid: string;
  variants: string[];
}

export interface EditionGA {
  card_id: string;
  collector_number: string;
  configuration: string;
  created_at: Date;
  effect: string | null;
  effect_raw: string | null;
  flavor: string | null;
  illustrator: string;
  image: string;
  last_update: Date;
  orientation: null;
  rarity: number;
  slug: string;
  thema_charm_foil: number | null;
  thema_charm_nonfoil: number | null;
  thema_ferocity_foil: number | null;
  thema_ferocity_nonfoil: number | null;
  thema_foil: number | null;
  thema_grace_foil: number | null;
  thema_grace_nonfoil: number | null;
  thema_mystique_foil: number | null;
  thema_mystique_nonfoil: number | null;
  thema_nonfoil: number | null;
  thema_valor_foil: number | null;
  thema_valor_nonfoil: number | null;
  thema_foil_dynamic: boolean;
  thema_nonfoil_dynamic: boolean;
  uuid: string;
  collaborators: string[];
  // circulationTemplates: [
  //   {
  //     created_at: "2025-11-24T09:52:36.684+00:00";
  //     edition_id: "Ac3EbjY4fI";
  //     foil: true;
  //     kind: "FOIL";
  //     last_update: "2025-11-24T09:52:36.684+00:00";
  //     name: "PTM U Foil";
  //     population: 1100;
  //     population_operator: "≈";
  //     printing: true;
  //     uuid: "ELqen2ZIse";
  //     variants: [
  //       {
  //         uuid: "51os2tOp8Q";
  //         edition_id: "Ac3EbjY4fI";
  //         description: "Fractured Curio Foil";
  //         image: "/cards/images/Ac3EbjY4fI.jpg";
  //         population_operator: "≈";
  //         population: 100;
  //         printing: false;
  //         kind: "FOIL";
  //         created_at: "2025-11-24T09:52:36.684+00:00";
  //         last_update: "2025-11-24T09:52:36.684+00:00";
  //       },
  //     ];
  //   },
  // ];
  circulations: CirculationGA[];
  other_orientations: [];
  set: SetsGA;
  effect_html: string | null;
}

export interface DetailCardGrandArchive {
  classes: string[];
  cost_memory: number;
  cost_reserve: number | null;
  cost: CostGrandArchiveInterface;
  created_at: Date;
  durability: number | null;
  editions: EditionGA[];
  effect: string;
  effect_raw: string;
  element: string;
  elements: string[];
  flavor: string;
  last_update: Date;
  legality: LegalityItemGA;
  level: number | null;
  life: number | null;
  name: string;
  power: number;
  // result_editions: [
  //   {
  //     card_id: "df594Qoszn";
  //     collector_number: "000";
  //     configuration: "default";
  //     created_at: "2024-01-24T12:00:00+00:00";
  //     effect: null;
  //     effect_raw: null;
  //     flavor: null;
  //     illustrator: "十尾";
  //     image: "/cards/images/2zw7a98f7b.jpg";
  //     last_update: "2025-01-18T17:40:17.152+00:00";
  //     orientation: null;
  //     rarity: 9;
  //     slug: "apotheosis-rite-p24-cpr";
  //     thema_charm_foil: null;
  //     thema_charm_nonfoil: null;
  //     thema_ferocity_foil: null;
  //     thema_ferocity_nonfoil: null;
  //     thema_foil: null;
  //     thema_grace_foil: null;
  //     thema_grace_nonfoil: null;
  //     thema_mystique_foil: null;
  //     thema_mystique_nonfoil: null;
  //     thema_nonfoil: null;
  //     thema_valor_foil: null;
  //     thema_valor_nonfoil: null;
  //     thema_foil_dynamic: false;
  //     thema_nonfoil_dynamic: false;
  //     uuid: "2zw7a98f7b";
  //     collaborators: [];
  //     circulationTemplates: [];
  //     circulations: [
  //       {
  //         created_at: "2025-01-18T17:40:17.152+00:00";
  //         edition_id: "2zw7a98f7b";
  //         foil: true;
  //         kind: "FOIL";
  //         last_update: "2025-01-18T17:40:17.152+00:00";
  //         population: 1;
  //         population_operator: "=";
  //         printing: false;
  //         uuid: "c29f57afoP";
  //         variants: [];
  //       },
  //     ];
  //     other_orientations: [];
  //     set: {
  //       created_at: "2024-01-24T12:00:00+00:00";
  //       id: "muw6lmtzwg";
  //       language: "EN";
  //       last_update: "2025-01-18T17:40:17.152+00:00";
  //       name: "Promotional 2024";
  //       prefix: "P24";
  //       release_date: "2024-01-24T00:00:00";
  //     };
  //     effect_html: null;
  //   },
  // ];
  slug: string;
  speed: string | null;
  subtypes: string[];
  types: string[];
  uuid: string;
}
