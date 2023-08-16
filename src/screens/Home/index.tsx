import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import {BASE_URL_COIN_CAP} from '@env';
import {TextPorcentColor} from '@components';
import {getTikers} from '@services';
import {TickerData, HomeProps} from '@types';

import styles from './styles';

interface MainListInfo {
  currentData: TickerData[];
  limitData: number;
}
const INITIAL_MAIN_LIST: MainListInfo = {
  currentData: [],
  limitData: 0,
};
type ListKeyExtractor = (item: TickerData, index: number) => string;

const REQUEST_LIMIT = 100;

export function Home({navigation}: HomeProps) {
  const [mainList, setMainList] = useState<MainListInfo>(INITIAL_MAIN_LIST);
  const [loading, setLoading] = useState<boolean>(false);

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
  const handleNavigation = (id: string) => {
    navigation.navigate('Details', {id});
  };

  useEffect(() => {
    handleGetTikers(0, REQUEST_LIMIT);
  }, []);

  const listHeaderComponent = () => <View />;
  const separatorView = () => <View style={styles.separator} />;
  const keyExtractor: ListKeyExtractor = (item, index) => item.id + index;
  const listEmptyComponent = () => <View />;
  const renderItem: ListRenderItem<TickerData> = ({item, index}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      key={index}
      onPress={() => handleNavigation(item.id)}>
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
        {`${item.price_usd} (`}
        <TextPorcentColor
          textValue={item.percent_change_24h}
          type="porcent"
          style={styles.textPorcent}
        />
        {')'}
      </Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList<TickerData>
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
