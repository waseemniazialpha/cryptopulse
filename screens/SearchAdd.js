import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import useWebSocket from 'react-native-use-websocket';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const SOCKET_URL = 'wss://wsaws.okx.com:8443/ws/v5/public';
const tickerChannel = 'index-tickers';
const tickerInstIds = [
  'BTC-USDT',
  'ETH-USDT',
  'XRP-USDT',
  'LTC-USDT',
  'BCH-USDT',
  'DASH-USDT',
];

const cryptoData = [
  {
    id: 1,
    icon: require('../assets/Icon.png'),
    name: 'Bitcoin',
    symbol: 'BTC',
    price: '$5,750.70',
    change: '+ 7.12',
  },
  {
    id: 2,
    icon: require('../assets/Icon2.png'),
    name: 'Ethereum',
    symbol: 'ETH',
    price: '$315.86',
    change: '- 4.05',
  },
  {
    id: 3,
    icon: require('../assets/Icon.png'),
    name: 'Bitcoin Cash',
    symbol: 'BCH',
    price: '$1,181.54',
    change: '- 21.12',
  },
  {
    id: 4,
    icon: require('../assets/Icon3.png'),
    name: 'Ripple',
    symbol: 'XRP',
    price: '$0.20034',
    change: '+ 14.92',
  },
  {
    id: 5,
    icon: require('../assets/Icon4.png'),
    name: 'Litecoin',
    symbol: 'LTC',
    price: '$61.13',
    change: '- 1.69',
  },
  {
    id: 6,
    icon: require('../assets/Icon5.png'),
    name: 'Dash',
    symbol: 'DASH',
    price: '$405.23',
    change: '- 9.65',
  },
  // {
  //   id: 7,
  //   icon: require('../assets/Icon6.png'),
  //   name: 'Peercoin',
  //   symbol: 'PPC',
  //   price: '$0.922156',
  //   change: '+ 5.10',
  // },
];
const SearchAdd = ({ onBack, onCryptoSelect, setSelectedCryptos }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { sendMessage, lastMessage } = useWebSocket(SOCKET_URL, {
    onOpen: () => console.log('WebSocket Connected'),
    shouldReconnect: closeEvent => true,
  });

  const [tickerValues, setTickerValues] = useState({});

  useEffect(() => {
    const subscriptions = tickerInstIds.map(instId => ({
      channel: tickerChannel,
      instId,
    }));

    const message = {
      op: 'subscribe',
      args: subscriptions,
    };

    sendMessage(JSON.stringify(message));

    return () => {
      const unsubscribeMessage = {
        op: 'unsubscribe',
        args: subscriptions,
      };
      sendMessage(JSON.stringify(unsubscribeMessage));
    };
  }, [tickerInstIds, sendMessage]);

  useEffect(() => {
    if (lastMessage && lastMessage.data) {
      try {
        const data = JSON.parse(lastMessage.data);

        if (data?.data) {
          const updatedValues = {};
          data.data.forEach(item => {
            updatedValues[item.instId] = {
              ts: item.ts,
              idxPx: item.idxPx,
              sodUtc0: item.sodUtc0,
              low24h: item.low24h,
            };
          });
          setTickerValues(prevValues => ({ ...prevValues, ...updatedValues }));
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  }, [lastMessage]);

  const mergedData = cryptoData.map(crypto => ({
    ...crypto,
    ticker: tickerValues[crypto.symbol + '-USDT'] || {},
  }));

  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = query => {
    setSearchQuery(query);

    const filteredCryptoData = mergedData.filter(
      crypto =>
        crypto.name.toLowerCase().includes(query.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredData(filteredCryptoData);
  };

  return (
    <View>
      <View style={styles.Mcontainer}>
        <View style={styles.back}>
          <TouchableOpacity onPress={onBack}>
            <Image source={require('../assets/back2.png')} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Add Crypto to Monitor</Text>
        </View>
        <View style={styles.searchContainer}>
          <Image
            source={require('../assets/Search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#6D778B"
            value={searchQuery}
            onChangeText={text => handleSearch(text)}
          />
        </View>
      </View>
      <FlatList
        data={filteredData.length > 0 ? filteredData : mergedData}
        keyExtractor={item => item.symbol}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCryptos(pre => [...pre, item]);
              onCryptoSelect(item);
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                gap: 20,
                padding: 10,
                alignItems: 'center',
              }}
            >
              <Image source={item.icon} style={{ marginRight: 10 }} />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '70%',
                  borderBottomColor: '#1A202E',
                  borderBottomWidth: 1,
                  paddingVertical: 16,
                }}
              >
                <View>
                  <Text style={{ fontWeight: 'bold', color: 'white' }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontWeight: 'bold', color: '#6D778B' }}>
                    {item.symbol}
                  </Text>
                </View>
                <View>
                  <Text style={{ fontWeight: 'bold', color: 'white' }}>
                    {item.ticker.idxPx}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: item.change.startsWith('-')
                        ? '#FF3750'
                        : '#00C873',
                      textAlign: 'right',
                    }}
                  >
                    {item.change}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  Mcontainer: {
    paddingHorizontal: 15,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  Mcontent: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,

    marginTop: 10,
    fontFamily: 'SF-Pro-Text-Regular',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 16,
    borderBottomColor: '#1A202E',
  },
  content2: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#1A202E',
    borderTopColor: '#2E3546',
    borderTopWidth: 1,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  back: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#1A202E',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 13,
    height: 13,
    tintColor: '#6D778B',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    marginLeft: 10,
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: 14,
    height: 38,
  },
  headerText: {
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: 14,
    color: '#fff',
    lineHeight: 22,
  },

  cryptoName: {
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: 14,
    color: '#fff',
    lineHeight: 22,
  },

  cryptoSymbol: {
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: 11,
    color: '#6D778B',
    lineHeight: 16,
  },

  cryptoPrice: {
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: 14,
    color: '#fff',
    lineHeight: 22,
  },

  cryptoChange: {
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'right',
  },
});

export default SearchAdd;
