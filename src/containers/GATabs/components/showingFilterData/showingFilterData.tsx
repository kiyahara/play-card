import { Text } from "@mantine/core";
import { InputFilterProductsInterface, ResponseGrandArchive } from "@/types";
import React from "react";
import { capitalizeManual, formatWithOr } from "@/utils";

interface PropShowingFilterDataTypes {
  data: ResponseGrandArchive | null;
  filterData: InputFilterProductsInterface;
}

export function ShowingFilterData({
  data,
  filterData,
}: PropShowingFilterDataTypes) {
  return (
    <>
      {data && (
        <>
          <Text size="sm" c="white">
            Showing 1 - {data.paginated_cards_count} of {data.total_cards} total
            cards...
          </Text>
          {(
            Object.entries(filterData) as [
              keyof InputFilterProductsInterface,
              InputFilterProductsInterface[keyof InputFilterProductsInterface],
            ][]
          )
            .filter((valueObject) => !valueObject[0].includes("state"))
            .map(([key, value], index) => {
              return (
                <React.Fragment key={index}>
                  {typeof value === "string" && value.length > 0 ? (
                    <>
                      <Text size="sm">
                        The{" "}
                        {capitalizeManual(
                          key.includes("legality") ? `Format` : key,
                        )}{" "}
                        {key.includes("legality")
                          ? `is ${filterData.legality_state != "" ? filterData.legality_state?.toLowerCase() + " in" : ""}`
                          : `includes`}{" "}
                      </Text>
                      <Text size="xs" c={"#EF4444"}>
                        {value}
                      </Text>
                    </>
                  ) : Array.isArray(value) && value.length > 0 ? (
                    <>
                      <Text size="sm">
                        The {capitalizeManual(key)} includes{" "}
                      </Text>
                      <Text size="xs" c={"#EF4444"}>
                        {formatWithOr(value)}
                      </Text>
                    </>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              );
            })}
        </>
      )}
    </>
  );
}
