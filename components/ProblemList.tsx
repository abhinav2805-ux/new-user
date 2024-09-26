import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const problems = [
    { id: '1', issue: 'Illegal Dumping', details: 'Waste is being dumped in unauthorized locations.' },
    { id: '2', issue: 'Overflowing Bins', details: 'Public bins are overflowing with garbage.' },
    { id: '3', issue: 'Lack of Recycling', details: 'Insufficient recycling facilities in the area.' },
    { id: '4', issue: 'Hazardous Waste', details: 'Improper disposal of hazardous waste materials.' },
    { id: '5', issue: 'Plastic Pollution', details: 'Excessive use and improper disposal of plastic items.' },
    { id: '6', issue: 'Electronic Waste', details: 'Inadequate recycling and disposal of electronic waste.' },
  ];
  

const ProblemList = () => {
  return (
    <View style={styles.tableContainer}>
      <Text style={styles.tableHeader}>Waste Management Issues</Text>
      <FlatList
        data={problems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.issue}>{item.issue}</Text>
            <Text style={styles.details}>{item.details}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    borderColor: '#ddd',
    backgroundColor:'#fff',
    borderWidth: 1,
    borderRadius: 24,
    marginBottom: 16,
    padding: 16,
  },
  tableHeader: {
    fontSize: 22,
    backgroundColor:'#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  issue: {
    fontWeight: 'bold',
  },
  details: {
    flex: 1,
    textAlign: 'right',
  },
});

export default ProblemList;
