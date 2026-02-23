import { useMemo } from "react";
import { useAppSelector } from "@app/hooks/typedReduxHooks";

export const useCurrency = () => {
  const current = useAppSelector((state) => state.currency.current);
  const rates = useAppSelector((state) => state.currency.rates);

  const formatter = useMemo(() => { //it only recreates when current changes 
    return new Intl.NumberFormat(undefined, { //undefined -> browser/sytem locale 
      style: "currency",
      currency: current,
    });
  }, [current]);

  const format = (price: number) => {
    const converted = price * rates[current];
    return formatter.format(converted);
  };

  return { format, current };
};