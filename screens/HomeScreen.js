import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { animeSeries } from '../data/animeSeries'; // ✅ Make sure this path is correct

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const handleSearch = (text) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSearchQuery(text);
  };

  const genres = ['All', ...new Set(animeSeries.flatMap((s) => s.genres))];

  const filteredSeries = animeSeries.filter((series) => {
    const titleMatch = series.title.toLowerCase().includes(searchQuery.toLowerCase());
    const genreMatch =
      selectedGenre === 'All' || series.genres.includes(selectedGenre);
    return titleMatch && genreMatch;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { series: item })}
      style={styles.card}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>

      <View style={styles.tagRow}>
        {item.genres.map((genre, index) => (
          <Text key={index} style={styles.tag}>{genre}</Text>
        ))}
      </View>
      <Text style={styles.rating}>⭐ {item.rating}/10</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Popular Anime Series</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by title..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedGenre}
          onValueChange={(value) => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setSelectedGenre(value);
          }}
          style={styles.picker}
        >
          {genres.map((genre) => (
            <Picker.Item label={genre} value={genre} key={genre} />
          ))}
        </Picker>
      </View>

      {/* Favorites Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Favorites')}
        style={styles.favoritesButton}
      >
        <Text style={styles.favoritesButtonText}>View Favorites ❤️</Text>
      </TouchableOpacity>

      {filteredSeries.length > 0 ? (
        <FlatList
          data={filteredSeries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={{ paddingHorizontal: 10 }}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noResults}>No anime found.</Text>
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
  searchInput: {
    width: '90%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
  pickerWrapper: {
    width: '90%',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: {
    height: 48,
    fontSize: 16,
    width: '100%',
  },
  favoritesButton: {
    backgroundColor: '#FF6464',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  favoritesButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
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
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 4,
  },
  tag: {
    backgroundColor: '#FFDDDD',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    margin: 2,
    fontSize: 10,
  },
  rating: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  noResults: {
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
});
