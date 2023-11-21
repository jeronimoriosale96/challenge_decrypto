export interface ICrypto {
    timestamp:       string;
    symbol:          string;
    side:            string;
    size:            number;
    price:           number;
    tickDirection:   string;
    trdMatchID:      string;
    grossValue:      number;
    homeNotional:    number;
    foreignNotional: number;
    trdType:         string;
    priceVariation:  number;
}
