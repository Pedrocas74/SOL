import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "@app/store";
import { ProductInCart } from "@features/cart/cartSlice";

export type StockStatus = "In stock" | "Sold out";

export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  // rating?: { rate: number; count: number };
}

export type ProductSize = "XS" | "S" | "M" | "L" | "XL";

export interface Product extends ApiProduct {
  stock: StockStatus;
  sizes: ProductSize[] | null;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

const STOCK_MAP_KEY = "products:stockMap";

type FetchProductsResult = {
  products: Product[];
  cartItems: any[]; 
};

export const fetchProducts = createAsyncThunk<
  FetchProductsResult,
  void,
  { state: RootState; rejectValue: string }
>("products/fetchProducts", async (_: void, thunkAPI) => {
  const state = thunkAPI.getState();
  const existing = state.products?.products;

  if (existing && existing.length > 0) {
    return { products: existing, cartItems: state.cart?.items ?? [] };
  }

  try {
    //maintain a stable stock map for this session
    let stockMap: Record<number, StockStatus> = {};

    if (typeof window !== "undefined") {
      const nav = performance.getEntriesByType?.("navigation")?.[0] as
        | PerformanceNavigationTiming
        | undefined;

      const isReload = nav?.type === "reload";
      if (isReload) sessionStorage.removeItem(STOCK_MAP_KEY);

      try {
        stockMap = JSON.parse(sessionStorage.getItem(STOCK_MAP_KEY) || "{}") as Record<
          number,
          StockStatus
        >;
      } catch {
        stockMap = {};
      }
    }

    //get array of Products from API 
    const response = await axios.get<ApiProduct[]>("https://fakestoreapi.com/products");
    const apiProducts = response.data;

    //read cart from localStorage
    let cartItems: ProductInCart[] = [];

    if (typeof window !== "undefined") {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") ?? "null") as
              | { items?: ProductInCart[] }
              | null;

        cartItems = Array.isArray(cart?.items) ? cart!.items : [];
    } catch {
        cartItems = [];
    }
  }


    //attach stable stock to each product
    const productsWithStableStock: (ApiProduct & { stock: StockStatus })[] = apiProducts.map((p) => {
      const fromMap = stockMap[p.id];
      if (fromMap) return { ...p, stock: fromMap };

      const newStatus: StockStatus = Math.random() > 0.2 ? "In stock" : "Sold out";
      stockMap[p.id] = newStatus;
      return { ...p, stock: newStatus };
    });

    //prevents changes after login/signup
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STOCK_MAP_KEY, JSON.stringify(stockMap));
    }

    if (typeof window !== "undefined" && cartItems.length > 0) {
      const soldOutIds = new Set(
        productsWithStableStock.filter((p) => p.stock === "Sold out").map((p) => p.id),
      );

      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "{}") as { items?: any[] };
        if (Array.isArray(cart.items)) {
          cart.items = cart.items.map((item) =>
            soldOutIds.has(item.id) ? { ...item, unavailable: true } : item,
          );
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      } catch {
      }
    }

    //hard-coded title cleanups
    const nameMap: Record<string, string> = {
      "fjallraven - foldsack no. 1 backpack, fits 15 laptops": "Urban Backpack",
      "mens casual premium slim fit t-shirts": "Men's Slim Tee",
      "mens cotton jacket": "Men's Explorer Jacket",
      "mens casual slim fit": "Men's Long Sleeve",
      "john hardy women's legends naga gold & silver dragon station chain bracelet": "Dragon Chain",
      "white gold plated princess": "White Ring Princess",
      "solid gold petite micropave": "Diamond Necklace",
      "pierced owl rose gold plated stainless steel double": "Pierced Owl Rose",
      "wd 2tb elements portable external hard drive - usb 3.0": "2TB Hard Drive",
      "sandisk ssd plus 1tb internal ssd - sata iii 6 gb/s": "SSD PLUS 1TB",
      "silicon power 256gb ssd 3d nand a55 slc cache performance boost sata iii 2.5": "SSD 256GB",
      "wd 4tb gaming drive works with playstation 4 portable external hard drive": "WD 4TB Gaming HDD",
      "acer sb220q bi 21.5 inches full hd (1920 x 1080) ips ultra-thin": 'Acer 21.5" Monitor',
      "samsung 49-inch chg90 144hz curved gaming monitor (lc49hg90dmnxza) – super ultrawide screen qled":
        'Samsung 49" Monitor',
      "biylaclesen women's 3-in-1 snowboard jacket winter coats": "Women's Snow Jacket",
      "lock and love women's removable hooded faux leather moto biker jacket": "Women's Biker Jacket",
      "rain jacket women windbreaker striped climbing raincoats": "Women's Striped Jacket",
      "mbj women's solid short sleeve boat neck v": "Women's Sleeve V-Neck",
      "opna women's short sleeve moisture": "Women's Pink T-Shirt",
      "danvouy womens t shirt casual cotton short": "Women's Casual T-Shirt",
    };

    const sizes: ProductSize[] = ["XS", "S", "M", "L", "XL"];

    const finalProducts: Product[] = productsWithStableStock.map((p) => {
      const cleanTitle = p.title.trim().toLowerCase();
      const hasSizes =
        (p.category === "men's clothing" || p.category === "women's clothing") && p.id !== 1; //also ignore backpack (id: 1)

      return {
        ...p,
        title: nameMap[cleanTitle] || p.title,
        sizes: hasSizes ? sizes : null,
      };
    });

    return { products: finalProducts, cartItems };
  } catch (error: unknown) {
    // keep reject value as string
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        (error.response?.data as string) || "Error fetching the products",
      );
    }
    return thunkAPI.rejectWithValue("Error fetching the products");
  }
});

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
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<FetchProductsResult>) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error fetching the products";
      });
  },
});

export default productSlice.reducer;
