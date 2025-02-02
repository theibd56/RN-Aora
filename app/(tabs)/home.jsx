import {FlatList, Image, RefreshControl, Text, View, Alert} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import {useEffect, useState} from "react";

import {images} from '../../constants'
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import {getAllPosts, getLatestPosts} from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import {useGlobalContext} from "../../context/GlobalProvider";

const Home = () => {

    const { data: posts, refetch } = useAppwrite(getAllPosts);
    const { data: latestPosts } = useAppwrite(getLatestPosts);

    const {user} = useGlobalContext()

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true)
        await refetch()
        setRefreshing(false)
    }

    return (
        <SafeAreaView className="bg-primary h-[100vh]">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({item}) => (
                    <VideoCard video={item}/>
                )}
                ListHeaderComponent={() => (
                    <View className="my-6 px-4 space-y-6">
                        <View className="justify-between items-start flex-row mb-6">
                            <View>
                                <Text className="font-pmedium text-sm text-gray-100">
                                    Welcome back,
                                </Text>
                                <Text className="text-2xl font-psemibold text-white">
                                    {
                                        user?.username ? user?.username : 'unknown'
                                    }
                                </Text>
                            </View>
                            <View className="mt-1.5">
                                <Image source={images.logoSmall} className="h-9 w-10" resizeMode="contain"/>
                            </View>
                        </View>

                        <SearchInput placeholder="Search for a video topic"/>

                        <View className="w-full flex-1 pt-5 pb-8">
                            <Text className="text-gray-100 text-lg font-pregular mb-3">
                                Latest videos
                            </Text>

                            <Trending posts={latestPosts ?? []}/>
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subtitle="No videos created yet"
                    />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            />
        </SafeAreaView>

    );
}

export default Home
