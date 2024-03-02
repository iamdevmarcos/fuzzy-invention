export const api = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.TMDB_TOKEN,
  },
};
