
import {  useRoutes } from 'react-router-dom';
import routes from './routes';
import './App.css';
import   { CartContextProvider }  from './Contexts/CartContext';
import { MenumobileContextProvider } from './Contexts/MenumobileContext';
import { AccountContextProvider } from './Contexts/AccountContext';
import { CategoryContextProvider } from './Contexts/CategoryContext';


function App() {
  let router=useRoutes(routes)
  return (
     <CartContextProvider>
      <MenumobileContextProvider>
        <AccountContextProvider>
          <CategoryContextProvider>
    <div className="App">

    {router}

    </div> 
    </CategoryContextProvider>
    </AccountContextProvider>
    </MenumobileContextProvider>
       </CartContextProvider>
  );
}

export default App;
