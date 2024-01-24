import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import JobSearch from './components/JobSearch';
import Body from './components/Body';
import ProfilePage from './components/Profilepage';
import AdminDashboard from './components/AdminDashboard';

const Main = () => {
    const location = useLocation();

    const getBodyContent = () => {
        switch(location.pathname) {
            case '/Profilepage':
                return <ProfilePage />;
            case '/admin/dashboard':
                return <AdminDashboard />;
            default:
                return <JobSearch />;
        }
    };

    return (
        <>
            <Header />
            <Body>
                {getBodyContent()}
            </Body>
            <Footer />
        </>
    );
};

const App = () => {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/Profilepage" element={<Main />} />
                    <Route path="/admin/dashboard" element={<Main />} />
                    <Route path="/" element={<Main />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
