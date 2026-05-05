import { Card, Flex, Image } from "@mantine/core";
import classes from "./cardGA.module.css";
import { DetailCardGrandArchive } from "@/types";
import { useViewportSize } from "@mantine/hooks";

interface PropCardItemProductTabsTypes {
  isFit?: boolean;
  value: DetailCardGrandArchive;
  onClick: () => void;
}

export function CardGA({
  value,
  onClick,
  isFit,
}: PropCardItemProductTabsTypes) {
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
      w={isFit ? "fit-content" : ""}
      onClick={onClick}
    >
      <Card.Section p={5}>
        <Flex justify={"start"} align={"start"} gap={10}>
          <Image
            h="100%"
            w={isMobile ? 180 : 250}
            src={`https://api.gatcg.com${valueResultEdition[0].image}`}
            alt="logo"
            radius="md"
          />
        </Flex>
      </Card.Section>
    </Card>
  );
}
