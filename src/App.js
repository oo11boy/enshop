
import {  useRoutes } from 'react-router-dom';
import routes from './routes';
import './App.css';
import   { CartContextProvider }  from './Contexts/CartContext';


function App() {
  let router=useRoutes(routes)
  return (
     <CartContextProvider>
    <div className="App">

    {router}

    </div> 
       </CartContextProvider>
  );
}

export default App;
