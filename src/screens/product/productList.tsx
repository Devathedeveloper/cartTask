import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, TextInput } from 'react-native';
import { fetchProducts } from '../../redux/productSlice';
import { addProduct } from '../../redux/cartSlice';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/navigation';
import { AppDispatch } from '../../redux/store';

interface Product {
  id: number;
  img: string;
  name: string;
  price: number;
  quantity: number;
}

type ProductListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductList'
>;

type Props = {
  navigation: ProductListScreenNavigationProp;
};

const ProductList: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: any) => state.product);
  const { items } = useSelector((state: any) => state.cart);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState('name');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    setFilteredProducts(applyFilters(products, filter));
  }, [products, filter]);

  const applyFilters = (products: Product[], filter: string) => {
    return products.filter((product: Product) =>
      product.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleAddProduct = (product: Product) => {
    dispatch(addProduct(product));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.iconContainer}>
          <Ionicons
            name="cart-outline"
            size={24}
            color="black"
            onPress={() => navigation.navigate('CartList',{})}
            testID="cart-icon"
          />
          <Text style={styles.iconText}>{items.length}</Text>
        </View>
      ),
    });
  }, [navigation, items]);

  const handleSortBy = (value: string) => {
    setSortBy(value);
    const sortedProducts = [...filteredProducts];
    if (value === 'name') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === 'price') {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    setFilteredProducts(sortedProducts);
  };

  const renderItem = ({ item, index }: { item: Product; index: number }) => (
    <View style={styles.card}>
      <Image resizeMode="contain" source={{ uri: item.img }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardPrice}>{`$${item.price}`}</Text>
      <TouchableOpacity
        style={styles.cardButton}
        onPress={() => handleAddProduct(item)}
        testID={`item1_${index}`}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <View style={styles.filterInputContainer}>
          <Ionicons name="search" size={24} color="gray" style={styles.filterIcon} />
          <TextInput
            style={styles.filterInput}
            placeholder="Search by name"
            value={filter}
            onChangeText={setFilter}
          />
        </View>
        <View style={styles.sortByContainer}>
          <Text style={styles.sortByText}>Sort By:</Text>
          <TouchableOpacity
            style={[styles.sortByButton, sortBy === 'name' && styles.sortByButtonActive]}
            onPress={() => handleSortBy('name')}
          >
            <Text style={[styles.sortButtonText, sortBy === 'name' && styles.sortButtonTextActive]}>
              Name
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortByButton, sortBy === 'price' && styles.sortByButtonActive]}
            onPress={() => handleSortBy('price')}
          >
            <Text style={[styles.sortButtonText, sortBy === 'price' && styles.sortButtonTextActive]}>
              Price
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  filterInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  filterIcon: {
    marginRight: 10,
  },
  filterInput: {
    flex: 1,
    height: 40,
    color: 'gray',
    fontFamily:"OpenSans-Regular"
  },
  sortByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortByText: {
    marginRight: 5,
    fontSize: 16,
    fontFamily:"OpenSans-Regular"
  },
  sortByButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginRight: 5,
  },
  sortByButtonActive: {
    backgroundColor: '#841584',
    borderColor: '#841584',
  },
  sortButtonText: {
    fontSize: 14,
    color: 'gray',
    fontFamily:"OpenSans-Regular"
  },
  sortButtonTextActive: {
    color: '#fff',
    fontFamily:"OpenSans-Regular"
  },
  listContainer: {
    padding: 15,
  },
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
    flex: 1,
    margin: 5,
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
    fontFamily:"OpenSans-SemiBold"
  },
  cardPrice: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
    fontFamily:"OpenSans-Regular"
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
    fontFamily:"OpenSans-SemiBold"
  },
  iconContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  iconText: {
    color: 'black',
    marginLeft: 2,
  },
});

export default ProductList;
