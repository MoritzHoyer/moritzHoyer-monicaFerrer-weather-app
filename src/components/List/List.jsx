import React from "react";

// define functional component with activities prop
export default function List({ activities, isGoodWeather }) {
  return (
    <div>
      {/* Dynamic headline based on the weather */}
      <h3>
        {isGoodWeather
          ? "Activities for good weather"
          : "Activities for bad weather"}
      </h3>
      {/* unordered list for all activities */}
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            {/* List element with the name of the activity */}
            {activity.name} (
            {activity.isForGoodWeather
              ? "is suitable for good weather conditions"
              : "is suitable for bad weather conditions"}
            )
          </li>
        ))}
      </ul>
    </div>
  );
}
