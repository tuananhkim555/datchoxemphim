// eslint-disable-next-line no-unused-vars
import React from 'react';
import SeatSelection from './components/SeatSelection.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 style={{display:'flex', justifyContent:'center'}}>Movie Seat Selection</h1>
      <SeatSelection />
    </div>
  );
}

export default App;
