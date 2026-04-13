"use client";
import { Box, Card, Flex, Group, Image, SimpleGrid, Text } from "@mantine/core";
import classes from "./productsTabs.module.css";
import { useEffect, useRef, useState } from "react";
import { GaService } from "@/api/services";
import { errorNotification } from "@/utils";
import ShowLoadingModal from "@/utils/swal";
import { useViewportSize } from "@mantine/hooks";
import { Params, ResponseGrandArchive } from "@/types";
import { LoadMoreIndicator } from "@/components";

export default function ManageProductTabs() {
  const [data, setData] = useState<ResponseGrandArchive | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
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
            data: [...prev.data, ...response.data],
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
      <ShowLoadingModal isLoading={loading} />

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
              Showing {data.page} - {data.paginated_cards_count} of{" "}
              {data.total_cards} total cards...
            </Text>
          ) : (
            ""
          )}
          <SimpleGrid cols={isMobile ? 1 : 3} spacing="md" pb={10}>
            {data ? (
              <>
                {data.data.map((value, index) => (
                  <Card
                    className={classes.glassCard}
                    key={index}
                    padding={10}
                    withBorder
                    orientation="horizontal"
                    radius={12}
                    shadow="sm"
                    c="white"
                  >
                    <Box
                      style={{
                        position: "absolute",
                        width: 200,
                        height: 200,
                        background:
                          "radial-gradient(circle, rgba(255,255,255,0.15), transparent)",
                        top: -50,
                        right: -50,
                        filter: "blur(40px)",
                      }}
                    />

                    <Box
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 12,
                        background:
                          "linear-gradient(120deg, rgba(255,255,255,0.35), transparent 40%)",
                        opacity: 0.4,
                        pointerEvents: "none",
                      }}
                    />

                    <Card.Section inheritPadding px="xs" w="45%">
                      <Image
                        h="100%"
                        w={150}
                        src={`https://api.gatcg.com${value.editions[0].image}`}
                        alt="logo"
                        radius="md"
                      />
                    </Card.Section>

                    <Card.Section inheritPadding px="md" w="55%">
                      <Flex
                        justify={"space-between"}
                        direction={"column"}
                        gap={5}
                      >
                        <Text fz="md">{value.name}</Text>

                        <Box mt="xs">
                          <Text size="xs">
                            {value.editions
                              .slice(0, 3)
                              .map((item) => item.set.prefix)
                              .join(", ")}
                            {value.editions.length > 3 && " ..."}
                          </Text>
                          <Text fz="sm" c="dimmed">
                            Total: {value.editions.length} Sets
                          </Text>
                        </Box>

                        <Box mt="xs">
                          {/* <Text size="xs">
                            {value.editions
                              .slice(0, 3)
                              .map((item) => item.set.prefix)
                              .join(", ")}
                            {value.editions.length > 3 && " ..."}
                          </Text>
                          <Text fz="sm" c="dimmed">
                            Total: {value.editions.length} Sets
                          </Text> */}
                        </Box>

                        <Box mt="xs">
                          <Text size="xs">26 Listings From:</Text>
                          <Text fz="sm" c="#05772d">
                            ${44.0}
                          </Text>
                        </Box>
                      </Flex>
                    </Card.Section>
                  </Card>
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

        {/* END STATE */}
        {!hasMore && (
          <Text ta="center" c="dimmed" pb="md">
            No more data
          </Text>
        )}
      </Flex>
    </>
  );
}
