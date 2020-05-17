import React, { Component } from 'react';
class Form extends Component {

    componentDidMount() {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js'
        script.async = true;
        script.innerHTML = JSON.stringify({
            "colorTheme": "light",
            "dateRange": "12m",
            "showChart": true,
            "locale": "en",
            "largeChartUrl": "",
            "isTransparent": true,
            "width": "700",
            "height": "660",
            "plotLineColorGrowing": "rgba(33, 150, 243, 1)",
            "plotLineColorFalling": "rgba(33, 150, 243, 1)",
            "gridLineColor": "rgba(240, 243, 250, 1)",
            "scaleFontColor": "rgba(120, 123, 134, 1)",
            "belowLineFillColorGrowing": "rgba(33, 150, 243, 0.12)",
            "belowLineFillColorFalling": "rgba(33, 150, 243, 0.12)",
            "symbolActiveColor": "rgba(33, 150, 243, 0.12)",
            "tabs": [
               
                {
                    "title": "Growth",
                    "symbols": [
                      {
                        "s": "NASDAQ:AMZN",
                        "d": "Amazon"
                      },
                      {
                        "s": "NYSE:VEEV",
                        "d": "Veeva Systems"
                      },
                      {
                        "s": "NASDAQ:TER",
                        "d": "Teradyne"
                      },
                      {
                        "s": "NASDAQ:NVDA",
                        "d": "NVidia"
                      },
                      {
                        "s": "NASDAQ:NFLX",
                        "d": "Netflix"
                      },
                      {
                        "s": "NASDAQ:VRTX",
                        "d": "Vertex"
                      },
                      {
                        "s": "NYSE:NOW",
                        "d": "Service Now"
                      },
                      {
                        "s": "NASDAQ:ADBE",
                        "d": "Adobe"
                      }
                    ]
                  },               
                {
                  "title": "Ethical",
                  "symbols": [
                    {
                      "s": "NYSE:DIS",
                      "d": "Walt Disney"
                    },
                    {
                      "s": "NYSE:NVO",
                      "d": "Novo Nordisk"
                    },
                    {
                      "s": "NASDAQ:MSFT",
                      "d": "Microsoft"
                    },
                    {
                      "s": "NASDAQ:GOOGL",
                      "d": "Google"
                    },
                    {
                      "s": "NYSE:NEE",
                      "d": "Next Era Energy"
                    },
                    {
                      "s": "NYSE:BEP",
                      "d": "Brookfield"
                    },
                    {
                      "s": "NASDAQ:ENPH",
                      "d": "Enphase"
                    }
                  ],
                  "originalTitle": "Indices"
                },
                
                {
                  "title": "Index",
                  "symbols": [
                    {
                      "s": "AMEX:VTI",
                      "d": "Vangauard "
                    },
                    {
                      "s": "NASDAQ:IXUS",
                      "d": "IShares"
                    },
                    {
                      "s": "AMEX:ILTB",
                      "d": "IsharesCo"
                    }
                  ]
                },
                {
                  "title": "Quality",
                  "symbols": [
                    {
                      "s": "NYSE:ZEN",
                      "d": "ZenDesk"
                    },
                    {
                      "s": "NYSE:T",
                      "d": "AT&T"
                    },
                    {
                      "s": "NYSE:VZ",
                      "d": "Verizon"
                    },
                    {
                      "s": "NASDAQ:AAXN",
                      "d": "Axon"
                    },
                    {
                      "s": "NASDAQ:TERP",
                      "d": "Terraform "
                    },
                    {
                      "s": "NASDAQ:IRBT",
                      "d": "IRobot"
                    },
                    {
                      "s": "NYSE:W",
                      "d": "Wayfair"
                    },
                    {
                      "s": "NYSE:STZ",
                      "d": "Constellation"
                    },
                    {
                      "s": "NASDAQ:CTRE",
                      "d": "Caretrust"
                    }
                  ]
                },
                {
                  "title": "Value",
                  "symbols": [
                    {
                      "s": "NYSE:CVS",
                      "d": "CVS Health Corp"
                    },
                    {
                      "s": "NYSE:ALL",
                      "d": "All State"
                    },
                    {
                      "s": "NYSE:FDX",
                      "d": "Fedex"
                    },
                    {
                      "s": "NYSE:AZO",
                      "d": "Autozone"
                    },
                    {
                      "s": "NYSE:ALB",
                      "d": "Albermarle"
                    },
                    {
                      "s": "NYSE:BTI",
                      "d": "British American Tobacco"
                    },
                    {
                      "s": "NASDAQ:VIAC",
                      "d": "Viacom"
                    },
                    {
                      "s": "NASDAQ:ALXN",
                      "d": "Alexion"
                    },
                    {
                      "s": "NYSE:URI",
                      "d": "United Rentals"
                    },
                    {
                      "s": "NYSE:ETN",
                      "d": "Eaton"
                    }
                  ]
                }
              ]
        });

        document.getElementById("widgetgraph").appendChild(script);
    }

    render() {
        return (
            <div id="widgetgraph" >

                <div class="tradingview-widget-container">
                    <div class="tradingview-widget-container__widget"></div>
                </div>
            </div>

        );
    }
}

export default Form;

