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
  effect_html: string;
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
  result_editions: EditionGA[];
  slug: string;
  speed: string | null;
  subtypes: string[];
  types: string[];
  uuid: string;
}
