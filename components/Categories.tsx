import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors } from '@/constants/Colors'
import newsCategoryList from '@/constants/Categories'

type Props = {
    onCategoryChanged: (categtory: string) => void
}

const Categories = ({onCategoryChanged}: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<TouchableOpacity [] | null[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelectCategory = (index: number) => {
        const selected = itemRef.current[index];
        setActiveIndex(index);

        selected?.measureLayout(
            scrollRef.current as any,(x) => {
            scrollRef.current?.scrollTo({x: x -20, y: 0, animated: true})
        })

        onCategoryChanged(newsCategoryList[index].slug)
    }

  return (
    <View>
      <Text style={styles.title}>Trending Right Now</Text>
      <ScrollView 
      ref={scrollRef} 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.itemsWrapper}>
        {newsCategoryList.map((item, index) => (
            <TouchableOpacity 
            ref={(el) => (itemRef.current[index] = el)} 
            key={index} 
            style={[styles.item, activeIndex === index && styles.itemActive]}
            onPress={() => handleSelectCategory(index)}>
                <Text style={[styles.itemTxt, activeIndex === index && styles.itemTxtActive]}>{item.title} </Text>
            </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
    title: {
        color: Colors.black,
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
        marginLeft: 30
    },
    itemsWrapper: {
        gap: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10
    },
    itemActive: {
        backgroundColor: Colors.tint,
        borderColor: Colors.tint
    },
    item: {
        borderWidth: 1,
        borderColor: Colors.darkGrey,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10
    },
    itemTxt:{
        fontSize: 14,
        color: Colors.darkGrey,
        letterSpacing: 0.5,
    },
    itemTxtActive: {
        fontWeight: '600',
        color: Colors.white
    }
})