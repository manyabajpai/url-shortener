import { set } from 'mongoose';
import React, { useState } from 'react';
import './App.css';

function App() {

  const [url, setUrl ] = useState('');
  const [ generated, setGenerated ] = useState('');
  const [ error, setError ] = useState('');

  const handleinputchange = event => {
    setUrl(event.target.value);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
      await fetch('/short', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({originalUrl: url }),
      })
      .then(res => res.json())
      .then(res => {
        if(res.shortUrl)
          setGenerated(res.shortUrl);
      })
      .catch(err => {
        setError(err);
        console.log(err.message);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <input value={url} onChange={handleinputchange}></input>
        <button onClick={handleSubmit}>Generate short url</button>
        {
          error && <h6> Hey, Please check your Url</h6>
        }
        {
          generated && !error && <h6>Hi, Your url is {generated}</h6>
        }
      </header>
    </div>
  );
}

export default App;
