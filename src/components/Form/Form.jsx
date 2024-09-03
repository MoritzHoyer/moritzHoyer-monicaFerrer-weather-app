import { useState } from "react";

export default function Form({ onAddActivity }) {
  // Call function when form is sent
  function handleSubmit(event) {
    event.preventDefault(); // Prevents default behavior of form

    // Access to the form elements
    const formElements = event.target.elements;
    const isForGoodWeather = formElements.isForGoodWeather.checked;
    const activityName = formElements.name.value;

    // Create new activity object based on form data
    const newActivity = {
      name: activityName, // Name Activity
      isForGoodWeather: isForGoodWeather, // Boolean, whether the activity is suitable for good weather
    };

    // Pass new activity to passed function `onAddActivity`.
    onAddActivity(newActivity);

    // Reset form
    event.target.reset();

    // Set focus on the input field
    const nameInput = formElements.name;
    if (nameInput) {
      nameInput.focus(); // Set focus on the input field
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">Add New Activity</h2>
      <div className="form__fields">
        <div className="form__field">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name" // name attribute for form element
          />
        </div>
        <div className="form__field">
          <label htmlFor="isForGoodWeather">Good-Weather Activity</label>
          <input
            type="checkbox"
            id="isForGoodWeather"
            name="isForGoodWeather" // name attribute for form element
          />
        </div>
        <div className="form__button-wrapper">
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}
