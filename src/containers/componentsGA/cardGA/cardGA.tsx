import { Box, Card, Flex, Image } from "@mantine/core";
import classes from "./cardGA.module.css";
import { DetailCardGrandArchive } from "@/types";
import { useViewportSize } from "@mantine/hooks";

interface PropCardItemProductTabsTypes {
  value: DetailCardGrandArchive;
  onClick: () => void;
}

export function CardGA({ value, onClick }: PropCardItemProductTabsTypes) {
  const { width } = useViewportSize();
  const isMobile = width <= 768;
  const valueResultEdition = value.result_editions.sort((a, b) => {
    return b.rarity - a.rarity;
  });

  return (
    <Card
      className={classes.glassCard}
      padding={5}
      withBorder
      orientation="horizontal"
      radius={12}
      shadow="sm"
      c="white"
      onClick={onClick}
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

      <Card.Section inheritPadding>
        <Flex justify={"start"} align={"start"} gap={10}>
          <Image
            h="100%"
            w={isMobile ? 180 : 200}
            src={`https://api.gatcg.com${valueResultEdition[0].image}`}
            alt="logo"
            radius="md"
          />
        </Flex>
      </Card.Section>
    </Card>
  );
}
