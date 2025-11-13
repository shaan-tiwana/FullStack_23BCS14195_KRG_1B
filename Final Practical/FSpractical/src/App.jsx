import { useState } from "react";

function App() {
  const fruits = ["Apple", "Banana", "Mango", "Orange", "Grapes"];

  const handleClick = (fruit) => {
    alert("You clicked: " + fruit);
  };

  return (
    <div>
      <h1>Fruit List</h1>

      <ul>
        {fruits.map((fruit, index) => (
          <li
            key={index}
            onClick={() => handleClick(fruit)}
            style={{ cursor: "pointer", margin: "6px 0" }}
          >
            {fruit}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
