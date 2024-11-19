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
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {/* Modal for WebView */}
            <Modal visible={!!selectedUrl} animationType="slide" transparent={false}>
                <SafeAreaView style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setSelectedUrl(null)} // Close Modal
                    >
                        <Ionicons style={styles.closeIcon} name='backspace-outline' size={24} color={Colors.black} />
                    </TouchableOpacity>
                    {selectedUrl && (
                        <WebView source={{ uri: selectedUrl }} style={{ flex: 1 }} />
                    )}
                </SafeAreaView>
            </Modal>
        </View>
    );
};

export default NewsList;

const styles = StyleSheet.create({
    closeIcon: {
        backgroundColor: Colors.lightGrey,
        borderRadius: 20,
        color: Colors.white,
        padding: 8
    },
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
    closeButton: {
        padding: 10,
        alignItems: 'flex-end',
        marginHorizontal: 16,
        marginVertical: 10,
        borderRadius: 8,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
