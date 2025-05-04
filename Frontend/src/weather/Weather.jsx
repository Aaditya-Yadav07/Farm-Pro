import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Weather() {
  const [city, setCity] = useState('Delhi');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = '162dc01c4cb0cbadfc3519118a97ed0a'; // Replace with your Weatherstack API key

  useEffect(() => {
    const savedCity = localStorage.getItem('city');
    if (savedCity) {
      setCity(savedCity);
      fetchWeather(savedCity);
    } else {
      fetchWeather(city);
    }
  }, []);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(cityName)}`
      );

      const data = await response.json();

      if (data.success === false || !data.current) {
        throw new Error(data.error?.info || 'City not found');
      }

      setWeather(data);
      localStorage.setItem('city', cityName);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }

    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      fetchWeather(city);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 p-6">
        {/* <Link
                  to="/"
                  className="absolute top-6 left-6 px-3 py-2 bg-blue-600 text-white rounded-full text-xs hover:bg-blue-500"
                >
                  ← Back to Home
                </Link> */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">🌤 Weather Prediction</h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6 flex space-x-3">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city..."
            className="p-3 w-64 border border-gray-300 rounded-lg shadow-inner bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition font-semibold"
          >
            Search
          </button>
        </form>

        {/* Weather Display */}
        {loading && (
          <div className="flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
          </div>
        )}
        {error && <p className="text-lg text-red-500 font-semibold">{error}</p>}

        {weather && !loading && !error && (
          <div className="bg-white p-6 rounded-xl shadow-2xl text-center w-80 neumorphism">
            <h2 className="text-2xl font-bold text-gray-800">
              {weather.location.name}, {weather.location.country}
            </h2>
            <p className="text-lg text-gray-600">{weather.current.weather_descriptions[0]}</p>
            <img
              src={weather.current.weather_icons[0]}
              alt="Weather Icon"
              className="mx-auto"
            />
            <p className="text-5xl font-bold text-gray-900">{weather.current.temperature}°C</p>
            <p className="text-md text-gray-700 mt-2">Feels Like: {weather.current.feelslike}°C</p>
            <p className="text-md text-gray-700">Humidity: {weather.current.humidity}%</p>
            <p className="text-md text-gray-700">Wind Speed: {weather.current.wind_speed} km/h</p>
            <p className="text-md text-gray-700">Pressure: {weather.current.pressure} mb</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Weather;


