import { useState, useEffect } from "react";
import Form from "./components/Form/Form.jsx";
import List from "./components/List/List.jsx";
import { uid } from "uid"; // Unique ID for each activity

function App() {
  // State for activities
  const [activities, setActivities] = useState(() => {
    // Load activities from the local storage, if available
    const savedActivities = localStorage.getItem("activities");
    return savedActivities ? JSON.parse(savedActivities) : [];
  });

  // State for weather - inicial state -

  const [weather, setWeather] = useState({
    temperature: null,
    conditionEmoji: "❓",
  });

  // Fetch weather data on initial render . refactoring - API -

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m"
    )
      .then((response) => response.json())
      .then((data) => {
        const temperature = data.hourly.temperature_2m[0];
        const conditionEmoji = getConditionEmoji(temperature);
        setWeather({ temperature, conditionEmoji });
      })
      .catch((error) =>
        console.error("Error fetching the weather data:", error)
      );
  }, []);

  const getConditionEmoji = (temperature) => {
    if (temperature >= 30) return "🌞";
    if (temperature >= 20) return "🌤️";
    if (temperature >= 10) return "🌥️";
    return "🌧️";
  };

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

  // Filter activities based on the weather
  const isGoodWeather = weather ? weather.temperature > 15 : true; 
  const filteredActivities = activities.filter(
    (activity) => activity.isForGoodWeather === isGoodWeather
  );

  return (
    <div>
      <List activities={filteredActivities} isGoodWeather={isGoodWeather} />
      <h2>Weather & Activities App</h2>
      {weather.temperature !== null ? (
        <div>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Condition: {weather.conditionEmoji}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {/* Pass the function for adding activities to the ActivityForm component */}
      <Form onAddActivity={handleAddActivity} />
    </div>
  );
}

export default App;
