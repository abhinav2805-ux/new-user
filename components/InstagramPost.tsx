import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { styled } from 'nativewind';

// Styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

interface Post {
  profilePicture: string;
  instituteName: string;
  followers: number;
  timeAgo: string;
  content: string;
  mainImage: string;
  likes: number;
  comments: number;
}

const MAX_CAPTION_LENGTH = 100;

const LinkedInStylePost: React.FC<{ post: Post }> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1); // Toggle like count
  };

  const handleCommentClick = () => setShowCommentInput(!showCommentInput);
  const handleRepost = () => console.log('Repost');
  const handleShare = () => console.log('Share');
  const handleToggleOptions = () => setShowOptions(!showOptions);
  const handleToggleReadMore = () => setShowMore(!showMore);

  const windowWidth = Dimensions.get('window').width;

  return (
    <StyledView className="bg-[#f6f6f6] mb-4 border border-gray-300 rounded-xl shadow-md p-4">
      {/* Header */}
      <StyledView className="flex-row items-center justify-between">
        <StyledView className="flex-row items-center">
          <StyledImage
            source={{ uri: post.profilePicture }}
            className="w-10 h-10 rounded-full mr-3"
          />
          <StyledView>
            <StyledText className="font-semibold">{post.instituteName}</StyledText>
            <StyledText className="text-gray-500 text-sm">{post.timeAgo}</StyledText>
          </StyledView>
        </StyledView>
        <TouchableOpacity onPress={handleToggleOptions}>
          <Feather name="more-vertical" size={20} color="black" />
        </TouchableOpacity>
      </StyledView>

      {/* Show Repost and Share Options */}
      {showOptions && (
        <StyledView className="bg-gray-100 p-2 mt-2 rounded-lg">
          <TouchableOpacity onPress={handleRepost} className="py-2">
            <StyledText className="text-gray-800">Repost</StyledText>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} className="py-2">
            <StyledText className="text-gray-800">Share</StyledText>
          </TouchableOpacity>
        </StyledView>
      )}

      {/* Post Content */}
      <StyledView className="mt-4">
        <StyledText numberOfLines={showMore ? undefined : 3}>
          {post.content}
        </StyledText>
        {post.content.length > MAX_CAPTION_LENGTH && (
          <TouchableOpacity onPress={handleToggleReadMore}>
            <StyledText className="text-blue-500">{showMore ? 'Read Less' : 'Read More'}</StyledText>
          </TouchableOpacity>
        )}
      </StyledView>

      {/* Post Image */}
      {post.mainImage && (
        <StyledImage
          source={{ uri: post.mainImage }}
          className="w-full h-56 mt-4 rounded-xl"
          resizeMode="cover"
        />
      )}

      {/* Like and Comment Count */}
      <StyledView className="flex-row items-center justify-between mt-4">
        <StyledView className="flex-row items-center space-x-2">
          <StyledText className="text-black">{likesCount} Likes</StyledText>
          <StyledText className="text-black">{post.comments} Comments</StyledText>
        </StyledView>
        <StyledText className="text-gray-500 text-sm">{post.timeAgo}</StyledText>
      </StyledView>

      {/* Action Buttons */}
      <StyledView className="flex-row justify-between items-center mt-4 border-t border-gray-200 pt-2">
        <StyledTouchableOpacity onPress={handleLike} className="flex-row items-center">
          <StyledText className="ml-2 text-gray-600">{liked ? 'Unlike' : 'Like'}</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity onPress={handleCommentClick} className="flex-row items-center">
          <StyledText className="ml-2 text-gray-600">Comment</StyledText>
        </StyledTouchableOpacity>
      </StyledView>

      {/* Conditional Comment Input */}
      {showCommentInput && (
        <StyledView className="flex-row items-center p-4 border-t border-gray-200">
          <StyledImage
            source={{ uri: 'https://example.com/user-avatar.jpg' }} // Placeholder URL
            className="w-8 h-8 rounded-full mr-3"
          />
          <StyledTextInput
            placeholder="Add a comment..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2"
            autoFocus
          />
        </StyledView>
      )}
    </StyledView>
  );
};

export default LinkedInStylePost;
