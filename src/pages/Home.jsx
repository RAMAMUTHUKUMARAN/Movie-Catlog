import MovieCard from "../components/MovieCard"
import {useState, useEffect} from "react";
import { searchMovie, getPopularMovies } from "../services/api";
import "../css/Home.css"; // Adjust the path as necessary
function Home(){
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadPopularMovies = async() =>{
            try{
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err){
                console.log(err)
                setError("Failed to fetch popular movies.")
            }
            finally{
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setError("Please enter a search query.");
            return;
        }
        if (loading) {
            return; // Prevent multiple submissions while loading
        }
        setLoading(true);
        try{
            const searchResults = await searchMovie(searchQuery);
            setMovies(searchResults);
            setError(null);
        }catch (err){
            console.log(err);
            setError("Failed to fetch movies.");
        }finally{
            setLoading(false);
        }

        
    }
    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" 
                placeholder="Search for a movie..." 
                className="search-input"
                value={searchQuery}
                onChange={(e)=> setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-btn">Search</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {loading ? (<div className="loading">Loading...</div>) 
            :( 
            <div className="movie-grid">
                {movies.map(
                    (movie) => 
                    (
                        <MovieCard movie={movie} key={movie.id}/>
                    )
                )}
            </div>)}
        </div>
    )
}
export default Home;


