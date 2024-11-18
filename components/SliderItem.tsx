import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NewsDataType } from '@/types';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

type Props = {
  slideItem: NewsDataType;
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get('screen');

const SliderItem = ({ slideItem, index, scrollX }: Props) => {
  // Animated Style
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.15, 0, width * 0.15],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  // JSX Structure
  return (
    <Animated.View style={[styles.ItemWrapper, rnStyle]}>
      <Image source={{ uri: slideItem.image_url }} style={styles.image} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.background}
      >
        <View>
          <View style={styles.sourceInfo}>
            {slideItem.source_icon && (
              <Image source={{ uri: slideItem.source_icon }} style={styles.sourceIcon} />
            )}
            <Text style={styles.sourceName}>{slideItem.source_name}</Text>
          </View>

          <Text numberOfLines={2} style={styles.title}>
            {slideItem.title}
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  ItemWrapper: {
    position: 'relative',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width - 60,
    height: 220,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    position: 'absolute',
    top: 120,
    letterSpacing: 1.2,
    lineHeight: 20,
    fontWeight: '600',
    paddingHorizontal: 20,
    color: Colors.white,
  },
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 10,
    left: 30,
    width: width - 60,
    height: 220,
    padding: 20,
  },
  sourceIcon: {
    width: 25,
    height: 25,
    borderRadius: 20,
  },
  sourceInfo: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    position: 'absolute',
    top: 85,
    paddingHorizontal: 20,
  },
  sourceName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },
});
