import { useEffect, useState } from 'react';
import { API_URL } from './config';

import MovieList from './components/MovieList';
import NavBar from './components/NavBar';
import ErrorMessage from './components/ErrorMessage';
import Loader from './components/Loader';
import Main from './components/Main';
import Search from './components/Search';
import WatchedSummary from './components/WatchedSummary';
import NumResults from './components/NumResults';
import WatchedMoviesList from './components/WatchedMoviesList';
import Logo from './components/Logo';
import Box from './components/Box';
import MovieDetails from './components/MovieDetails';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId(id === selectedId ? null : id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError('');

          const res = await fetch(`${API_URL}&s=${query}`);

          setError(''); // Temporal async fix. This is a duplication and should NOT be here.

          if (!res.ok)
            throw new Error('Something went wrong with fetching movies');

          const data = await res.json();

          if (data.Response === 'False') {
            setMovies([]);
            throw new Error('Movie not found');
          }

          setMovies(data.Search);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }

      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main movies={movies}>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

