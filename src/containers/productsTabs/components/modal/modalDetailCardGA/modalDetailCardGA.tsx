import ModalUniversal from "@/components/modalUniversal/modalUniversal";
import { DetailCardGrandArchive } from "@/types";
import { Box, Card, Flex, Image, Text } from "@mantine/core";
import { formatUSD } from "@/utils";

interface PropsModalDetailCardGATypes {
  dataDetail: DetailCardGrandArchive | null;
  openModal: boolean;
  setOpenModal: (_dataDetail: boolean) => void;
}

export function ModalDetailCardGA({
  dataDetail,
  openModal,
  setOpenModal,
}: PropsModalDetailCardGATypes) {
  return (
    <ModalUniversal
      opened={openModal}
      title={null}
      close={() => setOpenModal(false)}
      size="100%"
    >
      {dataDetail ? (
        <Flex bg={"black"}>
          <Flex px="xs" w="45%">
            <Image
              h="100%"
              w={150}
              src={`https://api.gatcg.com${dataDetail.editions[0].image}`}
              alt="logo"
              radius="md"
            />
          </Flex>

          <Flex px="md" w="55%">
            <Flex justify={"space-between"} direction={"column"} gap={5}>
              <Text fz="md">{dataDetail.name}</Text>

              <Box mt="xs">
                <Text size="sm">
                  {dataDetail.editions
                    .slice(0, 3)
                    .map((item) => item.set.prefix)
                    .join(", ")}
                  {dataDetail.editions.length > 3 && " ..."}
                </Text>
                <Text fz="sm" c="dimmed">
                  Total: {dataDetail.editions.length} Sets
                </Text>
              </Box>

              <Box mt="xs"></Box>

              <Box mt="xs">
                <Text size="sm">26 Listings From:</Text>
                <Text fz="lg" c="#05772d">
                  {formatUSD(44.2)}
                </Text>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        ""
      )}
    </ModalUniversal>
  );
}
