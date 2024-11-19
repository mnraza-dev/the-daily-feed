import { Dimensions, FlatList, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { NewsDataType } from '@/types'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons'
import Loading from '@/components/Loading'
import { NewsItem } from '@/components/NewsList'
import { Colors } from '@/constants/Colors'
import WebView from 'react-native-webview'

type Props = {}
const { width } = Dimensions.get('screen');

const Page = (props: Props) => {
    const [selectedUrl, setSelectedUrl] = useState<string | null>(null);



    useEffect(() => {
        getNews();


    }, [])

    const [news, setNews] = useState<NewsDataType[]>([]);
    const [loading, setLoading] = useState(true)

    const getNews = async () => {
        try {
            let categoryString = '';
            let countryString = '';
            let queryString = '';
            if (category) {
                categoryString = `&category=${category}`;
            }
            if (country) {
                countryString = `&country=${country}`;
            }
            if (query) {
                queryString = `&q=${query}`;
            }
            const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&size=10${categoryString}${countryString}${queryString}`;

            const response = await axios.get(URL);
            if (response && response.data) {
                setNews(response.data.results);
                setLoading(false);
                // console.log(response.data);
            }
        }
        catch (err: any) {
            console.log("Error Message", err.message);
        }
    }

    const { query, category, country } = useLocalSearchParams<{
        query: string;
        category: string;
        country: string;
    }>();

    return (
        <>
            <Stack.Screen
                options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name='arrow-back' size={24} />
                        </TouchableOpacity>
                    ),
                    title: "Search"
                }}
            />

            <ScrollView style={styles.container}>
                {loading ? (<Loading size={"large"} />) : (
                    <View style={styles.listContent}>
                        {news.map((item, index) => (
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

            </ScrollView>



        </ >)
}

export default Page

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
