"use client";

import { AppShell, Flex, Image, Text } from "@mantine/core";
import { SearchInput } from "../searchInput";
import { useViewportSize } from "@mantine/hooks";
import useBoundStore from "@/store";
import classes from "./header.module.css";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { searchInput, setSearchInput, setLoading } =
    useBoundStore().generalStoreData;
  const { width } = useViewportSize();
  const isMobile = width <= 768;
  const router = useRouter();

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
              onClick={() => router.push("/home")}
            >
              <Image
                radius="md"
                h={isMobile ? 50 : 80}
                w={isMobile ? 100 : 200}
                src="/TextLogoV4.png"
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
                setSearchData={setSearchInput}
                placeholder="Cari Produk..."
              />

              <Flex
                w={isMobile ? "30%" : "40%"}
                direction={"row"}
                align={"center"}
                justify={"end"}
                gap={3}
                onClick={() => {
                  setLoading(true);
                  router.push("/deckBuilder");
                }}
              >
                <Text size="md" className={classes.textDeckBuilder}>
                  Deckbuilder
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </AppShell.Header>
    </>
  );
}
