"use client";

import ShowLoadingModal, { showErrorModal } from "@/utils/swal";
import { Flex, Text } from "@mantine/core";
import { useState } from "react";

const handleClick = () => {
  showErrorModal({
    title: "Fitur Belum Tersedia",
    message: "Mohon Maaf Fitur ini masih dalam pengembangan.",
    setLoading: undefined,
    handleChange: undefined,
  });
};

export default function MainHome() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Flex justify="center" align="center">
        <ShowLoadingModal isLoading={loading} />
      </Flex>
      <Flex direction={"column"} bg={"black"} h={"100%"}>
        <Text c="white">test</Text>
      </Flex>
    </>
  );
}
