import { DetailCardGrandArchive, EditionGA } from "@/types";
import { Flex, Image, Select } from "@mantine/core";
import { shortRarityTranslate } from "@/utils";
import { useViewportSize } from "@mantine/hooks";
import classes from "./imageCard.module.css";

interface PropsImageCardModalDetailGATypes {
  dataDetail: DetailCardGrandArchive;
  dataSet: EditionGA;
  setDataset: (_value: EditionGA | undefined) => void;
}

export function ImageCardModalDetailGA({
  dataDetail,
  dataSet,
  setDataset,
}: PropsImageCardModalDetailGATypes) {
  const { width } = useViewportSize();
  const isMobile = width <= 768;

  return (
    <Flex direction={"column"} align={"center"} w={"100%"} gap={10}>
      <Select
        data={dataDetail.result_editions.map((valueEditionGA, index) => {
          return {
            label: `${valueEditionGA.set.name} (${shortRarityTranslate(valueEditionGA.rarity)})`,
            value: "" + valueEditionGA.uuid,
          };
        })}
        value={dataSet.uuid}
        onChange={(e) =>
          setDataset(
            dataDetail.result_editions.find(
              (valueDetail) => valueDetail.uuid == e,
            ),
          )
        }
        w={"100%"}
        classNames={{
          input: classes.inputSelect,
          dropdown: classes.dropdownSelect,
          option: classes.optionSelect,
        }}
      />
      <Image
        h="100%"
        w={isMobile ? 150 : 350}
        src={`https://api.gatcg.com${dataSet.image}`}
        alt="logo"
        radius={15}
      />
    </Flex>
  );
}
