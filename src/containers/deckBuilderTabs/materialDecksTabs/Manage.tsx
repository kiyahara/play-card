"use client";
import { Box, Card, Flex, Image, SimpleGrid, Text } from "@mantine/core";
import React, { useState } from "react";
import { useViewportSize } from "@mantine/hooks";
import { DetailCardGrandArchive } from "@/types";
import {
  AddCardGA,
  CardGA,
  ModalDetailCardGA,
} from "@/containers/componentsGA";
import classes from "./materialDecksTabs.module.css";
import { IconPlus } from "@tabler/icons-react";

export default function ManageMaterialDecksGATabs() {
  const [dataCard, setDataCard] = useState<DetailCardGrandArchive[]>([]);
  const [activeData, setActiveData] = useState<DetailCardGrandArchive | null>(
    null,
  );
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalAddCard, setOpenModalAddCard] = useState(false);

  const { width } = useViewportSize();
  const isMobile = width <= 768;

  return (
    <>
      <Flex
        h={dataCard && dataCard.length > (isMobile ? 6 : 10) ? "100%" : "100vh"}
        direction="column"
      >
        <Flex
          justify="space-between"
          w="100%"
          pb={10}
          direction="column"
          gap={5}
        >
          <Text size="md" fw="bold" c="white">
            Material Decks {`(${dataCard.length} cards)`}
          </Text>

          <SimpleGrid cols={isMobile ? 2 : 6} spacing="md" pb={10}>
            {dataCard.map((value, index) => (
              <React.Fragment key={index}>
                <CardGA
                  value={value}
                  onClick={() => {
                    setActiveData(value);
                    setOpenModalDetail(true);
                  }}
                  isFit
                />
              </React.Fragment>
            ))}
            <Card
              className={classes.glassCard}
              padding={5}
              withBorder
              orientation="horizontal"
              radius={12}
              shadow="sm"
              c="white"
              w="fit-content"
            >
              <Card.Section p={5} onClick={() => setOpenModalAddCard(true)}>
                <Box className={classes.imageWrapper}>
                  <Flex justify="center" align="center">
                    <Image
                      h="100%"
                      w={isMobile ? 180 : 250}
                      src="https://img.silvie.org/misc/card-back.png"
                      alt="logo"
                      radius="md"
                    />
                  </Flex>

                  <Flex className={classes.overlay}>
                    <IconPlus size={50} />
                  </Flex>
                </Box>
              </Card.Section>
            </Card>
          </SimpleGrid>
        </Flex>

        <AddCardGA
          cardAdded={dataCard}
          openModal={openModalAddCard}
          setOpenModal={setOpenModalAddCard}
          addCardData={(data, valueAdded) => {
            setDataCard([...dataCard, { ...data, addedCard: valueAdded }]);
          }}
        />
        <ModalDetailCardGA
          dataDetail={activeData}
          openModal={openModalDetail}
          setOpenModal={setOpenModalDetail}
        />
      </Flex>
    </>
  );
}
