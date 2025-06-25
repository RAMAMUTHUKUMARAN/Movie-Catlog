import "../css/Favorites.css"; // Adjust the path as necessary
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
function Favorites() {
    const { favorites } = useMovieContext();
    if (favorites.length > 0) {
        return (
        <div className="favorites">
            <h2>Your Favorites</h2>
            <div className="movie-grid">
                    {favorites.map(
                        (movie) => 
                        (
                            <MovieCard movie={movie} key={movie.id}/>
                        )
                    )}
            </div>
        </div>
        );
    }
    return (
        <div className="favorites-empty">
            <h2>No Favorites Added</h2>
            <p>Browse movies and click on the heart icon to add them to your favorites.</p>
        </div>
    )
}
export default Favorites;