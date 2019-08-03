import React from 'react';
import './App.css';
import Grid from './components/Grid';

function App() {
  return (
    <div className="App">
      <header>
        <h2>SUDOKU</h2>
      </header>
      <main>
        <Grid></Grid>
        <div className='footer'>
          Source code on <a href='https://github.com/pranayrauthu/pk-sudoku'>GitHub</a>
        </div>
      </main>
    </div>
  );
}

export default App;
