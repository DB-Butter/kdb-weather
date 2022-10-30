import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forcast from './components/Forcast';
import Title from './components/Title';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [query, setQuery] = useState({q: 'chicago'})
  const [units, setUnits] = useState('imperial')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location"
      toast.info("Fetching weather for " + message)
      await getFormattedWeatherData({...query, units}).then(
        (data) => {
          toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`)
          setWeather(data)
        })
    }
    fetchWeather()
  }, [query, units])

  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700'
    const threshold4 = units === 'metric' ? 40 : 50
    if (weather.temp <= threshold4) return 'from-cyan-600 to-blue-600'
    if (weather.temp >= threshold4) return 'from-yellow-500 to-orange-500'
    const threshold3 = units === 'metric' ? 30 : 60
    if (weather.temp <= threshold3) return 'from-cyan-500 to-blue-500'
    if (weather.temp >= threshold3) return 'from-yellow-600 to-orange-600'
    const threshold2 = units === 'metric' ? 20 : 70
    if (weather.temp <= threshold2) return 'from-cyan-400 to-blue-400'
    if (weather.temp >= threshold2) return 'from-yellow-700 to-orange-700'
    const threshold1 = units === 'metric' ? 10 : 80
    if (weather.temp <= threshold1) return 'from-cyan-300 to-blue-300'
    if (weather.temp >= threshold1) return 'from-yellow-800 to-orange-800'
  }

  const fetchWeather = async () => {
    const data = await getFormattedWeatherData({ q: "london" })
    console.log(data)
  }

  fetchWeather()

  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-5 md:px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <Title />
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather}/>
          <TemperatureAndDetails weather={weather}/>
          <Forcast title="hourly forecast" items={weather.hourly}/>
          <Forcast title="daily forecast" items={weather.daily}/>
        </div>
      )}
    <ToastContainer autoclose={3500} theme='colored' newestOnTop={true} />
    </div>
  );
}

export default App;
