
import {  useRoutes } from 'react-router-dom';
import routes from './routes';
import './App.css';
import   { CartContextProvider }  from './Contexts/CartContext';
import { MenumobileContextProvider } from './Contexts/MenumobileContext';



function App() {
  let router=useRoutes(routes)
  return (
     <CartContextProvider>
      <MenumobileContextProvider>
    <div className="App">

    {router}

    </div> 
    </MenumobileContextProvider>
       </CartContextProvider>
  );
}

export default App;
