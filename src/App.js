import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import DefaultPage from "./components/pages/DefaultPage";
import Recipes from "./components/pages/Recipes";
import RecipeDetails from "./components/pages/RecipeDetails";
import UserRecipeSubmission from "./components/pages/UserRecipeSubmission";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

import { TranslationProvider } from './TranslationContext';
import { AuthProvider, useAuth } from './AuthContext';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <TranslationProvider>
      <AuthProvider>
        <React.Fragment>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/recipes" element={<PrivateRoute><Recipes /></PrivateRoute>} />
              <Route path="/recipes/:recipe_id" element={<PrivateRoute><RecipeDetails /></PrivateRoute>} />
              <Route path="/recipes/user/:recipe_id" element={<PrivateRoute><RecipeDetails /></PrivateRoute>} />
              <Route path="/submit" element={<PrivateRoute><UserRecipeSubmission /></PrivateRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<DefaultPage />} />
            </Routes>
          </Router>
        </React.Fragment>
      </AuthProvider>
    </TranslationProvider>
  );
}

export default App;
