import {FlatList, Image, ImageBackground, Text, TouchableOpacity} from "react-native";
import {useState} from "react";
import * as Animatable from 'react-native-animatable';
import {icons} from "../constants";
// import {Video, ResizeMode} from "expo-av";
import { useVideoPlayer, VideoView } from 'expo-video';


const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1
    }
}

const zoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
}

const TrendingItem =({activeItem, item}) => {
    const [play, setPlay] = useState(false);

    const videoSource = item.video;

    const player = useVideoPlayer(videoSource, player => {
        // player.play();
        player.showNowPlayingNotification = false;
    });

    return (
        <Animatable.View className="mr-5" animation={activeItem === item.$id ? zoomIn : zoomOut} duration={600} delay={100}>
            {play ? (
                <VideoView
                    className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
                    player={player}
                    contentFit="cover"
                    allowsFullscreen
                    allowsPictureInPicture
                />
                // <Video
                //     source={{ uri: item.video }}
                //     className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
                //     useNativeControls
                //     shouldPlay
                //     onPlaybackStatusUpdate={(status) => {
                //         if (status.didJustFinish) {
                //             setPlay(false);
                //         }
                //     }}
                // />
            ) : (
                <TouchableOpacity className="relative justify-center items-center" activeOpacity={0.7} onPress={() => setPlay(true)}>
                    <ImageBackground source={{uri: item.thumbnail}} resizeMode="cover" className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"/>
                    <Image source={icons.play} className="w-12 h-12 absolute left-[42%]" resizeMode="contain"/>
                </TouchableOpacity>
            )}
        </Animatable.View>
    );
}

const Trending = ({posts}) => {

    const [activeItem, setActiveItem] = useState(posts[0])

    const viewableItemsChanged =({viewableItems}) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key)
        }
    }

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({item}) => (
                <TrendingItem activeItem={activeItem} item={item}/>
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70,
            }}
            contentOffset={{x: 170}}
            horizontal
        />
    );
}

export default Trending
