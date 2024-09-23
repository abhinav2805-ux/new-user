import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { styled } from 'nativewind';
import { useRouter } from 'expo-router';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

const notifications = [
  { id: 1, text: 'New campaign Listed', read: false },
  { id: 2, text: 'Rohan liked your post', read: true },
  { id: 3, text: 'Your request is completed', read: false },
];

const Header: React.FC = ({ navigation }) => {
    const router = useRouter();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false); // State for profile options
  const [unreadCount, setUnreadCount] = useState(notifications.filter(n => !n.read).length);

  const toggleMenu = () => setIsMenuVisible(prev => !prev);
  const toggleProfileMenu = () => setIsProfileMenuVisible(prev => !prev); // Toggle profile options

  return (
    <StyledView className="flex-1">
      <StyledView
        style={{ backgroundColor: '#00715D', height: 70 }} 
        className="shadow-md absolute top-0 left-0 right-0 z-50 flex-row items-center justify-between px-4 py-4"
      >
        {/* User Profile */}
        <StyledTouchableOpacity onPress={toggleProfileMenu}> 
          <StyledImage
            source={{ uri: 'https://avatars.githubusercontent.com/u/128059655?v=4' }} 
            className="w-12 h-12 rounded-full border-2 border-gray-400"
          />
        </StyledTouchableOpacity>

        {/* Notification Bell */}
        <StyledTouchableOpacity onPress={toggleMenu} className="relative">
          {unreadCount > 0 ? (
            <FontAwesome name="bell" size={28} color="black" /> 
          ) : (
            <Feather name="bell" size={28} color="black" /> 
          )}
          {unreadCount > 0 && (
            <StyledView className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 flex justify-center items-center">
              <StyledText className="text-white text-xs font-bold">{unreadCount}</StyledText>
            </StyledView>
          )}
        </StyledTouchableOpacity>
      </StyledView>

      {/* Profile Dropdown Menu */}
      {isProfileMenuVisible && (
        <StyledView className="absolute top-16 left-4 bg-white border border-gray-300 rounded-md w-48 z-50">
          <StyledTouchableOpacity 
            className="p-3" 
            onPress={() => { setIsProfileMenuVisible(false); router.push('Profile'); }} // Navigate to profile page
          >
            <StyledText className="text-lg">See Profile</StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity 
            className="p-3 border-t border-gray-200" 
            onPress={() => { setIsProfileMenuVisible(false); /* Add your log out logic here */ }}
          >
            <StyledText className="text-lg">Log Out</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      )}

      {/* Notifications Popup Menu */}
      {isMenuVisible && (
        <StyledView className="absolute top-16 right-0 bg-white border border-gray-300 rounded-md w-64 z-50">
          <StyledView className="p-3">
            {notifications.map(notification => (
              <StyledTouchableOpacity key={notification.id} className="py-2">
                <StyledText className={notification.read ? 'text-gray-500' : 'font-bold'}>
                  {notification.text}
                </StyledText>
              </StyledTouchableOpacity>
            ))}
          </StyledView>
        </StyledView>
      )}
    </StyledView>
  );
};

export default Header;
