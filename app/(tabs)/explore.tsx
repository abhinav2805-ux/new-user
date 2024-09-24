import React from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Navbar from '@/components/Navbar'; // Assuming this path is correct
import { styled } from 'nativewind';
import ProblemList from '@/components/ProblemList';
import ArticleList from '@/components/AriticleLIst';

const dangerousZones = [
  { latitude: 28.686081, longitude: 77.281236, title: 'Danger Zone 1' },
  { latitude: 28.686041, longitude: 77.281786, title: 'Danger Zone 2' },
  { latitude: 28.685021, longitude: 77.281276, title: 'Danger Zone 3' },
];

const TabTwoScreen = () => {
  return (
    <ScrollView className="flex-1 bg-[#e6f3ed] p-4">
      {/* Navbar */}
     

      {/* Zonal Analysis Section */}
      <View className="mb-8">
        <Text className="text-center text-3xl underline font-bold mt-20 mb-4">Zonal Analysis</Text>
        <View className="w-full h-64 bg-gray-200 border-2 rounded-lg overflow-hidden mb-4">
          <MapView
            style={{ width: '100%', height: '100%' }}
            initialRegion={{
              latitude: 28.686081,
              longitude: 77.281236,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {dangerousZones.map((zone, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: zone.latitude, longitude: zone.longitude }}
                title={zone.title}
              />
            ))}
          </MapView>
        </View>
      </View>

      {/* Waste Management Issues Section */}
      <ProblemList />

      {/* Article List */}
      <ArticleList />
    </ScrollView>
  );
};

export default TabTwoScreen;
