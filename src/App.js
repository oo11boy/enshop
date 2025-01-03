
import {  useRoutes } from 'react-router-dom';
import routes from './routes';
import './App.css';
import   { CartContextProvider }  from './Contexts/CartContext';
import { MenumobileContextProvider } from './Contexts/MenumobileContext';

import { BillingContextProvider } from './Contexts/BillingContext';
import { AuthProvider } from './Contexts/AuthContext';


function App() {
  let router=useRoutes(routes)
  return (
    <AuthProvider>

     <CartContextProvider>
      
      <MenumobileContextProvider>
      
            <BillingContextProvider>
    <div className="App">

    {router}

    </div> 
    </BillingContextProvider>
  
  
    </MenumobileContextProvider>
       </CartContextProvider>
       </AuthProvider>
  );
}

export default App;
