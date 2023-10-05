import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Il_error} from '@assets';
import {Button} from '@components/button';
import {Gap} from '@components/layout';
import {Text} from '@components/text';
import {theme} from '@utils';

type ErrorPageProps = {
  onReload(): void;
};

const ErrorPage = ({onReload}: ErrorPageProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.illustrationWrapper}>
        <Il_error width={240} height={240} />
        <Gap height={10} />
        <Text type="title_2" color="black_1">
          Something went wrong
        </Text>
        <Gap height={60} />
        <Button
          onPress={onReload}
          type="solid"
          tittle="Reload"
          color="yellow_1"
          tittleColor="white_1"
          style={{height: '8%', width: '40%', padding: 0}}
        />
      </View>
    </View>
  );
};

export default ErrorPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.white_1,
  },
  illustrationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
