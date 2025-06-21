import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // for heart icon

export default function DetailsScreen({ route }) {
  const { character } = route.params;
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={character.image} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.anime}>From: {character.anime}</Text>
      <Text style={styles.description}>{character.description}</Text>

      {/* Heart React */}
      <TouchableOpacity onPress={() => setLiked(!liked)} style={styles.heartButton}>
  <AntDesign
    name={liked ? 'heart' : 'hearto'}
    size={24} // smaller icon size
    color={liked ? 'red' : 'gray'}
  />
  <Text style={styles.heartText}>{liked ? 'Liked' : 'Like'}</Text>
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
  image: {
    width: 150,
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  anime: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
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
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginTop: 10,
  },
  heartText: {
    fontSize: 14, // smaller text
    fontWeight: '500',
    color: '#333',
  },
  
});
