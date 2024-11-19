import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    Modal,
    SafeAreaView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { NewsDataType } from '@/types';
import { Colors } from '@/constants/Colors';
import Loading from './Loading';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
    newsList: NewsDataType[];
};

const { width } = Dimensions.get('screen');

const NewsList = ({ newsList }: Props) => {
    const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
    const [bookmark, setBookmark] = useState(false);
    const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
    const [bookmarks, setBookmarks] = useState<string[]>([]);

    // Load bookmarks from AsyncStorage when the app starts
    useEffect(() => {
        const loadBookmarks = async () => {
            try {
                const storedBookmarks = await AsyncStorage.getItem('bookmark');
                setBookmarks(storedBookmarks ? JSON.parse(storedBookmarks) : []);
            } catch (error) {
                console.error('Failed to load bookmarks:', error);
            }
        };
        loadBookmarks();
    }, []);

    const saveBookmark = async (newsId: string) => {
        try {
            const updatedBookmarks = bookmarks.includes(newsId)
                ? bookmarks.filter((id) => id !== newsId) // Remove if exists
                : [...bookmarks, newsId]; // Add if not exists

            await AsyncStorage.setItem('bookmark', JSON.stringify(updatedBookmarks));
            setBookmarks(updatedBookmarks); // Update state
            setBookmark(updatedBookmarks.includes(newsId)); // Update icon
            alert(
                updatedBookmarks.includes(newsId)
                    ? 'News saved to bookmarks!'
                    : 'News removed from bookmarks!'
            );
        } catch (error) {
            console.error('Failed to toggle bookmark:', error);
        }
    };

    const handleBookmarkToggle = async () => {
        if (selectedNewsId) {
            await saveBookmark(selectedNewsId);
        }
    };

    // Check if the selected news is bookmarked when opening the modal
    useEffect(() => {
        if (selectedNewsId) {
            setBookmark(bookmarks.includes(selectedNewsId));
        }
    }, [selectedNewsId, bookmarks]);

    return (
        <View style={styles.container}>
            {newsList.length === 0 ? (
                <Loading size="large" />
            ) : (
                <View style={styles.listContent}>
                    {newsList.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.newsItem}
                            onPress={() => {
                                setSelectedUrl(item.link);
                                setSelectedNewsId(item.article_id);
                            }}
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
                        <TouchableOpacity onPress={handleBookmarkToggle}>
                            <Ionicons
                                name={bookmark ? 'heart' : 'heart-outline'}
                                size={24}
                                color={bookmark ? "red":Colors.black}
                            />
                        </TouchableOpacity>
                    </View>
                    {selectedUrl && <WebView source={{ uri: selectedUrl }} style={{ flex: 1 }} />}
                </SafeAreaView>
            </Modal>
        </View>
    );
};

export const NewsItem = ({ item }: { item: NewsDataType }) => (
    <>
        <Image source={{ uri: item.image_url }} style={styles.newsImage} />
        <View style={styles.newsContent}>
            <Text style={styles.newsCategory}>{item.category}</Text>
            <Text numberOfLines={2} style={styles.newsTitle}>
                {item.title}
            </Text>
            <View style={styles.sourceWrapper}>
                {item.source_icon && (
                    <Image source={{ uri: item.source_icon }} style={styles.sourceImage} />
                )}
                <Text style={styles.newsSource}>{item.source_name}</Text>
            </View>
        </View>
    </>
);

export default NewsList;

const styles = StyleSheet.create({
    sourceImage: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    newsContent: {
        width: width / 2 + 40,
    },
    newsImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 16,
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
    newsTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 8,
    },
    newsSource: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.darkGrey,
    },
    newsCategory: {
        fontSize: 12,
        color: Colors.darkGrey,
        textTransform: 'capitalize',
        fontWeight: '700',
    },
    sourceWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
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
