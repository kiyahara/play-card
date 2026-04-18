import { DetailCardGrandArchive } from "@/types";
import { Flex, Text } from "@mantine/core";
import { capitalizeManual } from "@/utils";
import { useViewportSize } from "@mantine/hooks";
import classes from "./detailCard.module.css";

interface PropsDetailCardModalDetailGATypes {
  dataDetail: DetailCardGrandArchive;
}

export function DetailCardModalDetailGA({
  dataDetail,
}: PropsDetailCardModalDetailGATypes) {
  const { width } = useViewportSize();

  return (
    <>
      <Flex align="center" gap={6} pt={5}>
        <Flex
          className={classes.elementEffect}
          style={{
            backgroundImage: `url("https://cdn2.gatcg.com/i/elements/${dataDetail.element.toLowerCase()}.png")`,
          }}
        />
        <Text size="md">{dataDetail.name}</Text>
      </Flex>
      <Flex align="center" gap={6}>
        <Flex
          className={classes.typeEffect}
          style={{
            backgroundImage: `url("https://cdn2.gatcg.com/i/types/${dataDetail.types.includes("ALLY") ? "ally" : "ally"}.png")`,
          }}
        />
        <Text size={"sm"}>
          {capitalizeManual(dataDetail.types.join(" "))} —{" "}
          {capitalizeManual(dataDetail.subtypes.join(" "))}
        </Text>
      </Flex>
      <Text size="lg" fw={"bold"} pt={5}>
        Effect :{" "}
      </Text>
      <Flex
        dangerouslySetInnerHTML={{
          __html: dataDetail.effect_raw.replace(/\n/g, "<br />"),
        }}
      />
      <Text size="lg" fw={"bold"} pt={5}>
        Flavor Text :{" "}
      </Text>
      {dataDetail.flavor ? (
        <Flex
          dangerouslySetInnerHTML={{
            __html: dataDetail.flavor.replace(/\n/g, "<br />"),
          }}
        />
      ) : (
        <Text size={"sm"}>No flavor text available</Text>
      )}
    </>
  );
}
