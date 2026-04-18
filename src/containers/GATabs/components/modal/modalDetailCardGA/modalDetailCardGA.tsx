import ModalUniversal from "@/components/modalUniversal/modalUniversal";
import {
  DetailCardGrandArchive,
  DetailProductGAWithPriceInterface,
  EditionGA,
} from "@/types";
import { Flex, Tabs, Text } from "@mantine/core";
import { errorNotification } from "@/utils";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { marketGAService } from "@/api/services";
import ShowLoadingModal from "@/utils/swal";
import {
  DetailCardModalDetailGA,
  ImageCardModalDetailGA,
  PriceCardModalDetailGA,
} from "./components";

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
  const [dataPrice, setDataPrice] = useState<
    DetailProductGAWithPriceInterface[]
  >([]);
  const [activeTab, setActiveTab] = useState<string>("Details");
  const [dataSet, setDataset] = useState<EditionGA | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const { width } = useViewportSize();
  const isMobile = width <= 768;

  async function getPriceByGroupId(dataForDetail: DetailCardGrandArchive) {
    setLoading(true);
    console.log(dataDetail);
    try {
      const groupIds = dataForDetail.dataGroup.map((e) => e.groupId);
      const response = await marketGAService.getPriceByGroupId(
        groupIds.length > 0 ? groupIds.join(",") : "",
        dataForDetail.name ?? "",
      );

      if (response) {
        setDataset(dataForDetail.result_editions[0]);
        setDataPrice(response.data);
      }
    } catch (error) {
      errorNotification(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (dataDetail && openModal) {
      if (dataDetail.dataGroup.length > 0) {
        getPriceByGroupId(dataDetail);
      } else {
        setDataset(dataDetail.result_editions[0]);
      }
    } else {
      setActiveTab("Details");
      setDataset(undefined);
    }
  }, [openModal]);

  return (
    <>
      <ShowLoadingModal isLoading={loading} />
      {!loading ? (
        <ModalUniversal
          opened={openModal}
          title={null}
          close={() => setOpenModal(false)}
          size={isMobile ? "100%" : "70%"}
        >
          {dataDetail && dataSet ? (
            <Flex
              justify={"start"}
              align={isMobile ? "center" : "start"}
              gap={20}
              p={16}
              direction={isMobile ? "column" : "row"}
              style={{
                background: "transparent",
                borderRadius: 20,
              }}
            >
              <ImageCardModalDetailGA
                dataDetail={dataDetail}
                dataSet={dataSet}
                setDataset={setDataset}
              />

              <Flex
                justify={"space-between"}
                align={"start"}
                direction={"column"}
                gap={5}
                w={"100%"}
              >
                <Tabs
                  value={activeTab}
                  onChange={(value) => {
                    setActiveTab(value ?? "");
                  }}
                  variant="outline"
                  c="white"
                  style={{
                    width: "100%",
                    flex: 1, // 🔥 ini kunci
                  }}
                  styles={{
                    tab: {
                      borderWidth: "2px",
                    },
                    list: {
                      borderBottomWidth: "2px", // garis bawah juga ikut tebal
                    },
                  }}
                >
                  <Tabs.List>
                    <Tabs.Tab value="Details" color="#FF0033">
                      <Text size="xs">Details</Text>
                    </Tabs.Tab>
                    <Tabs.Tab value="Price" color="#FF0033">
                      <Text size="xs">Price</Text>
                    </Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel
                    value="Details"
                    p={5}
                    style={{
                      background: "transparent",
                      borderRadius: 20,
                    }}
                  >
                    <DetailCardModalDetailGA dataDetail={dataDetail} />
                  </Tabs.Panel>
                  <Tabs.Panel
                    value="Price"
                    p={5}
                    style={{
                      background: "transparent",
                      borderRadius: 20,
                    }}
                    w={"100%"}
                  >
                    <PriceCardModalDetailGA
                      dataSet={dataSet}
                      dataPrice={dataPrice}
                      name={dataDetail.name}
                    />
                  </Tabs.Panel>
                </Tabs>
              </Flex>
            </Flex>
          ) : (
            ""
          )}
        </ModalUniversal>
      ) : (
        ""
      )}
    </>
  );
}
