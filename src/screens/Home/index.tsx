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

/* The code is defining a functional component called "Home" that represents the main screen of a React
Native app. */
export function Home({navigation}: HomeProps) {
  const [mainList, setMainList] = useState<MainListInfo>(INITIAL_MAIN_LIST);
  const [tickerList, setTickerList] = useState<TickerData[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  /* The `handleGetTikers` function is a callback function that is used to fetch ticker data from an
 API. It takes two parameters: `start` and `limit`, which determine the range of data to fetch. */
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

  /**
   * The function `handleOnRefresh` is used to refresh the tikers by calling the `handleGetTikers`
   * function with the parameters 0 and REQUEST_LIMIT.
   */
  const handleOnRefresh = () => {
    handleGetTikers(0, REQUEST_LIMIT);
  };

  /**
   * The function `handleEndReached` is used to handle the event when the end of a list is reached in a
   * React component, and it fetches more data if the current data length is less than the specified
   * limit.
   */
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

  /**
   * The handleNavigation function navigates to the 'Details' screen with the provided id as a
   * parameter.
   * @param {string} id - The `id` parameter is a string that represents the identifier of a specific
   * item or entity.
   */
  const handleNavigation = (id: string) => {
    navigation.navigate('Details', {id});
  };
  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
`useEffect` hook is used to update the `tickerList` state based on the `searchValue` and
`mainList.currentData` states. */
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

  /* The `useEffect` hook is used to update the `tickerList` state whenever the `mainList.currentData`
state changes. */
  useEffect(() => {
    setTickerList(mainList.currentData);
  }, [mainList.currentData]);

  /* The `useEffect` hook is used to call the `handleGetTikers` function when the component mounts or
 when the `handleGetTikers` function changes. In this case, it is called with the parameters 0 and
 REQUEST_LIMIT, which fetches the initial ticker data. */
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
