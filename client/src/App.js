import logo from './logo.svg';
import './App.css';
import React from 'react';

// components
import AddModels from './components/AddModels';
import ListModels from './components/ListModels';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <>
      <div className="container mx-auto px-4">
        <AddModels />
      </div>
      <div className="container mx-auto px-4">
        <SearchBar />
        <FilterBar />
        <ListModels />
      </div>
    </>
  );
}

export default App;
