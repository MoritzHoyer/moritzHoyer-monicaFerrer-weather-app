import { useState, useEffect } from "react";
import Form from "./components/Form/Form.jsx";
import List from "./components/List/List.jsx";
import { uid } from "uid"; // Unique ID for each activity
import "./App.css";

function App() {
  // State for activities
  const [activities, setActivities] = useState(() => {
    // Load activities from the local storage, if available
    const savedActivities = localStorage.getItem("activities");
    return savedActivities ? JSON.parse(savedActivities) : [];
  });

  // State for weather, initialized as null
  const [weather, setWeather] = useState(null);
  const [selectedCity, setSelectedCity] = useState("europe");

  // Available cities
  const cities = ["europe", "arctic", "sahara", "rainforest"];

  // Async function to fetch weather data from API
  async function fetchWeather(city) {
    try {
      const response = await fetch(
        `https://example-apis.vercel.app/api/weather/${city}`
      );
      const data = await response.json();
      setWeather(data); // save weather data in state
    } catch (error) {
      console.error("Error retrieving weather data:", error);
    }
  }

  // useEffect hook to retrieve weather data every 5 seconds
  useEffect(() => {
    // Initial fetch
    fetchWeather(selectedCity);

    // Set interval to fetch weather every 5 seconds
    const intervalId = setInterval(() => fetchWeather(selectedCity), 5000);

    // Clear interval
    return () => clearInterval(intervalId);
  }, [selectedCity]); // Empty dependency array ensures effect runs only on mount and unmount

  // Saves activities in Local Storage when they change
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  // Function for adding a new activity
  function handleAddActivity(newActivity) {
    const activityWithId = {
      ...newActivity, // Copy all properties of the new activity
      id: uid(), // Adds a unique ID
    };

    // Update the state with the new activity, add it to the top of the list
    setActivities([activityWithId, ...activities]);
  }

  function handleDeleteActivity(id) {
    // Filters activities so that only those activities remain in state, whose id does not correspond to transferred id.
    const updatedActivities = activities.filter(
      (activity) => activity.id !== id
    );
    // Updates status with filtered activities.
    setActivities(updatedActivities);
  }

  // Filter activities based on the weather
  const filteredActivities = activities.filter(
    (activity) => activity.isForGoodWeather === weather?.isGoodWeather
  );

  return (
    <div>
      {/* Display of weather emoji + temperature, if available */}
      {weather && (
        <h2>
          {weather.location}: {weather.condition} {weather.temperature}°C
        </h2>
      )}
      <div className="city-selector">
        {cities.map((city) => (
          <button
            key={city}
            className={`city-button ${city === selectedCity ? "active" : ""}`}
            onClick={() => setSelectedCity(city)}
          >
            {city.charAt(0).toUpperCase() + city.slice(1)}
          </button>
        ))}
      </div>
      <List
        activities={filteredActivities}
        isGoodWeather={weather?.isGoodWeather}
        onDeleteActivity={handleDeleteActivity} // Delete function passed as prop
      />
      {/* Pass the function for adding activities to the ActivityForm component */}
      <Form onAddActivity={handleAddActivity} />
    </div>
  );
}

export default App;
