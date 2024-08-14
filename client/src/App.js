import logo from './logo.svg';
import './App.css';
import React from 'react';

// components
import AddModels from './components/AddModels';
import ListModels from './components/ListModels';
import FilterBar from './components/FilterBar';


function App() {
  return (
<>
  <div className="containter">
    <AddModels />
  </div>
  <div className="container">
    <FilterBar />
    <ListModels />
  </div>
</>
)};

export default App;
