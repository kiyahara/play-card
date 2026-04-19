import ModalUniversal from "@/components/modalUniversal/modalUniversal";
import {
  DetailCardGrandArchive,
  DetailOtherOrientationCardGrandArchive,
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
  const [dataOtherOrientation, setDataOtherOrientation] =
    useState<DetailOtherOrientationCardGrandArchive | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Details");
  const [isFlipped, setIsFlipped] = useState(false);
  const [dataSet, setDataset] = useState<EditionGA | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const { width } = useViewportSize();
  const isMobile = width <= 768;

  async function getPriceByGroupId(dataForDetail: DetailCardGrandArchive) {
    setLoading(true);
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

  useEffect(() => {
    if (dataSet && dataSet.other_orientations.length > 0) {
      setDataOtherOrientation(dataSet.other_orientations[0]);
    } else {
      setDataOtherOrientation(null);
    }
    setIsFlipped(false);
  }, [dataSet]);

  useEffect(() => {
    if (openModal) {
      if (!window.history.state?.modal) {
        window.history.pushState({ modal: true }, "");
      }
    }
  }, [openModal]);

  useEffect(() => {
    const handlePopState = () => {
      if (openModal) {
        setOpenModal(false);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [openModal]);

  const handleClose = () => {
    setOpenModal(false);

    // hanya back kalau state kita modal
    if (window.history.state?.modal) {
      window.history.back();
    }
  };

  return (
    <>
      <ShowLoadingModal isLoading={loading} />

      {!loading ? (
        <ModalUniversal
          opened={openModal}
          title={null}
          close={handleClose}
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
                dataOtherOrientation={dataOtherOrientation}
                setDataset={setDataset}
                isFlipped={isFlipped}
                setIsFlipped={setIsFlipped}
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
                    flex: 1,
                  }}
                  styles={{
                    tab: {
                      borderWidth: "2px",
                    },
                    list: {
                      borderBottomWidth: "2px",
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

                  <Tabs.Panel value="Details" p={5}>
                    <DetailCardModalDetailGA
                      dataDetail={dataDetail}
                      dataOtherOrientation={dataOtherOrientation}
                      isFlipped={isFlipped}
                    />
                  </Tabs.Panel>

                  <Tabs.Panel value="Price" p={5} w={"100%"}>
                    <PriceCardModalDetailGA
                      dataSet={dataSet}
                      dataPrice={dataPrice}
                      name={dataDetail.name}
                    />
                  </Tabs.Panel>
                </Tabs>
              </Flex>
            </Flex>
          ) : null}
        </ModalUniversal>
      ) : null}
    </>
  );
}
