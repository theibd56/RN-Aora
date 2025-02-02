import {FlatList, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import {useEffect} from "react";

import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import {searchPosts} from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import {useLocalSearchParams} from "expo-router";

const Search = () => {

    const {query} = useLocalSearchParams();

    const {data: posts, refetch} = useAppwrite(() => searchPosts(query));

    useEffect(() => {
        refetch();
    }, [query])

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({item}) => (
                    <VideoCard video={item}/>
                )}
                ListHeaderComponent={() => (
                    <View className="my-6 px-4 ">
                        <Text className="font-pmedium text-sm text-gray-100">
                            Search Result
                        </Text>
                        <Text className="text-2xl font-psemibold text-white">
                            {query}
                        </Text>
                        <View className="mt-6 mb-8">
                            <SearchInput className="" initialQuery={query} placeholder="Search for a video topic"/>
                        </View>

                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subtitle="No videos found for thhis search query"
                    />
                )}
            />
        </SafeAreaView>

    );
}

export default Search
