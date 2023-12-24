import jsonData from '../data/data_melp.json';

export function getAllRestaurants() {
  return new Promise((resolve) => {
    resolve({
      json: () => Promise.resolve(jsonData),
    });
  });
}

export function getRestaurantsById(id) {
  return new Promise((resolve) => {
    resolve({
      json: () => Promise.resolve(jsonData.find(item => item.id === id)),
    });
  });
}