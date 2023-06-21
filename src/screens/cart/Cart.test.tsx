import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import Cart from './cart'; 
import { combineReducers, configureStore, legacy_createStore as createStore } from '@reduxjs/toolkit';
import { rootReducer } from '../../redux/store';
import cartReducer from '../../redux/cartSlice';

const store = configureStore({ reducer: rootReducer });

const sampleItems = [
  { id: 1, name: 'Item 1', price: 10, quantity: 2, img: 'https://example.com/item1.jpg' },
];

test('renders items in the cart', () => {
  const store = createStore(combineReducers({ cart: cartReducer }), {
    cart: {
      items: sampleItems,
    },
  });

  const { getAllByText } = render(
    <Provider store={store}>
      <Cart />
    </Provider>,
  );

  sampleItems.forEach(item => {
    const nameElements = getAllByText(item.name);
    expect(nameElements).toHaveLength(1);
  });
});

test('increments item quantity when "+" button is pressed', async () => {
  const store = createStore(combineReducers({ cart: cartReducer }), {
    cart: {
      items: sampleItems,
    },
  });

  const { getAllByText, findByText } = render(
    <Provider store={store}>
      <Cart />
    </Provider>,
  );

  fireEvent.press(getAllByText('+')[0]);
  const quantityElement = await findByText('3');  
  expect(quantityElement).toBeTruthy();
});

test('decrements item quantity when "-" button is pressed', async () => {
  const store = createStore(combineReducers({ cart: cartReducer }), {
    cart: {
      items: sampleItems,
    },
  });

  const { getAllByText, findByText } = render(
    <Provider store={store}>
      <Cart />
    </Provider>,
  );

  fireEvent.press(getAllByText('-')[0]);
  const quantityElement = await findByText('1');
  expect(quantityElement).toBeTruthy();
});


test('calculates total amount correctly', () => {
  const store = createStore(combineReducers({ cart: cartReducer }), {
    cart: {
      items: sampleItems,
    },
  });

  const { getByText } = render(
    <Provider store={store}>
      <Cart />
    </Provider>,
  );

  const totalElement = getByText(`$20`);
  expect(totalElement).toBeTruthy();
});
