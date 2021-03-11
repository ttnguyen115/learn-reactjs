import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const name = 'Trung';
  const age = 21;
  const isMale = true;
  const student = {
    name: 'Easy Frontend',
  };
  const colors = ['red', 'green', 'blue'];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          It's me again, { name } - { age } - { isMale ? 'Male' : 'No' } (test SSH) the four times
        </p>
        { isMale ? <p>Trung</p> : <p>21</p> }

        <p>------------------------------</p>

        { isMale && <p>Trung</p> }
        { !isMale && <p>21</p> }

        <p>------------------------------</p>

        { isMale && (
          <div>
            <h2>Trung 1</h2>
            <h2>Trung 1</h2>
            <h2>Trung 1</h2>
          </div>
        ) }

        <p>------------------------------</p>

        { isMale && (
          <>
            <h2>Trung 2</h2>
            <h2>Trung 2</h2>
            <h2>Trung 2</h2>
          </>
        ) }

        <p>------------------------------</p>

        <p>{ student.name }</p>

        <p>------------------------------</p>

        <ul>
          {colors.map(color => (
            <li key={ color } style={{ color }}>{color}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
