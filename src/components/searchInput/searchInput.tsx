import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";

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
  value = "", // Default to empty string if no value provided
  radiusSize,
  isDisabled,
}: SearchInputInterface) {
  const [searchQuery, setSearchQuery] = useState(value);
  const [debouncedSearch] = useDebouncedValue(searchQuery, 1500);

  // Sync internal state with parent value when it changes
  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  useEffect(() => {
    if (setSearchData) {
      setSearchData(debouncedSearch);
    }
  }, [debouncedSearch, setSearchData]);

  return (
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
      styles={{
        input: {
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",
          color: "white",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05))",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        },
      }}
    />
  );
}
