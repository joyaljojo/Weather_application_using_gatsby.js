// src/pages/weather.js
import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import axios from "axios";
import { Form, Button, Spinner, Alert } from "react-bootstrap"; // Import Bootstrap components

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("New York"); // Default city

  const apiKey = "YOUR_API_KEY"; // Replace with your actual API key

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <Layout>
      <h1 className="mb-4">Weather in {weatherData.name}</h1>
      <Form>
        <Form.Group>
          <Form.Label>Select a city:</Form.Label>
          <Form.Control
            as="select"
            onChange={handleCityChange}
            value={city}
          >
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Toronto">Toronto</option>
            <option value="Vancouver">Vancouver</option>
            {/* Add more cities as needed */}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">Get Weather</Button>
      </Form>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : error ? (
        <Alert variant="danger">
          Error fetching weather data: {error.message}
        </Alert>
      ) : (
        <div>
          <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </Layout>
  );
};

export default WeatherPage;
