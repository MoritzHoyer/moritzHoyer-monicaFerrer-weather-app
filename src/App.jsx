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

  // Hardcoded weather condition
  const isGoodWeather = true;

  // Filter activities based on the weather
  const filteredActivities = activities.filter(
    (activity) => activity.isForGoodWeather === isGoodWeather
  );

  return (
    <div>
      <List activities={filteredActivities} isGoodWeather={isGoodWeather} />
      <h2>Weather & Activities App </h2>
      {/* Pass the function for adding activities to the ActivityForm component */}
      <Form onAddActivity={handleAddActivity} />
    </div>
  );
}

export default App;
