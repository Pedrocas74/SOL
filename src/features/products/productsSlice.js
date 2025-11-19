import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    products: [],
    loading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const existing = state.products?.products;
        if (existing && existing.length > 0) {
          return { products: existing, cartItems: (state.cart?.items ?? [])};
        }

        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            
            // Get cart items to check availability
            let cartItems = [];
            if (typeof window !== 'undefined') {
  const cartRaw = localStorage.getItem('cart') || '{}';
  try {
    const cart = JSON.parse(cartRaw);
    if (cart.items) {
      cart.items = cart.items.map(item =>
        item.id === p.id ? { ...item, unavailable: true } : item
      );
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  } catch {}
}
            return { 
              products: response.data,
              cartItems 
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Error fetching the products");
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        
        
        const { products, cartItems } = action.payload;

        const nameMap = {
          "fjallraven - foldsack no. 1 backpack, fits 15 laptops": "Urban Backpack",
          "mens casual premium slim fit t-shirts": "Men's Slim Tee",
          "mens cotton jacket": "Men's Explorer Jacket",
          "mens casual slim fit": "Men's Long Sleeve",
          "john hardy women's legends naga gold & silver dragon station chain bracelet": "Dragon Chain",
          "white gold plated princess" : "White Ring Princess",
          "solid gold petite micropave": "Diamond Necklace",
          "pierced owl rose gold plated stainless steel double": "Pierced Owl Rose",
          "wd 2tb elements portable external hard drive - usb 3.0": "2TB Hard Drive",
          "sandisk ssd plus 1tb internal ssd - sata iii 6 gb/s" : "SSD PLUS 1TB",
          "silicon power 256gb ssd 3d nand a55 slc cache performance boost sata iii 2.5" : "SSD 256GB",
          "wd 4tb gaming drive works with playstation 4 portable external hard drive": "WD 4TB Gaming HDD",
          "acer sb220q bi 21.5 inches full hd (1920 x 1080) ips ultra-thin": "Acer 21.5\" Monitor",
          "samsung 49-inch chg90 144hz curved gaming monitor (lc49hg90dmnxza) – super ultrawide screen qled": "Samsung 49\" Monitor",
          "biylaclesen women's 3-in-1 snowboard jacket winter coats": "Women's Snow Jacket",
          "lock and love women's removable hooded faux leather moto biker jacket": "Women's Biker Jacket",
          "rain jacket women windbreaker striped climbing raincoats": "Women's Striped Jacket",
          "mbj women's solid short sleeve boat neck v": "Women's Sleeve V-Neck",
          "opna women's short sleeve moisture": "Women's Pink T-Shirt",
          "danvouy womens t shirt casual cotton short": "Women's Casual T-Shirt",
          
        };

        const sizes = ["XS", "S", "M", "L", "XL"];

        state.products = products.map((p) => {
          // If product already has stock keep it unchanged
          if (p.stock) return p;

          const cleanTitle = p.title.trim().toLowerCase();
          const hasSizes =
            (p.category === "men's clothing" || p.category === "women's clothing") &&
            p.title.toLowerCase().trim() !== "fjallraven - foldsack no. 1 backpack, fits 15 laptops"; //ignore the backpack
          const newStatus = Math.random() > 0.2 ? "In stock" : "Sold out";

          // Check if this product is in cart and now out of stock
          const inCart = cartItems.some(item => item.id === p.id);
          if (inCart && newStock === "Sold out") {
            // Update cart item to mark as unavailable
            const cart = JSON.parse(localStorage.getItem('cart') || '{}');
            if (cart.items) {
                cart.items = cart.items.map(item => 
                    item.id === p.id 
                        ? { ...item, unavailable: true }
                        : item
                );
                localStorage.setItem('cart', JSON.stringify(cart));
            }
          }

          return {
            ...p,
            title: nameMap[cleanTitle] || p.title,
            stock: newStatus,
            sizes: hasSizes ? sizes : null,
            
          }; 
        });
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
});


export default productSlice.reducer;