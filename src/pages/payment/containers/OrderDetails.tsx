import React, {useCallback, useMemo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/Feather';
import {Text} from '@components';
import {useAppSelector} from '@redux/hooks';
import {theme} from '@utils';
import dayjs from 'dayjs';

const OrderDetails = () => {
  const {hotel_info, loading} = useAppSelector(state => state.hotel);
  const {
    chosen_hotel_detail: hotelDetail,
    chosen_hotel_room: hotelRoom,
    chosen_hotel_params: hotelParams,
  } = hotel_info;

  const handleHotelInfoSkeleton = useMemo(
    () => (
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item alignItems="center" flexDirection="row">
          <SkeletonPlaceholder.Item borderRadius={8} width={80} height={80} marginRight={15} />
          <SkeletonPlaceholder.Item paddingTop={10}>
            <SkeletonPlaceholder.Item borderRadius={4} width={160} height={16} marginBottom={10} />
            <SkeletonPlaceholder.Item borderRadius={4} width={120} height={16} marginBottom={8} />
            <SkeletonPlaceholder.Item borderRadius={4} width={200} height={16} marginBottom={8} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    ),
    [],
  );

  const renderHotelInfo = useMemo(
    () => (
      <View style={styles.hotelInfo}>
        {loading && handleHotelInfoSkeleton}
        {!loading && (
          <>
            <>
              {!!hotelDetail.images[0].thumbnail && (
                <Image
                  source={{uri: hotelDetail.images[0].thumbnail}}
                  width={80}
                  height={80}
                  style={styles.hotelImage}
                />
              )}
            </>
            <View style={{flexShrink: 1}}>
              <Text type="regular_2" color="blue_1" style={{marginBottom: 1}}>
                {hotelDetail.hotel_name}
              </Text>
              <Text type="regular_3" color="white_6">
                {hotelRoom.room_name}
              </Text>
              <Text type="regular_3" color="white_6">
                {hotelParams.total_room} Kamar • {hotelParams.guest_adult} Tamu •{' '}
                {dayjs(hotelParams.check_out).diff(dayjs(hotelParams.check_in), 'day')} Malam
              </Text>
            </View>
          </>
        )}
      </View>
    ),
    [
      handleHotelInfoSkeleton,
      hotelDetail.hotel_name,
      hotelDetail.images,
      hotelParams.check_in,
      hotelParams.check_out,
      hotelParams.guest_adult,
      hotelParams.total_room,
      hotelRoom.room_name,
      loading,
    ],
  );

  const renderCheckInOut = useCallback(
    (label: string, date: string) => (
      <View style={styles.checkInOut}>
        <Text type="regular_2">{label}</Text>
        {!loading && <Text color="white_6">{date}</Text>}
        {loading && (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item borderRadius={4} width={100} height={16} />
          </SkeletonPlaceholder>
        )}
      </View>
    ),
    [loading],
  );

  const renderOrderDetails = useMemo(
    () => (
      <View style={styles.container}>
        <Text type="regular_2">Detail Pesanan</Text>
        {renderHotelInfo}
        {renderCheckInOut('Check-In', hotelParams.check_in)}
        {renderCheckInOut('Check-Out', hotelParams.check_in)}
        <View style={styles.refund}>
          <Icon name="refresh-cw" size={22} color={theme.yellow_1} style={{marginRight: 10}} />
          <Text color="yellow_1" type="regular_1" style={{fontStyle: 'italic'}}>
            Dapat direfund jika dibatalkan
          </Text>
        </View>
      </View>
    ),
    [hotelParams.check_in, renderCheckInOut, renderHotelInfo],
  );

  return renderOrderDetails;
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  hotelInfo: {
    borderWidth: 2,
    borderColor: theme.white_5,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 15,
  },
  hotelImage: {
    borderRadius: 8,
    resizeMode: 'cover',
    marginRight: 15,
  },
  checkInOut: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  refund: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
