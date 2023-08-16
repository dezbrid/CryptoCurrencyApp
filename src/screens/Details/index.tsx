import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {BASE_URL_COIN_CAP} from '@env';
import {TextPorcentColor} from '@components';
import {getTIkerDetial} from '@services';
import {TickerData, DetailProps} from '@types';

import styles from './styles';

export function Details({route}: DetailProps) {
  const {id: idTiker} = route.params;
  const [coinDetail, setCoinDetail] = useState<TickerData>();
  console.log('coinDetail', coinDetail);
  const handleGetDetailTiker = async (id: string) => {
    try {
      const detail = await getTIkerDetial(id);
      setCoinDetail(detail);
    } catch (error) {}
  };
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
