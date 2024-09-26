import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import 'nativewind';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    const post = {
      content,
      image: image
    };
    console.log('New post:', post);
    // Reset form
    setContent('');
    setImage(null);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-[#e6f3ed] p-4 rounded-lg">
      <Text className="text-4xl underline font-bold mb-12 mt-24 text-center">CREATE POST</Text>
      <View className='bg-[#8DC7A8] p-6 rounded-2xl'>
        <TextInput
          className="bg-white rounded-lg p-2 mb-8 min-h-[50px] border border-gray-300"
          placeholder="Enter post content..."
          value={content}
          onChangeText={setContent}
          multiline
        />
        <View className="flex-row justify-between mb-8">
          <TouchableOpacity 
            className="flex-1 items-center justify-center bg-gray-200 p-4 rounded-lg mr-2" 
            onPress={pickImage}
          >
            <Ionicons name="image-outline" size={48} color="black" />
            <Text className="mt-2">Add Image</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 items-center justify-center bg-gray-200 p-4 rounded-lg ml-2" 
            onPress={takePhoto}
          >
            <Ionicons name="camera-outline" size={48} color="black" />
            <Text className="mt-2">Take Photo</Text>
          </TouchableOpacity>
        </View>
        {image && <Image source={{ uri: image }} className="w-full h-40 rounded-lg mb-4" />}
        <View className="flex-row justify-between">
          <TouchableOpacity className="bg-[#f87171] p-2 rounded-xl flex-1 mr-2">
            <Text className="text-white text-xl text-center font-bold">CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="bg-[#32C13B] p-2 rounded-xl flex-1 ml-2"
            onPress={handleSubmit}
          >
            <Text className="text-white text-xl text-center font-bold">SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreatePost;
