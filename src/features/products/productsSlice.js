import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, thunkAPI) => {
        // If products already loaded in the current app session, return them
        // This prevents recalculating stock during route navigation (only recalculated after full browser refresh)
        const state = thunkAPI.getState();
        const existing = state.products?.products;
        if (existing && existing.length > 0) {
          return existing;
        }

        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Error fetching the products");
        }
    }
);

const initialState = {
    products: [],
    loading: false,
    error: null,
};

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

        state.products = action.payload.map((p) => {
          // If product already has stock keep it unchanged
          if (p.stock) return p;

          const cleanTitle = p.title.trim().toLowerCase();
          const hasSizes =
            (p.category === "men's clothing" || p.category === "women's clothing") &&
            p.title.toLowerCase().trim() !== "fjallraven - foldsack no. 1 backpack, fits 15 laptops";

          return {
            ...p,
            title: nameMap[cleanTitle] || p.title,
            stock: Math.random() > 0.2 ? "In stock" : "Sold out",
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