import React, { useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { fetchProducts } from '../../redux/productSlice';
import { addProduct } from '../../redux/cartSlice';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/navigation';

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
                <View style={styles.iconContainer}>
                    <Ionicons name="cart-outline" size={24} color="black" onPress={() => navigation.navigate("CartList")} testID="cart-icon" />
                    <Text style={styles.iconText}>{items.length}</Text>
                </View>
            ),
        });
    }, [navigation, items]);

    const renderItem = ({ item, index }: { item: Product; index: number }) => (
        <View style={styles.card} >
            <Image resizeMode='contain' source={{ uri: item.img }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardPrice}>{`$${item.price}`}</Text>
            <TouchableOpacity style={styles.cardButton} onPress={() => handleAddProduct(item)} testID={`item1_${index}`}>
                <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
        padding: 10,
    },
    cardImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    cardPrice: {
        fontSize: 16,
        color: '#888',
        marginBottom: 10,
    },
    cardButton: {
        backgroundColor: '#841584',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    listContainer: {
        padding: 15,
        backgroundColor: '#f8f8f8',
    },
    iconContainer: {
        flexDirection: "row",
        marginRight: 10,
    },
    iconText: {
        color: 'black',
        marginLeft: 2,
    }
});

export default ProductList;
