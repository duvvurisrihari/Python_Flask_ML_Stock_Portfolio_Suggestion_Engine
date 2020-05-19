### Suggestion Engine using Deep Learning Model Details

#### Running installations and instructions :
(Not to be Run for usual Application Running )

-so can skip below steps for running Application-
Below instructions are only to Run the model if model to be retrained, It is a train-on-monthly frequency model hence, use below steps only if explicitely want to retrain the model only- training time - about 30-40mins) This model needs to be run every 30 day interval in our case with refreshed stock data as input to maintain accuracy. 

#### Requirements :  Anaconda for Jupyter support (.ipynb), scikit learn, pandas, numpy, keras,

#### Installations :
conda install Keras 

conda install -c anaconda scikit-learn 

conda install pandas

conda install numpy

To explicitely run ML model : 
1. Go to the backend folder
2. Open StockPricesPredictorLSTM.ipynb file via Avaconda Navigator - Jupyter Notebook
3. Change csv file input location from 'stockdata-4.csv' to new refreshed stockdata file, as required.
4. Run code cell by cell.
5. Results are stored in a .csv in same folder, which is being picked up by other internal APIs

