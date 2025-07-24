// src/App.jsx
import './App.css';
// Import BrowserRouter and alias it as Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '960px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Recipe Sharing Application</h1>

      {/* Wrap Routes with the Router component */}
      <Router>
        <Routes>
          {/* Route for the home page (Recipe List and Add Form) */}
          <Route path="/" element={
            <>
              <AddRecipeForm />
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
