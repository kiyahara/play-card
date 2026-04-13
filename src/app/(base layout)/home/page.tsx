"use client";

import { ManageProductTabs } from "@/containers";
import ShowLoadingModal from "@/utils/swal";
import { Flex, Tabs, Text } from "@mantine/core";
import { useState } from "react";

export default function MainHome() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("products");
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
          onChange={setActiveTab}
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
            <Tabs.Tab value="products" color="#FF0033">
              <Text size="xs">Products</Text>
            </Tabs.Tab>
            <Tabs.Tab value="myProducts" color="#FF0033">
              <Text size="xs">My Products</Text>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="products" p={15} bg={"#222222"}>
            <ManageProductTabs setLoading={setLoading} />
          </Tabs.Panel>

          <Tabs.Panel value="myProducts">Settings tab content</Tabs.Panel>
        </Tabs>
      </Flex>
    </>
  );
}
