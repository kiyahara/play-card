"use client";
import { Flex, SimpleGrid, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useViewportSize } from "@mantine/hooks";
import { DetailCardGrandArchive } from "@/types";
import { CardGA } from "./components";

export default function ManageMaterialDecksGATabs() {
  const [data, setData] = useState<DetailCardGrandArchive[]>([]);
  const [activeData, setActiveData] = useState<DetailCardGrandArchive | null>(
    null,
  );
  const [openModalDetail, setOpenModalDetail] = useState(false);

  const { width } = useViewportSize();
  const isMobile = width <= 768;
  const isLaptop = width <= 1400;

  useEffect(() => {
    setData([]);
    console.log(activeData);
    console.log(openModalDetail);
  }, []);

  return (
    <>
      <Flex h={data && data.length > 6 ? "100%" : "100vh"} direction="column">
        <Flex
          justify="space-between"
          w="100%"
          pb={10}
          direction="column"
          gap={5}
        >
          <Text size="md" fw="bold" c="white">
            Material Decks {`(${data.length} cards)`}
          </Text>

          <SimpleGrid
            cols={isMobile ? 1 : isLaptop ? 3 : 4}
            spacing="md"
            pb={10}
          >
            {data?.map((value, index) => (
              <React.Fragment key={index}>
                <CardGA
                  value={value}
                  onClick={() => {
                    setActiveData(value);
                    setOpenModalDetail(true);
                  }}
                />
              </React.Fragment>
            ))}
          </SimpleGrid>
        </Flex>
        {/* 
        <ModalDetailCardGA
          dataDetail={activeData}
          openModal={openModalDetail}
          setOpenModal={setOpenModalDetail}
        /> */}
      </Flex>
    </>
  );
}
