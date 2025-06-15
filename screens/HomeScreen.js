import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { animeCharacters } from '../data/animeCharacters';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { character: item })}
    >
      <Image source={item.image} style={styles.image} />

    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Anime Characters</Text>
      <FlatList
        data={animeCharacters}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 160,
    borderRadius: 10,
    marginHorizontal: 10,
  },
});
