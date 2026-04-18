import {
  DetailCardGrandArchive,
  DetailOtherOrientationCardGrandArchive,
  EditionGA,
} from "@/types";
import { Button, Flex, Image, Select } from "@mantine/core";
import { shortRarityTranslate } from "@/utils";
import { useViewportSize } from "@mantine/hooks";
import classes from "./imageCard.module.css";
import { IconRepeat } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface PropsImageCardModalDetailGATypes {
  dataDetail: DetailCardGrandArchive;
  dataSet: EditionGA;
  dataOtherOrientation: DetailOtherOrientationCardGrandArchive | null;
  isFlipped: boolean;
  setDataset: (_value: EditionGA | undefined) => void;
  setIsFlipped: Dispatch<SetStateAction<boolean>>;
}

export function ImageCardModalDetailGA({
  dataDetail,
  dataSet,
  dataOtherOrientation,
  isFlipped,
  setDataset,
  setIsFlipped,
}: PropsImageCardModalDetailGATypes) {
  const { width } = useViewportSize();
  const isMobile = width <= 768;

  return (
    <Flex direction="column" align="center" w="100%" gap={10}>
      <Select
        data={dataDetail.result_editions.map((valueEditionGA) => ({
          label: `${valueEditionGA.set.name} (${shortRarityTranslate(
            valueEditionGA.rarity,
          )})`,
          value: "" + valueEditionGA.uuid,
        }))}
        value={dataSet.uuid}
        onChange={(e) =>
          setDataset(
            dataDetail.result_editions.find(
              (valueDetail) => valueDetail.uuid == e,
            ),
          )
        }
        w="100%"
        classNames={{
          input: classes.inputSelect,
          dropdown: classes.dropdownSelect,
          option: classes.optionSelect,
        }}
      />

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
                src={`https://api.gatcg.com${dataSet.image}`}
                alt="front"
                radius={15}
                w="100%"
                h="100%"
                fit="cover"
              />
            </Flex>

            {/* BACK */}
            <Flex className={classes.flipBack}>
              <Image
                src={`https://api.gatcg.com${
                  dataOtherOrientation?.edition.image ?? dataSet.image
                }`}
                alt="back"
                radius={15}
                w="100%"
                h="100%"
                fit="cover"
              />
            </Flex>
          </Flex>
        </Flex>
        {dataOtherOrientation ? (
          <Button
            size={isMobile ? "xs" : "sm"}
            className={classes.floatingButton}
            onClick={() => setIsFlipped((prev) => !prev)}
          >
            <IconRepeat size={14} />
          </Button>
        ) : (
          ""
        )}
      </Flex>
    </Flex>
  );
}
