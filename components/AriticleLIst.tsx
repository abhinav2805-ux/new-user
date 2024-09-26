import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const articles = [
  {
    id: 1,
    title: 'The Importance of Forest Conservation',
    excerpt: 'Discover why preserving our forests is crucial for biodiversity. Forests provide homes for countless species...',
    fullContent: 'Discover why preserving our forests is crucial for biodiversity. Forests provide homes for countless species and help regulate the Earth’s climate. They also act as carbon sinks, absorbing carbon dioxide and releasing oxygen. Moreover, forests preserve water resources and mitigate soil erosion. Conserving forests is vital for maintaining biodiversity and supporting life on Earth. Without forests, our climate would suffer, and many species would face extinction.',
  },
  {
    id: 2,
    title: 'How to Reduce Plastic Waste',
    excerpt: 'Learn effective strategies for minimizing plastic waste in your daily life. You can start by reducing single-use plastics...',
    fullContent: 'Learn effective strategies for minimizing plastic waste in your daily life. You can start by reducing single-use plastics like bottles and straws. Switching to reusable items like bags, containers, and water bottles helps significantly. Furthermore, recycling properly and supporting legislation aimed at reducing plastic production can contribute to decreasing plastic waste. Avoiding products with excessive plastic packaging and opting for biodegradable alternatives can also have a positive impact.',
  },
  {
    id: 3,
    title: 'The Impact of Climate Change on Wildlife',
    excerpt: 'Explore the effects of climate change on various wildlife species. Rising temperatures are causing habitat loss...',
    fullContent: 'Explore the effects of climate change on various wildlife species. Rising temperatures are causing habitat loss and forcing species to migrate to new areas. As temperatures increase, some species can no longer survive in their natural habitats. For example, polar bears are losing their icy homes as the Arctic melts. Coral reefs are bleaching, and many species are facing extinction. Immediate action is required to curb climate change and protect vulnerable species.',
  },
];

const ArticleList = () => {
  const [expandedArticles, setExpandedArticles] = useState<{ [key: number]: boolean }>({});

  const toggleReadMore = (id: number) => {
    setExpandedArticles((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <View style={styles.container}>
      {/* Capsule-Like Header */}
      <View style={styles.headerCapsule}>
        <Text style={styles.header}>Nature & Awareness Articles</Text>
      </View>

      {articles.map((article) => {
        const isExpanded = expandedArticles[article.id];
        return (
          <View key={article.id} style={styles.articleContainer}>
            <Text style={styles.articleTitle}>{article.title}</Text>
            <Text style={styles.articleExcerpt}>
              {isExpanded ? article.fullContent : article.excerpt}
            </Text>
            <TouchableOpacity onPress={() => toggleReadMore(article.id)}>
              <Text style={styles.readMore}>
                {isExpanded ? 'Read Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerCapsule: {
    backgroundColor: '#c0edc9', // Green background for capsule effect
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 50, // Makes the container capsule-shaped
    alignSelf: 'center', // Center the capsule in the parent container
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
     // Underline the text
    color: '#333', // Text color
    textAlign: 'center', // Center the text inside the capsule
  },
  articleContainer: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  articleTitle: {
    fontSize: 16,
    textDecorationLine: 'underline', 
    fontWeight: 'bold',
    marginBottom: 4,
  },
  articleExcerpt: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  readMore: {
    fontSize: 14,
    color: '#007BFF', // Blue color for "Read More"
    fontWeight: 'bold',
  },
});

export default ArticleList;
