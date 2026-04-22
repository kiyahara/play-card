import { GaService } from "@/api/services";
import ModalUniversal from "@/components/modalUniversal/modalUniversal";
import useBoundStore from "@/store";
import {
  GrandArchiveFilterOptionsInterace,
  InputFieldDetailSearchInterface,
  InputFilterProductsInterface,
} from "@/types";
import { errorNotification } from "@/utils";
import { Button, Flex } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import classes from "./modalDetailFilter.module.css";
import {
  IconBook,
  IconBrandNationalGeographic,
  IconCards,
  IconCell,
  IconScaleFilled,
} from "@tabler/icons-react";
import { InputFieldDetailFilterGA } from "./component";

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
      legality_format: "",
      legality_state: "",
    });

  const filterFields: InputFieldDetailSearchInterface[] = [
    {
      key: "name",
      label: "Name",
      placeholder: 'e.g. "Genbu..."',
      isMulti: false,
      isSelect: false,
      icon: <IconBrandNationalGeographic size={20} scale={2.5} />,
    },
    {
      key: "sets",
      label: "Sets",
      placeholder: 'e.g. "RDO..."',
      isMulti: true,
      isSelect: false,
      icon: <IconCards size={20} scale={2.5} />,
    },
    {
      key: "elements",
      label: "Elements",
      placeholder: 'e.g. "Fire..."',
      isMulti: true,
      isSelect: false,
      icon: <IconCell size={20} scale={2.5} />,
    },
    {
      key: "effect",
      label: "Effect",
      placeholder: 'e.g. "Floating Memory..."',
      isMulti: false,
      isSelect: false,
      icon: <IconBook size={20} scale={2.5} />,
    },
    {
      key: "legality_format",
      label: "Format",
      placeholder: 'e.g. "Standard..."',
      isMulti: false,
      isSelect: true,
      icon: <IconScaleFilled size={20} scale={2.5} />,
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
      handleClose();
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
      case "legality_format":
        return dataOption.gameFormat.map((item) => ({
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

    handleClose();
  }

  const handleClose = () => {
    setOpenModal(false);
    setTempFilterData({
      name: "",
      effect: "",
      sets: [],
      elements: [],
      legality_state: "",
      legality_format: "",
    });
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
          {filterFields.map((field, index) => (
            <React.Fragment key={index}>
              <InputFieldDetailFilterGA
                field={field}
                tempFilterData={tempFilterData}
                setTempFilterData={setTempFilterData}
                getSelectData={getSelectData}
              />
            </React.Fragment>
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
