import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { NewsDataType } from '@/types'
import SliderItem from './SliderItem'
import { Colors } from '@/constants/Colors'
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

type Props = {
    newsList: Array<NewsDataType>
}

const BreakingNews = ({ newsList }: Props) => {
    const [paginationIndex, setPaginationIndex] = useState(0)
    const [data, setData] = useState(newsList)
    const scrollX = useSharedValue(0);
    const ref = useAnimatedRef<Animated.FlatList<any>>();


    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x
        }
    })
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Breaking News</Text>
            <View style={styles.slideWrapper}>
                <Animated.FlatList
                    ref={ref}
                    onScroll={onScrollHandler}
                    onEndReached={() => setData([...data, ...newsList])}
                    onEndReachedThreshold={0.5}
                    horizontal
                    scrollEventThrottle={16}
                    data={data}
                    keyExtractor={(_, index) => `list-item${index}`}
                    renderItem={({ item, index }) =>
                        <SliderItem scrollX={scrollX} slideItem={item} index={index} />
                    }
                />

            </View>
        </View>
    )
}

export default BreakingNews

const styles = StyleSheet.create({
    container: {


    },
    title: {
        fontSize: 24,
        fontWeight: 600,
        color: Colors.darkGrey,
        marginHorizontal: 20,
        marginVertical: 10
    },

    slideWrapper: {
        justifyContent: 'center'
    }
})