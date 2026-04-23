"use client";

import { marketGAService } from "@/api/services";
import { ManageProductGATabs } from "@/containers";
import useBoundStore from "@/store";
import { errorNotification } from "@/utils";
import { Flex, Tabs, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export default function ManageMainHome() {
  const { setSearchInput, setLoading, setDataGroup } =
    useBoundStore().generalStoreData;
  const [activeTab, setActiveTab] = useState<string | null>("GA");

  async function getGroupProductGA() {
    setLoading(true);
    try {
      const response = await marketGAService.getGroupsByCategoryId(74);

      if (response) {
        setDataGroup(response);
      }
    } catch (error) {
      errorNotification(error);
    }
  }

  useEffect(() => {
    getGroupProductGA();
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
            <Tabs.Tab value="GA" color="#FF0033">
              <Text size="xs">Grand Archive</Text>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="GA" p={15} bg={"#222222"}>
            <ManageProductGATabs />
          </Tabs.Panel>
        </Tabs>
      </Flex>
    </>
  );
}
