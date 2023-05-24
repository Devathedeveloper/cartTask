import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CartItemType = {
  id: number,
  name: string,
  price: number,
  img: string,
  quantity: number,
}

export type CartState = {
  items: CartItemType[]
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartItemType>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id)
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    increment: (state, action: PayloadAction<CartItemType>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id)
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1
      }
    },
    decrement: (state, action: PayloadAction<CartItemType>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id)
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity -= 1
        if (state.items[itemIndex].quantity <= 0) {
          state.items.splice(itemIndex, 1)
        }
      }
    },
  },
})

export const { addProduct, increment, decrement } = cartSlice.actions

export default cartSlice.reducer
