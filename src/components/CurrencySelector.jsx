'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrency } from '../features/currency/currencySlice';

export default function CurrencySelector() {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.currency.current);

  const handleChange = (e) => {
    dispatch(setCurrency(e.target.value));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <label htmlFor="currency"></label>
      <select id="currency" value={current} onChange={handleChange}>
        <option value="EUR">€ EUR</option>
        <option value="USD">$ USD</option>
        <option value="GBP">£ GBP</option>
      </select>
    </div>
  );
}
