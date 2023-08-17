import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {BASE_URL_COIN_CAP} from '@env';
import {TextPorcentColor} from '@components';
import {getTickerDetail} from '@services';
import {TickerData, DetailProps} from '@types';

import styles from './styles';

/**
 * The `Details` function is a React component that displays the details of a ticker, including its
 * rank, name, symbol, price in USD and BTC, and a corresponding image.
 *
 * @param {DetailProps} route - The `route` prop is an object that contains the navigation route parameters.
 *
 * @returns {JSX.Element} The `Details` component returns a JSX element that represents the UI of the component.
 * It includes a `SafeAreaView` component as the root container, which contains a `FastImage` component
 * for displaying an image, and a `View` component for displaying various text elements. The text
 * elements display information about a coin's rank, name, symbol, price in USD, price in BTC, and
 * percentage change in the last 24 hours.
 */
export function Details({route}: DetailProps): JSX.Element {
  const {id: idTicker} = route.params;
  const [coinDetail, setCoinDetail] = useState<TickerData>();

  /**
   * The `handleGetDetailTiker` function is an asynchronous function that retrieves the detail of a
   * ticker by its ID and sets the retrieved detail in the state variable `coinDetail`.
   *
   * @param {string} id - The ID of the ticker.
   * @returns {Promise<void>} A promise that resolves when the detail is fetched and set in the state.
   */
  const handleGetDetailTiker = async (id: string): Promise<void> => {
    try {
      const detail = await getTickerDetail(id);
      setCoinDetail(detail);
    } catch (error) {}
  };
  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
  `useEffect` hook is used to call the `handleGetDetailTiker` function whenever the `idTicker`
  variable changes. */
  useEffect(() => {
    handleGetDetailTiker(idTicker);
  }, [idTicker]);

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
