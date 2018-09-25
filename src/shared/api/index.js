import { DATA_URL } from "../globals";

const restaurantPropertyExtractorFactory = function(relevantProperty) {
  return function restaurantPropertyExtractor() {
    return fetchRestaurants("all", "all")
      .then(restaurants => Promise.resolve(restaurants))
      .then(restaurants => restaurants.reduce((accumulator, current) => {
          accumulator.add(current[relevantProperty]);
          return accumulator;
        }, new Set()));
  };
};

const handleBackendResponse = response => {
  if (response.ok) {
    if (response.status !== 200) {
      return Promise.reject(new Error("Fetched data not availabe"));
    }
    return response.json();
  }
  throw new Error("Network response was not ok.");
};

/* ---------EXPORTS--------- */

export const fetchRestaurant = id => fetch(`${DATA_URL}?id=${id}`).then(handleBackendResponse);
export const fetchRestaurants = (cuisine, neighborhood) => fetch(`${DATA_URL}?c=${cuisine}&n=${neighborhood}`).then(handleBackendResponse);
export const imageUrlForRestaurant = photographId => `/img/restaurants/${photographId}.jpg`;
export const urlForRestaurant = restaurant => `./restaurant.html?id=${restaurant.id}`;
export const fetchNeighborhoods = restaurantPropertyExtractorFactory("neighborhood");
export const fetchCuisines = restaurantPropertyExtractorFactory("cuisine_type");
