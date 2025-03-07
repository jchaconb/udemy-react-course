import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return <h1>Hello React!</h1>;
}

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
