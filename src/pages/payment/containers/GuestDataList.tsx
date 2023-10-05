import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Gap, Text} from '@components';
import {RootScreenNavigationProp} from '@navigations';
import {useAppSelector} from '@redux/hooks';
import {GuestData} from '@types';
import {theme} from '@utils';

const GuestDataList = () => {
  const navigation = useNavigation<RootScreenNavigationProp>();
  const {guest} = useAppSelector(state => state.orderer);

  const [guestData, setGuestData] = useState(guest);
  const [showAllGuestData, setShowAllGuestData] = useState(3);

  const handleGuestData = useMemo(
    () => [...guestData].reverse().slice(0, showAllGuestData),
    [guestData, showAllGuestData],
  );

  const handleSelectGuest = useCallback(
    (currGuest: GuestData) => {
      const newGuestData = guestData.map(guest => {
        if (guest.id !== currGuest.id && guest.isChosen) {
          return {...guest, isChosen: false};
        }
        if (guest.id === currGuest.id) {
          return {...guest, isChosen: true};
        }
        return guest;
      });
      setGuestData(newGuestData);
    },
    [guestData],
  );

  const renderItem = useCallback(
    ({item}: Record<'item', GuestData>) => (
      <TouchableOpacity
        onPress={() => handleSelectGuest(item)}
        activeOpacity={0.7}
        style={StyleSheet.flatten([styles.guest, item.isChosen && {borderColor: theme.blue_1}])}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Icon name="user" size={24} color={theme.black_1} />
          <Gap width={10} />
          <Text style={{flexShrink: 1}}>{item.prefix + ' ' + item.name}</Text>
        </View>
        <Gap width={10} />
        {item.isChosen && <Icon name="check" size={24} color={theme.green_1} />}
      </TouchableOpacity>
    ),
    [handleSelectGuest],
  );

  const renderGuestDataList = useMemo(
    () => (
      <View style={{marginTop: 8}}>
        <Text type="regular_2">Data Tamu</Text>
        <Gap height={16} />
        <FlatList
          scrollEnabled={false}
          data={handleGuestData}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <Gap height={10} />}
        />
        <Gap height={16} />
        {guestData.length > showAllGuestData && (
          <TouchableOpacity
            onPress={() => setShowAllGuestData(prev => prev + 3)}
            activeOpacity={0.7}
            style={{alignSelf: 'center'}}>
            <Text color="yellow_1" style={{textDecorationLine: 'underline'}}>
              + Load More
            </Text>
          </TouchableOpacity>
        )}
        <Gap height={16} />
        <TouchableOpacity
          onPress={() => navigation.navigate('AddGuestData', guest)}
          activeOpacity={0.7}
          style={{alignSelf: 'flex-end'}}>
          <Text color="blue_1" style={{textDecorationLine: 'underline'}}>
            Ubah Data Tamu
          </Text>
        </TouchableOpacity>
      </View>
    ),
    [guest, guestData.length, handleGuestData, navigation, renderItem, showAllGuestData],
  );

  return renderGuestDataList;
};

export default GuestDataList;

const styles = StyleSheet.create({
  guest: {
    borderWidth: 2,
    borderColor: theme.white_5,
    borderRadius: 10,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
});
