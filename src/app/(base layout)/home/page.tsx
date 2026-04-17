"use client";

import {
  ManageProductGATabs,
  ManageProductMarketGATabs,
  ManageProductYGOTabs,
} from "@/containers";
import useBoundStore from "@/store";
import ShowLoadingModal from "@/utils/swal";
import { Flex, Tabs, Text } from "@mantine/core";
import { useState } from "react";

export default function MainHome() {
  const { setSearchInput } = useBoundStore().generalStoreData;
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("GA");

  return (
    <>
      <Flex
        direction="column"
        style={{
          flex: 1, // 🔥 penting
          minHeight: "100%",
        }}
      >
        <ShowLoadingModal isLoading={loading} />
        <Tabs
          value={activeTab}
          onChange={(value) => {
            setActiveTab(value);
            setSearchInput(""); // 🔥 reset langsung di sini
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
            {/* <Tabs.Tab value="YGO" color="#FF0033">
              <Text size="xs">Index Yu-Gi-Oh</Text>
            </Tabs.Tab> */}{" "}
            {/* <Tabs.Tab value="MarketGA" color="#FF0033">
              <Text size="xs">Market Grand Archive</Text>
            </Tabs.Tab> */}
          </Tabs.List>

          <Tabs.Panel value="GA" p={15} bg={"#222222"}>
            <ManageProductGATabs setLoading={setLoading} />
          </Tabs.Panel>

          {/* <Tabs.Panel value="YGO" p={15} bg={"#222222"}>
            <ManageProductYGOTabs setLoading={setLoading} />
          </Tabs.Panel> */}

          {/* <Tabs.Panel value="MarketGA" p={15} bg={"#222222"}>
            <ManageProductMarketGATabs setLoading={setLoading} />
          </Tabs.Panel> */}
        </Tabs>
      </Flex>
    </>
  );
}
