import { CartItems } from './components/CartItems';
import { Controls } from './components/Controls';
import { MenuItems } from './components/MenuItems';
import { Navbar } from './components/Navbar';
import './index.css'


function App() {
  return (
    <div className="main-body">
      <Navbar />
      <Controls />
      <MenuItems />
      <hr />
      <CartItems />
    </div>
  );
}

export default App;
