"use client";

import styles from "./CurrencySelector.module.css";
//hooks
import { useAppSelector, useAppDispatch } from "@app/hooks";
//redux actions
import { setCurrency } from "../../../features/currency/currencySlice";
//icons
import { Euro, DollarSign, PoundSterling } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
//external libraries
import { Button } from "@heroui/button";
//types
import type { CurrencyCode } from "../../../features/currency/currencySlice";

export default function CurrencySelector() {
  type CurrencyOption = {
  key: CurrencyCode;
  icon: React.ReactNode;
};
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currency.current);

  const currencies: CurrencyOption[] = [
    { key: "EUR", icon: <Euro size={25} /> },
    { key: "USD", icon: <DollarSign size={25} /> },
    { key: "GBP", icon: <PoundSterling size={25} /> },
  ];

  const handleSelect = (key: CurrencyCode) => {
    dispatch(setCurrency(key));
  };

  const currentCurrency = currencies.find((c) => c.key === current) ?? currencies[0];

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button
            className={styles.triggerButton}
            variant="ghost"
            size="sm"
            disableRipple
          >
            {currentCurrency?.icon || "currency"}
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Currency selection"
          onAction={handleSelect}
          className={styles.dropdownMenu}
        >
          {currencies
            .filter((c) => c.key !== current)
            .map((currency) => (
              <DropdownItem
                key={currency.key}
                className={styles.menuItem}
                textValue={currency.key}
                onClick={() => handleSelect(currency.key)}
              >
                {currency.icon}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
