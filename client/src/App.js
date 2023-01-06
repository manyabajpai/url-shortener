import React, { useState } from 'react';
import './App.css';

function App() {

  const [url, setUrl ] = useState('');

  const handleinputchange = event => {
    setUrl(event.target.value);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await fetch('/short', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({originalUrl: url }),
      });

      console.log("Response - ", response);
    }catch(err) {
      console.log("Error", err);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input value={url} onChange={handleinputchange}></input>
        <button onClick={handleSubmit}>Generate short url</button>
      </header>
    </div>
  );
}

export default App;
