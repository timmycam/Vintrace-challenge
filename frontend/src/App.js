import React from 'react'
import './App.css';
import { Router, Redirect } from '@reach/router';
import { WineSearch } from './components/WineSearch';
import { Product } from './components/Product';

function App() {
  return (
    <div className="App">
        <Router>
          <Redirect noThrow={true} from="/" to="/wine-search"/>
          <WineSearch path="/wine-search"/>
          <Product path="product/:lotCode"/>
        </Router>
    </div>
  );
}
export default App;