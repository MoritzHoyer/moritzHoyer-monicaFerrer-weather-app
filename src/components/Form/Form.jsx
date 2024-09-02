import { useState } from "react";

export default function Form({ onAddActivity }) {
  // useState hooks for the form inputs
  const [name, setName] = useState(""); // State for the name of the activity
  const [isForGoodWeather, setIsForGoodWeather] = useState(false); // State for the weather category (true/false)

  // Function that is called when the form is sent
  function handleSubmit(event) {
    event.preventDefault(); // Prevents the default behavior of the form (page reload)

    // Create new activity object based on the form input
    const newActivity = {
      name, // Activity name
      isForGoodWeather, // Boolean, whether the activity is suitable for good weather
    };

    // Pass the new activity to the passed function `onAddActivity`.
    onAddActivity(newActivity);

    // Reset form
    setName(""); // Clear activity name
    setIsForGoodWeather(false); // Reset checkbox
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new Activity</h2>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update state `name` on input
        />
      </div>
      <div>
        <label htmlFor="isForGoodWeather">Good-weather activity</label>
        <input
          type="checkbox"
          id="isForGoodWeather"
          checked={isForGoodWeather}
          onChange={(e) => setIsForGoodWeather(e.target.checked)} // Update state `isForGoodWeather` when checkbox is changed
        />
      </div>
      <button type="submit">Submit</button> {/* Submit button */}
    </form>
  );
}
