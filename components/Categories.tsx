import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import React, { useRef, useState } from 'react';
import { Colors } from '@/constants/Colors';
import newsCategoryList from '@/constants/Categories';

type Props = {};

// Get device screen width
const { width } = Dimensions.get('window');

const Categories = (props: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<(View | null)[]>([]); // Ref typed as View for measure access
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleSelectCategory = (index: number) => {
        const selected = itemRef.current[index];

        setActiveIndex(index);
        if (selected) {
            (selected as View).measure(
                (x, y, itemWidth, height, pageX) => {
                    // Fallback check to ensure pageX exists
                    if (pageX !== undefined) {
                        scrollRef.current?.scrollTo({
                            x: pageX - width / 2 + itemWidth / 2, // Center the item
                            y: 0,
                            animated: true,
                        });
                    }
                }
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trending Right Now</Text>
            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.itemsWrapper}
            >
                {newsCategoryList.map((item, index) => (
                    <TouchableOpacity
                        onPress={() => handleSelectCategory(index)}
                        ref={(el) => (itemRef.current[index] = el)}
                        style={[
                            styles.item,
                            index === activeIndex && styles.itemActive,
                        ]}
                        key={index}
                    >
                        <Text
                            style={[
                                styles.itemText,
                                index === activeIndex && styles.itemTextActive,
                            ]}
                        >
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default Categories;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.darkGrey,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    itemsWrapper: {
        gap: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    item: {
        borderWidth: 1,
        borderColor: Colors.darkGrey,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        height: 40,
        width: 120,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemActive: {
        borderColor: Colors.tint,
        backgroundColor: Colors.tint,
    },
    itemText: {
        fontSize: 14,
        color: Colors.darkGrey,
        letterSpacing: 0.5,
    },
    itemTextActive: {
        color: Colors.white,
        fontWeight: '600',
    },
});
