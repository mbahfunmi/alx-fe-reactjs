// src/App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList'; // Import new component
import RecommendationsList from './components/RecommendationsList'; // Import new component

function App() {
  return (
    <div className="App" style={{ fontFamily: 'Inter, sans-serif', padding: '20px', maxWidth: '960px', margin: '0 auto', backgroundColor: '#f8f9fa', minHeight: '100vh', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <h1 style={{ textAlign: 'center', color: '#212529', marginBottom: '30px', fontSize: '2.5em' }}>Recipe Sharing Application</h1>

      <Router>
        <Routes>
          {/* Route for the home page (Recipe List and Add Form) */}
          <Route path="/" element={
            <>
              <SearchBar />
              <AddRecipeForm />
              <FavoritesList /> {/* Render FavoritesList */}
              <RecommendationsList /> {/* Render RecommendationsList */}
              <RecipeList />
            </>
          } />
          {/* Route for individual recipe details, using a dynamic ID parameter */}
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
