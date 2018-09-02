const BACKEND_URL = "http://localhost:1337/restaurants";

const restaurantPropertyExtractorFactory = function(relevantProperty) {
  return function restaurantPropertyExtractor() {
    return fetchRestaurants().then(restaurants => restaurants.reduce((accumulator, current) => {
        accumulator.add(current[relevantProperty]);
        return accumulator;
      }, new Set()));
  };
};

const propertyFilterFactory = (filterProperty, criteria) => function(element) {
    return criteria === "all" || element[filterProperty] === criteria;
  };

/* ---------EXPORTS--------- */

export function fetchRestaurant(id) {
  // Hint: Expected that the restaurant is chached, so do not catch again locally
  return (
    fetch(`${BACKEND_URL}/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      /* eslint-disable no-console */
      .catch(error => console.error(error))
  );
  /* eslint-enable no-console */
}

export function fetchRestaurants() {
  return fetch(BACKEND_URL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .catch(error => error);
}

export function fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood) {
  return fetchRestaurants().then(restaurants => restaurants
      .filter(propertyFilterFactory("cuisine_type", cuisine))
      .filter(propertyFilterFactory("neighborhood", neighborhood)));
}

export const imageUrlForRestaurant = photographId => `/img/${photographId}.jpg`;
export const urlForRestaurant = restaurant => `./restaurant.html?id=${restaurant.id}`;
export const fetchNeighborhoods = restaurantPropertyExtractorFactory("neighborhood");
export const fetchCuisines = restaurantPropertyExtractorFactory("cuisine_type");
