import React, {useEffect, useMemo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Header} from '@components';
import ErrorPage from '@components/error-page/ErrorPage';
import {fetchHotelInfo} from '@redux/features/hotelSlice';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {theme} from '@utils';
import OrderDetails from './OrderDetails';
import OrdererDetails from './OrdererDetails';
import PaymentDetailsStepper from './PaymentDetailsStepper';

const PaymentDetails = () => {
  const dispatch = useAppDispatch();
  const {error} = useAppSelector(state => state.hotel);

  const renderContentSeparator = useMemo(() => <View style={styles.contentSeparator} />, []);

  useEffect(() => {
    void dispatch(fetchHotelInfo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <ErrorPage onReload={() => dispatch(fetchHotelInfo())} />;
  }

  return (
    <View>
      <Header title="Payment Details" titleColor="white_1" color="blue_1" />
      <PaymentDetailsStepper />
      {renderContentSeparator}
      <OrderDetails />
      {renderContentSeparator}
      <OrdererDetails />
    </View>
  );
};

export default PaymentDetails;
const styles = StyleSheet.create({
  contentSeparator: {
    height: 2,
    width: Dimensions.get('screen').width,
    backgroundColor: theme.white_5,
  },
});
