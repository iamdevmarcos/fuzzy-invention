const mapMovieData = (movie) => ({
  title: movie.title,
  overview: movie.overview,
  releaseDate: movie.release_date,
  voteAverage: movie.vote_average,
  originalLanguage: movie.original_language,
});

const fetchMovies = async (page) => {
  const apiKey = "8c1e213ae55b484d33ded67c620d180b";
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch data for page ${page}`);
    }

    const { results } = await response.json();

    if (results) {
      return results.map(mapMovieData);
    } else {
      console.error(`Results not found for page ${page}`);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching data for page ${page}: ${error.message}`);
    return [];
  }
};

export const api = async () => {
  const renderPages = 2;
  let moviesList = [];

  for (let i = 1; i <= renderPages; i++) {
    const currentList = await fetchMovies(i);
    moviesList = [...moviesList, ...currentList];
  }

  return moviesList;
};
