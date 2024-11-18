import { FlatList, StyleSheet, Text, View, ViewToken } from 'react-native';
import React, { useRef, useState } from 'react';
import { NewsDataType } from '@/types';
import SliderItem from './SliderItem';
import { Colors } from '@/constants/Colors';
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import Pagination from './Pagination';

type Props = {
    newsList: Array<NewsDataType>;
};

const BreakingNews = ({ newsList }: Props) => {
    const [paginationIndex, setPaginationIndex] = useState(0);
    const [data, setData] = useState(newsList);
    const scrollX = useSharedValue(0);

    const ref = useAnimatedRef<Animated.FlatList<NewsDataType>>();
    // Handle viewable items
    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0 && viewableItems[0].index !== null) {
            setPaginationIndex(viewableItems[0].index % newsList.length);
        }
    });

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };

    const viewabilityConfigCallbackPairs = useRef([
        { viewabilityConfig, onViewableItemsChanged: onViewableItemsChanged.current },
    ]);

    // Scroll handler for animations
    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    // Append data on reaching end
    const handleEndReached = () => {
        setData((prevData) => [...prevData, ...newsList]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Breaking News</Text>
            <View style={styles.slideWrapper}>
                <Animated.FlatList
                    ref={ref}
                    data={data}
                    keyExtractor={(_, index) => `list-item-${index}`}
                    renderItem={({ item, index }) => (
                        <SliderItem scrollX={scrollX} slideItem={item} index={index} />
                    )}
                    horizontal
                    scrollEventThrottle={16}
                    onScroll={onScrollHandler}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.5}
                    viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                />
                <Pagination items={newsList} paginationIndex={paginationIndex} scrollX={scrollX} />
            </View>
        </View>
    );
};

export default BreakingNews;

const styles = StyleSheet.create({
    container: {

        // backgroundColor: Colors.white,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.darkGrey,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    slideWrapper: {
        justifyContent: 'center',
    },
});
