import { View, Text, FlatList, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';

interface Campaign {
  id: string;
  title: string;
  date?: string;
  location?: string;
  time?: string;
}

const initialCampaigns: Campaign[] = [
  { id: '1', title: 'Clean Yamuna Drive', date: '2024-10-05', location: 'Yamuna Bank, Delhi', time: '09:00:00' },
  { id: '2', title: 'Waste Segregation Workshop', date: '2024-10-12', location: 'Rohini Sector 7, Delhi', time: '11:00:00' },
  { id: '3', title: 'E-Waste Collection Drive', date: '2024-10-20', location: 'Dwarka Sector 10, Delhi', time: '10:00:00' },
];

const CampaignForm = ({ onSubmit, onCancel }) => {
  const [newCampaignTitle, setNewCampaignTitle] = useState('');
  const [newCampaignDate, setNewCampaignDate] = useState<Date | undefined>(undefined);
  const [newCampaignLocation, setNewCampaignLocation] = useState('');
  const [newCampaignTime, setNewCampaignTime] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSubmit = () => {
    if (newCampaignTitle.trim() && newCampaignLocation.trim()) {
      onSubmit({
        title: newCampaignTitle,
        date: newCampaignDate?.toDateString(),
        location: newCampaignLocation,
        time: newCampaignTime?.toLocaleTimeString(),
      });
      setNewCampaignTitle('');
      setNewCampaignDate(undefined);
      setNewCampaignLocation('');
      setNewCampaignTime(undefined);
    }
  };

  return (
    <>
    <Text className='text-4xl underline font-bold mb-8'>CREATE CAMPAIGN</Text>
    <View className="bg-white p-6 rounded-lg shadow-md w-4/5 "> 
    
      <TextInput
        className="h-10 border border-gray-300 rounded px-2 mb-4"
        placeholder="Enter campaign title"
        value={newCampaignTitle}
        onChangeText={setNewCampaignTitle}
      />
      <TextInput
        className="h-10 border border-gray-300 rounded px-2 mb-4"
        placeholder="Enter campaign location"
        value={newCampaignLocation}
        onChangeText={setNewCampaignLocation}
      />
      <TouchableOpacity className="h-10 border border-gray-300 rounded px-2 mb-4 flex justify-center" onPress={() => setShowDatePicker(true)}>
        <Text>{newCampaignDate ? newCampaignDate.toDateString() : 'Select Date'}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={newCampaignDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => { setShowDatePicker(false); setNewCampaignDate(selectedDate); }}
        />
      )}
      <TouchableOpacity className="h-10 border border-gray-300 rounded px-2 mb-4 flex justify-center" onPress={() => setShowTimePicker(true)}>
        <Text>{newCampaignTime ? newCampaignTime.toLocaleTimeString() : 'Select Time'}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={newCampaignTime || new Date()}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => { setShowTimePicker(false); setNewCampaignTime(selectedTime); }}
        />
      )}
      <View className="flex-row justify-between">
        <TouchableOpacity onPress={onCancel} className="bg-red-500 py-2 px-4 rounded">
          <Text className="text-white">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit} className="bg-blue-500 py-2 px-4 rounded">
          <Text className="text-white">Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
};

const CampaignPage = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [campaignList, setCampaignList] = useState<Campaign[]>(initialCampaigns);

  const filteredCampaigns = campaignList.filter((campaign) =>
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCampaign = () => {
    setFormVisible(true);
  };

  const addNewCampaign = (newCampaign) => {
    newCampaign.id = (campaignList.length + 1).toString();
    setCampaignList([...campaignList, newCampaign]);
    setFormVisible(false);
  };

  return (
    <View className="flex-1 p-4 bg-[#e6f3ed]">
      <Text className="text-4xl underline font-bold mb-8 mt-24 text-center">CAMPAIGN</Text>

      {/* Search Bar */}
      <View className="flex-row items-center bg-gray-300 rounded-xl border p-2 mb-4 shadow-md">
        <Icon name="search" size={20} color="gray" className="mr-2" />
        <TextInput
          placeholder="Search a campaign"
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="flex-1 pl-2"
        />
      </View>

      {/* Create New Campaign Button */}
      <TouchableOpacity
        onPress={handleCreateCampaign}
        className="bg-green-500 py-3 px-6 rounded-3xl shadow-md items-center mb-4"
      >
        <Text className="text-white text-lg font-semibold">Create New Campaign</Text>
      </TouchableOpacity>

      <ScrollView>
        <FlatList
          data={filteredCampaigns}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="p-4 bg-white border mt-2 rounded-xl mb-4 shadow-md">
              <Text className="text-lg font-bold">{item.title}</Text>
              <Text>{item.date}</Text>
              <Text>{item.location}</Text>
              <Text>{item.time}</Text>
            </View>
          )}
        />
      </ScrollView>

      <Modal visible={isFormVisible} animationType="slide">
        <View className="flex-1 justify-center items-center bg-[#e6f3ed]">
          <CampaignForm onSubmit={addNewCampaign} onCancel={() => setFormVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default CampaignPage;
