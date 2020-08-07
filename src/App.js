import React, { useState, useEffect } from 'react';
//Material-ui
import {FormControl, Select, MenuItem, Card, CardContent} from '@material-ui/core'
import './App.css';
import InfoBox from './components/InfoBox/InfoBox';
import Map from './components/Map/Map';
import Table from './components/Table/Table';
import { sortData, API_CALL, prettify } from './utils/utils';
import LineGraph from './components/LineGraph/LineGraph';
import "leaflet/dist/leaflet.css";
import AdvanceInfo from './components/AdvanceInfo/AdvanceInfo';


//Main App
function App() {

  const [countries, setCountries]       = useState([]);
  const [country, setCountry]           = useState("World");
  const [countryInfo, setCountryInfo]   = useState({});
  const [tableData, setTableData]       = useState([]);
  const [mapCenter, setMapCenter]       = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom]           = useState(3);
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType]       = useState("cases");



  useEffect(()=>{
    fetch(API_CALL.getWorldInformation)
      .then(result => result.json())
      .then((data)=>{
        setCountryInfo(data);
      });
  }, []);


  useEffect(()=>{
    const getCountriesData = async ()=>{
      await fetch(API_CALL.getCountries)
        .then(result => result.json())
        .then(data => {
          
          const countries = data.map( element => (
            
            {
              name: element.country,
              value: element.countryInfo.iso2 
            }
          ) )

          const sortedData = sortData(data);

          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        }) 
      
    }

    getCountriesData()
  },[]);

  const onCountrySelect = async (event) => {

    const countryName = event.target.value;
    const URL = countryName === 'World' ? API_CALL.getWorldInformation : API_CALL.getCountries+'/'+countryName;

    await fetch(URL)
      .then(result => result.json())
      .then((data) => {
        setCountry(countryName);
        setCountryInfo(data);

        
        if(countryName === "World"){
          setMapCenter([ 34.80746,  -40.4796])
          setMapZoom(3)
        }else{
          setMapCenter([data.countryInfo.lat, data.countryInfo.long])
          setMapZoom(4);
        }

      })

    

  }


  return (
    <div className="app">
      
      <main className="left">

        <div className="app__header">

          <h1>COVID Tracker</h1>
          <h4>Information about: {countryInfo.country}</h4>

          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountrySelect}>
              <MenuItem value="World">World</MenuItem>
              {
                countries.map((country, index) => (
                  <MenuItem value={country.value} key={index}>{country.name}</MenuItem>
                ))
              }

            </Select>

          </FormControl>

        </div>

        <div className="app__stats">

          {/* Coronavirus Total Cases */}
          <InfoBox
            infected
            title="New Cases" 
            total={ prettify(countryInfo.cases) } 
            cases={ prettify(countryInfo.todayCases) }
            onClick={ e => setCasesType("cases")}
            active={casesType==="cases"}
          />

          {/* Coronavirus Total Recovery */}
          <InfoBox
            recovered 
            title="Recovered" 
            total={ prettify(countryInfo.todayRecovered) } 
            cases={ prettify(countryInfo.recovered) }
            onClick={ e => setCasesType("recovered")}
            active={casesType==="recovered"}
          />

          {/* Coronavirus Total Deaths */}
          <InfoBox
            deaths
            title="Deaths" 
            total={ prettify(countryInfo.todayDeaths) } 
            cases={ prettify(countryInfo.deaths) }
            onClick={ e => setCasesType("deaths")}
            active={casesType==="deaths"}
          />

        </div>

        <Map casesType={casesType}  countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
        
        {/* Show Advance Info about the selected country, info like testsPerDay for example */}
        <AdvanceInfo country={countryInfo.country} data={countryInfo}></AdvanceInfo>

      </main>

      <Card className="right">
        <CardContent>

          <h3>Countries with the most cases</h3>
          <Table countries={tableData}></Table>
          
          <h3 id="graph__title"> New {casesType} stats</h3>
          <LineGraph casesType={casesType}></LineGraph>

        </CardContent>
      </Card>

    </div>
  );
}

export default App;
