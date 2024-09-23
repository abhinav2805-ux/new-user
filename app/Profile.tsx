import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import Header from '@/components/Navbar';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

// Dummy data for tracking with dates and completion status
const trackingData = [
  { status: 'Request Raised', time: '10:00 AM', date: '2024-09-18', completed: true },
  { status: 'Checking', time: '12:00 PM', date: '2024-09-18', completed: true },
  { status: 'Request Sent to Local Authority', time: '2:00 PM', date: '2024-09-18', completed: false },
  { status: 'Request Sent to Worker', time: '4:00 PM', date: '2024-09-18', completed: false },
  { status: 'Done from Worker side', time: '6:00 PM', date: '2024-09-18', completed: false },
];

// Dummy data for user posts (empty array for demonstration)
const userPosts = [];

const Profile = () => {
  const [showTracking, setShowTracking] = useState(false);
  const [showPosts, setShowPosts] = useState(false);

  const handleTrackRequest = () => {
    setShowTracking(!showTracking);
    setShowPosts(false);
  };

  const handleShowPosts = () => {
    setShowPosts(!showPosts);
    setShowTracking(false);
  };

  return (
    <>
    
    <StyledScrollView className="flex-1 bg-green-100">
      
      <StyledView className="items-center justify-start p-4">
        <StyledImage
          source={{ uri: 'https://avatars.githubusercontent.com/u/128059655?v=4' }}
          className="w-48 h-48 rounded-full mb-4"
        />
        
        <StyledView className="bg-white w-full border rounded-lg p-4 shadow-md mb-4">
          <StyledText className="text-2xl font-bold text-center underline">Abhinav Gupta</StyledText>
          <StyledText className="text-md text-gray-600 text-center mt-1">gupta380189@gmail.com</StyledText>
        </StyledView>
        
        <StyledView className="w-full flex-row space-x-4 mb-4">
          <StyledTouchableOpacity 
            className="flex-1 border bg-white justify-center items-center p-4 rounded-lg shadow-md"
            onPress={handleShowPosts}
          >
            <StyledText className="font-bold text-base text-center">
              {showPosts ? 'HIDE POSTS' : 'YOUR POSTS'}
            </StyledText>
          </StyledTouchableOpacity>
          
          <StyledTouchableOpacity 
            className="flex-1 border bg-white p-4 rounded-lg shadow-md"
            onPress={handleTrackRequest}
          >
            <StyledText className="font-bold text-base text-center">
              {showTracking ? 'HIDE TRACKING' : 'TRACK YOUR REQUEST'}
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        {showPosts && (
          <StyledView className="w-full bg-white p-4 rounded-lg shadow-md mb-4">
            <StyledText className="text-xl font-bold mb-4 text-center">Your Posts</StyledText>
            {userPosts.length > 0 ? (
              userPosts.map((post, index) => (
                <StyledView key={index} className="mb-4">
                  <StyledText className="font-bold">{post.title}</StyledText>
                  <StyledText className="text-gray-600">{post.content}</StyledText>
                </StyledView>
              ))
            ) : (
              <StyledText className="text-center text-gray-600">NO POSTED ANYTHING YET</StyledText>
            )}
          </StyledView>
        )}

        {showTracking && (
          <StyledView className="w-full bg-white p-4 rounded-lg shadow-md">
            <StyledText className="text-xl font-bold mb-4 text-center">Request Tracking</StyledText>
            {trackingData.map((item, index) => (
              <StyledView key={index} className="flex-row mb-4">
                <StyledView className="w-10 items-center relative">
                  <StyledView className={`w-3 h-3 rounded-full ${item.completed ? 'bg-blue-500' : 'bg-gray-300'}`} />
                  {index < trackingData.length - 1 && (
                    <StyledView className="w-0.5 h-full bg-gray-300 absolute top-3 left-1/2 -ml-px" />
                  )}
                </StyledView>
                <StyledView className="flex-1 ml-4">
                  <StyledText className="font-bold">{item.status}</StyledText>
                  <StyledText className="text-gray-600">{item.date} at {item.time}</StyledText>
                </StyledView>
              </StyledView>
            ))}
          </StyledView>
        )}
      </StyledView>
    </StyledScrollView></>
  );
};

export default Profile;