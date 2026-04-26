import React from 'react';
import Upload from './components/Upload';
import FileList from './components/FileList';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Document Manager</h1>
      <Upload />
      <FileList />
    </div>
  );
}

export default App;