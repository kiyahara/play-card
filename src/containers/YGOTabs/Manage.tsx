"use client";
import { Flex, SimpleGrid, Text } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { GaService, YGOService } from "@/api/services";
import { errorNotification } from "@/utils";
import { useViewportSize } from "@mantine/hooks";
import { DetailCardGrandArchive, Params, ResponseGrandArchive } from "@/types";
import { LoadMoreIndicator } from "@/components";
import { ContentCardGA, ModalDetailCardGA } from "./components";
import useBoundStore from "@/store";
import { apiYGO } from "@/api";

interface ProductYGOTabsInterface {
  setLoading: (_value: boolean) => void;
}

export default function ManageProductYGOTabs({
  setLoading,
}: ProductYGOTabsInterface) {
  const [data, setData] = useState<ResponseGrandArchive | null>(null);
  // const [activeData, setActiveData] = useState<DetailCardGrandArchive | null>(
  //   null,
  // );
  // const [openModalDetail, setOpenModalDetail] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { search } = useBoundStore().generalStoreData;
  const { width } = useViewportSize();
  const isMobile = width <= 768;
  const isLaptop = width <= 1400;

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchingRef = useRef(false);
  const isTriggeringRef = useRef(false);
  const pageRef = useRef(0);

  async function getListAllCard(nextPage = 0) {
    if (fetchingRef.current) return;

    fetchingRef.current = true;

    try {
      if (nextPage === 0) {
        setLoading(true);
      } else {
        setIsFetchingMore(true);
      }

      const Param: Params = {
        num: 15,
        // name: "" + search,
        offset: nextPage,
      };

      const response = await YGOService.getAllDataCardYGO(Param);

      if (response) {
        setData((prev) => {
          if (!prev || nextPage === 0) return response;

          return {
            ...response,
            data: [...prev.data, ...response.data],
          };
        });

        // ✅ clean hasMore logic
        console.log(response);
        const totalPage = Number(response.meta.pages_remaining || 0);
        console.log(totalPage);
        setHasMore(totalPage > 0);
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
    pageRef.current = 0;
    isTriggeringRef.current = false;

    setData(null);
    setHasMore(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    getListAllCard(1);
  }, [search]);

  // useEffect(() => {
  //   if (!loadMoreRef.current || !hasMore) return;

  //   const element = loadMoreRef.current;

  //   if (observerRef.current) {
  //     observerRef.current.disconnect();
  //   }

  //   observerRef.current = new IntersectionObserver(
  //     (entries) => {
  //       if (
  //         entries[0].isIntersecting &&
  //         !fetchingRef.current &&
  //         !isTriggeringRef.current
  //       ) {
  //         isTriggeringRef.current = true; // 🔥 lock

  //         // optional safety
  //         if (data && pageRef.current >= data.total_pages) return;

  //         pageRef.current += 15;
  //         getListAllCard(pageRef.current);
  //       }
  //     },
  //     {
  //       rootMargin: "200px",
  //       threshold: 0.1,
  //     },
  //   );

  //   observerRef.current.observe(element);

  //   return () => {
  //     observerRef.current?.disconnect();
  //   };
  // }, [hasMore, data]);

  return (
    <>
      <Flex
        h={data && data.total_cards > 6 ? "100%" : "100vh"}
        direction="column"
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

          {data && (
            <Text size="sm" c="white">
              Showing 1 - {data.paginated_cards_count} of {data.total_cards}{" "}
              total cards...
            </Text>
          )}

          <SimpleGrid
            cols={isMobile ? 1 : isLaptop ? 3 : 4}
            spacing="md"
            pb={10}
          >
            {/* {data?.data?.map((value, index) => (
              <React.Fragment key={index}>
                <ContentCardGA
                  value={value}
                  onClick={() => {
                    setActiveData(value);
                    setOpenModalDetail(true);
                  }}
                />
              </React.Fragment>
            ))} */}

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

        {/* <ModalDetailCardGA
          dataDetail={activeData}
          openModal={openModalDetail}
          setOpenModal={setOpenModalDetail}
        /> */}
      </Flex>
    </>
  );
}
