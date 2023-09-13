import axios from 'axios';
import { ReactNode, createContext, useEffect, useState } from 'react';

type SearchProviderProps = {
  children: ReactNode;
};

interface SearchPage {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  imdb_id: string | null;
}

interface SearchContextType {
  query: string | null;
  setQuery: React.Dispatch<React.SetStateAction<string | null>>;
  searchMovies: SearchPage[] | null;
  setSearchMovies: React.Dispatch<React.SetStateAction<SearchPage[] | null>>;
  results: SearchPage[];
  defaultMovies: SearchPage[] | null;
  isLoading: boolean; // Add isLoading state
}

export const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [query, setQuery] = useState<string | null>('');
  const [results, setResults] = useState<SearchPage[]>([]);
  const [searchMovies, setSearchMovies] = useState<SearchPage[] | null>(null);
  const [defaultMovies, setDefaultMovies] = useState<SearchPage[] | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Initialize as false

  useEffect(() => {
    // Define the default search endpoint to fetch some movies
    const defaultSearchEndpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${
      import.meta.env.VITE_DB_KEY
    }&sort_by=popularity.desc&include_adult=false&page=1`;

    axios
      .get(defaultSearchEndpoint)
      .then((response) => {
        setDefaultMovies(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching default movies:', error);
      });
  }, []);

  useEffect(() => {
    if (query) {
      setIsLoading(true); // Set isLoading to true when searching

      const searchEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${
        import.meta.env.VITE_DB_KEY
      }&query=${query}`;

      axios
        .get(searchEndpoint)
        .then((response) => {
          setResults(response.data.results);
          setSearchMovies(response.data.results);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        })
        .finally(() => {
          setIsLoading(false); // Set isLoading back to false when search is complete
        });
    }
  }, [query]);

  return (
    <SearchContext.Provider
      value={{
        defaultMovies,
        query,
        results,
        setQuery,
        isLoading,
        searchMovies,
        setSearchMovies,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
