"use client";

import { ManageProductTabs } from "@/containers";
import { Flex, Tabs, Text } from "@mantine/core";
import { useState } from "react";

// const handleClick = () => {
//   showErrorModal({
//     title: "Fitur Belum Tersedia",
//     message: "Mohon Maaf Fitur ini masih dalam pengembangan.",
//     setLoading: undefined,
//     handleChange: undefined,
//   });
// };

export default function MainHome() {
  // const [loading, setLoading] = useState(false);
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
        {/* <Flex justify="center" align="center">
          <ShowLoadingModal isLoading={loading} />
        </Flex> */}
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

          <Tabs.Panel value="products" p={15} bg={"black"}>
            <ManageProductTabs />
          </Tabs.Panel>

          <Tabs.Panel value="myProducts">Settings tab content</Tabs.Panel>
        </Tabs>
      </Flex>
    </>
  );
}
