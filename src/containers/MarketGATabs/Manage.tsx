"use client";
import { Flex } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { marketGAService } from "@/api/services";
import { errorNotification } from "@/utils";
// import { useViewportSize } from "@mantine/hooks";
import { ResponseGrandArchive } from "@/types";
// import { LoadMoreIndicator } from "@/components";
// import { ContentCardGA, ModalDetailCardGA } from "./components";
import useBoundStore from "@/store";

interface ProductGATabsInterface {
  setLoading: (_value: boolean) => void;
}

export default function ManageProductMarketGATabs({
  setLoading,
}: ProductGATabsInterface) {
  const [data, setData] = useState<ResponseGrandArchive | null>(null);
  // const [activeData, setActiveData] = useState<DetailCardGrandArchive | null>(
  //   null
  // );
  // const [openModalDetail, setOpenModalDetail] = useState(false);
  // const [hasMore, setHasMore] = useState(false);
  // const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { search } = useBoundStore().generalStoreData;
  // const { width } = useViewportSize();
  // const isMobile = width <= 768;
  // const isLaptop = width <= 1400;

  // const loadMoreRef = useRef<HTMLDivElement | null>(null);
  // const observerRef = useRef<IntersectionObserver | null>(null);

  // const fetchingRef = useRef(false);
  // const isTriggeringRef = useRef(false);
  // const pageRef = useRef(1);
  // nextPage = 1
  async function getGroupProductGA() {
    // if (fetchingRef.current) return;

    // fetchingRef.current = true;
    setLoading(true);
    try {
      // if (nextPage === 1) {
      //   setLoading(true);
      // } else {
      //   setIsFetchingMore(true);
      // }

      // const Param: Params = {
      //   pageSize: 15,
      //   name: "" + search,
      //   page: nextPage,
      // };

      const response = await marketGAService.getGroupsByCategoryId(74);

      if (response) {
        // setData((prev) => {
        //   if (!prev || nextPage === 1) return response;

        //   return {
        //     ...response,
        //     data: [...prev.data, ...response.data],
        //   };
        // });

        // ✅ clean hasMore logic
        console.log(response);
        setData(response);
        // const totalPage = Number(response.total_pages || 0);
        // console.log(totalPage);
        // setHasMore(nextPage < totalPage);
      }
      // else {
      //   setHasMore(false);
      // }
    } catch (error) {
      errorNotification(error);
    } finally {
      // fetchingRef.current = false;
      setLoading(false);
      // setIsFetchingMore(false);
      // isTriggeringRef.current = false;
    }
  }

  useEffect(() => {
    getGroupProductGA();
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

  //         pageRef.current += 1;
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
        {/* <Flex
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
            {data?.data?.map((value, index) => (
              <React.Fragment key={index}>
                <ContentCardGA
                  value={value}
                  onClick={() => {
                    setActiveData(value);
                    setOpenModalDetail(true);
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
        /> */}
      </Flex>
    </>
  );
}
