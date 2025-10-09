import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '1rem',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <Link href={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} width={150} height={150} />
        <h3>{product.title}</h3>
      </Link>
      <p>${product.price}</p>
      <button 
        onClick={() => dispatch(addToCart(product))}
        style={{
          marginTop: '0.5rem',
          padding: '0.5rem 1rem',
          cursor: 'pointer'
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
