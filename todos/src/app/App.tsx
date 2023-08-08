import React from 'react';
import '.././App.css';
import {Login} from '../pages/Login';
import { Register } from '../pages/Register';
import { Profile } from '../pages/Profile';
import { Header } from '../components/Header';
import { About } from '../pages/About';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { TodosMain } from '../pages/TodosMain';
import { Footer } from '../components/Footer';


function App() {
  
  return (
    <>
    <Router>
    <div className="App flex flex-col min-h-screen">
      <Header/>
      <Routes>
        <Route path='/' element= {<Dashboard/>}/>
        <Route path='/login' element= {<Login/>}/>
        <Route path='/Profile' element= {<Profile/>}/>
        <Route path='/register' element= {<Register/>}/>
        <Route path='/logout' element= {<Login/>}/>
        <Route path='/about' element= {<About/>}/>
        <Route path='/todos' element= {<TodosMain/>}/>

      </Routes>
      <Footer/>
    </div>
    </Router>
    </>
  );
}

export default App;
