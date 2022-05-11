import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY
const InputCountry = ({onChange, text}) => <div>{text}<input onChange={onChange}/><br /><br/> </div>
const DisplayCountryStats = ({country}) => {
  console.log(typeof country)
  if(!Array.isArray(country) && typeof country === 'object' ){
    console.log(country.show)
    if(country.show === "Hide"){
      const listLanguages = Object.values(country.languages);
      return(
        <>
          <h1>{country.name}</h1>
          <div>capital {country.capital}</div>
          <div>area {country.area}</div>
          <h3>languages:</h3>
          <ul>{listLanguages.map(language => <li key={language}>{language}</li>)}</ul>
          <img src={country.flag} alt="Flag" />
          <h2>Weather in {country.capital}</h2>
          <div>temperature {country.temperature}</div>
          <img src={country.climateImg} alt="weatherIcon" />
          <div>wind {country.wind} m/s</div>
          <br /> <br /> <br />
        </>
      )
    }
  }

}


const ShowFilteredCountries = ({countries, handleShow}) => {
  console.log(countries)
  if(typeof countries === 'string') return (<>{countries}</>)
  else if(countries.length === 1){
    return(<><DisplayCountryStats country={countries[0]}/></>) }
    
  return(
   <>
    {countries.map((country, btnIndex)=>{
        return(
          <div key={country.name}>
            {country.name} <button id={btnIndex} onClick={handleShow}>{country.show}</button>
            <div style={{border: '1px solid black'} }><DisplayCountryStats country={country} /></div>
          </div>
        )
      })}
    </>
  )

}

const App = () => {
  const [allCountries, SetAllCountries] = useState([])
  const [countryFilter, SetCountries] = useState([])
  const [basicStats, SetBasicStats] = useState([])
  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        SetAllCountries(response.data)
      })
  }
  useEffect(hook, [])
  
  const weatherHook = () => {
    let borderName = [];
    basicStats.forEach((country, index) => {
      console.log(country, country.lat)
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.lat}&lon=${country.lon}&appid=${api_key}`)
      .then(response => {
        console.log("KK");
        const stats = response.data;
        const countryObject = {
          show: country.show,
          name: country.name,
          capital: country.capital,
          area: country.area,
          languages: country.languages,
          flag: country.flag,
          lat: country.lat,
          lon: country.lon,
          temperature: stats.main.temp,
          climateImg: `http://openweathermap.org/img/wn/${stats.weather[0].icon}@2x.png`,
          wind: stats.wind.speed
        }
        borderName.push(countryObject);
        console.log(index, basicStats.length)
        if (borderName.length === basicStats.length){
          SetCountries(borderName);
          console.log("ok")
        }
      })
    })
  }
  useEffect(weatherHook, [basicStats])

  const handleFilterChange  = (e) => {
    const countryInput = e.target.value;
    const  filterIndex = (allCountries.filter(country=> country.name.common.toLowerCase().includes(countryInput.toLowerCase())))

    if (filterIndex.length===0 || countryInput === '') SetCountries("");
    else if(filterIndex.length > 10) SetCountries("Too many matches, specify another filter");
    else if (filterIndex.length === 1) {
      const countryObject = [{
        show: "Hide",
        name: filterIndex[0].name.common,
        capital: filterIndex[0].capital,
        area: filterIndex[0].area,
        languages: filterIndex[0].languages,
        flag: filterIndex[0].flags.png,
        lat: filterIndex[0].latlng[0],
        lon: filterIndex[0].latlng[1]
      }]
      SetBasicStats(countryObject)
    }
    else {
      SetBasicStats((filterIndex.map(country =>{ 
        const countryObject = {
        show: "Show",
        name: country.name.common,
        capital: country.capital,
        area: country.area,
        languages: country.languages,
        flag: country.flags.png,
        lat: country.latlng[0],
        lon: country.latlng[1]
      }
      return countryObject
    }) ));
    }
    console.log('134')
  }
  console.log(countryFilter, "COUNTRYFILTER")
  const handleShowCountry = (e) =>{
    let index = +e.target.id;
    SetCountries(existingItems => {
       return existingItems.map((item, j) => {
        if(j===index){
          item.show === "Show" ? item.show = "Hide"  : item.show = "Show";
       }
        return item
      })
    })
  }

  return(
  <>
     <InputCountry onChange={handleFilterChange} text={"find countries "} />
     <ShowFilteredCountries countries={countryFilter} handleShow={handleShowCountry} />
  </>
  )
}

export default App;
