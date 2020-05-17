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

companies = {}
EthicalInvestingList  = ['DIS','NVO','MSFT','GOOGL','NEE','BEP','ENPH'] 
GrowthInvestingList  = ['AMZN','VEEV','TER','NVDA','NFLX','VRTX','NOW','ADBE'] 
IndexInvestingList  = ['VTI','IXUS','ILTB'] 
QualityInvestingList  = ['ZEN','T','VZ','AAXN','TERP','IRBT','W','STZ','STZ','CTRE'] 
ValueInvestingList  = ['CVS','FDX','ALL','AZO','ALB','BTI','VIAC','ALXN','URI','ETN'] 

companies['ethical'] = EthicalInvestingList
companies['growth'] = GrowthInvestingList
companies['index'] = IndexInvestingList
companies['quality'] = QualityInvestingList
companies['value'] = ValueInvestingList

# creating a Flask app
app = Flask(__name__)
CORS(app)  # Let the api acces for frontends.
load_dotenv()


API_KEY = os.getenv("API_KEY")
print(API_KEY)

# For weekly trend of portfolio values
@app.route('/portfolioGraphData', methods=['POST'])
def portfolioGraphData():
    # print(request.json) # If you send json body, you have to access like this only # https://stackoverflow.com/questions/10434599/get-the-data-received-in-a-flask-request

    label = []
    value = []

    # Prepping arrays for sending
    r = requests.get(
        'https://sandbox.iexapis.com/stable/stock/ADBE/chart/5d?token=Tpk_80fad4c250fd4d12bb8c5f61a6304b00')
    for x in r.json():
        label.append(x['date'])
        value.append(0)
    print(label)
    print(value)

    # Looping through each object of the request array
    for company in request.get_json()['data']:
        # print(company)
        r = requests.get('https://sandbox.iexapis.com/stable/stock/' +
                         company['company'] + '/chart/5d?token=Tpk_80fad4c250fd4d12bb8c5f61a6304b00')

        # Adding values to portfolio array
        i = 0
        for x in r.json():
            print(x['close'])
            value[i] = value[i] + company['count'] * x['close']
            i = i + 1

    print(label)
    print(value)

    # Putting label and value into result object.
    result = {}
    result['label'] = label
    result['value'] = value

    return result

# For making csv
@app.route('/test/<companyName>', methods=['GET'])
def hometest(companyName):
    r = requests.get('https://cloud.iexapis.com/stable/stock/' +
                     companyName + '/quote?token=' + API_KEY)

    companies = ['DIS', 'NVO', 'MSFT', 'GOOGL', 'NEE', 'BEP', 'ENPH', 'AMZN', 'VEEV', 'TER', 'NVDA', 'NFLX', 'VRTX', 'NOW', 'ADBE', 'VTI', 'IXUS',
                 'ILTB', 'ZEN', 'T', 'VZ', 'AAXN', 'TERP', 'IRBT', 'W', 'STZ', 'CTRE', 'CVS', 'FDX', 'ALL', 'AZO', 'ALB', 'BTI', 'VIAC', 'ALXN', 'URI', 'ETN']

    with open('stockdata.csv', mode='w') as stock_file:
        stock_writer = csv.writer(
            stock_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        stock_writer.writerow(
            ['company', 'date', 'open', 'close', 'volume', 'change', 'changePercent'])

        for i in companies:
            r1 = requests.get('https://sandbox.iexapis.com/stable/stock/' +
                              i + '/chart/5y?token=Tpk_80fad4c250fd4d12bb8c5f61a6304b00')

            enddate = datetime.datetime(2020, 5, 2)
            currentdate = datetime.datetime(2015, 5, 11)
            alldates = []

            while currentdate <= enddate:
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
                if flag == False:
                    # print(currentdate.date())
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
                stock_writer.writerow([x['company'], x['date'], x['open'],
                                       x['close'], x['volume'], x['change'], x['changePercent']])

    return jsonify(alldates)  # Returning some data.


# For investment suggestions in companies
@app.route('/stockSuggestions', methods=['POST'])
def stockSuggestions():
    # print(request.json) # If you send json body, you have to access like this only # https://stackoverflow.com/questions/10434599/get-the-data-received-in-a-flask-request
    strategies = request.get_json()['investmentStrategies']
    amount = request.get_json()['investmentAmount']

    label = []
    value = []
    residue = 0
    companiesToConsider = []
    finalCompanies = []

    for strategy in strategies:
      companiesToConsider = companiesToConsider + companies[strategy]

    with open('t-30change-companies-new.csv', newline='') as companyFile:
        companyReader = csv.reader(companyFile, delimiter=',')
        firstline = True
        for row in companyReader:
            if firstline:    #skip first row
                firstline = False
                continue
            if row[0] in companiesToConsider:
                size = len(finalCompanies)
                if size < 3:
                    finalCompanies = finalCompanies + [row[0]]
                elif size == 3:
                    break

    data= []
    i = 0
    for company in finalCompanies:
        companyDetails = requests.get('https://sandbox.iexapis.com/stable/stock/' + company + '/quote?token=Tpk_80fad4c250fd4d12bb8c5f61a6304b00')
        latestprice = companyDetails.json()['latestPrice']
        obj = {}
        obj['company'] = company
        obj['name'] = companyDetails.json()['companyName']
        if i == 0:
            numberOfStocks = ((0.50) * amount) // latestprice
            obj['count'] = int(numberOfStocks)
            residue = round(residue + (((0.50) * amount) - (numberOfStocks * latestprice)), 2)
        else:
            numberOfStocks = ((0.25) * amount) // latestprice
            obj['count'] = int(numberOfStocks)
            residue = round(residue + (((0.25) * amount) - (numberOfStocks * latestprice)), 2)
        
        for strategy in strategies:
            if company in companies[strategy]:
                obj['strategy'] = strategy

        i = i + 1
        data.append(obj)

    result = {}
    result['data'] = data
    result['residue'] = residue

    return result


# on the terminal type: curl http://127.0.0.1:5000/
# returns hello world when we use GET.
# returns the data that we send when we use POST.
@app.route('/', methods=['GET'])
def home():
    if(request.method == 'GET'):

        data = "hello world"
        return jsonify({'data': data})


# driver function
if __name__ == '__main__':
    app.run(debug=True)
    #app.run(host='0.0.0.0', port = 5001)

# app.run(debug= True) # This has to be used while debugging. The other while deployment.
