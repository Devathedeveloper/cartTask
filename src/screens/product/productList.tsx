import React, { useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button, FlatList, Image, StyleSheet } from 'react-native';
import { fetchProducts } from '../../redux/productSlice';
import { addProduct } from '../../redux/cartSlice';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App'; // assume you have defined types for your navigation routes in App.tsx file

interface Product {
    id: number;
    img: string;
    name: string;
    price: number;
    quantity: number
}

type ProductListScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'ProductList'
>;

type Props = {
    navigation: ProductListScreenNavigationProp;
};

const ProductList: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch();
    const { products } = useSelector((state: any) => (state.product));
    const { items } = useSelector((state: any) => state.cart);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const handleAddProduct = (product: Product) => {
        dispatch(addProduct(product));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.iconStyle}>
                    <Ionicons name="cart-outline" size={24} color="black" onPress={() => navigation.navigate("CartList")} testID="cart-icon" />
                    <Text>{items.length}</Text>
                </View>
            ),

        });
    }, [navigation, items]);

    const renderItem = ({ item, index }: { item: Product; index: number }) => (
        <View style={styles.container} >
            <Image source={{ uri: item.img }} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>{`$${item.price}`}</Text>
            <Button title="Add to Cart" onPress={() => handleAddProduct(item)} color="#841584" testID={`item1_${index}`} />
        </View>
    );

    return (
        <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        color: '#888',
        marginBottom: 10,
    },
    list: {
        padding: 10,
    },
    iconStyle: {
        flexDirection: "row"
    }
});

export default ProductList;
