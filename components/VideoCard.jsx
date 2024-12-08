import {FlatList, Text, View, Image, TouchableOpacity} from "react-native";
import { icons } from '../constants'
import {useState} from "react";
import {useVideoPlayer, VideoView} from "expo-video";


const VideoCard = ({video: {title, thumbnail, video, creator: {username, avatar}}}) => {

    const [play, setPlay] = useState(false)

    const player = useVideoPlayer(video, player => {
        player.showNowPlayingNotification = false;
    });

    console.log(video)
    
    return (
        <View className="flex flex-col items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                        <Image source={{uri: avatar}} resizeMode="cover" className="w-full h-full rounded-lg" />
                    </View>
                    <View className="flex-1 justify-center ml-3 gap-y-1">
                        <Text className="text-white text-sm font-psemibold" numberOfLines={1}>{title}</Text>
                        <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>{username}</Text>
                    </View>
                </View>
                <View className="pt-2">
                    <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
                </View>
            </View>
            <View className="flex-row gap-3 items-center">
                {play ? (
                    <VideoView
                        className="w-full h-60 rounded-xl mt-3"
                        player={player}
                        contentFit="cover"
                        allowsFullscreen
                        allowsPictureInPicture
                    />
                ) : (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setPlay(true)}
                        className="w-full h-60 rounded-xl mt-3 relative justify-center item-center"
                    >
                        <Image source={{uri: thumbnail}} className="w-full h-full rounded-xl mt-3" resizeMode="cover" />
                        <Image source={icons.play} className="w-12 h-12 absolute left-[42%]" resizeMode="contain"/>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

export default VideoCard
