import React, {useCallback, useId, useMemo, useState} from 'react';
import {Dimensions, StyleSheet, View, TouchableOpacity} from 'react-native';
import SelectDropdown, {SelectDropdownProps} from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button, Gap, Header, Input, Text} from '@components';
import {FONT_FAMILY} from '@constants';
import {RootScreenNavigationProp, RouteStackProp} from '@navigations';
import {editGuest} from '@redux/features/ordererSlice';
import {useAppDispatch} from '@redux/hooks';
import {GuestData} from '@types';
import {theme} from '@utils';
import hexToRgba from 'hex-to-rgba';

const prefix: GuestData['prefix'][] = ['Tn.', 'Ny.'];

const dropDownStyle: Omit<SelectDropdownProps, 'data' | 'onSelect'> = {
  statusBarTranslucent: true,
  selectedRowStyle: {backgroundColor: hexToRgba(theme.yellow_1, 0.25)},
  rowStyle: {backgroundColor: theme.white_1},
  selectedRowTextStyle: styles().dropDownSelectedRowText,
  rowTextStyle: styles().dropDownRowText,
  dropdownStyle: {borderRadius: 12},
  renderDropdownIcon: () => <Icon name="chevron-down" size={24} color={theme.blue_1} />,
  defaultButtonText: 'Tn.',
  buttonTextStyle: styles().dropDownText,
  buttonStyle: styles().dropDownButton,
};

const AddGuestData = () => {
  const navigation = useNavigation<RootScreenNavigationProp>();
  const route = useRoute<RouteStackProp>();
  const guest = route.params || [];

  const [inputs, setInputs] = useState(guest);
  const dispatch = useAppDispatch();
  const uid = useId();

  const handleAddInput = useCallback(() => {
    const newInput = [...inputs];
    newInput.push({id: uid, prefix: 'Tn.', name: '', isChosen: false});
    setInputs(newInput);
  }, [inputs, uid]);

  const handleRemoveInput = useCallback(
    (index: number) => {
      const newInput = [...inputs];
      newInput.splice(index, 1);
      setInputs(newInput);
    },
    [inputs],
  );

  const handleInputChange = useCallback((index: number, name: string) => {
    setInputs(prevInput => {
      const newInput = [...prevInput];
      newInput[index] = {...newInput[index], name: name || ''};
      return newInput;
    });
  }, []);

  const handlePrefixChange = useCallback((index: number, prefix: GuestData['prefix']) => {
    setInputs(prevInput => {
      const newInput = [...prevInput];
      newInput[index] = {...newInput[index], prefix: prefix || ''};
      return newInput;
    });
  }, []);

  const handleSubmitInput = useCallback(() => {
    dispatch(editGuest(inputs as GuestData[]));
    navigation.replace('PaymentDetails');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs]);

  const renderInput = useCallback(
    (input: GuestData, idx: number) => (
      <View key={idx} style={styles().inputWrapper}>
        <SelectDropdown
          defaultValue={input.prefix}
          data={prefix}
          onSelect={(selectedItem: GuestData['prefix']) => {
            handlePrefixChange(idx, selectedItem);
          }}
          {...dropDownStyle}
        />
        <Gap width={10} />
        <Input
          maxLength={30}
          style={{width: Dimensions.get('screen').width - 120}}
          rightIcon={<Icon name="trash" size={30} color={theme.red_3} />}
          rightIconAction={() => handleRemoveInput(idx)}
          value={input.name}
          onChangeText={value => handleInputChange(idx, value)}
        />
      </View>
    ),
    [handleInputChange, handlePrefixChange, handleRemoveInput],
  );

  const renderForm = useMemo(
    () => (
      <View style={styles().container}>
        <View style={styles().content}>
          <Text type="regular_2" color="blue_1">
            Data Tamu
          </Text>
          <Gap height={20} />
          {inputs?.map((input, idx) => renderInput(input, idx))}
          <TouchableOpacity
            onPress={handleAddInput}
            activeOpacity={0.7}
            style={{alignSelf: 'center'}}>
            <Text color="yellow_1" style={{textDecorationLine: 'underline'}}>
              + Tambah Data Tamu
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          onPress={handleSubmitInput}
          type="solid"
          color="yellow_1"
          tittle="Simpan"
          tittleColor="white_1"
        />
      </View>
    ),
    [handleAddInput, handleSubmitInput, inputs, renderInput],
  );

  const renderAddGuestData = useMemo(
    () => (
      <>
        <Header
          title="Tambah Data Tamu"
          titleColor="white_1"
          color="blue_1"
          onBack={() => navigation.goBack()}
        />
        {renderForm}
      </>
    ),
    [navigation, renderForm],
  );

  return renderAddGuestData;
};

export default AddGuestData;

function styles() {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    content: {
      flex: 1,
    },
    inputWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    dropDownButton: {
      width: 90,
      height: 60,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.white_5,
    },
    dropDownText: {
      fontSize: 16,
      fontFamily: FONT_FAMILY.semiBold,
      textAlign: 'center',
      color: theme.blue_1,
    },
    dropDownRowText: {
      fontSize: 18,
      fontFamily: FONT_FAMILY.bold,
      textAlign: 'center',
      color: theme.blue_1,
    },
    dropDownSelectedRowText: {
      fontSize: 16,
      fontFamily: FONT_FAMILY.semiBold,
      textAlign: 'center',
      color: theme.white_6,
    },
  });
}
