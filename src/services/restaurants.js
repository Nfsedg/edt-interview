export default async function getAllRestaurants() {
  const response = await fetch("/.netlify/functions/proxy");

  if (!response.ok) {
    return new Error(`HTTP error! Status: ${response.status}`);
  }

  const jsonData = await response.json();

  return jsonData;
}
