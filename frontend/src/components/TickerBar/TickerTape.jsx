import React, { Component } from 'react';

class Form extends Component {

    componentDidMount() {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
        script.async = true;
        script.innerHTML = JSON.stringify({
            "symbols": [
                {
                    "description": "",
                    "proName": "NYSE:DIS"
                },
                {
                    "description": "",
                    "proName": "NYSE:NVO"
                },
                {
                    "description": "",
                    "proName": "NASDAQ:MSFT"
                },
                {
                    "description": "",
                    "proName": "NASDAQ:GOOGL"
                },
                {
                    "description": "",
                    "proName": "NYSE:NEE"
                },
                {
                    "description": "",
                    "proName": "NYSE:BEP"
                },
                {
                    "description": "",
                    "proName": "NASDAQ:ENPH"
                },
                {
                    "description": "",
                    "proName": "NASDAQ:AMZN"
                },
                {
                    "description": "",
                    "proName": "NYSE:VEEV"
                },
                {
                    "description": "",
                    "proName": "NASDAQ:TER"
                },
                {
                    "description": "",
                    "proName": "NASDAQ:NVDA"
                },
                {
                    "description": "",
                    "proName": "NASDAQ:NFLX"
                },
                {
                    "description": "",
                    "proName": "NASDAQ:VRTX"
                },
                {
                    "description": "",
                    "proName": "NYSE:NOW"
                },
                {
                    "description": "",
                    "proName": "NASDAQ:ADBE"
                },
                {
                    "description": "",
                    "proName": "NYSE:ZEN"
                },
                {
                    "description": "",
                    "proName": "NYSE:T"
                },
                {
                    "description": "",
                    "proName": "NYSE:VZ"
                },
                {
                    "description": "",
                    "proName": "NASDAQ:AAXN"
                },
                {
                    "description": "",
                    "proName": "NASDAQ:TERP"
                },
                {
                    "description": "",
                    "proName": "NASDAQ:IRBT"
                },
                {
                    "description": "",
                    "proName": "NYSE:W"
                },
                {
                    "description": "",
                    "proName": "NYSE:CVS"
                },
                {
                    "description": "",
                    "proName": "NYSE:FDX"
                },
                {
                    "description": "",
                    "proName": "ASX:ALL"
                },
                {
                    "description": "",
                    "proName": "NYSE:AZO"
                },
                {
                    "description": "",
                    "proName": "NYSE:ALB"
                },
                {
                    "description": "",
                    "proName": "NYSE:BTI"
                },
                {
                    "description": "",
                    "proName": "NASDAQ:VIAC"
                },
                {
                    "description": "",
                    "proName": "NYSE:URI"
                }
            ],
            "colorTheme": "light",
            "isTransparent": true,
            "displayMode": "adaptive",
            "locale": "en"
        });

        document.getElementById("widgettape").appendChild(script);
    }

    render() {
        return (
            <div id='widgettape'>
                <div class="tradingview-widget-container">
                    <div class="tradingview-widget-container__widget"></div>
                </div>
            </div>
        );

    }
}

export default Form;


