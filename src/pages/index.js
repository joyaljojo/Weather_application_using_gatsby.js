import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import Layout from "../components/layout";
import "bootstrap/dist/css/bootstrap.min.css";

const apiKey = "8ecf3ee16b1138a5e3e63f378a08954a";

const cities = [
  "New York",
  "Ottawa",
  "Alberta",
  "Angamaly",
  "Los Angeles",
  "kochi",
  "Chicago",
  "Houston",
  "Miami",
  "Toronto",
  "London",
  "Paris",
  "Berlin",
  "Sydney",
  "Tokyo",
  "Beijing",
  "Moscow",
  "Cairo",
  "Rome",
  "Dubai",
  "Mumbai",
  "Singapore",
  "Auckland",
  "Buenos Aires",
  "Mexico City",
  "Rio de Janeiro",
  "Cape Town",
  "Nairobi",
];

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = {};

      for (const city of cities) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
          );
          data[city] = response.data;
        } catch (error) {
          console.error(`Error fetching weather data for ${city}:`, error);
        }
      }

      setWeatherData(data);
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Container>
        <h1 className="mb-4">Weather for 25 Cities</h1>
        <Row>
          {cities.map((city) => (
            <Col key={city} xs={12} sm={6} md={4} lg={3}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{city}</Card.Title>
                  {weatherData[city] ? (
                    <div>
                      <p>
                        Temperature:{" "}
                        {Math.round(weatherData[city].main.temp - 273.15)}°C
                      </p>
                      <p>
                        Weather: {weatherData[city].weather[0].description}
                      </p>
                    </div>
                  ) : (
                    <p>Loading...</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default WeatherPage;
