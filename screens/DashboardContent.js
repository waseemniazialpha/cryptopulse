import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import SearchAdd from './SearchAdd';

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

const DashboardContent = () => {
  const [showSearchAdd, setShowSearchAdd] = useState(false);
  const [selectedCryptos, setSelectedCryptos] = useState([]);
  const [tickerValues, setTickerValues] = useState({});
  const [contentIndex, setContentIndex] = useState(0); // Add contentIndex state

  const handleButtonPress = () => {
    setShowSearchAdd(true);
  };

  const handleBack = () => {
    setShowSearchAdd(false);
  };

  const handleCryptoSelect = crypto => {
    setSelectedCryptos([...selectedCryptos, crypto]);
    setContentIndex(contentIndex + 1);
  };

  useEffect(() => {
    const socket = new WebSocket(SOCKET_URL);

    socket.onopen = () => {
      const subscriptions = tickerInstIds.map(instId => ({
        channel: tickerChannel,
        instId,
      }));

      const message = {
        op: 'subscribe',
        args: subscriptions,
      };

      socket.send(JSON.stringify(message));
    };

    socket.onmessage = event => {
      try {
        const data = JSON.parse(event.data);

        if (data?.data) {
          setTickerValues(prevValues => {
            const updatedValues = {...prevValues};

            data.data.forEach(item => {
              updatedValues[item.instId] = {
                ts: item.ts,
                idxPx: item.idxPx,
                sodUtc0: item.sodUtc0,
                low24h: item.low24h,
              };
            });

            return updatedValues;
          });
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const renderContent = () => {
    if (selectedCryptos.length > 0) {
      return selectedCryptos.map((crypto, index) => {
        const idxPx = tickerValues[crypto.symbol + '-USDT']?.idxPx || 'N/A';
  
        return (
          <View key={index} style={styles.content}>
            <View style={{flex:1}}>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Text-Bold',
                  fontSize: 14,
                  color: '#fff',
                  lineHeight: 22,
                }}>
                {crypto.name}
              </Text>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Text-Bold',
                  fontSize: 11,
                  color: crypto.change.startsWith('+') ? '#00C873' : '#FF3750',
                  lineHeight: 22,
                }}>
                {crypto.symbol}
              </Text>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Text-Bold',
                  fontSize: 11,
                  color: crypto.change.startsWith('+') ? '#00C873' : '#FF3750',
                  lineHeight: 12,
                }}>
                {crypto.change}
              </Text>
            </View>
            <View style={{flex:1,marginLeft:20}}>
              <Image
                source={
                  crypto.change.startsWith('-')
                    ? require('../assets/Graph3.png')
                    : require('../assets/Graph2.png')
                }
              />
            </View>
            <View style={{flex:1}}>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Text-Bold',
                  fontSize: 14,
                  color: crypto.change.startsWith('+') ? '#00C873' : '#FF3750',
                  lineHeight: 22,
                  textAlign:'right'
                }}>
                ${idxPx}
              </Text>
            </View>
          </View>
        );
      });
    } else {
      const contentSections = [
        <View key={0} style={styles.content}>
          <View>
            <Text
              style={{
                fontFamily: 'SF-Pro-Text-Bold',
                fontSize: 14,
                color: '#fff',
                lineHeight: 22,
              }}>
              BTC
            </Text>
            <Text
              style={{
                fontFamily: 'SF-Pro-Text-Bold',
                fontSize: 11,
                color: '#00C873',
                lineHeight: 22,
              }}>
              +8.64%
            </Text>
            <Text
              style={{
                fontFamily: 'SF-Pro-Text-Bold',
                fontSize: 11,
                color: '#00C873',
                lineHeight: 12,
              }}>
              +$220.85
            </Text>
          </View>
          <View>
            <Image source={require('../assets/Graph.png')} />
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'SF-Pro-Text-Bold',
                fontSize: 14,
                color: '#0078FF',
                lineHeight: 22,
              }}>
              $35,341.70
            </Text>
          </View>
        </View>,

        <View key={1} style={styles.content}></View>,
      ];

      return contentSections[contentIndex];
    }
  };
  console.log({selectedCryptos});
  return (
    <ImageBackground
      source={require('../assets/dashboard.png')}
      style={{width: '100%', height: '100%'}}>
      <ScrollView>
        <View style={styles.Mcontainer}>
          {!showSearchAdd ? (
            <React.Fragment>
              <View style={styles.container}>
                <Text
                  style={{
                    color: '#6D778B',
                    fontSize: 14,
                    alignSelf: 'flex-end',
                  }}>
                  Crypto Monitoring
                </Text>
                <TouchableOpacity onPress={handleButtonPress}>
                  <Image source={require('../assets/Button.png')} />
                </TouchableOpacity>
              </View>
              {renderContent()}
            </React.Fragment>
          ) : (
            <SearchAdd
              setSelectedCryptos={setSelectedCryptos}
              onBack={handleBack}
              onCryptoSelect={handleCryptoSelect}
            />
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  Mcontainer: {
    paddingTop: 70,
    paddingHorizontal: 15,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  content: {
    display: '1',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A202E',
    borderBottomColor: '#2E3546',
    borderBottomWidth: 1,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  selectedCryptoContent: {
    backgroundColor: '#1A202E',
    marginTop: 10,
    padding: 20,
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
});

export default DashboardContent;
