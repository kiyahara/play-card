"use client";

import useBoundStore from "@/store";
import { Flex, Tabs, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { ManageMaterialDecksGATabs } from "../deckBuilderTabs";

export default function ManageDeckBuilderHome() {
  const { setSearchInput, setLoading } = useBoundStore().generalStoreData;
  const [activeTab, setActiveTab] = useState<string | null>("Material");

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Flex
        direction="column"
        style={{
          flex: 1, // 🔥 penting
          minHeight: "100%",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(value) => {
            setActiveTab(value);
            setSearchInput("");
          }}
          c="white"
          styles={{
            tab: {
              backgroundColor: "transparent",
            },
          }}
        >
          <Tabs.List
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01)), rgba(0,0,0,0.8)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            <Tabs.Tab value="Material" color="#FF0033">
              <Text size="xs">Material Deck</Text>
            </Tabs.Tab>
            <Tabs.Tab value="Main" color="#FF0033">
              <Text size="xs">Main Deck</Text>
            </Tabs.Tab>
            <Tabs.Tab value="Side" color="#FF0033">
              <Text size="xs">Side Deck</Text>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="Material" p={15} bg={"#222222"}>
            <ManageMaterialDecksGATabs />
          </Tabs.Panel>
          <Tabs.Panel value="Main" p={15} bg={"#222222"}>
            <Text size="xs">Main Deck</Text>
          </Tabs.Panel>
          <Tabs.Panel value="Side" p={15} bg={"#222222"}>
            <Text size="xs">Side Deck</Text>
          </Tabs.Panel>
        </Tabs>
      </Flex>
    </>
  );
}
