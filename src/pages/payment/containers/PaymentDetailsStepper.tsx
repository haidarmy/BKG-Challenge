import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Gap, Text} from '@components';
import {theme} from '@utils';

const PaymentDetailsStepper = () => {
  const handleRenderStep = useCallback(
    (position: number, label: string, isActive?: 'ACTIVE') => (
      <View style={styles.step}>
        <View
          style={StyleSheet.flatten([
            styles.stepIndicator,
            isActive && {backgroundColor: theme.blue_1},
            !isActive && {backgroundColor: theme.white_5},
          ])}>
          <Text style={{color: theme.white_1}}>{position}</Text>
        </View>
        <Text type="regular_3" color={isActive ? 'black_1' : 'white_5'}>
          {label}
        </Text>
      </View>
    ),
    [],
  );

  const handleRenderStepSeparator = useMemo(
    () => (
      <>
        <Gap width={10} />
        <Icon name="minus" size={30} color={theme.white_5} />
        <Gap width={10} />
      </>
    ),
    [],
  );

  const renderStepper = useMemo(
    () => (
      <View style={styles.stepperContainer}>
        <Gap width={120} />
        {handleRenderStep(1, 'Detail Pesanan', 'ACTIVE')}
        {handleRenderStepSeparator}
        {handleRenderStep(2, 'Pembayaran')}
      </View>
    ),
    [handleRenderStep, handleRenderStepSeparator],
  );

  return renderStepper;
};

export default PaymentDetailsStepper;

const styles = StyleSheet.create({
  stepIndicator: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
});
