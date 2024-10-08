import { useState, useEffect } from "react";
import "../index.css";
import Main, { MovieList } from "./Main";
import Search from "./SearchBar";
import NavBar from "./NavBar"; // Assuming NavBar.js is in the same directory
import { Logo, NumResults } from "./NavBar"; // Importing multiple components
import { ListBox, WatchedSummary, WatchedMoviesList } from "./Main";
import StarRating from "./StarRating";

// http://www.omdbapi.com/?i=tt3896198&apikey=dcad1bc9
// const KEY = "dcad1bc9";f84fc31d
const KEY = "dcad1bc9";
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false); //for conditional render
  const [isError, setIsError] = useState(""); //for conditional render
  const tempQuery = "Interstellar";

  //to select movie (onIMDB id)
  const [selectedId, setSelectedId] = useState(null);

  // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
  // .then(response => response.json())
  // .then(data => console.log(data.Search));

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setIsError(""); //resetting in every fetch
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          //if cant fetch data
          if (!res.ok) {
            throw new Error("Failed to fetch movies");
          }

          const data = await res.json();
          //if cant find matching query / movie
          if (data.Response === "False") {
            throw new Error("Movie Not Found");
          }

          setMovies(data.Search);
          console.log(data.Search);
        } catch (error) {
          console.log(error);
          setIsError(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        //basically dont fetch if query is less than 3 char
        setMovies([]);
        setIsError("");
        return;
      }
      fetchMovies();
    },
    [query]
  );

  function handleSelectMovie(id) {
    //if id equal to current one, set it to null. so when user presses same movie again the details closes
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  //will be prop drilling all the way. app->main->listbox->movieList
  //app-> navbar
  //we have fixed it using component composition
  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <ListBox>
          {isLoading && <Loader />}
          {!isLoading && !isError && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {isError && <ErrorMessage message={isError} />}
        </ListBox>
        <ListBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}

function MovieDetails({ selectedId, onCloseMovie }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  //need useEffect to fetch the selected movies
  useEffect(
    function () {
      async function getMovieDetails() {
        //read the api doc to understand how to get the movie by id
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        // console.log(data);
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  ); //see we need to pass selectedId as a dependency

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating maxRating={10} size={25} />
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>❌</span>
      {message}
    </p>
  );
}

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
