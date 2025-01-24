import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventListPage from './pages/EventListPage';
import EventFormPage from './pages/EventFormPage';
import MyEventsPage from './pages/MyEventsPage';
import EditEventPage from './pages/EditEventPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/event-list" element={<EventListPage />} />
                <Route path="/add-event" element={<EventFormPage />} />
                <Route path="/edit-event/:id" element={<EditEventPage />} />
                <Route path="/my-events" element={<MyEventsPage />} />
            </Routes>
        </Router>
    );
};

export default App;
