import { Box, Card, Flex, Image, Text } from "@mantine/core";
import classes from "./contentCardGA.module.css";
import { DetailCardGrandArchive } from "@/types";
import { formatUSD } from "@/utils";

interface PropCardItemProductTabsTypes {
  value: DetailCardGrandArchive;
  onClick: () => void;
}

export function ContentCardGA({
  value,
  onClick,
}: PropCardItemProductTabsTypes) {
  return (
    <Card
      className={classes.glassCard}
      padding={10}
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

      <Card.Section inheritPadding px="xs" w="45%">
        <Image
          h="100%"
          w={150}
          src={`https://api.gatcg.com${value.editions[0].image}`}
          alt="logo"
          radius="md"
        />
      </Card.Section>

      <Card.Section inheritPadding px="md" w="55%">
        <Flex justify={"space-between"} direction={"column"} gap={5}>
          <Text fz="md">{value.name}</Text>

          <Box mt="xs">
            <Text size="sm">
              {value.editions
                .slice(0, 3)
                .map((item) => item.set.prefix)
                .join(", ")}
              {value.editions.length > 3 && " ..."}
            </Text>
            <Text fz="sm" c="dimmed">
              Total: {value.editions.length} Sets
            </Text>
          </Box>

          <Box mt="xs">
            {/* <Text size="xs">
                            {value.editions
                              .slice(0, 3)
                              .map((item) => item.set.prefix)
                              .join(", ")}
                            {value.editions.length > 3 && " ..."}
                          </Text>
                          <Text fz="sm" c="dimmed">
                            Total: {value.editions.length} Sets
                          </Text> */}
          </Box>

          <Box mt="xs">
            <Text size="sm">26 Listings From:</Text>
            <Text fz="lg" c="#05772d">
              {formatUSD(44.2)}
            </Text>
          </Box>
        </Flex>
      </Card.Section>
    </Card>
  );
}
