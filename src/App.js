import { useEffect, useState } from "react";
//5a33aa9e -api key
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com?apikey=5a33aa9e';

const App = () => {
    const [movies, setMovies] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }
    useEffect(()=>{
        searchMovies('Movie');
    }, []);
    return (
        <div className="app">
            <h1>Cinema Search</h1>

            <div className="search">
                <input
                    //input of the search div/bar
                    placeholder="Search for movies"
                    value={searchTerm}
                    //when changed, we want to?
                    onChange={ (e) => setSearchTerm(e.target.value) }
                    onKeyDown={ (e) => e.key=="Enter" ? searchMovies(searchTerm): setSearchTerm(e.target.value)}
                    //setSearchTerm(e.target.value)
                    
                />
                <img
                    //image of the search icon
                    src={SearchIcon}
                    alt="search"
                    onClick={ () => searchMovies(searchTerm) }
                />
            </div>

            {
                movies?.length >0
                ? (
                    //if movie length found is more than 0
                    <div className="container"> 
                        {
                            movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))
                        }
                    </div>
                ) : (
                    //if movie length is 0 or less
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )

            }

        </div>
    );
}

export default App;  