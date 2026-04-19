import { GaService } from "@/api/services";
import ModalUniversal from "@/components/modalUniversal/modalUniversal";
import useBoundStore from "@/store";
import {
  GrandArchiveFilterOptionsInterace,
  InputFilterProductsInterface,
} from "@/types";
import { errorNotification } from "@/utils";
import { Button, Flex, MultiSelect, Text, TextInput } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import classes from "./modalDetailFilter.module.css";

interface PropsModalDetailCardGATypes {
  openModal: boolean;
  setOpenModal: (_dataDetail: boolean) => void;
}

export function ModalDetailFilterGA({
  openModal,
  setOpenModal,
}: PropsModalDetailCardGATypes) {
  const { setLoading, setFilterData } = useBoundStore().generalStoreData;
  const [tempFilterData, setTempFilterData] =
    useState<InputFilterProductsInterface>({
      name: "",
      sets: [],
      element: [],
    });
  const filterFields: {
    key: keyof InputFilterProductsInterface;
    label: string;
    placeholder: string;
  }[] = [
    { key: "name", label: "Name", placeholder: 'e.g. "Genbu"' },
    { key: "sets", label: "Sets", placeholder: 'e.g. "Set 1"' },
    { key: "element", label: "Elements", placeholder: 'e.g. "Fire"' },
  ];
  const [dataOption, setDataOption] =
    useState<GrandArchiveFilterOptionsInterace | null>(null);
  const { width } = useViewportSize();
  const isMobile = width <= 768;

  async function getOptionData() {
    setLoading(true);
    try {
      const response = await GaService.getAllOptionsGA();

      if (response) {
        setDataOption(response);
      }
    } catch (error) {
      errorNotification(error);
    } finally {
      setLoading(false);
    }
  }

  function getSelectData(key: keyof InputFilterProductsInterface) {
    if (!dataOption) return [];

    switch (key) {
      case "sets":
        return (
          dataOption.set.map((item) => ({
            value: item.value,
            label: item.text,
          })) || []
        );

      case "element":
        return (
          dataOption.element.map((item) => ({
            value: item.value,
            label: item.text,
          })) || []
        );

      default:
        return [];
    }
  }

  useEffect(() => {
    if (dataOption == null && openModal) {
      getOptionData();
    }
  }, [openModal]);

  function SubmitData() {
    console.log(
      ` ${tempFilterData.name} ${tempFilterData.sets} ${tempFilterData.element}`,
    );
    setFilterData(tempFilterData);
    setTempFilterData({
      name: "",
      sets: [],
      element: [],
    });
    setOpenModal(false);
  }

  return (
    <>
      {dataOption && openModal && (
        <ModalUniversal
          opened={openModal}
          title={"Search"}
          close={() => setOpenModal(false)}
          size={isMobile ? "100%" : "70%"}
        >
          {filterFields.map((field) => (
            <Flex
              key={field.key}
              justify={"space-between"}
              align={"center"}
              mb={8}
            >
              <Text size="xs">{field.label}</Text>

              {field.label === "Name" ? (
                <TextInput
                  w="75%"
                  placeholder={field.placeholder}
                  size="xs"
                  value={tempFilterData[field.key]}
                  onChange={(e) =>
                    setTempFilterData({
                      ...tempFilterData,
                      [field.key]: e.target.value,
                    })
                  }
                  classNames={{
                    input: classes.inputGlass,
                  }}
                />
              ) : (
                <MultiSelect
                  w="75%"
                  placeholder={field.placeholder}
                  size="xs"
                  data={getSelectData(field.key)}
                  value={tempFilterData[field.key] as string[]}
                  onChange={(value) =>
                    setTempFilterData({
                      ...tempFilterData,
                      [field.key]: value,
                    })
                  }
                  classNames={{
                    input: classes.inputGlass,
                    dropdown: classes.dropdownGlass,
                    option: classes.optionGlass,
                    empty: classes.emptyGlass,
                  }}
                  renderOption={({ option }) => (
                    <>
                      {field.key == "element" ? (
                        <Flex align="center" gap={8}>
                          <Flex
                            className={classes.elementEffect}
                            style={{
                              backgroundImage: `url("https://cdn2.gatcg.com/i/elements/${option.label.toLowerCase()}.png")`,
                            }}
                          />
                          <Text size="md">{option.label}</Text>
                        </Flex>
                      ) : (
                        <Text size="md">{option.label}</Text>
                      )}
                    </>
                  )}
                  searchable
                  clearable
                  nothingFoundMessage="No data"
                  hidePickedOptions
                />
              )}
            </Flex>
          ))}
          <Flex justify="flex-end" mt="md">
            <Button onClick={SubmitData} className={classes.buttonPrimary}>
              Simpan
            </Button>
          </Flex>
        </ModalUniversal>
      )}
    </>
  );
}
