// import "./App.css";

// import products from "./data/products";
// import GroceriesAppContainer from "./Components/GroceriesAppContainer";

// function App() {
//   return <>GroceriesAppContainer products ={products}</>;
// }

// export default App;
import React from 'react';
import GroceriesAppContainer from './Components/GroceriesAppContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <GroceriesAppContainer />
    </div>
  );
}

export default App;
