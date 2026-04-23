import { TextInput } from "@mantine/core";
import { IconAdjustmentsHorizontal, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { ModalDetailFilterGA } from "./components";
import classes from "./searchInput.module.css";

interface SearchInputInterface {
  placeholder?: string;
  setSearchData: (_value: string) => void;
  className?: string;
  setPage?: (_value: number) => void;
  value?: string; // Add value prop to receive initial/current value from parent
  radiusSize?: number;
  isDisabled?: boolean;
}

export function SearchInput({
  setSearchData,
  className,
  placeholder,
  value = "",
  radiusSize,
  isDisabled,
}: SearchInputInterface) {
  const [searchQuery, setSearchQuery] = useState(value);
  const [openModalDetail, setOpenModalDetail] = useState<boolean>(false);
  const [debouncedSearch] = useDebouncedValue(searchQuery, 1500);

  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  useEffect(() => {
    if (setSearchData) {
      setSearchData(debouncedSearch);
    }
  }, [debouncedSearch, setSearchData]);

  return (
    <>
      <TextInput
        className={className}
        w="100%"
        placeholder={`${placeholder ? placeholder : "Cari..."}`}
        leftSection={<IconSearch size={20} stroke={2} />}
        radius={radiusSize ?? "md"}
        size="xs"
        value={!isDisabled ? searchQuery : ""}
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
        disabled={isDisabled}
        rightSection={
          <IconAdjustmentsHorizontal
            size={20}
            stroke={2}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOpenModalDetail(true);
            }}
          />
        }
        classNames={{
          input: classes.inputSearch,
        }}
      />
      <ModalDetailFilterGA
        openModal={openModalDetail}
        setOpenModal={setOpenModalDetail}
      />
    </>
  );
}
