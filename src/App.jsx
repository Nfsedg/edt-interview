import { useEffect, useState } from "react";
import getAllRestaurants from "./services/restaurants";
import Card from "./components/Card";
import DropdownSort from "./components/DropdownSort";
import "./App.css";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    getAllRestaurants()
      .then((data) => data.json())
      .then((res) => setRestaurants(res));
  }, []);

  return (
    <div className="p-2 grid gap-4">
      <div className="grid gap-1">
        <h1 className="text-4xl">Welcome to Melp</h1>
        <h2 className="text-xl">The best restaurants in the city</h2>
      </div>
      <div className="flex justify-end">
        <DropdownSort arr={restaurants} setArr={setRestaurants}/>
      </div>
      <div className="grid gap-2">
        {restaurants.map((item) => (
          <Card key={item.id} restaurant={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
