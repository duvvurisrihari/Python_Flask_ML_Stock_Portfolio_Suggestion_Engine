import React, { Component } from 'react';
class Form extends Component {

    componentDidMount() {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js'
        script.async = true;
        script.innerHTML = JSON.stringify({
            "symbols": [
                {
                    "proName": "FOREXCOM:SPXUSD",
                    "title": "S&P 500"
                },
                {
                    "proName": "FOREXCOM:NSXUSD",
                    "title": "Nasdaq 100"
                },
                {
                    "proName": "BITSTAMP:BTCUSD",
                    "title": "BTC/USD"
                },
                {
                    "proName": "BITSTAMP:ETHUSD",
                    "title": "ETH/USD"
                }
            ],
            colorTheme: "light",
            "isTransparent": true,
            locale: "en"
        });

        document.getElementById("widgetbar").appendChild(script);
    }

    render() {
        return (
            <div id="widgetbar" style={{ width: '100vw', left: '0' }}>

                <div class="tradingview-widget-container">
                    <div class="tradingview-widget-container__widget"></div>
                </div>
            </div>

        );
    }
}

export default Form;


