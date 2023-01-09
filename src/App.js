import React from 'react';
import './App.scss';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Content from './components/Content.js';

function App() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;