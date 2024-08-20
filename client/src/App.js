import logo from './logo.svg';
import './App.css';
import React from 'react';

// components
import AddModels from './components/AddModels';
import ListModels from './components/ListModels';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import AddTags from './components/Tags/AddTags';
import ListTags from './components/Tags/ListTags';


function App() {
  return (
    <>
      <div className="container mx-auto px-4">
        <AddModels />
        <AddTags />
      </div>
      
      <div className="container mx-auto px-4">
        <SearchBar />
        <FilterBar />
        <ListModels />
        <ListTags />
      </div>
    </>
  );
}

export default App;
