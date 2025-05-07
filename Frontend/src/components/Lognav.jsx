import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Lognav() {
    const [sticky, setSticky] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/disease">Crop Disease</Link></li>
            <li><Link to="/demand">Crop Demand</Link></li>
            <li><Link to="/weather">Weather Prediction</Link></li>
            <li><Link to="/cost">Price Prediction</Link></li>
        </>
    );

    const handleProfileClick = () => {
        const userType = localStorage.getItem('userType'); // Get user type from localStorage

        if (userType === 'farmer') {
            navigate('/farmer-dashboard');
        } else if (userType === 'buyer') {
            navigate('/corporate-dashboard');
        } else {
            navigate('/login'); // fallback
        }
    };

    return (
        <header className={`flex justify-between items-center px-6 h-24 fixed top-0 left-0 right-0 z-50 ${sticky ? "shadow-md bg-base-200" : "bg-green-500"}`}>
            <div className="flex items-center gap-4">
                <img src="/farm-pro-logo.png" alt="Farm Pro Logo" className="h-10" />
                <h1 className="text-2xl font-bold text-white">Farm Pro</h1>
            </div>
            <nav>
                <ul className=" gap-6 hidden md:flex text-white text-xl">
                    {navItems}
                </ul>
            </nav>
            <div className="flex items-center gap-4">
                <span className="text-white text-xl">💬</span>
                <button
                    onClick={handleProfileClick}
                    className="text-2xl text-white hover:text-yellow-400"
                    title="Go to Dashboard"
                >
                    👤
                </button>
            </div>
            <div class="md:hidden">
            <a class="text-4xl" href="#">&#8801;</a>
        </div>
        </header>
    );
}

export default Lognav;
