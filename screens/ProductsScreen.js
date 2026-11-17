import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard'; // <-- Impor komponen terpisah

export default function ProductsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setPage(1);
      setIsRefreshing(false);
    }, 1500);
  };

  const displayedProducts = useMemo(() => {
    const filtered = searchQuery.trim()
      ? PRODUCTS.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : PRODUCTS;
    
    return filtered.slice(0, page * ITEMS_PER_PAGE);
  }, [searchQuery, page]);

  const handleLoadMore = () => {
    const totalFilteredCount = searchQuery.trim()
      ? PRODUCTS.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        ).length
      : PRODUCTS.length;

    if (isLoadingMore || displayedProducts.length >= totalFilteredCount) return;

    setIsLoadingMore(true);
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setIsLoadingMore(false);
    }, 800);
  };

  const handleProductPress = (product) => {
    Alert.alert(
      product.name,
      `Kategori: ${product.category}\nHarga: Rp ${product.price.toLocaleString('id-ID')}\nRating: ⭐ ${product.rating} | Terjual: ${product.sold}`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari produk atau kategori..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              setPage(1);
            }}
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <Text style={styles.clearButton} onPress={() => setSearchQuery('')}>✕</Text>
          )}
        </View>
        <Text style={styles.resultInfo}>
          {searchQuery
            ? `Menampilkan hasil untuk "${searchQuery}"`
            : `Menampilkan ${displayedProducts.length} dari ${PRODUCTS.length} produk`}
        </Text>
      </View>

      <FlatList
        data={displayedProducts}
        renderItem={({ item }) => <ProductCard item={item} onPress={handleProductPress} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        
        refreshing={isRefreshing}
        onRefresh={handleRefresh}

        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}

        ListFooterComponent={() =>
          isLoadingMore ? (
            <View style={styles.footerLoader}>
              <Text style={styles.footerText}>Memuat lebih banyak produk...</Text>
            </View>
          ) : null
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>Produk "{searchQuery}" tidak ditemukan</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  searchHeader: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 10, fontSize: 14, color: '#111827' },
  clearButton: { fontSize: 14, color: '#9ca3af', paddingHorizontal: 8 },
  resultInfo: { fontSize: 12, color: '#6b7280' },
  listContent: { paddingVertical: 12, paddingHorizontal: 16, paddingBottom: 32 },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  footerLoader: { padding: 16, alignItems: 'center' },
  footerText: { color: '#9ca3af', fontSize: 13 },
  emptyContainer: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 40, marginBottom: 8 },
  emptyText: { fontSize: 15, color: '#374151', fontWeight: '600' },
});