import { FlatList, StyleSheet, Text, useWindowDimensions, View, ViewToken } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { NewsDataType } from '@/types'
import SliderItem from '@/components/SliderItem'
import Animated, { scrollTo, useAnimatedRef, useAnimatedScrollHandler, useDerivedValue, useSharedValue } from 'react-native-reanimated'
import Pagination from '@/components/Pagination'

type Props = {
    newsList: Array<NewsDataType>
}
const BreakingNews = ({newsList}: Props) => {
    const [data, setData] = useState(newsList);
    const [paginationIndex, setPaginationIndex] = useState(0);
    const scrollX = useSharedValue(0);
    const ref = useAnimatedRef<Animated.FlatList<any>>();
    const [isAutoPlay, setIsautoPlay] =useState(true);
    const interval =useRef<NodeJS.Timeout>();
    const offset =useSharedValue(0);
    const {width} = useWindowDimensions();
    
    const onViewableItemsChanged = ({
        viewableItems,
    }: {
        viewableItems: ViewToken[];
    }) => {
        if (
            viewableItems[0].index !== undefined &&
            viewableItems[0].index !== null
        ){
            setPaginationIndex(viewableItems[0].index % newsList.length )
        }
    }
    const viewabilityConfig ={
        itemVisiblePercentThreshold: 50
    }
    const viewabilityConfigCallbackPairs =useRef([
        {viewabilityConfig, onViewableItemsChanged}
    ])
    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        },
        onMomentumEnd: (e) => {
            offset.value = e.contentOffset.x;
        },
    });

    useEffect(() => {
        if (isAutoPlay === true) {
            interval.current = setInterval (() =>{
                offset.value = offset.value + width;
            }, 8000);
        } else {
            clearInterval(interval.current);
        }
        return () => {
            clearInterval(interval.current);
        }
    }, [isAutoPlay, offset, width]);

    useDerivedValue (() => {
        scrollTo(ref, offset.value, 0, true)
    })
    

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breaking News</Text>
      <View style={styles.slideWrapper}>
        <Animated.FlatList 
            ref={ref}
            data={data} 
            keyExtractor={(_, index) => `list_item${index}`} 
            renderItem={({item, index}) => (
            <SliderItem slideItem={item} index={index} scrollX={scrollX}/> ) }
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            removeClippedSubviews={false}
            onScroll={onScrollHandler}
            scrollEventThrottle={16}
            onEndReachedThreshold={0.5}
            onEndReached={() => setData([...data, ...newsList])}
            viewabilityConfigCallbackPairs={
                viewabilityConfigCallbackPairs.current
            }
            onScrollBeginDrag={() => {
                setIsautoPlay(false)
            }}
            onScrollEndDrag={() => {
                setIsautoPlay(true)
            }}
            />
            <Pagination items={newsList} scrollX={scrollX} paginationIndex={paginationIndex}/>
      </View>
    </View>
  )
}

export default BreakingNews

const styles = StyleSheet.create({
    container:{
        marginBottom:10
    },
    title: {
        color: Colors.black,
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
        marginLeft: 30
    },
    slideWrapper:{
        justifyContent: 'center'
    }

})