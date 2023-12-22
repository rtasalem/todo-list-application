import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const modeScript = isDarkMode ? import('./styles/darkMode.css') : import('./styles/lightMode.css');

  modeScript.then(() => {
    const root = document.getElementById('root');
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </React.StrictMode>
    );
  });
};

export default Index;

ReactDOM.render(<Index />, document.getElementById('root'));