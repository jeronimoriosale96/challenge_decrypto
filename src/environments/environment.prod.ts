export const environment = {
    production: true,
    apiUrl: 'http://localhost:3000',
    webSocket: 'wss://ws.bitmex.com/realtime',
    cryptoCall: {"op": "subscribe", "args": ["trade:ETHUSD","trade:SOLUSD","trade:ADAUSD","trade:LTCUSD","trade:APE","trade:AVAX","trade:MATIC","trade:BNB"]}
};