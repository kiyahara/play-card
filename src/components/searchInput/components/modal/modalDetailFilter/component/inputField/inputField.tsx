import {
  InputFieldDetailSearchInterface,
  InputFilterProductsInterface,
} from "@/types";
import {
  Checkbox,
  ComboboxData,
  Flex,
  Group,
  MultiSelect,
  Radio,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import classes from "./inputField.module.css";

interface PropsInputFieldDetailCardGATypes {
  field: InputFieldDetailSearchInterface;
  tempFilterData: InputFilterProductsInterface;
  setTempFilterData: (_value: InputFilterProductsInterface) => void;
  getSelectData: (
    _key: keyof InputFilterProductsInterface,
  ) => ComboboxData<string> | undefined;
}

export function InputFieldDetailFilterGA({
  field,
  tempFilterData,
  setTempFilterData,
  getSelectData,
}: PropsInputFieldDetailCardGATypes) {
  const { width } = useViewportSize();
  const isMobile = width <= 768;
  return (
    <Flex
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

      {!field.isMulti && !field.isSelect ? (
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
      ) : field.isSelect ? (
        <>
          {field.key == "legality_format" ? (
            <Flex
              justify={"space-between"}
              direction={"row"}
              gap={5}
              w={isMobile ? "100%" : "75%"}
              align={"center"}
            >
              <Select
                w={isMobile ? "100%" : "60%"}
                data={getSelectData(field.key)}
                onChange={(value) =>
                  setTempFilterData({
                    ...tempFilterData,
                    [field.key]: value,
                  })
                }
                placeholder={field.placeholder}
                classNames={{
                  input: classes.inputGlass,
                  dropdown: classes.dropdownGlass,
                  option: classes.optionGlass,
                  empty: classes.emptyGlass,
                }}
              />

              <Radio.Group
                value={tempFilterData.legality_state}
                onChange={(value) =>
                  setTempFilterData({
                    ...tempFilterData,
                    legality_state: value as "LEGAL" | "RESTRICTED",
                  })
                }
                disabled={tempFilterData.legality_format == ""}
              >
                <Flex gap={"xs"} justify={"start"}>
                  <Radio
                    value="LEGAL"
                    size="xs"
                    label="Legal"
                    classNames={{
                      radio: "glass-radio",
                      label: "glass-label",
                    }}
                  />

                  <Radio
                    value="RESTRICTED"
                    label="Restricted"
                    size="xs"
                    classNames={{
                      radio: "glass-radio",
                      label: "glass-label",
                    }}
                  />
                </Flex>
              </Radio.Group>
            </Flex>
          ) : (
            <Select
              w={isMobile ? "100%" : "75%"}
              data={getSelectData(field.key)}
              onChange={(value) =>
                setTempFilterData({
                  ...tempFilterData,
                  [field.key]: value,
                })
              }
              placeholder={field.placeholder}
              classNames={{
                input: classes.inputGlass,
                dropdown: classes.dropdownGlass,
                option: classes.optionGlass,
                empty: classes.emptyGlass,
              }}
            />
          )}
        </>
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
  );
}
