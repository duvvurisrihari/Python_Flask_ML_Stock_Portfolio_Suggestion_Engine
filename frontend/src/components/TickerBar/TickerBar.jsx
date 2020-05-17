import React, { Component } from 'react';
class Form extends Component {

    componentDidMount() {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js'
        script.async = true;
        script.innerHTML = JSON.stringify({
            "symbols": [
                {
                    "description": "Japanese Yen",
                    "proName": "FX_IDC:USDJPY"
                  },
                  {
                    "description": "Indian Rupee",
                    "proName": "FX_IDC:USDINR"
                  },
                  {
                    "description": "European Euro",
                    "proName": "FX_IDC:USDEUR"
                  },
                  {
                    "description": "British Pound",
                    "proName": "FX_IDC:USDGBP"
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

