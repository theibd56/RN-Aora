import {Image, ScrollView, Text, TouchableOpacity, View,  Alert} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import FormField from "../../components/FormField"
import {useState} from "react";
import {router} from "expo-router";

import {icons} from "../../constants";

import {ResizeMode, Video} from "expo-av";
import CustomButton from "../../components/CustomButton";

import * as DocumentPicker from "expo-document-picker";
import {createVideoPost} from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";

const Create = () => {
    const {user} = useGlobalContext();

    const [uploading, setUploading] = useState(false)

    const [form, setForm] = useState({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
    })

    const openPicker = async (selectType) => {
        const result = await DocumentPicker.getDocumentAsync({
            type: selectType === 'image'
                ? ['image/png', 'image/jpg', 'image/jpeg']
                : ['video/mp4', 'video/gif']
        });

        if (!result.canceled) {
            if (selectType === "image") {
                setForm({
                    ...form,
                    thumbnail: result.assets[0],
                });
            }

            if (selectType === "video") {
                setForm({
                    ...form,
                    video: result.assets[0],
                });
            }
        } else {
            setTimeout(() => {
                Alert.alert("Document picked", JSON.stringify(result, null, 2));
            }, 100);
        }
    }

    const submit = async () => {
        if (
            (form.prompt === "") |
            (form.title === "") |
            !form.thumbnail |
            !form.video
        ) {
            return Alert.alert("Please provide all fields");
        }

        setUploading(true);
        try {
            await createVideoPost({
                ...form,
                userId: user.$id,
            });

            Alert.alert("Success", "Post uploaded successfully");
            router.push("/home");
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setForm({
                title: "",
                video: null,
                thumbnail: null,
                prompt: "",
            });

            setUploading(false);
        }
    };

    return (
        <SafeAreaView className="bg-primary h-[100vh]">
            <ScrollView className="px-4 my-6">
                <Text className="text-2xl text-white font-psemibold">
                    Upload Video
                </Text>
                <FormField
                    title="Video Title"
                    value={form.title}
                    placeholder="Enter a title for your video"
                    handleChangeText={(e) => setForm({...form, title: e})}
                    otherStyles="mt-10"
                />

                <View className="mt-7 space-y-2">
                    <Text className="text-base text-gray-100 font-psemibold">
                        Upload video
                    </Text>
                    <TouchableOpacity onPress={() => openPicker('video')}>
                        {form.video ? (
                            <Video
                                source={{uri: form.video.uri}}
                                className="w-full h-64 rounded-2xl"
                                useNavigation
                                resizeMode={ResizeMode.COVER}
                                isLooping
                            />
                        ) : (
                            <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center
                            items-center">
                                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center
                                items-center">
                                    <Image source={icons.upload} resizeMode="contain" className="w-1/2 h-1/2"/>
                                </View>

                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <View className="mt-7 space-y-2">
                    <Text className="text-2xl text-white font-psemibold">
                        Thumbnail Image
                    </Text>
                    <TouchableOpacity onPress={() => openPicker('image')}>
                        {form.thumbnail ? (
                            <Image source={{uri: form.thumbnail.uri}} resizeMode="cover" className="w-full h-64 rounded-2xl"/>
                        ) : (
                            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center
                            items-center border-2 border-black-200 flex-row space-x-2">
                                <Image source={icons.upload} resizeMode="contain" className="w-5 h-5"/>
                                <Text className="text-sm text-gray-100 font-pmedium">
                                    Upload a thumbnail image
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <FormField
                    title="AI prompt"
                    value={form.prompt}
                    placeholder="Enter an AI prompt for your video"
                    handleChangeText={(e) => setForm({...form, prompt: e})}
                    otherStyles="mt-7"
                />
                <CustomButton
                    title="Submty & Publish"
                    handlePress={submit}
                    isLoading={uploading}
                    containerStyles="mt-7 mb-7"
                />
            </ScrollView>
        </SafeAreaView>

    );
}

export default Create
