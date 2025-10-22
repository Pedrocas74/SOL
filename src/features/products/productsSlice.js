import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, thunkAPI) => {
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
          "fjallraven - foldsack no. 1 backpack, fits 15 laptops": "Urban Explorer Backpack",
          "mens casual premium slim fit t-shirts": "Men's Classic Slim Tee",
          "mens cotton jacket": "Men's Outdoor Explorer Jacket",
          "mens casual slim fit": "Men's Casual Slim Fit",
          "john hardy women's legends naga gold & silver dragon station chain bracelet": "Silver Dragon Chain",
          "solid gold petite micropave": "Elegant Diamond Necklace",
          "pierced owl rose gold plated stainless steel double": "Pierced Owl Rose Gold",
          "wd 2tb elements portable external hard drive - usb 3.0": "WD 2TB Portable External Hard Drive",
          "sandisk ssd plus 1tb internal ssd - sata iii 6 gb/s" : "SSD PLUS 1TB",
          "silicon power 256gb ssd 3d nand a55 slc cache performance boost sata iii 2.5" : "SSD 256GB",
          "wd 4tb gaming drive works with playstation 4 portable external hard drive": "WD 4TB Gaming HDD",
          "acer sb220q bi 21.5 inches full hd (1920 x 1080) ips ultra-thin": "Acer 21.5\" Full HD Monitor",
          "samsung 49-inch chg90 144hz curved gaming monitor (lc49hg90dmnxza) – super ultrawide screen qled": "Samsung 49\" Curved Ultrawide QLED Monitor",
          "biylaclesen women's 3-in-1 snowboard jacket winter coats": "3-in-1 Women's Snowboard Jacket",
          "lock and love women's removable hooded faux leather moto biker jacket": "Women's Moto Biker Jacket",
          "rain jacket women windbreaker striped climbing raincoats": "Women's Striped Windbreaker Rain Jacket",
          "mbj women's solid short sleeve boat neck v": "Women's Solid Short Sleeve V-Neck",
          "opna women's short sleeve moisture": "Women's Moisture-Wicking T-Shirt",
          "danvouy womens t shirt casual cotton short": "Women's Casual Cotton T-Shirt"
        };

        state.products = action.payload.map((p) => {
          const cleanTitle = p.title.trim().toLowerCase();
          return {
            ...p,
            title: nameMap[cleanTitle] || p.title,
            stock: Math.random() > 0.2 ? "In stock" : "Sold out",
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