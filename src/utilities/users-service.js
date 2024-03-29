// Import all named exports attached to a usersAPI object
// This syntax can be helpful documenting where the methods come from
import * as usersAPI from "./users-api";

export async function signUp(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  // Baby step by returning whatever is sent back by the server
  return token;
}

function getTokenPayload(token) {
  const tokenArray = token.split(".");
  const middle = tokenArray[1];
  const payload = window.atob(middle);
  return payload;
}

export function getToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const payload = getTokenPayload(token);

  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }

  return token;
}

export function getUser() {
  const token = getToken();
  if (token === null) {
    return null;
  }

  const payload = getTokenPayload(token);
  return JSON.parse(payload);
}

export function logout() {
  localStorage.removeItem("token");
}

// calls the login function from users-api
export async function login(email, password) {
  const data = await usersAPI.login(email, password);
  return data;
}

export async function checkToken() {
  const data = await usersAPI.checkToken();
  return data;
}

export async function getAttractions() {
  const attractionsData = await usersAPI.fetchAttractions();
  return attractionsData;
}

export async function searchAttractions(searchQuery) {
  const searchData = await usersAPI.searchAttractions(searchQuery);
  return searchData;
}

export async function addAttractionToBucketList(attraction) {
  const addedAttraction = await usersAPI.addAttractionToBucketList(attraction);
  return addedAttraction;
}

export async function removeAttractionFromBucketList(attractionId) {
  const addedAttraction =
    await usersAPI.removeAttractionFromBucketList(attractionId);
  return addedAttraction;
}

export async function createReview(attractionId, review) {
  const reviews = await usersAPI.createReview(attractionId, review);
  return reviews;
}

export async function removeReview(attractionId, reviewId) {
  const reviews = await usersAPI.removeReview(attractionId, reviewId);
  return reviews;
}

export async function updateReview(
  attractionId,
  reviewId,
  updatedText,
  updatedRating,
) {
  const updatedReview = await usersAPI.updateReview(
    attractionId,
    reviewId,
    updatedText,
    updatedRating,
  );
  return updatedReview;
}

export async function getAllReviews(attractionId) {
  const reviews = await usersAPI.getAllReviews(attractionId);
  return reviews;
}

export async function getPhotoReference(photoReferenceId) {
  const photo = await usersAPI.getPhotoReference(photoReferenceId);
  return photo;
}

export function ImageDisplay(base64Image) {
  if (base64Image) {
    // Create a data URL by prefixing the Base64-encoded image string with "data:image/jpeg;base64,"
    const dataUrl = `data:image/jpeg;base64,${base64Image}`;

    return dataUrl;
  } else {
    // Handle the case where there is no base64Image
    return null; // or return a placeholder image
  }
}

export async function getDescription(attractionName) {
  const description = await usersAPI.getDescription(attractionName);
  return description;
}

export async function updateAttraction(attractionId) {
  const updatedAttraction = await usersAPI.updateAttraction(attractionId);
  return updatedAttraction;
}
