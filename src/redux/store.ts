// store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import productSlice from '../redux/productSlice';

export const rootReducer = combineReducers({
	cart: cartReducer,
    product:productSlice,
})
export const store = configureStore({reducer:rootReducer});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
