import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductList from '../screens/product/productList';
import Cart from '../screens/cart/cart';


const Stack = createNativeStackNavigator();
export type RootStackParamList = {
    ProductList: {};
    CartList: {}
};

function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="ProductList" component={ProductList} />
                <Stack.Screen name="CartList" component={Cart} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
