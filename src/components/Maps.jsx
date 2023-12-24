// MapComponent.js
import { useState, useRef, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Circle, Popup, Marker } from "react-leaflet";
import { Link } from "react-router-dom";


const center = {
  lat: 19.440057053713137,
  lng: -99.12704709742486,
};
const Map = ({ restaurants }) => {
  const [position, setPosition] = useState(center);
  const [radius, setRadius] = useState(100);
  const [inputRad, setInputRad] = useState(100);
  const [circleData, setCircleData] = useState({
    restaurants: [],
    averageRating: null,
    desviationStandarRating: null,
  });

  useEffect(() => {
    handleCircleClick(position.lat, position.lng, radius);
  }, []);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          handleCircleClick(
            marker.getLatLng().lat,
            marker.getLatLng().lng,
            radius
          );
        }
      },
    }),
    []
  );
  const handleOnSubmitSearch = (e) => {
    e.preventDefault();
    setRadius(inputRad);
    handleCircleClick(position.lat, position.lng, inputRad);
  };
  const handleCircleClick = (lat, lng, radius) => {
    // Filter restaurants within the circle based on distance
    const restaurantsInCircle = restaurants.filter((restaurant) => {
      return isPointInRadius(
        lat,
        lng,
        restaurant.address.location.lat,
        restaurant.address.location.lng,
        radius
      );
    });

    // Calculate average rating
    const averageRating =
      restaurantsInCircle.reduce(
        (sum, restaurant) => sum + restaurant.rating,
        0
      ) / restaurantsInCircle.length;

    // Calculate standard deviation
    const ratingsArray = restaurantsInCircle.map(
      (restaurant) => restaurant.rating
    );
    const standardDeviation = calculateStandardDeviation(ratingsArray);

    // Output results to console (you can display them in your UI)
    setCircleData((prev) => ({
      ...prev,
      averageRating: averageRating,
      restaurants: restaurantsInCircle,
      desviationStandarRating: standardDeviation,
    }));
  };

  function isPointInRadius(lat1, lon1, lat2, lon2, radius) {
    // Convert latitude and longitude from degrees to radians
    const radLat1 = (Math.PI / 180) * lat1;
    const radLon1 = (Math.PI / 180) * lon1;
    const radLat2 = (Math.PI / 180) * lat2;
    const radLon2 = (Math.PI / 180) * lon2;

    // Calculate the differences between the points
    const deltaLat = radLat2 - radLat1;
    const deltaLon = radLon2 - radLon1;

    // Haversine formula to calculate the distance
    const a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = 6371000 * c; // Radius of the Earth in meters (assuming a spherical Earth)

    // Check if the distance is within the specified radius
    return distance <= radius;
  }

  const calculateStandardDeviation = (array) => {
    const mean = array.reduce((acc, val) => acc + val, 0) / array.length;
    const squaredDifferences = array.map((val) => (val - mean) ** 2);
    const sumSquaredDifferences = squaredDifferences.reduce(
      (acc, val) => acc + val,
      0
    );
    const variance = sumSquaredDifferences / array.length;
    return Math.sqrt(variance);
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="mb-4">
        <form onSubmit={handleOnSubmitSearch}>
          <p className="flex items-center justify-start text-left text-lg mb-1">
            Enter in meters, the radius to search restaurants in the map: (Drag the red marker to change position <img width={16} style={{margin: "0 2px"}} src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png" />)
          </p>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              value={inputRad}
              type="number"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter radius in meters to search"
              onChange={(e) => setInputRad(e.target.value)}
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="flex max-[720px]:flex-col  text-left">
        <div style={{ width: "250px" }} className="flex flex-col gap-4 max-[720px]:mb-4">
          <div>
            <p>
              <span className="font-bold">Average Rating: </span>
              {circleData.restaurants.length > 0
                ? Number(circleData.averageRating).toFixed(2)
                : "No info"}
            </p>
          </div>
          <div>
            <p>
              <span className="font-bold">Standard Deviation of Ratings: </span>

              {circleData.restaurants.length > 0
                ? Number(circleData.desviationStandarRating).toFixed(2)
                : "No Info"}
            </p>
          </div>
          <div>
            <p className="font-bold">Restaurants in the Radius:</p>
            <div style={{ maxHeight: "250px", overflow: "auto" }}>
              {circleData.restaurants.length > 0
                ? circleData.restaurants.map((item) => (
                    <div key={item.id}>
                      <Link
                        className="text-blue-600 underline"
                        to={`/restaurant/${item.id}`}
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))
                : "No restaurants"}
            </div>
          </div>
        </div>
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={20}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />

          {/* Example: Add a circle to the map */}
          <Marker
            ref={markerRef}
            draggable={true}
            position={position}
            eventHandlers={eventHandlers}
            zIndexOffset={10}
            icon={new L.Icon({
              iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
              shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            })}
          >
            <Circle
              center={[position.lat, position.lng]}
              radius={radius} // Specify the radius in meters
            ></Circle>
          </Marker>

          {/* Add markers for restaurants */}
          {restaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              position={[
                restaurant.address.location.lat,
                restaurant.address.location.lng,
              ]}
            >
              <Popup>{`${restaurant.name} - Rating: ${restaurant.rating}`}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
