import './App.css'
import { mapIcon, thunderIcon } from './assets'

import { useState, useEffect } from 'react'
import { getDayDateMonth } from './utils/formatters'
const icons = {
  Sunny:
    'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/clear-day.svg',
  'Partly cloudy':
    'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/partly-cloudy-day.svg',
  Cloudy:
    'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/cloudy.svg',
  Overcast:
    'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/overcast.svg',
  'Light drizzle':
    'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/drizzle.svg',
  'Heavy rain':
    'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/rain.svg',
  'Moderate or heavy rain with thunder':
    'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/thunderstorms-extreme-rain.svg',
  'Thundery outbreaks possible': thunderIcon,
}

function App() {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const long = position.coords.longitude
        const lat = position.coords.latitude

        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=b95a0269dd2e41c4ba9155455220906&q=${lat},${long}&aqi=yes`

        async function getData(url) {
          const data = await fetch(url)

          return await data.json()
        }

        getData(apiUrl).then((data) => {
          setWeatherData(data.current)

          let { name, region, country } = data.location
          let { text, icon } = data.current.condition

          let {
            is_day,
            temp_c,
            temp_f,
            last_updated,
            wind_kph,
            wind_dir,
            uv,
            vis_km,
            pressure_mb,
            humidity,
            precip_mm,
            feelslike_c,
            feelslike_f,
          } = data.current

          if (icons.hasOwnProperty(text)) {
            icon = icons[text]
          } else {
            icon = data.current.condition.icon
          }

          setWeatherData({
            name,
            region,
            country,
            text,
            icon,
            is_day,
            temp_c,
            temp_f,
            last_updated,
            wind_kph,
            wind_dir,
            uv,
            vis_km,
            pressure_mb,
            humidity,
            precip_mm,
            feelslike_c,
            feelslike_f,
          })
        })
      })
    }
  }, [])
  console.log(weatherData)
  console.log(getDayDateMonth(weatherData && weatherData.last_updated))
  return (
    <div>
      {weatherData && (
        <>
          <div className='weather-container'>
            <div className='weather-content'>
              <div className='cloudy'>
                <p>{weatherData.text}</p>
              </div>
              <div className='degree'>
                <p>{weatherData.temp_c}°</p>
              </div>
              <div className='icon'>
                <img src={weatherData?.icon} alt='Weather Icon' />
              </div>
              <div className='cal-ation'>
                <div className='location'>
                  <p>
                    <img src={mapIcon} height='30px' />
                    &nbsp;{weatherData.name}, {weatherData.region}
                  </p>
                </div>

                <hr />

                <div className='calendar'>
                  <p>
                    {getDayDateMonth(weatherData && weatherData.last_updated)}
                  </p>
                </div>
                <div className='sub-weather-info'>
                  <section>
                    <section className='info-section'>
                      <div className='icon-small'>
                        <img src='https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/wind.svg' />
                      </div>
                      Wind:
                      <span>
                        {weatherData.wind_kph}km/h {weatherData.wind_dir}
                      </span>
                    </section>
                    <section className='info-section'>
                      <div className='icon-small'>
                        <img src='https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/humidity.svg' />
                      </div>
                      Humidity: <span>{weatherData.humidity} %</span>
                    </section>
                    <section className='info-section'>
                      <div className='icon-small'>
                        <img src='https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/rain.svg' />
                      </div>
                      Rainfall: <span>{weatherData.precip_mm} mm</span>
                    </section>
                    <section className='info-section'>
                      <div className='icon-small'>
                        <img src='https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/uv-index.svg' />
                      </div>
                      UV index: <span>{weatherData.uv}</span>
                    </section>
                    <section className='info-section'>
                      <div className='icon-small'>
                        <img src='https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/pressure-high.svg' />
                      </div>
                      Pressure:
                      <span>{weatherData.pressure_mb} mb</span>
                    </section>
                  </section>
                </div>
              </div>
            </div>
          </div>

          <div className='sub-weather-info'>
            <section>
              <section className='info-section'>
                <div className='icon-small'>
                  <img src='https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/wind.svg' />
                </div>
                Wind:
                <span>
                  {weatherData.wind_kph}km/h {weatherData.wind_dir}
                </span>
              </section>
              <section className='info-section'>
                <div className='icon-small'>
                  <img src='https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/humidity.svg' />
                </div>
                Humidity: <span>{weatherData.humidity} %</span>
              </section>
              <section className='info-section'>
                <div className='icon-small'>
                  <img src='https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/rain.svg' />
                </div>
                Rainfall: <span>{weatherData.precip_mm} mm</span>
              </section>
              <section className='info-section'>
                <div className='icon-small'>
                  <img src='https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/uv-index.svg' />
                </div>
                UV index: <span>{weatherData.uv}</span>
              </section>
              <section className='info-section'>
                <div className='icon-small'>
                  <img src='https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/pressure-high.svg' />
                </div>
                Pressure:
                <span>{weatherData.pressure_mb} mb</span>
              </section>
            </section>
          </div>
        </>
      )}
    </div>
  )
}

export default App
