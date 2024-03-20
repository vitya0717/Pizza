import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pizzak from './Pizzak';
import Navbar from './Navbar';
import { PizzaPost } from './PizzaPost';
import { PizzaPut } from './PizzaPut';
import { PizzaSelect } from './PizzaSelect';
import { DeleteConfirmModal } from './DeleteConfirmModal';


function App() {
  const [pizzak, setPizzak] = React.useState([]);
  const [isFetchPending, setFetchPending] = React.useState(true)
  const [selectedPizza, setSelectedPizza] = React.useState({});


  return (
      <BrowserRouter>
        <Navbar pizzak={pizzak} setPizzak={setPizzak} setFetchPending={setFetchPending} isFetchPending={isFetchPending} />
        <Routes>
          <Route path={"/Pizza"} element={<Pizzak pizzak={pizzak} setPizzak={setPizzak} setSelectedPizza={setSelectedPizza} setFetchPending={setFetchPending} isFetchPending={isFetchPending}/>} />
          <Route path={"/ujPizza"} element={<PizzaPost pizzak={pizzak} setPizzak={setPizzak} setFetchPending={setFetchPending}/>} />
          <Route path={"/pizzaFrissit/:id"} element={<PizzaPut selectedPizza={selectedPizza} setSelectedPizza={setSelectedPizza} setFetchPending={setFetchPending} isFetchPending={isFetchPending}/>} />
          <Route path={"/pizza/:id"} element={<PizzaSelect selectedPizza={selectedPizza} setSelectedPizza={setSelectedPizza} />} />
        </Routes>
        <DeleteConfirmModal selectedPizza={selectedPizza} setFetchPending={setFetchPending} />
      </BrowserRouter>
  );
}

export default App;