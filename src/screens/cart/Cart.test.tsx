import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import Cart from './cart';  // Import your Cart component
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../../redux/store';
import { addProduct } from '../../redux/cartSlice';  // Import addItem action

const store = configureStore({ reducer: rootReducer });

const sampleItems = [
  { id: 1, name: 'Item 1', price: 10, quantity: 2, img: 'https://example.com/item1.jpg' },
];

test('renders items in the cart', () => {
  sampleItems.forEach(item => store.dispatch(addProduct({ id: 1, name: 'Item 1', price: 10, quantity: 2, img: 'https://example.com/item1.jpg' })));

  const { getAllByText } = render(
    <Provider store={store}>
      <Cart />
    </Provider>,
  );
});
test('renders items in the cart', () => {
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

test('increments item quantity when "+" button is pressed', () => {
  addProduct(sampleItems[0]);
  const { getAllByText } = render(
    <Provider store={store}>
      <Cart />
    </Provider>,
  );

  fireEvent.press(getAllByText('+')[0]);
  const quantityElement = getAllByText('2')[0];
  expect(quantityElement).toBeTruthy();
});

test('decrements item quantity when "-" button is pressed', () => {
  const { getAllByText } = render(
    <Provider store={store}>
      <Cart />
    </Provider>,
  );

  fireEvent.press(getAllByText('-')[0]);
  const quantityElement = getAllByText('1')[0];
  expect(quantityElement).toBeTruthy();
});

test('calculates total amount correctly', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Cart />
    </Provider>,
  );
  const totalElement = getByText(`Total: $${10}`);
  expect(totalElement).toBeTruthy();
});
