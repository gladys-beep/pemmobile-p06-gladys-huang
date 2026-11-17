import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ProductsScreen from './screens/ProductsScreen';
import ContactsScreen from './screens/ContactsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Produk') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Kontak') {
              iconName = focused ? 'people' : 'people-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2e7d32',
          tabBarInactiveTintColor: 'gray',
          headerStyle: { backgroundColor: '#2e7d32' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        })}
      >
        <Tab.Screen 
          name="Produk" 
          component={ProductsScreen} 
          options={{ title: 'Aplikasi Toko Kita' }}
        />
        <Tab.Screen 
          name="Kontak" 
          component={ContactsScreen} 
          options={{ title: 'Daftar Kontak' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}