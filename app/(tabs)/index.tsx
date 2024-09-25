import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import LinkedInStylePost from '@/components/InstagramPost'; // Assuming this is the correct path
import Navbar from '@/components/Navbar';
import { styled } from 'nativewind';
import { MenuProvider } from 'react-native-popup-menu';
import { StatusBar } from 'react-native'; // Import for status bar adjustments

const HomeScreen = () => {
  const posts = [
    {
      profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlqWiEKs8kfDXzQXQPLRfkpSWlIjw0TK7-rA&s',
      instituteName: 'Ruchi Goel',
      followers: 26169,
      timeAgo: '3d ago',
      content: 'Changing the Way We Manage Waste: Thanks to the Waste Yogi App! With the Waste Yogi app, managing waste in my locality has never been easier. From scheduling pickups to ensuring proper waste segregation, this app is helping me make my neighborhood cleaner and greener every day. Together, we can tackle the waste problem, one step at a time, and create a sustainable future for everyone. Lets make our streets shine and our environment thrive',
      images: ['https://pbs.twimg.com/media/CxMS-aLWgAAbKUI.jpg:large'],
      likes: 244,
      comments: 3,
      reposts: 2,
    },
    {
      profilePicture: 'https://media.licdn.com/dms/image/v2/D4D35AQEfXaGYVqB-9Q/profile-framedphoto-shrink_100_100/profile-framedphoto-shrink_100_100/0/1715851614595?e=1727240400&v=beta&t=LVTYB4n83jITDydvFR0a45A97w5w_slhI1bUZKXfOfI',
      instituteName: 'Garvit Goel',
      followers: 2169,
      timeAgo: '5d ago',
      content: 'Changing the Way We Manage Waste: Thanks to the Waste Yogi App! 🌍💚 Grateful and honored to have been awarded by my society for the efforts in improving cleanliness and waste management in our locality! 🎉✨ With the help of the Waste Yogi app, organizing clean-up drives, ensuring proper waste disposal.',
      images: ['https://www.tifrh.res.in/wp-content/uploads/2024/07/thumbnail.png'],
      likes: 300,
      comments: 5,
      reposts: 1,
    },
    {
      profilePicture: 'https://media.licdn.com/dms/image/v2/D4D03AQEqMb0kEBPECA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1716297529773?e=1732147200&v=beta&t=XKZ5D49yftXWuX8v_H8L1EXFtn9yj35KT7hJu11Glzk',
      instituteName: 'Mukesh Garg',
      followers: 2600,
      timeAgo: '1w ago',
      content: 'Small Acts, Big Impact: Join Hands to Clean Our Streets!',
      images: ['https://www.mangaloretoday.com/uploaded/cleaning%20roads%20%201.jpg'],
      likes: 450,
      comments: 10,
      reposts: 3,
    },
  ];

  const StyledNavbar = styled(Navbar);

  return (
    <SafeAreaView style={styles.container}>
      <MenuProvider>
        {/* Content */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Scrollable Header with Capsule Style */}
          <View className="items-center mt-14 mb-8">
            <View className="bg-[#18917a] px-12 py-4 rounded-full">
              <Text className="text-white text-4xl  font-bold">WELCOME TO{'\n'}WASTE YOGI</Text>
            </View>
          </View>

          {/* Post Cards */}
          <View className="bg-white p-4 rounded-2xl"> 
            {posts.map((post, index) => (
              <LinkedInStylePost key={index} post={{ ...post, mainImage: post.images[0] }} />
            ))}
          </View>
        </ScrollView>

        {/* Bottom Navbar */}
        <StyledNavbar />
      </MenuProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FFF0', // Light green background to match the style
    paddingTop: StatusBar.currentHeight, // Ensure we don't overlap the status bar
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 80, // Adjust padding for bottom navbar
  },
});

export default HomeScreen;
