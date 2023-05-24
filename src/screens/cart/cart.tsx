import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../redux/cartSlice';

interface Product {
    id: string;
    img: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartState {
    cart: {
        items: Product[];
    };
}

const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state: CartState) => state.cart);

    const handleIncrement = (product: any) => {
        dispatch(increment(product));
    };

    const handleDecrement = (product: any) => {
        dispatch(decrement(product));
    };

    const calculateTotalAmount = () => {
        let total = 0;
        items.forEach((product: Product) => {
            total += product.price * product.quantity;
        });
        return total;
    };

    return (
        <View style={styles.container}>
            {items && items.length > 0 ? (
                items.map((product: Product) => (
                    <View key={product.id} style={styles.cartItem}>
                        <Image source={{ uri: product.img }} style={styles.image} />
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productPrice}>${product.price}</Text>
                        </View>
                        <View style={styles.quantityContainer}>
                            <Button title="-" onPress={() => handleDecrement(product)} />
                            <Text>{product.quantity}</Text>
                            <Button title="+" onPress={() => handleIncrement(product)} />
                        </View>
                    </View>
                ))
            ) : (
                <Text style={styles.noDataText}>No items in cart</Text>
            )}
            {items && items.length > 0 && <Text style={styles.total}>Total: ${calculateTotalAmount()}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        marginBottom: 5,
    },
    productPrice: {
        color: 'gray',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    total: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: 'gray',
    },
});

export default Cart;
