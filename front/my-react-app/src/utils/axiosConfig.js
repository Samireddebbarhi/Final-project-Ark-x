const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

console.log("Token from Local Storage:", getTokenFromLocalStorage);

export const config = {
  headers: {
    Authorization: getTokenFromLocalStorage && getTokenFromLocalStorage.token
      ? `Bearer ${getTokenFromLocalStorage.token}`
      : '',
    Accept: "application/json",
    'Content-Type': 'application/json'
  }
};

console.log("Headers Configuration:", config.headers);