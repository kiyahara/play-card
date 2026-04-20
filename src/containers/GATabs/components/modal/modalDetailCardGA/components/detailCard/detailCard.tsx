import {
  DetailCardGrandArchive,
  DetailOtherOrientationCardGrandArchive,
  EditionGA,
} from "@/types";
import { Flex, Text } from "@mantine/core";
import { capitalizeManual } from "@/utils";
import classes from "./detailCard.module.css";

interface PropsDetailCardModalDetailGATypes {
  dataDetail: DetailCardGrandArchive;
  dataSet: EditionGA;
  dataOtherOrientation: DetailOtherOrientationCardGrandArchive | null;
  isFlipped: boolean;
}

export function DetailCardModalDetailGA({
  dataDetail,
  dataSet,
  dataOtherOrientation,
  isFlipped,
}: PropsDetailCardModalDetailGATypes) {
  const activeData =
    dataOtherOrientation && isFlipped ? dataOtherOrientation : dataDetail;

  return (
    <>
      <Flex align="center" gap={6} pt={5}>
        <Flex
          className={classes.elementEffect}
          style={{
            backgroundImage: `url("https://cdn2.gatcg.com/i/elements/${activeData.element.toLowerCase()}.png")`,
          }}
        />
        <Text size="md">{activeData.name}</Text>
      </Flex>
      <Flex align="center" gap={6} pt={10}>
        <Flex
          className={classes.typeEffect}
          style={{
            backgroundImage: `url("https://cdn2.gatcg.com/i/types/${activeData.types.includes("ALLY") ? "ally" : "ally"}.png")`,
          }}
        />
        <Text size={"sm"} pt={3}>
          {capitalizeManual(activeData.types.join(" "))} —{" "}
          {capitalizeManual(activeData.subtypes.join(" "))}
        </Text>
      </Flex>
      <Text size="lg" fw={"bold"} pt={5}>
        Effect :{" "}
      </Text>
      <Flex
        dangerouslySetInnerHTML={{
          __html: activeData.effect_raw.replace(/\n/g, "<br />"),
        }}
      />
      <Text size="lg" fw={"bold"} pt={5}>
        Flavor Text :{" "}
      </Text>
      {dataSet.flavor && dataSet.flavor != "" ? (
        <Text size={"md"}>{dataSet.flavor}</Text>
      ) : (
        <Text size={"sm"}>No flavor text available</Text>
      )}
    </>
  );
}
