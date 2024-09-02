import { useState } from "react";
import Form from "./components/Form/Form.jsx";
import { uid } from "uid"; // Unique ID for each activity

function App() {
  // State for the list of activities
  const [activities, setActivities] = useState([]);

  // Function for adding a new activity
  function handleAddActivity(newActivity) {
    const activityWithId = {
      ...newActivity, // Copy all properties of the new activity
      id: uid(), // Adds a unique ID
    };

    // Update the state with the new activity, add it to the top of the list
    setActivities([activityWithId, ...activities]);
  }

  return (
    <div>
      <h1>Weather & Activities App </h1>
      {/* Pass the function for adding activities to the ActivityForm component */}
      <Form onAddActivity={handleAddActivity} />
    </div>
  );
}

export default App;
