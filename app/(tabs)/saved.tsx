import { StyleSheet, Text, View, TouchableOpacity, Modal, SafeAreaView, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { NewsItem } from '@/components/NewsList'; // Assuming NewsItem is exported
import { NewsDataType } from '@/types';
import axios from 'axios';

const { width } = Dimensions.get('screen');

const Page = () => {
  const [bookmarkNews, setBookmarkNews] = useState<NewsDataType[]>([]);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]); // To store saved bookmarks

  useEffect(() => {
    fetchBookmark(); // Fetch initial bookmarks when the component mounts
  }, []);

  // Fetch saved bookmarks from AsyncStorage
  const fetchBookmark = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('bookmark');
      const savedIds = token ? JSON.parse(token) : [];
      console.log('Saved Bookmark IDs:', savedIds); // Debugging line

      setBookmarks(savedIds); // Update state with saved bookmark IDs

      if (savedIds.length > 0) {
        const response = await axios.get(
          `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}`
        );
        const allArticles = response.data.results;

        console.log('All Articles Fetched:', allArticles);

        const filteredArticles = allArticles.filter((article: NewsDataType) =>
          savedIds.includes(article.article_id)
        );

        console.log('Filtered Bookmarked Articles:', filteredArticles);

        setBookmarkNews(filteredArticles); // Update state with bookmarked articles
      } else {
        setBookmarkNews([]);
      }
    } catch (error) {
      console.error('Error fetching bookmarked news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBookmark = async (newsId: string) => {
    try {
      // Fetch the existing bookmarks from AsyncStorage first
      const currentBookmarks = await AsyncStorage.getItem('bookmark');
      const savedIds = currentBookmarks ? JSON.parse(currentBookmarks) : [];

      // Toggle bookmark: add or remove the newsId
      const updatedBookmarks = savedIds.includes(newsId)
        ? savedIds.filter((id: string) => id !== newsId) // Remove bookmark
        : [...savedIds, newsId]; // Add bookmark

      console.log('Updated Bookmarks:', updatedBookmarks); // Debugging line

      // Save updated bookmarks to AsyncStorage
      await AsyncStorage.setItem('bookmark', JSON.stringify(updatedBookmarks));

      // Update state
      setBookmarks(updatedBookmarks);

      // Fetch the bookmarked articles again to reflect the changes
      fetchBookmark();

      alert(
        updatedBookmarks.includes(newsId)
          ? 'News saved to bookmarks!'
          : 'News removed from bookmarks!'
      );
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : bookmarkNews.length === 0 ? (
        <Text style={styles.emptyText}>No saved news.</Text>
      ) : (
        <View style={styles.listContent}>
          {bookmarkNews.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.newsItem}
              onPress={() => setSelectedUrl(item.link)}
            >
              <NewsItem item={item} />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Modal for WebView */}
      <Modal visible={!!selectedUrl} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setSelectedUrl(null)}>
              <Ionicons name="arrow-back" size={24} color={Colors.black} />
            </TouchableOpacity>
          </View>
          {selectedUrl && <WebView source={{ uri: selectedUrl }} style={{ flex: 1 }} />}
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: Colors.darkGrey,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: Colors.darkGrey,
  },
  listContent: {
    paddingBottom: 20,
  },
  newsItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkGrey,
  },
});
