import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)} activeOpacity={0.8}>
      <Text style={styles.emoji}>{item.image || '📦'}</Text>
      <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.price}>
        Rp {item.price.toLocaleString('id-ID')}
      </Text>
      
      <View style={styles.infoRow}>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
        <Text style={styles.sold}>Terjual {item.sold}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  emoji: { fontSize: 36, marginBottom: 8, alignSelf: 'center' },
  name: { 
    fontSize: 13, 
    fontWeight: '600', 
    color: '#111827', 
    marginBottom: 4, 
    height: 36 
  },
  category: { fontSize: 11, color: '#6366f1', marginBottom: 6 },
  price: { fontSize: 13, fontWeight: '800', color: '#2e7d32', marginBottom: 6 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 6,
  },
  rating: { fontSize: 11, color: '#d97706', fontWeight: '600' },
  sold: { fontSize: 11, color: '#9ca3af' },
});