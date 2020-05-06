# Using flask to make an api 
# import necessary libraries and functions 
from flask import Flask, jsonify, request 
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests
import datetime
import pytz
import csv
  
# creating a Flask app 
app = Flask(__name__) 
CORS(app) # Let the api acces for frontends.
load_dotenv()


API_KEY = os.getenv("API_KEY")
print(API_KEY)
  
# enter valid values for the data, you will get results. this is for  calculator API
@app.route('/stats/', methods = ['POST'])
def getStatistics():
    print(request.json) # If you send json body, you have to access like this only # https://stackoverflow.com/questions/10434599/get-the-data-received-in-a-flask-request
    body = request.get_json()
    
    initialPrice = body.get("initialPrice")
    sellingPrice = body.get("sellingPrice")
    buyCommission = body.get("buyCommission")
    sellCommission = body.get("sellCommission")
    taxRate = body.get("taxRate")
    count = body.get("count")

    if(count <= 0):
        return jsonify({
            'status' : 'failure', 
            'reason' : 'count cannot be less than or equal zero, Hypothetical!'
        })

    if(initialPrice <= 0 or sellingPrice <= 0 or buyCommission < 0 or sellCommission < 0 or taxRate < 0): 
        return jsonify({
            'status' : 'failure', 
            'reason' : 'One of the data point have a invalid value'
        })

    proceeds = sellingPrice*count
    initialCost = count*initialPrice + buyCommission + sellCommission
    absoluteProfit = proceeds - initialCost
    tax = absoluteProfit*(taxRate/100)
    netProfit = absoluteProfit - tax
    cost = initialCost + tax        # this if for answer's sake
    roi = (netProfit/cost)*100
    breakEven = initialCost/count

    if(absoluteProfit <= 0):
        return jsonify({
            'status' : 'failure', 
            'reason' : 'You won"t get any money from this sale'
        })

    return jsonify({
        'proceeds': round(proceeds, 2), 
        'cost': round(cost, 2), 
        'netProfit': round(netProfit, 2), 
        'roi': round(roi, 2),
        'breakEven': round(breakEven, 2), 
        'status': 'success'
    })

@app.route('/test/<companyName>', methods = ['GET'])
def hometest(companyName):
    r = requests.get('https://cloud.iexapis.com/stable/stock/' + companyName + '/quote?token=' +  API_KEY)
    
    
    companies = ['ADBE', 'GOOG', 'AMZN']

    with open('stockdata.csv', mode='w') as stock_file:
        stock_writer = csv.writer(stock_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        

        for i in companies:
            r1 = requests.get('https://sandbox.iexapis.com/stable/stock/' + i + '/chart/1y?token=Tpk_80fad4c250fd4d12bb8c5f61a6304b00')
            
            enddate= datetime.datetime(2020, 5, 2)
            currentdate=datetime.datetime(2019, 5, 6)
            alldates = []
            
            while currentdate<=enddate:
                flag = False
                for x in r1.json():
                #    print((x['date']))
                #    print(str(currentdate.date()))
                    if (x['date']) == str(currentdate.date()):
                        flag = True
                        obj = {}
                        obj['company'] = i
                        obj['date'] = currentdate.date()
                        obj['open'] = x['open']
                        obj['close'] = x['close']
                        obj['volume'] = x['volume']
                        obj['change'] = x['change']
                        obj['changePercent'] = x['changePercent']
                        alldates.append(obj)
                        break
                if flag==False:
                    #print(currentdate.date())
                    l = len(alldates) - 1
                    obj = {}
                    obj['company'] = i
                    obj['date'] = currentdate.date()
                    obj['open'] = alldates[l]['open']
                    obj['close'] = alldates[l]['close']
                    obj['volume'] = alldates[l]['volume']
                    obj['change'] = alldates[l]['change']
                    obj['changePercent'] = alldates[l]['changePercent']
                    alldates.append(obj)
                currentdate = currentdate + datetime.timedelta(days=1)

            for x in alldates:
                stock_writer.writerow([x['company'],x['date'],x['open'], x['close'],x['volume'],x['change'],x['changePercent']])
    
    return jsonify(alldates) # Returning some data.

    



    print(r.status_code)

    if(r.status_code == 200):
        time = datetime.datetime.now(tz=pytz.utc).strftime("%Y-%m-%d %H:%M:%S") + ' : UTC'
        fullName = r.json().get("companyName")
        latestStockPrice = r.json().get("iexRealtimePrice")
        
        valueChanges = round((r.json().get("change")), 2) # valueChanges will be a float
        if(valueChanges > 0):
            valueChanges = '+' + str(valueChanges) + ' $'
        else:
            valueChanges = str(valueChanges) + ' $'

        percentageChanges = round((r.json().get("changePercent"))*100, 2)
        if(percentageChanges > 0):
            percentageChanges = '+' + str(percentageChanges) + ' %'
        else:
            percentageChanges = str(percentageChanges) + ' %'
        
        return jsonify({
            'time' : time, 
            'fullName' : fullName,
            'latestStockPrice' : latestStockPrice, 
            'valueChanges' : valueChanges, 
            'percentageChanges' : percentageChanges
        })
    elif(r.status_code == 404):
        return "Aborted with 404", 404
    else:
        return "Internal Server Error", 500

    return r.json()

# on the terminal type: curl http://127.0.0.1:5000/ 
# returns hello world when we use GET. 
# returns the data that we send when we use POST. 
@app.route('/', methods = ['GET']) 
def home(): 
    if(request.method == 'GET'): 
  
        data = "hello world"
        return jsonify({'data': data}) 
  
# driver function 
if __name__ == '__main__': 
    app.run(debug=True)
    #app.run(host='0.0.0.0', port = 5001)

# app.run(debug= True) # This has to be used while debugging. The other while deployment.