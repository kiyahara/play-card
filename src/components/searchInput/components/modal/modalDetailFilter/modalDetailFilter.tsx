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
import { ReactNode, useEffect, useState } from "react";
import classes from "./modalDetailFilter.module.css";
import {
  IconBook,
  IconBrandNationalGeographic,
  IconCards,
  IconCell,
} from "@tabler/icons-react";

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
      effect: "",
      sets: [],
      elements: [],
    });

  const filterFields: {
    key: keyof InputFilterProductsInterface;
    label: string;
    placeholder: string;
    isMulti: boolean;
    icon: ReactNode;
  }[] = [
    {
      key: "name",
      label: "Name",
      placeholder: 'e.g. "Genbu..."',
      isMulti: false,
      icon: <IconBrandNationalGeographic size={20} scale={2.5} />,
    },
    {
      key: "sets",
      label: "Sets",
      placeholder: 'e.g. "RDO..."',
      isMulti: true,
      icon: <IconCards size={20} scale={2.5} />,
    },
    {
      key: "elements",
      label: "Elements",
      placeholder: 'e.g. "Fire..."',
      isMulti: true,
      icon: <IconCell size={20} scale={2.5} />,
    },
    {
      key: "effect",
      label: "Effect",
      placeholder: 'e.g. "Floating Memory..."',
      isMulti: false,
      icon: <IconBook size={20} scale={2.5} />,
    },
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

  useEffect(() => {
    if (dataOption == null && openModal) {
      getOptionData();
    }
  }, [openModal]);

  function getSelectData(key: keyof InputFilterProductsInterface) {
    if (!dataOption) return [];

    switch (key) {
      case "sets":
        return dataOption.set.map((item) => ({
          value: item.value,
          label: item.text,
        }));

      case "elements":
        return dataOption.element.map((item) => ({
          value: item.value,
          label: item.text,
        }));

      default:
        return [];
    }
  }

  // biar pas pencet backButton yang ketutup modalnya
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
    // bkn nama random "event" resmi dari browser
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [openModal]);

  function SubmitData() {
    setFilterData(tempFilterData);
    setTempFilterData({
      name: "",
      effect: "",
      sets: [],
      elements: [],
    });

    handleClose();
  }

  const handleClose = () => {
    setOpenModal(false);

    if (window.history.state?.modal) {
      window.history.back();
    }
  };

  return (
    <>
      {dataOption && openModal && (
        <ModalUniversal
          opened={openModal}
          title={"Search"}
          close={handleClose}
          size={isMobile ? "100%" : "70%"}
        >
          {filterFields.map((field) => (
            <Flex
              key={field.key}
              direction={isMobile ? "column" : "row"}
              justify={"space-between"}
              align={isMobile ? "start" : "center"}
              mb={10}
              gap={5}
            >
              <Flex align={"center"} justify={"center"} gap={5}>
                {field.icon}
                <Text size="xs">{field.label}</Text>
              </Flex>

              {!field.isMulti ? (
                <TextInput
                  w={isMobile ? "100%" : "75%"}
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
                  w={isMobile ? "100%" : "75%"}
                  placeholder={
                    (tempFilterData[field.key]?.length ?? 0) > 0
                      ? ""
                      : field.placeholder
                  }
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
                      {field.key == "elements" ? (
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
