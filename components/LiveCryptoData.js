import React, { useEffect, useState } from "react";
import useWebSocket from "react-native-use-websocket";
import { View, Text } from "react-native";

export default function LiveCryptoData() {
  const SOCKET_URL = "wss://wsaws.okx.com:8443/ws/v5/public";
  const { sendMessage, lastMessage } = useWebSocket(SOCKET_URL, {
    onOpen: () => console.log("WebSocket Connected"),
    shouldReconnect: (closeEvent) => true,
  });
  const [tickerData, setTickerData] = useState([]);
  const tickerChannel = "index-tickers";
  const tickerInstId = "BTC-USDT";

  useEffect(() => {
    const message = {
      op: "subscribe",
      args: [
        {
          channel: tickerChannel,
          instId: tickerInstId,
        },
      ],
    };
    sendMessage(JSON.stringify(message));
  }, [tickerInstId, sendMessage, tickerChannel]);

  useEffect(() => {
    if (lastMessage && lastMessage.data) {
      try {
        const data = JSON.parse(lastMessage.data);
        console.log("Received data:", data); // Log the received data
        if (data?.data) {
          setTickerData(data.data);
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [lastMessage]);

  console.log("Ticker Data:", tickerData); // Log the ticker data

  return (
    <View>
      <Text>Hello</Text>
      {tickerData.map((ticker, index) => (
        <View key={index}>
          <Text>{ticker.instId}</Text>
          <Text>Last Price: {ticker.idxPx}</Text>
          <Text>Last Price: {ticker.high24h}</Text>
          {/* Add more information as needed */}
        </View>
      ))}
    </View>
  );
}
