
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the shape of our state
interface ProductState {
  products: any[];
  error: string | null |any;
  loading:boolean
}

// Initial state
const initialState: ProductState = {
  products: [],
  error: null,
  loading:false
};
interface Product {
  id: number;
  title: string;
  price: number;
}
export const fetchProducts = createAsyncThunk<Product[], void>(
  'products/fetchProducts',
  async () => {
    try {
      const response = await axios.get<Product[]>('https://my-json-server.typicode.com/benirvingplt/products/products');
      return response.data;
    } catch (error) {
      throw new Error('API error');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default productSlice.reducer;
