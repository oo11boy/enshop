
import {  useRoutes } from 'react-router-dom';
import routes from './routes';
import './App.css';
import   { CartContextProvider }  from './Contexts/CartContext';
import { MenumobileContextProvider } from './Contexts/MenumobileContext';
import { AccountContextProvider } from './Contexts/AccountContext';


function App() {
  let router=useRoutes(routes)
  return (
     <CartContextProvider>
      <MenumobileContextProvider>
        <AccountContextProvider>
    <div className="App">

    {router}

    </div> 
    </AccountContextProvider>
    </MenumobileContextProvider>
       </CartContextProvider>
  );
}

export default App;
