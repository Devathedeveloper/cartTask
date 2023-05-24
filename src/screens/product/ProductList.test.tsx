import 'jest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import ProductList from './productList';

const mockStore = configureStore([]);

describe('ProductList', () => {
    let store: any;
    let component: JSX.Element;

    beforeEach(() => {
        store = mockStore({
            product: {
                products: [
                    {
                        id: 1,
                        name: 'Product 1',
                        price: 100,
                        img: 'https://example.com/product1.jpg'
                    },
                    {
                        id: 2,
                        name: 'Product 2',
                        price: 200,
                        img: 'https://example.com/product2.jpg'
                    }
                ]
            },
            cart: {
                items: []
            }
        });

        store.dispatch = jest.fn();

        component = (
            <Provider store={store}>
                <ProductList navigation={{ navigate: jest.fn(), setOptions: jest.fn() }} />
            </Provider>
        );
    });

    it('should render a list of products', () => {
        const { getAllByText } = render(component);

        expect(getAllByText(/Product \d/)).toHaveLength(2);
    });

    it('should dispatch an action when add to cart button is pressed', () => {
        const { getAllByText } = render(component);

        fireEvent.press(getAllByText('Add to Cart')[0]);

        expect(store.dispatch).toHaveBeenCalledTimes(2);
    });
});
