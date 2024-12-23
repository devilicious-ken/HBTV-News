import { ScrollView, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import Loading from '@/components/Loading'
import { NewsDataType } from '@/types'
import { Colors } from '@/constants/Colors'
import  Moment  from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = {}

const NewsDetails = (props: Props) => {
    const {id} = useLocalSearchParams<{id: string}>()
    const [news, setNews ] = useState<NewsDataType[]>([]);
    const [isLoading, setIsLoading ] = useState(true);
    const [bookmark, setBookmark] = useState(false)

    useEffect (() => {
      getNews();
    }, [])

    useEffect(()=> {
      if(!isLoading){

        renderBookmark(news[0].article_id)
      }
    }, [isLoading])

    const getNews = async() => {
      try {
        const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`
        const response = await axios .get(URL);
  
        //console.log('News Data:',response.data);
        if (response && response.data){
          setNews(response.data.results);
          setIsLoading(false);
        }
      } catch(err: any) {
        console.log('Error Message: ', err.message)
      }
    }

    const saveBookmark = async (newsId: string) => {
      try {
        const storedBookmarks = await AsyncStorage.getItem("bookmark");
        let bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];
    
        if (!bookmarks.includes(newsId)) {
          bookmarks.push(newsId);
          await AsyncStorage.setItem("bookmark", JSON.stringify(bookmarks));
          setBookmark(true); // Update state to reflect the bookmark
          alert("News Saved!");
        } else {
          alert("News already bookmarked!");
        }
      } catch (err) {
        console.error("Error saving bookmark:", err);
      }
    };
    
    

    const removeBookmark = async (newsId: string) => {
      try {
        const storedBookmarks = await AsyncStorage.getItem("bookmark");
        let bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];
    
        bookmarks = bookmarks.filter((id: string) => id !== newsId);
        await AsyncStorage.setItem("bookmark", JSON.stringify(bookmarks));
        setBookmark(false); // Update state to reflect the unbookmark
        alert("News Unsaved");
      } catch (err) {
        console.error("Error removing bookmark:", err);
      }
    };
    
    

    const renderBookmark = async (newsId: string) => {
      try {
        const storedBookmarks = await AsyncStorage.getItem("bookmark");
        const bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];
        setBookmark(bookmarks.includes(newsId));
      } catch (err) {
        console.error("Error checking bookmark:", err);
      }
    };
    

  return (
    <>
    <Stack.Screen options={{
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={22}/>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={()=>bookmark ? removeBookmark(news[0].article_id) : saveBookmark(news[0].article_id)}>
          <Ionicons name={bookmark ? 'heart' : 'heart-outline'} size={22} color={bookmark ? 'red' : Colors.black}/>
        </TouchableOpacity>
      ),
      title: ''
    }}/>
    {isLoading ? (
      <Loading size={'large'} />
    ) : (
      <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
      <Text style={styles.title}>{news [0].title}</Text>
      <View style={styles.newsInfoWrapper}>
        <Text style={styles.newsInfo}>{Moment(news[0].pubDate).format('MMMM DD, hh:mm a')}</Text>
        <Text style={styles.newsInfo}>{news[0].source_name}</Text>
      </View>
      <Image source={{uri: news[0].image_url}} style={styles.newsImg} />
      {news[0].description ? (
        <Text style={styles.newsContent}>{news [0].description}</Text>
      ) : (
        <Text style={styles.newsContent}>{news [0].content}</Text>
      )}
    </ScrollView>
    )}
    </>
  )
}

export default NewsDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginVertical: 10,
    letterSpacing: 0.6
  },
  newsImg: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10
  },
  newsInfoWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  newsInfo: {
    fontSize: 12,
    color: Colors.darkGrey
  },
  newsContent: {
    fontSize: 14,
    color: '#555',
    letterSpacing: 0.8,
    lineHeight: 22
  }
})