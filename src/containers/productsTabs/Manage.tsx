"use client";
import { Flex, SimpleGrid, Text } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { GaService } from "@/api/services";
import { errorNotification } from "@/utils";
import { useViewportSize } from "@mantine/hooks";
import { DetailCardGrandArchive, Params, ResponseGrandArchive } from "@/types";
import { LoadMoreIndicator } from "@/components";
import { ContentCardGA, ModalDetailCardGA } from "./components";

interface ProductTabsInterface {
  setLoading: (_value: boolean) => void;
}

export default function ManageProductTabs({
  setLoading,
}: ProductTabsInterface) {
  const [data, setData] = useState<ResponseGrandArchive | null>(null);
  const [activeData, setActiveData] = useState<DetailCardGrandArchive | null>(
    null,
  );
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const { width } = useViewportSize();
  const isMobile = width <= 768;
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const fetchingRef = useRef(false);
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
        name: "",
        page: nextPage,
      };

      const response = await GaService.getAllDataCard(Param);

      if (response) {
        setData((prev) => {
          if (!prev) return response;

          return {
            ...response,
            data:
              nextPage == 1 ? response.data : [...prev.data, ...response.data],
          };
        });

        if (response.data.length === 0) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      errorNotification(error);
    } finally {
      fetchingRef.current = false;
      setLoading(false);
      setIsFetchingMore(false);
    }
  }

  useEffect(() => {
    getListAllCard(1);
  }, []);

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const element = loadMoreRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !fetchingRef.current) {
          pageRef.current += 1;
          getListAllCard(pageRef.current);
        }
      },
      {
        rootMargin: "200px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <>
      <Flex
        h={data ? "100%" : "100vh"}
        direction={isMobile ? "column" : "column"}
      >
        <Flex
          justify={"space-between"}
          w={"100%"}
          pb={10}
          direction={"column"}
          gap={5}
        >
          <Text size="md" fw={"bold"} c={"white"}>
            Summary
          </Text>
          {data ? (
            <Text size="sm" c={"white"}>
              Showing 1 - {data.paginated_cards_count} of {data.total_cards}{" "}
              total cards...
            </Text>
          ) : (
            ""
          )}
          <SimpleGrid cols={isMobile ? 1 : 3} spacing="md" pb={10}>
            {data ? (
              <>
                {data.data.map((value, index) => (
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
              </>
            ) : (
              ""
            )}
            {hasMore && (
              <LoadMoreIndicator
                ref={loadMoreRef}
                isFetchingMore={isFetchingMore}
              />
            )}
          </SimpleGrid>
        </Flex>

        {!hasMore && (
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
    </>
  );
}
