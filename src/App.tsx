import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Feature from './pages/Feature/Feature';
import Movie from './pages/Movie/Movie';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/feature' element={<Feature />} />
      <Route path='/movies/:imdb_id/*' element={<Movie />} />{' '}
      <Route path='/feature/movies/:imdb_id/*' element={<Movie />} />{' '}
    </Routes>
  );
}

export default App;
