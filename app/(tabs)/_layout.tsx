import { Tabs } from 'expo-router';
import React from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Header from '@/components/Navbar';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = '#000000'; // Black color for active icon and text

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingTop: 35 }}> 
        <Header />
      </View>
      <StatusBar barStyle="light-content" backgroundColor="#00715D" />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: activeColor,
          headerShown: false,
          tabBarStyle: {
            borderWidth: 2,
            borderColor: '#000',
            borderRadius: 20,
            overflow: 'hidden',
            elevation: 4,
            height: 60,
            paddingBottom:4,
            maxWidth: '93%',
            margin: 10,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Search',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="createAPost"
          options={{
            title: 'Create',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'add-circle' : 'add-circle-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="campaign"
          options={{
            title: 'Campaign',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'megaphone' : 'megaphone-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Request"
          options={{
            title: 'Request',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'document' : 'document-outline'} color={color} />
            ),
          }}
        />
      </Tabs> 
      </View>
    </SafeAreaView>
  );
}
