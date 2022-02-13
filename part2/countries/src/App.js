import React, { useEffect, useState } from "react";
import axios from "axios";

function Search({ search, searchChange, handleClick, detailsStatus }) {
  return (
    <div>
      Find Countries: <input value={search} onChange={searchChange} />
      <button onClick={handleClick}>{detailsStatus}</button>
    </div>
  );
}

function Country(props) {
  if (!props.showDetails) {
    return (
      <>
      <li key={props.name}>{props.name}</li>
      </>
    )} else {
      return (
          <CountryDetails 
            name={props.name}
            capital={props.capital}
            area={props.area}
            languages={props.languages}
            flag={props.flag}
            key={props.name}
            lat={props.lat}
            lon={props.lon}
          />
    )}
}
    
function CountryDetails(props) {
  const languagesArr = Object.values(props.languages)
  const apiKey = process.env.REACT_APP_API_KEY;
  const [temp, setTemp] = useState(0);
  const [wind, setWind] = useState(0);
  
  useEffect(() => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&units=imperial&appid=${apiKey}`)
        .then(resp => {
          let weather = resp.data
          console.log(resp.data)
          setTemp(weather.main.temp);
          setWind(weather.wind.speed);
        })
  },[ props.lat, props.lon ])

  return (
    <div>
      <h1 key={props.name}>{props.name}</h1>
      <p key={props.capital}>{props.capital}</p>
      <p key={props.area}>{props.area}</p>
      <h4>Languages:</h4>
      <ul>
      {languagesArr.map(language => 
        <li key={language}>{language}</li>
        )}
      </ul>
      <img src={props.flag} />
      <h4>Weather</h4>
        <p>Temp: {temp}&#176;F</p>
        <p>Wind: {wind}mph</p>
    </div>
  )
}

function App() {
const [countries, setCountries] = useState([]);
const [search, setSearch] = useState('');
const [showDetails, setShowDetails] = useState(false);
const [detailsStatus, setDetailsStatus] = useState('Show Details');


useEffect(() => {
  axios
    .get('https://restcountries.com/v3.1/all')
    .then(resp => {
      setCountries(resp.data)
      console.log(resp.data)
    });
  }, [])

function handleClick() {
  setShowDetails(!showDetails);
  if (showDetails) {
    setDetailsStatus('Show Details');
  } else {
    setDetailsStatus('Close');
  }
}

const searchChange = (e) => {
  setSearch(e.target.value);
}

const results = countries.filter(country => country.name.common.toLowerCase().includes(search));

const renderResults = () => {
  if (results.length > 10) {
    return <p>Too many matches, be more specific.</p>
  } else if (results.length === 1) {
    return(
      results.map(country =>
        <CountryDetails 
          name={country.name.common}
          capital={country.capital}
          area={country.area}
          languages={country.languages}
          flag={country.flags.png}
          key={country.name.common}
          lat={country.latlng[0]}
          lon={country.latlng[1]}
        />
      ))} else {
      return (
        <ul>
        {results.map(country =>
          <Country 
          showDetails={showDetails}
          results={results}
          name={country.name.common}
          capital={country.capital}
          area={country.area}
          languages={country.languages}
          flag={country.flags.png}
          key={country.name.common}
          lat={country.latlng[0]}
          lon={country.latlng[1]}
          />
          )}
        </ul> 
      )
  }
}

return (
  <div>
    <Search 
      search={search} 
      searchChange={searchChange} 
      handleClick={handleClick} 
      detailsStatus={detailsStatus} 
    />
    {renderResults()}
  </div>
)
}

export default App;
