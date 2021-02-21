import React, { useState, useEffect } from 'react';
import api from './services/api'

import './components/App.css';
import backgroundImage from './assets/background.jpg';
import Header from './components/Header';

function App() {
  const [reasons, setReasons] = useState([]);

  useEffect(()=> {
    api.get('projects').then(response =>{
      setReasons(response.data);
    });
  }, []);

  async function handleAddReason(){
    //setReasons([...reasons, `New reason ${Date.now()}`]);
    const response = await api.post('projects', {
      title: `New reason ${Date.now()}`,
      owner: "Shimizu"
    });

    const reason = response.data;

    setReasons([...reasons, reason]);
  }

  return ( 
  <>
  <Header title="The Helsinki Project"> 
  <img width={900} src={backgroundImage}/>
    <ul>
      <li>Project overview</li>
      <li>Project goals</li>
    </ul>
  </Header>
  <Header title="Hello Helsinki!"/>

    <ul>
      {reasons.map(reason => (
      <li key={reason.id}>{reason.title}</li>
      ))}
    </ul>

    <button type="button"onClick={handleAddReason}>Add a reason to live in Helsinki as an startuper:</button>
  </>
  );
}

export default App;