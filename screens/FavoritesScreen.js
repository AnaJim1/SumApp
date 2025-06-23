import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const json = await AsyncStorage.getItem('favorites');
      const data = json ? JSON.parse(json) : [];
      setFavorites(data);
    } catch (e) {
      console.error('Failed to load favorites:', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      loadFavorites(); // reload when screen comes back into focus
    }
  }, [isFocused]);

  const clearAllFavorites = () => {
    Alert.alert(
      'Clear Favorites',
      'Are you sure you want to remove all favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('favorites');
            setFavorites([]);
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { series: item })}
      style={styles.card}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.rating}>⭐ {item.rating}/10</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Favorites</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#888" />
      ) : favorites.length === 0 ? (
        <Text style={styles.emptyText}>You haven't favorited any anime yet.</Text>
      ) : (
        <>
          <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsHorizontalScrollIndicator={false}
          />

          {/* Clear All Button */}
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearAllFavorites}
          >
            <Text style={styles.clearButtonText}>Clear All Favorites</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    marginHorizontal: 10,
    alignItems: 'center',
    width: 140,
  },
  image: {
    width: 120,
    height: 160,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  clearButton: {
    marginTop: 20,
    backgroundColor: '#FF6464',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
