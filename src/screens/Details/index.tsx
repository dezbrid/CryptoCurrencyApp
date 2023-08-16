import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {BASE_URL_COIN_CAP} from '@env';
import {TextPorcentColor} from '@components';
import {getTIkerDetial} from '@services';
import {TickerData, DetailProps} from '@types';

import styles from './styles';

/**
 * The `Details` function is a React component that displays the details of a ticker, including its
 * rank, name, symbol, price in USD and BTC, and a corresponding image.
 * @param {DetailProps}  - - `DetailProps`: This is the type definition for the props passed to the
 * `Details` component. It may include properties such as `route`, which is used to access the
 * navigation route parameters.
 * @returns The `Details` component is returning a JSX element that represents the UI of the component.
 * It includes a `SafeAreaView` component as the root container, which contains a `FastImage` component
 * for displaying an image, and a `View` component for displaying various text elements. The text
 * elements display information about a coin's rank, name, symbol, price in USD, price in BTC, and
 */
export function Details({route}: DetailProps) {
  const {id: idTiker} = route.params;
  const [coinDetail, setCoinDetail] = useState<TickerData>();
  /**
   * The function "handleGetDetailTiker" is an asynchronous function that retrieves the detail of a
   * ticker by its ID and sets the retrieved detail in the state variable "coinDetail".
   * @param {string} id - The `id` parameter is a string that represents the identifier of a ticker.
   */
  const handleGetDetailTiker = async (id: string) => {
    try {
      const detail = await getTIkerDetial(id);
      setCoinDetail(detail);
    } catch (error) {}
  };

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
  `useEffect` hook is used to call the `handleGetDetailTiker` function whenever the `idTiker`
  variable changes. */
  useEffect(() => {
    handleGetDetailTiker(idTiker);
  }, [idTiker]);
  return (
    <SafeAreaView style={styles.container}>
      <FastImage
        style={styles.imagen}
        source={{
          uri: `${BASE_URL_COIN_CAP}assets/icons/${coinDetail?.symbol.toLowerCase()}@2x.png`,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={styles.subContainer}>
        <View style={styles.titleName}>
          <View style={styles.rankCotainer}>
            <Text style={styles.rank}>Rank</Text>
            <Text style={styles.rank}>{coinDetail?.rank}</Text>
          </View>
          <Text style={styles.name}>{coinDetail?.name}</Text>
          <Text style={styles.symbolic}>{coinDetail?.symbol}</Text>
        </View>
        <Text style={styles.valueUsd}>
          {`${coinDetail?.price_usd} USD`}{' '}
          <TextPorcentColor
            textValue={coinDetail?.percent_change_24h}
            type="parenthesis"
          />
        </Text>
        <Text style={styles.valueBtc}>{`${coinDetail?.price_btc} BTC`} </Text>
      </View>
    </SafeAreaView>
  );
}
