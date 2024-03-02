export async function getFilms() {
  const url = `https://api.themoviedb.org/3/movie/popular?language=pt-br&page=`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
}
