"use client";
import { Box, Card, Flex, Group, Image, SimpleGrid, Text } from "@mantine/core";
import classes from "./productsTabs.module.css";
import { useEffect, useState } from "react";
import { GaService } from "@/api/services";
import { errorNotification } from "@/utils";
import ShowLoadingModal from "@/utils/swal";
import { useViewportSize } from "@mantine/hooks";

// interface ResponseGrandArchive {
//   has_more: number;
//   order: string;
//   page: number;
//   page_size: number;
//   paginated_cards_count: number;
//   sort: string;
//   total_cards: number;
//   total_pages: number;
// }

// interface CostGrandArchiveInterface {
//   type: string;
//   value: string;
// }
// interface LegalityItem {
//   limit: number;
// }

// interface Legality {
//   [key: string]: LegalityItem;
// }
// interface DetailCardGrandArchive {
//   classes: string[];
//   cost_memory: number;
//   cost_reserve: number | null;
//   cost: CostGrandArchiveInterface;
//   created_at: Date;
//   durability: number | null;
//   editions: [
//     {
//       card_id: string;
//       collector_number: string;
//       configuration: string;
//       created_at: Date;
//       effect: string | null;
//       effect_raw: string | null;
//       flavor: string | null;
//       illustrator: string;
//       image: string;
//       last_update: Date;
//       orientation: null;
//       rarity: number;
//       slug: string;
//       thema_charm_foil: number | null;
//       thema_charm_nonfoil: number | null;
//       thema_ferocity_foil: number | null;
//       thema_ferocity_nonfoil: number | null;
//       thema_foil: number | null;
//       thema_grace_foil: number | null;
//       thema_grace_nonfoil: number | null;
//       thema_mystique_foil: number | null;
//       thema_mystique_nonfoil: number | null;
//       thema_nonfoil: number | null;
//       thema_valor_foil: number | null;
//       thema_valor_nonfoil: number | null;
//       thema_foil_dynamic: boolean;
//       thema_nonfoil_dynamic: boolean;
//       uuid: string;
//       collaborators: string[];
//       circulationTemplates: [
//         {
//           created_at: "2025-11-24T09:52:36.684+00:00";
//           edition_id: "Ac3EbjY4fI";
//           foil: true;
//           kind: "FOIL";
//           last_update: "2025-11-24T09:52:36.684+00:00";
//           name: "PTM U Foil";
//           population: 1100;
//           population_operator: "≈";
//           printing: true;
//           uuid: "ELqen2ZIse";
//           variants: [
//             {
//               uuid: "51os2tOp8Q";
//               edition_id: "Ac3EbjY4fI";
//               description: "Fractured Curio Foil";
//               image: "/cards/images/Ac3EbjY4fI.jpg";
//               population_operator: "≈";
//               population: 100;
//               printing: false;
//               kind: "FOIL";
//               created_at: "2025-11-24T09:52:36.684+00:00";
//               last_update: "2025-11-24T09:52:36.684+00:00";
//             },
//           ];
//         },
//       ];
//       circulations: [
//         {
//           created_at: "2025-01-18T17:40:17.152+00:00";
//           edition_id: "2zw7a98f7b";
//           foil: true;
//           kind: "FOIL";
//           last_update: "2025-01-18T17:40:17.152+00:00";
//           population: 1;
//           population_operator: "=";
//           printing: false;
//           uuid: "c29f57afoP";
//           variants: [];
//         },
//       ];
//       other_orientations: [];
//       set: {
//         created_at: "2024-01-24T12:00:00+00:00";
//         id: "muw6lmtzwg";
//         language: "EN";
//         last_update: "2025-01-18T17:40:17.152+00:00";
//         name: "Promotional 2024";
//         prefix: "P24";
//         release_date: "2024-01-24T00:00:00";
//       };
//       effect_html: string | null;
//     },
//   ];
//   effect: string;
//   effect_raw: string;
//   element: string;
//   elements: string[];
//   flavor: string;
//   last_update: Date;
//   legality: Legality;
//   level: number | null;
//   life: number | null;
//   name: string;
//   power: number;
//   result_editions: [
//     {
//       card_id: "df594Qoszn";
//       collector_number: "000";
//       configuration: "default";
//       created_at: "2024-01-24T12:00:00+00:00";
//       effect: null;
//       effect_raw: null;
//       flavor: null;
//       illustrator: "十尾";
//       image: "/cards/images/2zw7a98f7b.jpg";
//       last_update: "2025-01-18T17:40:17.152+00:00";
//       orientation: null;
//       rarity: 9;
//       slug: "apotheosis-rite-p24-cpr";
//       thema_charm_foil: null;
//       thema_charm_nonfoil: null;
//       thema_ferocity_foil: null;
//       thema_ferocity_nonfoil: null;
//       thema_foil: null;
//       thema_grace_foil: null;
//       thema_grace_nonfoil: null;
//       thema_mystique_foil: null;
//       thema_mystique_nonfoil: null;
//       thema_nonfoil: null;
//       thema_valor_foil: null;
//       thema_valor_nonfoil: null;
//       thema_foil_dynamic: false;
//       thema_nonfoil_dynamic: false;
//       uuid: "2zw7a98f7b";
//       collaborators: [];
//       circulationTemplates: [];
//       circulations: [
//         {
//           created_at: "2025-01-18T17:40:17.152+00:00";
//           edition_id: "2zw7a98f7b";
//           foil: true;
//           kind: "FOIL";
//           last_update: "2025-01-18T17:40:17.152+00:00";
//           population: 1;
//           population_operator: "=";
//           printing: false;
//           uuid: "c29f57afoP";
//           variants: [];
//         },
//       ];
//       other_orientations: [];
//       set: {
//         created_at: "2024-01-24T12:00:00+00:00";
//         id: "muw6lmtzwg";
//         language: "EN";
//         last_update: "2025-01-18T17:40:17.152+00:00";
//         name: "Promotional 2024";
//         prefix: "P24";
//         release_date: "2024-01-24T00:00:00";
//       };
//       effect_html: null;
//     },
//   ];
//   slug: string;
//   speed: string | null;
//   subtypes: string[];
//   types: string[];
//   uuid: string;
// }

export default function ManageProductTabs() {
  const stats = [
    { value: 447, label: "Remaining" },
    { value: 76, label: "In progress" },
  ];

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text>{stat.value}</Text>
      <Text size="xs" c="dimmed">
        {stat.label}
      </Text>
    </div>
  ));
  const [loading, setLoading] = useState(false);
  const { width } = useViewportSize();
  const isMobile = width <= 768;

  async function getListAllCard() {
    try {
      setLoading(true);
      const response = await GaService.getAllDataCard();
      if (response) {
        setLoading(false);
        console.log(response);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      // setData([]);
      errorNotification(error);
    }
  }

  useEffect(() => {
    getListAllCard();
  }, []);

  return (
    <>
      <ShowLoadingModal isLoading={loading} />

      <Flex h={"100%"} direction={isMobile ? "column" : "column"}>
        <Flex justify={"space-between"} w={"100%"} pb={10}>
          <Text size="xs" c={"white"}>
            5 Result for: Guo Jia in Grand Archive TCG
          </Text>
        </Flex>
        <SimpleGrid cols={isMobile ? 1 : 3} spacing="md" pb={10}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Card
              className={classes.glassCard}
              key={index}
              padding={10}
              withBorder
              orientation="horizontal"
              radius={12}
              shadow="sm"
              c="white"
            >
              <Box
                style={{
                  position: "absolute",
                  width: 200,
                  height: 200,
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.15), transparent)",
                  top: -50,
                  right: -50,
                  filter: "blur(40px)",
                }}
              />

              {/* Reflection */}
              <Box
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 12,
                  background:
                    "linear-gradient(120deg, rgba(255,255,255,0.35), transparent 40%)",
                  opacity: 0.4,
                  pointerEvents: "none",
                }}
              />

              <Card.Section inheritPadding px="xs" w="40%">
                <Image
                  h="100%"
                  w={150}
                  src="https://api.gatcg.com/cards/images/ordinary-horse-amb.jpg"
                  alt="logo"
                  radius="md"
                />
              </Card.Section>

              <Card.Section inheritPadding px="md" w="60%">
                <Text fz="xl">Guo Jia {index + 1}</Text>

                <Box mt="xs">
                  <Text>1887</Text>
                  <Text fz="xs" c="dimmed">
                    Completed
                  </Text>
                </Box>

                <Group mt="sm">{items}</Group>
              </Card.Section>
            </Card>
          ))}
        </SimpleGrid>
      </Flex>
    </>
  );
}
