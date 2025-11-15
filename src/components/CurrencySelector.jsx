"use client";

import styles from "./styles/CurrencySelector.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../features/currency/currencySlice";
import { Euro, DollarSign, PoundSterling } from "lucide-react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";



export default function CurrencySelector() {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.currency.current);

  const currencies = [
    { key: "EUR", icon: <Euro size={25} /> },
    { key: "USD", icon: <DollarSign size={25} /> },
    { key: "GBP", icon: <PoundSterling size={25} /> },
  ];

  const handleSelect = (key) => {
    dispatch(setCurrency(key));
  };

  let currentCurrency = currencies.find((c) => c.key === current);

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
          .filter(c => c.key !== current)
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
