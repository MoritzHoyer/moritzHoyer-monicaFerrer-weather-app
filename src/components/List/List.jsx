import "./List.css";

// Define functional component with activities prop
export default function List({ activities, isGoodWeather, onDeleteActivity }) {
  return (
    <div>
      {/* Dynamic headline based on the weather */}
      <h3>
        {isGoodWeather
          ? "The weather is awesome! Go outside and:"
          : "Bad weather outside! Here's what you can do now:"}
      </h3>
      {/* Unordered list for all activities */}
      <ul className="activities-list">
        {activities.map((activity) => (
          <li key={activity.id} className="activity-list__item">
            {/* List element with the name of the activity */}
            <h3>{activity.name}</h3>
            {/* Add delete button */}
            <button onClick={() => onDeleteActivity(activity.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
