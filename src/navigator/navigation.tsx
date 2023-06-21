import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductList from "../screens/product/productList";
import Cart from "../screens/cart/cart";

const Stack = createNativeStackNavigator();
export type RootStackParamList = {
  ProductList: {};
  CartList: {};
};

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            title: "Product List",
            headerTitleStyle: {
              fontWeight: "bold",
              fontFamily: "OpenSans-SemiBold",
            },
          }}
          name="ProductList"
          component={ProductList}
        />
        <Stack.Screen
          options={{
            title: "Cart List",
            headerTitleStyle: {
              fontWeight: "bold",
              fontFamily: "OpenSans-SemiBold",
            },
          }}
          name="CartList"
          component={Cart}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
