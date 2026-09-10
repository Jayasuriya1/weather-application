import { useEffect, useState, useCallback } from 'react';
import './App.css';

const API_KEY = '76d6c232e921ecd072a8114debe22075';
const DEFAULT_CITY = 'Chennai';

function App() {
  const [cityInput, setCityInput] = useState(DEFAULT_CITY);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeatherData = useCallback(async (queryCity) => {
    if (!queryCity.trim()) return;

    setLoading(true);
    setError('');

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        queryCity.trim()
      )}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && (data.cod === 200 || data.cod === '200')) {
        setWeatherData(data);
      } else {
        setWeatherData(null);
        setError(data.message || 'City not found. Please try another search.');
      }
    } catch (err) {
      setWeatherData(null);
      setError('Unable to fetch weather data. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeatherData(DEFAULT_CITY);
  }, [fetchWeatherData]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData(cityInput);
  };

  // Determine dynamic background class based on weather condition
  const getWeatherThemeClass = () => {
    if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
      return 'theme-default';
    }
    const condition = weatherData.weather[0].main.toLowerCase();
    if (condition.includes('cloud')) return 'theme-clouds';
    if (condition.includes('rain') || condition.includes('drizzle')) return 'theme-rain';
    if (condition.includes('clear')) return 'theme-clear';
    if (condition.includes('snow')) return 'theme-snow';
    if (condition.includes('thunder')) return 'theme-thunderstorm';
    if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze')) return 'theme-mist';
    return 'theme-default';
  };

  return (
    <div className={`app-background ${getWeatherThemeClass()}`}>
      <div className="overlay"></div>
      <div className="container min-vh-100 d-flex justify-content-center align-items-center py-4">
        <div className="weather-card shadow-lg p-4 p-md-5">
          <h2 className="app-title text-center mb-4">
            <i className="bx bx-cloud-rain me-2 text-info"></i>Weather Forecast
          </h2>

          <form onSubmit={handleSearchSubmit} className="search-form mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Enter city name..."
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                aria-label="City search input"
              />
              <button className="btn btn-search" type="submit" aria-label="Search city weather">
                <i className="bx bx-search fs-4"></i>
              </button>
            </div>
          </form>

          {loading && (
            <div className="text-center my-5 py-3">
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-light opacity-75">Fetching weather details...</p>
            </div>
          )}

          {error && !loading && (
            <div className="alert alert-danger text-center my-4 py-3 border-0 bg-danger bg-opacity-25 text-white" role="alert">
              <i className="bx bx-error-circle me-2 fs-5 align-middle"></i>
              {error}
            </div>
          )}

          {weatherData && !loading && !error && (
            <div className="weather-content text-white animate-fade-in">
              <div className="text-center my-3">
                <h3 className="location-heading fw-bold mb-1">
                  {weatherData.name}, {weatherData.sys?.country}
                </h3>
                <p className="text-capitalize opacity-75 mb-3">
                  {weatherData.weather[0]?.description}
                </p>

                <div className="d-flex justify-content-center align-items-center gap-3 my-3">
                  {weatherData.weather[0]?.icon && (
                    <img
                      className="weather-icon"
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                      alt={weatherData.weather[0]?.description || 'Weather icon'}
                    />
                  )}
                  <h1 className="temperature-display display-2 fw-bold mb-0">
                    {Math.round(weatherData.main.temp)}°C
                  </h1>
                </div>
              </div>

              <div className="weather-details-grid row g-3 mt-4 pt-3 border-top border-secondary border-opacity-50">
                <div className="col-6 col-sm-4 text-center">
                  <div className="detail-card p-3 rounded-4 bg-white bg-opacity-10">
                    <i className="bx bx-thermometer fs-3 text-warning mb-1"></i>
                    <p className="small mb-1 opacity-75">Feels Like</p>
                    <h5 className="mb-0 fw-semibold">{Math.round(weatherData.main.feels_like)}°C</h5>
                  </div>
                </div>
                <div className="col-6 col-sm-4 text-center">
                  <div className="detail-card p-3 rounded-4 bg-white bg-opacity-10">
                    <i className="bx bx-droplet fs-3 text-info mb-1"></i>
                    <p className="small mb-1 opacity-75">Humidity</p>
                    <h5 className="mb-0 fw-semibold">{weatherData.main.humidity}%</h5>
                  </div>
                </div>
                <div className="col-6 col-sm-4 text-center">
                  <div className="detail-card p-3 rounded-4 bg-white bg-opacity-10">
                    <i className="bx bx-wind fs-3 text-light mb-1"></i>
                    <p className="small mb-1 opacity-75">Wind Speed</p>
                    <h5 className="mb-0 fw-semibold">{weatherData.wind.speed} km/h</h5>
                  </div>
                </div>
                <div className="col-6 col-sm-6 text-center">
                  <div className="detail-card p-3 rounded-4 bg-white bg-opacity-10">
                    <i className="bx bx-tachometer fs-3 text-danger mb-1"></i>
                    <p className="small mb-1 opacity-75">Pressure</p>
                    <h5 className="mb-0 fw-semibold">{weatherData.main.pressure} hPa</h5>
                  </div>
                </div>
                <div className="col-12 col-sm-6 text-center">
                  <div className="detail-card p-3 rounded-4 bg-white bg-opacity-10">
                    <i className="bx bx-current-location fs-3 text-success mb-1"></i>
                    <p className="small mb-1 opacity-75">Min / Max Temp</p>
                    <h5 className="mb-0 fw-semibold">
                      {Math.round(weatherData.main.temp_min)}°C / {Math.round(weatherData.main.temp_max)}°C
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-end pt-4 mt-3 border-top border-white border-opacity-10">
            <span className="creator-credit text-white-50 small">
              Project Done By: <span className="text-info fw-semibold">Jayasuriya</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
