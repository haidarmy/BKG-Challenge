import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {RadioButtonProps, RadioGroup} from 'react-native-radio-buttons-group';
import {Text} from '@components';
import {FONT_FAMILY} from '@constants';
import {useAppSelector} from '@redux/hooks';
import {theme} from '@utils';
import GuestDataList from './GuestDataList';

const OrdererDetails = () => {
  const {user} = useAppSelector(state => state.orderer);
  const [selectedRadio, setSelectedRadio] = useState<string | undefined>('1');

  const renderOrdererInfo = useMemo(
    () => (
      <>
        <Text type="regular_2">Detail Pemesan</Text>
        <View style={styles.ordererInfo}>
          <View style={{flexShrink: 1}}>
            <Text type="regular_2">
              {user.prefix} {user.name}
            </Text>
            <Text color="white_6">{user.email}</Text>
            <Text color="white_6">{user.phone}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text color="blue_1" style={{textDecorationLine: 'underline'}}>
              Ubah
            </Text>
          </TouchableOpacity>
        </View>
      </>
    ),
    [user.email, user.prefix, user.name, user.phone],
  );

  const renderRadio = useMemo(() => {
    const radioStyle = {
      labelStyle: {
        fontFamily: FONT_FAMILY.medium,
        color: theme.black_1,
        marginLeft: 5,
      },
      color: theme.blue_1,
    };

    const radioButtons: RadioButtonProps[] = [
      {
        id: '1',
        label: 'Saya memesan untuk sendiri',
        ...radioStyle,
      },
      {
        id: '2',
        label: 'Saya memesan untuk orang lain',
        ...radioStyle,
      },
    ];

    return (
      <RadioGroup
        containerStyle={{alignItems: 'flex-start'}}
        radioButtons={radioButtons}
        onPress={setSelectedRadio}
        selectedId={selectedRadio}
      />
    );
  }, [selectedRadio]);

  const renderOrdererDetails = useMemo(
    () => (
      <View style={styles.container}>
        {renderOrdererInfo}
        {renderRadio}
        {selectedRadio === '2' && <GuestDataList />}
      </View>
    ),
    [renderOrdererInfo, renderRadio, selectedRadio],
  );

  return renderOrdererDetails;
};

export default OrdererDetails;
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  ordererInfo: {
    borderWidth: 2,
    borderColor: theme.white_5,
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
});
