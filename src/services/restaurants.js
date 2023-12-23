import jsonData from '../data/data_melp.json';

export default function getAllRestaurants() {
  return new Promise((resolve) => {
    resolve({
      json: () => Promise.resolve(jsonData),
    });
  });
}
