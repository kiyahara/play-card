import { Box, Button, Card, Flex, Image, Text } from "@mantine/core";
import classes from "./contentCardGA.module.css";
import { DetailCardGrandArchive } from "@/types";
import { rarityTranslate } from "@/utils";
import { useViewportSize } from "@mantine/hooks";
import { IconRepeat } from "@tabler/icons-react";
import { useState } from "react";

interface PropCardItemProductTabsTypes {
  value: DetailCardGrandArchive;
  onClick: () => void;
}

export function ContentCardGA({
  value,
  onClick,
}: PropCardItemProductTabsTypes) {
  const [isFlipped, setIsFlipped] = useState(false);
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

      {/* <Box
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 12,
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.35), transparent 40%)",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      /> */}

      {/* <Card.Section inheritPadding px={0} w={isMobile ? "50%" : "50%"}>
        <Image
          h="100%"
          w={isMobile ? 180 : 200}
          src={`https://api.gatcg.com${valueResultEdition[0].image}`}
          alt="logo"
          radius="md"
        />
      </Card.Section> */}

      <Card.Section
        inheritPadding
        // px={isMobile ? 10 : 0}
        // w={isMobile ? "50%" : "50%"}
      >
        <Flex justify={"start"} align={"start"} gap={10}>
          <Flex className={classes.imageWrapper}>
            <Flex className={classes.flipWrapper}>
              <Flex
                className={`${classes.flipInner} ${
                  isFlipped ? classes.flipped : ""
                }`}
              >
                {/* FRONT */}
                <Flex className={classes.flipFront}>
                  <Image
                    src={`https://api.gatcg.com${valueResultEdition[0].image}`}
                    alt="front"
                    radius={15}
                    h="100%"
                    w="100%"
                  />
                </Flex>

                {/* BACK */}
                <Flex className={classes.flipBack}>
                  <Image
                    src={`https://api.gatcg.com${
                      valueResultEdition[0].other_orientations &&
                      valueResultEdition[0].other_orientations.length > 0
                        ? valueResultEdition[0].other_orientations[0].edition
                            .image
                        : valueResultEdition[0].image
                    }`}
                    alt="back"
                    radius={15}
                    h="100%"
                    w="100%"
                  />
                </Flex>
              </Flex>
            </Flex>

            {valueResultEdition[0].other_orientations &&
            valueResultEdition[0].other_orientations.length > 0 ? (
              <Button
                size={isMobile ? "xs" : "sm"}
                className={classes.floatingButton}
                onClick={() => setIsFlipped((prev) => !prev)}
              >
                <IconRepeat size={14} />
              </Button>
            ) : null}
          </Flex>
          <Flex justify={"space-between"} direction={"column"} gap={5} pt={10}>
            <Text fz="md" onClick={onClick} className={classes.cardLink}>
              {value.name}
            </Text>

            <Box mt="xs">
              <Text size="sm">{valueResultEdition[0].set.name}</Text>
            </Box>

            <Box mt="xs">
              <Text fz="sm" c="dimmed">
                {valueResultEdition[0].set.prefix}
              </Text>
              <Text fz="sm" c="dimmed">
                {rarityTranslate(valueResultEdition[0].rarity)}, #
                {valueResultEdition[0].collector_number}
              </Text>
            </Box>

            <Box mt="xs">
              <Text size="sm">Illustrator:</Text>
              <Text fz="sm" c="dimmed">
                {valueResultEdition[0].illustrator}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Card.Section>
    </Card>
  );
}
