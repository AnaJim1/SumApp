import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

export default function DetailsScreen({ route }) {
  const { series } = route.params;
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const checkIfFavorite = async () => {
    try {
      const json = await AsyncStorage.getItem('favorites');
      const favorites = json != null ? JSON.parse(json) : [];
      const isFavorited = favorites.some((item) => item.id === series.id);
      setLiked(isFavorited);
    } catch (e) {
      console.error('Failed to load favorites', e);
    }
  };

  const toggleFavorite = async () => {
    try {
      const json = await AsyncStorage.getItem('favorites');
      let favorites = json != null ? JSON.parse(json) : [];

      if (liked) {
        favorites = favorites.filter((item) => item.id !== series.id);
      } else {
        favorites.push(series);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      setLiked(!liked);
    } catch (e) {
      Alert.alert('Error', 'Something went wrong while updating favorites.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Anime Information</Text>

      <Image source={series.image} style={styles.image} />
      <Text style={styles.name}>{series.title}</Text>

      <Text style={styles.rating}>⭐ {series.rating}/10</Text>

      <View style={styles.tagRow}>
        {series.genres.map((genre, index) => (
          <Text key={index} style={styles.tag}>{genre}</Text>
        ))}
      </View>

      <Text style={styles.description}>{series.description}</Text>

      <TouchableOpacity onPress={toggleFavorite} style={styles.heartButton}>
        <AntDesign
          name={liked ? 'heart' : 'hearto'}
          size={24}
          color={liked ? 'red' : 'gray'}
        />
        <Text style={styles.heartText}>{liked ? 'Favorited' : 'Add to Favorites'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  rating: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#DDFFDD',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    margin: 4,
    fontSize: 12,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  heartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  heartText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
  },
});
