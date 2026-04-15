"use client";

import { ActionIcon, AppShell, Flex, Image } from "@mantine/core";
import { IconShoppingCartFilled, IconUserFilled } from "@tabler/icons-react";
import { SearchInput } from "../searchInput";
import { useViewportSize } from "@mantine/hooks";
import classes from "./header.module.css";
import useBoundStore from "@/store";

export function Navbar() {
  const { searchInput, setSearchInput } = useBoundStore().generalStoreData;

  const { width } = useViewportSize();
  const isMobile = width <= 768;

  return (
    <>
      <AppShell.Header withBorder={false}>
        <Flex direction="column" w="100%">
          <Flex
            w={"100%"}
            align={"center"}
            justify={"space-between"}
            pr={5}
            pt={isMobile ? 0 : 10}
          >
            <Flex
              w="20%"
              justify="flex-start"
              align="flex-start"
              style={{ textAlign: "left" }}
            >
              <Image
                radius="md"
                h={isMobile ? 50 : 80}
                w={isMobile ? 100 : 200}
                src="/TextLogoV3.png"
                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                alt="logo"
                style={{ cursor: "pointer", display: "block" }}
              />
            </Flex>

            <Flex
              direction={"row"}
              align={"center"}
              gap={0}
              w={"80%"}
              justify={"space-between"}
            >
              <SearchInput
                value={searchInput}
                className={classes.glass}
                setSearchData={setSearchInput}
                placeholder="Cari Produk..."
              />

              <Flex
                w={isMobile ? "30%" : "40%"}
                direction={"row"}
                align={"center"}
                justify={"end"}
                gap={3}
              >
                {/* <ActionIcon variant="transparent" aria-label="Setting">
                  <IconShoppingCartFilled
                    width={20}
                    height={20}
                    color="#fff"
                    stroke={2}
                    //   onClick={handleSetting}
                  />
                </ActionIcon>
                <ActionIcon variant="transparent" aria-label="Setting">
                  <IconUserFilled
                    width={20}
                    height={20}
                    color="#fff"
                    stroke={2}
                    //   onClick={handleSetting}
                  />
                </ActionIcon> */}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </AppShell.Header>
    </>
  );
}
