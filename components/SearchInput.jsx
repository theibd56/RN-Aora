import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";

import { icons } from '../constants'

const SearchInput = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className="w-full h-16 px-4 border-black-200 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
            <TextInput
                className="text-base flex-1 mt-0.5 text-white font-pregular"
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
                secureTextEntry={title === 'Password' && !showPassword}
            />

            <TouchableOpacity>
                <Image source={icons.search} className="w-5 h-5" resizeMode="contain"/>
            </TouchableOpacity>
        </View>
    );
}

export default SearchInput
