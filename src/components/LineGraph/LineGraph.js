import React, { useState, useEffect } from 'react'
import {Line} from 'react-chartjs-2';
import { API_CALL } from '../../utils/utils';
import numeral from 'numeral';
import './LineGraph.css'

const options = {

    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    
    scales: {

      xAxes: [
        {
          type: "time",
          time: {
            unit:"year",
            displayFormats: "DD/MM/YY",
            tooltipFormat: "ll",

          },
        },
      ],

      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
};

const buildChartData = (data, casesType) => {

  let chartData = [];
  let lastDataPoint;

 
  for(let date in data.cases){
      
      if(lastDataPoint){
          const newDataPont = {
              x : date,
              y : data[casesType][date] - lastDataPoint
          }

          
          chartData.push(newDataPont);
      }

      lastDataPoint = data[casesType][date];

  }

  return chartData;
}


export default function LineGraph({ casesType }) {

    const [data, setData] = useState({})


    useEffect(()=>{

        const fetchData = async() => {
            await fetch(API_CALL.getHistoricalData)
            .then(result => result.json())
            .then( (data) => {

                const chartData = buildChartData(data, casesType);
                setData(chartData);
            });
        }

        fetchData()
        
    }, [casesType])


    return (
        
        <div className="container__graph">
            
          {data?.length > 0 && (
            <Line
              data={{
                datasets: [
                  {
                    backgroundColor: "rgba(204, 16, 52, 0.5)",
                    borderColor: "#CC1034",
                    data: data,
                  },
                ],
              }}
              options={options}
            />
          )}
        </div>
      );
}
