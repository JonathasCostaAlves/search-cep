import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';


import React, {Fragment} from 'react';

function App() {
  return (
    <Fragment>
    <div className="app">
      <Header title="Pesquisa de Cep"/>
      <Main placeholder="Pesquise pelo CEP "/>
    </div>
      <Footer />
    </Fragment>
  );
}

export default App;
