import React, { useState } from 'react';
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

type Props = {
    newsList: NewsDataType[];
};

const { width } = Dimensions.get('screen');

const NewsList = ({ newsList }: Props) => {
    const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

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
                            onPress={() => setSelectedUrl(item.link)} // Open Modal with WebView
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
                        <TouchableOpacity
                            onPress={() => setSelectedUrl(null)} // Close Modal
                        >
                            <Ionicons name="arrow-back" size={24} color={Colors.black} />
                        </TouchableOpacity>
                    </View>
                    {selectedUrl && (
                        <WebView source={{ uri: selectedUrl }} style={{ flex: 1 }} />
                    )}
                </SafeAreaView>
            </Modal>
        </View>
    );
};

export const NewsItem = ({ item }: { item: NewsDataType }) => {
    return (
        <>
            <Image source={{ uri: item.image_url }} style={styles.newsImage} />
            <View style={styles.newsContent}>
                <Text style={styles.newsCategory}>{item.category}</Text>
                <Text numberOfLines={2} style={styles.newsTitle}>
                    {item.title}
                </Text>
                <View style={styles.sourceWrapper}>
                    {item.source_icon && (
                        <Image
                            source={{ uri: item.source_icon }}
                            style={styles.sourceImage}
                        />
                    )}
                    <Text style={styles.newsSource}>{item.source_name}</Text>
                </View>
            </View>
        </>
    );
};

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
        alignItems: 'center',

        backgroundColor: Colors.white,

        borderBottomWidth: 1,
        borderBottomColor: Colors.darkGrey,
    },
});
