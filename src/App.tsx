import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './routes/AppRouter';
import Header from './components/layouts/Header';

function App() {
  return (
    <div className="">
       <Header />
       <AppRouter />
    </div>
  );
}

export default App;
