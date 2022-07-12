import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Setup from './components/setup/setup.component';
import Test from './components/test/test.component';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Setup/>}/>
        <Route path="/test" element={<Test/>}/>
      </Routes>      
    </div>
  );
}

export default App;
