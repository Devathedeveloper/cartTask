import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../redux/cartSlice';

interface Product {
    id: number,
    name: string,
    price: number,
    img: string,
    quantity: number,
}

interface CartState {
    cart: {
        items: Product[];
    };
}

const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state: CartState) => state.cart);

    const handleIncrement = (product: Product) => {
        dispatch(increment(product));
    };

    const handleDecrement = (product: Product) => {
        dispatch(decrement(product));
    };

    const calculateTotalAmount = () => {
        let total = 0;
        items.forEach((product: Product) => {
            total += product.price * product.quantity;
        });
        return Math.round(total * 100) / 100;
    };

    return (
        <View style={styles.container}>
            {items && items.length > 0 ? (
                items.map((product: Product) => (
                    <View key={product.id} style={styles.cartItem}>
                        <Image source={{ uri: product.img }} style={styles.image} resizeMode='contain' />
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productPrice}>${product.price}</Text>
                        </View>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity style={styles.quantityButton} onPress={() => handleDecrement(product)}>
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{product.quantity}</Text>
                            <TouchableOpacity style={styles.quantityButton} onPress={() => handleIncrement(product)}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            ) : (
                <Text style={styles.noDataText}>No items in cart</Text>
            )}
            {items && items.length > 0 && (
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total:</Text>
                    <Text style={styles.totalAmount}>${calculateTotalAmount()}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f8f8f8',
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        marginBottom: 5,
        fontFamily:"OpenSans-Regular"
    },
    productPrice: {
        color: 'gray',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#841584',
        padding: 5,
        borderRadius: 5,
    },
    quantityText: {
        marginHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily:"OpenSans-Regular"
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily:"OpenSans-Regular"
    },
    total: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily:"OpenSans-Regular"
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: 'gray',
    },
    totalContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderTopWidth: 1,
        borderTopColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#841584',
        fontFamily:"OpenSans-Regular"
    },
});

export default Cart;
