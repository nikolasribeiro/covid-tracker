import React from 'react';
import numeral from 'numeral';
import {Circle, Popup} from "react-leaflet";
import './utils.css';

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 1200,
    },
    deaths: {
      hex: "#424242",
      multiplier: 2000,
    },
  };



// ============ Global ============ 

//return data sorted by highest to lower 
export const sortData = (data)=>{

    const sortedData = [...data];
    return sortedData.sort( (a,b) => a.cases > b.cases ? -1 : 1);

}

//handle all the API request that the app needs
export const API_CALL = {
    getWorldInformation : "https://disease.sh/v3/covid-19/all",
    getCountries        : "https://disease.sh/v3/covid-19/countries",
    getHistoricalData   : "https://disease.sh/v3/covid-19/historical/all?lastdays=120",
    getVaccineStatus    : "https://disease.sh/v3/covid-19/vaccine"
}


//Draw Circles on map
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
      
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
      className="circle-on-map"
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
    ));


//Format value to another more readable
export const prettify = (stat) =>
  stat ? `+${numeral(stat).format("0,0")}` : "+0";