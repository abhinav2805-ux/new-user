import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import 'nativewind';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';

const Request = () => {
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [problem, setProblem] = useState<string>('');
  const [otherProblem, setOtherProblem] = useState<string>('');
  const [pastRequests, setPastRequests] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
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

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const getLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
      
      // Reverse geocode to get the address
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      
      if (reverseGeocode.length > 0) {
        let address = reverseGeocode[0];
        
        // Fallbacks in case any field is missing
        const street = address.street || 'Street not available';
        const city = address.city || 'City not available';
        const region = address.region || 'Region not available';
        const postalCode = address.postalCode || 'Postal code not available';
        const country = address.country || 'Country not available';
        
        const formattedAddress = `${street}, ${city}, ${region}, ${postalCode}, ${country}`;
        setLocation(formattedAddress);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to get current location or address');
    }
  };
  
  const handleSubmit = () => {
    console.log('Submitting form:', { image, problem, otherProblem, location });
    setImage(null);
    setProblem('');
    setOtherProblem('');
    setLocation(null);
    setPastRequests([...pastRequests, 'New Request']);
  };

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
      className="bg-gray-200 p-4"
      style={{ paddingTop: 60 }}
    >
      <View className="flex-1 justify-center items-center bg-[#e6f3ed] rounded-lg p-6">
        <Text className="text-4xl font-bold text-black mb-4 underline">REQUESTS</Text>

        <View className="flex-row justify-between w-full mb-2">
          <TouchableOpacity 
            className="bg-green-500 flex-1 justify-center items-center p-4 mr-2 rounded-2xl"
            onPress={takePhoto}
          >
            <Ionicons name="camera-outline" size={50} color="white" />
            <Text className="text-white mt-2">Click Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-green-500 flex-1 justify-center items-center p-4 ml-2 rounded-2xl"
            onPress={pickImage}
          >
            <Ionicons name="image-outline" size={50} color="white" />
            <Text className="text-white mt-2 ">Upload Image</Text>
          </TouchableOpacity>
        </View>

        {image && (
          <View className="mb-6 w-full">
            <Image 
              source={{ uri: image }} 
              className="w-full h-40 rounded-lg"
              resizeMode="cover"
            />
          </View>
        )}

        <TouchableOpacity className="bg-orange-500 w-full  p-4 rounded-full mb-4" onPress={getLocation}>
          <Text className="text-white text-center font-bold">Get Current Location</Text>
        </TouchableOpacity>

        {location && (
          <Text className="text-gray-700 mb-4 font-semibold">Current Address: {location}</Text>
        )}

        <View className="border border-gray-300 rounded-lg mb-4 w-full">
          <Picker
            selectedValue={problem}
            onValueChange={(itemValue) => setProblem(itemValue)}
            style={{ height: 50 }}
          >
            <Picker.Item label="Select a problem" value="" />
            <Picker.Item label="Overflowing bin" value="overflowing_bin" />
            <Picker.Item label="Illegal dumping" value="illegal_dumping" />
            <Picker.Item label="Missed collection" value="missed_collection" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        {problem === 'other' && (
          <TextInput
            className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
            placeholder="Please specify the problem"
            value={otherProblem}
            onChangeText={setOtherProblem}
          />
        )}

        <TouchableOpacity 
          className="bg-green-500 w-full p-4 rounded-full mb-6"
          onPress={handleSubmit}
        >
          <Text className="text-center text-white font-bold text-lg">Submit Request</Text>
        </TouchableOpacity>

        <View className="bg-green-100 p-4 rounded-xl w-full">
          <Text className="text-lg font-bold text-gray-600 mb-2">Your Past Requests</Text>
          {pastRequests.length === 0 ? (
            <Text className="text-gray-600">You did not raise any request till now.</Text>
          ) : (
            pastRequests.map((request, index) => (
              <View key={index} className="bg-white h-14 rounded-xl mb-2"></View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Request;

