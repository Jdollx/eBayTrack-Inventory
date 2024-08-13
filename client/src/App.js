import logo from './logo.svg';
import './App.css';
import React from 'react';

// components
import AddModels from './components/AddModels';
import ListModels from './components/ListModels';


function App() {
  return (
<>
  <div className="containter">
    <AddModels />
  </div>
  <div className="container">
    <ListModels />
  </div>
</>
)};

export default App;
