"use client";
import { Box, Flex, SimpleGrid, Text } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { GaService } from "@/api/services";
import { errorNotification } from "@/utils";
import { useViewportSize } from "@mantine/hooks";
import { DetailCardGrandArchive, Params, ResponseGrandArchive } from "@/types";
import { LoadMoreIndicator, ModalUniversal, SearchInput } from "@/components";
import useBoundStore from "@/store";
import { ModalDetailCardGA } from "@/containers/componentsGA";
import { ContentCardGA } from "@/containers/GATabs/components";
import ShowLoadingModal from "@/utils/swal";
import classes from "./addCard.module.css";

interface PropsAddCardGAInterface {
  cardAdded: DetailCardGrandArchive[];
  openModal: boolean;
  setOpenModal: (_dataDetail: boolean) => void;
  addCardData: (_value: DetailCardGrandArchive, valueAdded: number) => void;
}

export function AddCardGA({
  cardAdded,
  openModal,
  setOpenModal,
  addCardData,
}: PropsAddCardGAInterface) {
  const [data, setData] = useState<ResponseGrandArchive | null>(null);
  const [activeData, setActiveData] = useState<DetailCardGrandArchive | null>(
    null,
  );
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { filterData, dataGroup } = useBoundStore().generalStoreData;
  const { width } = useViewportSize();
  const isMobile = width <= 768;
  const isLaptop = width <= 1400;

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchingRef = useRef(false);
  const isTriggeringRef = useRef(false);
  const pageRef = useRef(1);

  async function getListAllCard(nextPage = 1) {
    if (fetchingRef.current) return;

    fetchingRef.current = true;

    try {
      if (nextPage === 1) {
        setLoading(true);
      } else {
        setIsFetchingMore(true);
      }

      const Param: Params = {
        pageSize: 15,
        name: "" + search,
        page: nextPage,
        sets: filterData.sets,
        elements: filterData.elements,
        effect: filterData.effect,
        legality_format: filterData.legality_format,
        legality_state: filterData.legality_state,
        stats: "cost_memory>=0",
      };

      const response = await GaService.getAllDataCardGA(Param);

      if (response) {
        const enrichedData = response.data.map(
          (item: DetailCardGrandArchive) => {
            const groups = dataGroup.filter((g) =>
              item.result_editions.some((edition) =>
                edition.set.prefix.includes(g.abbreviation),
              ),
            );

            return {
              ...item,
              dataGroup: groups.length ? groups : [],
            };
          },
        );

        setData((prev) => {
          if (!prev || nextPage === 1)
            return {
              ...response,
              data: enrichedData,
            };

          return {
            ...response,
            data: [...prev.data, ...enrichedData],
          };
        });

        const totalPage = Number(response.total_pages || 0);
        setHasMore(nextPage < totalPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      errorNotification(error);
    } finally {
      fetchingRef.current = false;
      setLoading(false);
      setIsFetchingMore(false);
      isTriggeringRef.current = false;
    }
  }

  useEffect(() => {
    if (dataGroup.length > 0 && openModal) {
      pageRef.current = 1;
      isTriggeringRef.current = false;

      setData(null);
      setHasMore(false);

      setTimeout(() => {
        getListAllCard(1);
      }, 100); // kasih napas dikit
    }
  }, [search, dataGroup, filterData, openModal]);

  useEffect(() => {
    if (openModal == true) {
      if (!loadMoreRef.current || !hasMore) return;

      const element = loadMoreRef.current;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            !fetchingRef.current &&
            !isTriggeringRef.current
          ) {
            isTriggeringRef.current = true;

            if (data && pageRef.current >= data.total_pages) return;

            pageRef.current += 1;
            getListAllCard(pageRef.current);
          }
        },
        {
          rootMargin: "200px",
          threshold: 0.1,
        },
      );

      observerRef.current.observe(element);

      return () => {
        observerRef.current?.disconnect();
      };
    }
  }, [hasMore, data]);

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

    window.addEventListener("addGA", handlePopState);

    return () => {
      window.removeEventListener("addGA", handlePopState);
    };
  }, [openModal]);

  const handleClose = () => {
    setOpenModal(false);

    // hanya back kalau state kita modal
    if (window.history.state?.modal) {
      window.history.back();
    }
  };

  useEffect(() => {
    console.log(cardAdded);
  }, [cardAdded]);

  return (
    <>
      <ModalUniversal
        opened={openModal}
        title={null}
        close={handleClose}
        size={"100%"}
      >
        <Box className={classes.stickySearch}>
          <SearchInput
            value={search}
            setSearchData={setSearch}
            placeholder="Cari Material Card..."
          />
        </Box>
        <Flex
          h={data && data.total_cards > 6 ? "100%" : "100vh"}
          direction="column"
          pt={10}
        >
          <Flex
            justify="space-between"
            w="100%"
            pb={10}
            direction="column"
            gap={5}
          >
            <Text size="md" fw="bold" c="white">
              Summary
            </Text>
            {data ? (
              <Text size="sm" c="white">
                Showing 1 - {data.paginated_cards_count} of {data.total_cards}{" "}
                total cards...
              </Text>
            ) : (
              ""
            )}

            <SimpleGrid
              cols={isMobile ? 1 : isLaptop ? 3 : 4}
              spacing="md"
              pb={10}
            >
              {data?.data?.map((value, index) => (
                <React.Fragment key={index}>
                  <ContentCardGA
                    value={value}
                    canAdd={true}
                    isAdded={cardAdded.some(
                      (valueData) =>
                        valueData.uuid === value.uuid &&
                        valueData.addedCard > 0,
                    )}
                    isDetail={true}
                    onClick={() => {
                      setActiveData(value);
                      setOpenModalDetail(true);
                    }}
                    addData={(valueCard, valueAdded) => {
                      addCardData(valueCard, valueAdded);
                    }}
                  />
                </React.Fragment>
              ))}

              {hasMore && (
                <LoadMoreIndicator
                  ref={loadMoreRef}
                  isFetchingMore={isFetchingMore}
                />
              )}
            </SimpleGrid>
          </Flex>

          {!hasMore && data && (
            <Text ta="center" c="dimmed" pb="md">
              No more data
            </Text>
          )}

          <ModalDetailCardGA
            dataDetail={activeData}
            openModal={openModalDetail}
            setOpenModal={setOpenModalDetail}
          />
        </Flex>
        {/* </Flex> */}
      </ModalUniversal>
      <ShowLoadingModal isLoading={loading} />
    </>
  );
}
