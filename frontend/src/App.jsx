import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/header.jsx";
import Home from "./pages/home.jsx";
import MarketPlace from "./pages/buyers.jsx";
import FarmersHub from "./pages/farmers.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import SeasonalPlanner from './components/seasonalPlanner';
import "./styles/app.css";
import ProtectedRoute from "./components/protectedRoute";

function App() {
    return (
        <div className="App-container">
            <Router>
                <Header />
                <Routes>
                    <Route path="/home" element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } />
                    <Route path="/marketplace" element={
                        <ProtectedRoute>
                            <MarketPlace />
                        </ProtectedRoute>
                    } />
                    <Route path="/farmers-hub" element={
                        <ProtectedRoute>
                            <FarmersHub />
                        </ProtectedRoute>
                    } />
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/planner" element={
                        <ProtectedRoute>
                            <SeasonalPlanner />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </div>
    )
}

export default App;
// This code sets up a React application with protected routing using React Router.
