import { Image, Card } from "@mantine/core";
import { Ref } from "react";

interface LoadingMoreIndicatorProps {
  ref: Ref<HTMLDivElement>;
  isFetchingMore: boolean;
}
export function LoadMoreIndicator({
  isFetchingMore,
  ref,
}: LoadingMoreIndicatorProps) {
  return (
    <Card
      ref={ref}
      padding="lg"
      radius="md"
      bg={"#222222"}
      style={{
        gridColumn: "1 / -1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 180,
      }}
    >
      {isFetchingMore ? (
        <Image
          src="https://cdn2.gatcg.com/omni/loading.gif"
          alt="loading"
          w={100}
          fit="contain"
          style={{
            mixBlendMode: "lighten", // 🔥 hilangin background gelap
          }}
        />
      ) : (
        ""
      )}
    </Card>
  );
}
