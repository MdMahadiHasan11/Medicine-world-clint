// ThemeContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Create a ThemeContext
export const ThemeContext = createContext();

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
    // Initialize state with localStorage value or default to 'light'
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // Effect to update localStorage and document attribute whenever theme changes
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Function to toggle between dark and light themes
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    // Provide theme and toggleTheme function to children
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
