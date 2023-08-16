import React, {useCallback, useEffect, useState} from 'react';
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
import {BarSearch} from './components/BarSearch';

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
  const [tickerList, setTickerList] = useState<TickerData[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetTikers = useCallback(
    async (start: number, limit: number) => {
      if (searchValue === '') {
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
      }
    },
    [searchValue],
  );

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
    if (searchValue !== '') {
      const filterByName = mainList.currentData.filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setTickerList(filterByName);
    } else {
      setTickerList(mainList.currentData);
    }
  }, [mainList.currentData, searchValue]);
  useEffect(() => {
    setTickerList(mainList.currentData);
  }, [mainList.currentData]);
  useEffect(() => {
    handleGetTikers(0, REQUEST_LIMIT);
  }, [handleGetTikers]);
  const listFooterComponent = () => <View style={styles.footer} />;
  const separatorView = () => <View style={styles.separator} />;
  const keyExtractor: ListKeyExtractor = (item, index) => item.id + index;
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
        {`${Number(item.price_usd).toFixed(2)} (`}
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
      <BarSearch value={searchValue} setValue={setSearchValue} />
      <FlatList<TickerData>
        data={tickerList}
        extraData={tickerList}
        renderItem={renderItem}
        style={styles.listContainer}
        ListFooterComponent={listFooterComponent}
        ItemSeparatorComponent={separatorView}
        onRefresh={handleOnRefresh}
        refreshing={loading}
        keyExtractor={keyExtractor}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </SafeAreaView>
  );
}
