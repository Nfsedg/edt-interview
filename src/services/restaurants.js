export default async function getAllRestaurants() {
  const response = await fetch("https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json");

  if (!response.ok) {
    return new Error(`HTTP error! Status: ${response.status}`);
  }

  const jsonData = await response.json();

  return jsonData;
}
