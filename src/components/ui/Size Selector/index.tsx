import styles from "./SizeSelector.module.css";
import { Select, SelectItem } from "@heroui/select";
import { Ruler } from "lucide-react";


interface SizeSelectorProps {
  sizes?: string[] | null;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  isDisabled?: boolean;
}

export default function SizeSelector({
  sizes,
  value,
  onChange,
  error = false,
  isDisabled = false,
}: SizeSelectorProps) {
  if (!Array.isArray(sizes) || sizes.length === 0) return null;

  return (
    <div className={styles.selectWrapper}>
      <Select
        aria-label="Select size"
        isDisabled={isDisabled}
        selectedKeys={value ? [value] : []}
        onSelectionChange={(keys) => {
          const first = Array.from(keys)[0];
          onChange(first != null ? String(first) : "");
        }}
        selectorIcon={
          <Ruler
            className={styles.selectIcon}
            size={22}
            opacity={0.4}
            color="black"
            style={{ display: value === "" ? "block" : "none" }}
          />
        }
        className={styles.sizeSelector}
        classNames={{
          trigger: `${styles.sizeTrigger} ${error ? styles.sizeError : ""}`,
          value: styles.sizeValue,
          popoverContent: styles.dropdownContent,
          listbox: styles.dropdownList,
        }}
      >
        {sizes.map((size: string) => (
          <SelectItem className={styles.dropdownItem} key={size}>
            {size}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}