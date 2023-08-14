import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, FlatList, View, ListRenderItem} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BASE_URL_COIN_CAP} from '@env';
import {getTikers} from '@services';
import {CryptoData} from '@types';

import styles from './styles';

interface MainListInfo {
  currentData: CryptoData[];
  limitData: number;
}
const INITIAL_MAIN_LIST: MainListInfo = {
  currentData: [],
  limitData: 0,
};
type ListKeyExtractor = (item: CryptoData, index: number) => string;

const REQUEST_LIMIT = 100;
export function Home() {
  const [mainList, setMainList] = useState<MainListInfo>(INITIAL_MAIN_LIST);
  const [loading, setLoading] = useState<boolean>(false);
  console.log('mainList', mainList);
  const handleGetTikers = async (start: number, limit: number) => {
    try {
      setLoading(true);
      const response = await getTikers(start, limit);
      let currentMainList: MainListInfo = {
        currentData: [],
        limitData: response.info.coins_num,
      };
      if (start === 0) {
        setMainList({
          ...currentMainList,
          currentData: response.data,
        });
      } else {
        setMainList(data => ({
          ...currentMainList,
          currentData: [...data.currentData, ...response.data],
        }));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleOnRefresh = () => {
    handleGetTikers(0, REQUEST_LIMIT);
  };
  const handleEndReached = () => {
    const mainListLength = mainList.currentData.length;
    const nearOfLimit = mainList.limitData - mainListLength;
    if (mainListLength < mainList.limitData) {
      handleGetTikers(
        mainListLength,
        nearOfLimit < REQUEST_LIMIT ? nearOfLimit : REQUEST_LIMIT,
      );
    }
  };
  useEffect(() => {
    handleGetTikers(0, REQUEST_LIMIT);
  }, []);

  const listHeaderComponent = () => <View />;
  const separatorView = () => <View style={styles.separator} />;
  const keyExtractor: ListKeyExtractor = (item, index) => item.id + index;
  const listEmptyComponent = () => <View />;
  const renderItem: ListRenderItem<CryptoData> = ({item, index}) => (
    <View style={styles.itemContainer} key={index}>
      <FastImage
        style={styles.imagen}
        source={{
          uri: `${BASE_URL_COIN_CAP}assets/icons/${item.symbol.toLowerCase()}@2x.png`,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.textName}>{item.name}</Text>
      <Text style={styles.textCoinUSD}>
        {item.price_usd + '('}
        <Text
          style={
            item.percent_change_24h.charAt(0) === '-'
              ? styles.textPorcentDown
              : styles.textPorcentUp
          }>
          {item.percent_change_24h + '%'}
        </Text>
        {')'}
      </Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList<CryptoData>
        data={mainList.currentData}
        extraData={mainList.currentData}
        renderItem={renderItem}
        style={styles.listContainer}
        ListHeaderComponent={listHeaderComponent}
        ListFooterComponent={separatorView}
        ItemSeparatorComponent={separatorView}
        ListEmptyComponent={listEmptyComponent}
        onRefresh={handleOnRefresh}
        refreshing={loading}
        keyExtractor={keyExtractor}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </SafeAreaView>
  );
}
