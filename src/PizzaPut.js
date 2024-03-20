import React from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

export const PizzaPut = ({ setFetchPending, selectedPizza, setSelectedPizza }) => {
  const navigate = useNavigate();
  const param = useParams();

  const [formPendingFetch, setFormPendingFetch] = React.useState(true)

  const [name, setName] = React.useState("")
  const [kepURL, setKepURL] = React.useState("")
  const [glutenCheck, setGlutenCheck] = React.useState("")

  const fetchData = async () => {
    await axios.get(`https://pizza.kando-dev.eu/Pizza/${param.id}`).then(async (response) => {
      await setSelectedPizza(response.data);
      setName(response.data.name);
      setKepURL(response.data.kepURL);
      setGlutenCheck(response.data.isGlutenFree);
    }).finally(() => setFormPendingFetch(false));
  }

  useEffect(() => {
    fetchData();
  }, [formPendingFetch]);

  const Name = (e) => {
    setName(e.target.value)
  }

  const KepURL = (e) => {
    setKepURL(e.target.value)
  }

  const GlutenCheck = (e) => {
    setGlutenCheck(e.target.checked)
  }

  return (
    <div className='container w-25 mt-5'>
      <form onSubmit={async (e) => {
        e.preventDefault();
        e.persist();

        const pizzaNev = e.target.pizzaUpdateNev.value;
        const pizzaKepURL = e.target.pizzaUpdateKepURL.value;
        const glutenCheck = e.target.glutenUpdateCheck.checked;

        const updateData = {
          id: selectedPizza.id,
          name: pizzaNev,
          kepURL: pizzaKepURL,
          isGlutenFree: glutenCheck ? 1 : 0
        }
        console.log(updateData);
        await axios.put(`https://pizza.kando-dev.eu/Pizza/${param.id}`, updateData).then(async () => {
          await setFetchPending(true);
          navigate('/Pizza');
        });

      }}>
        <div className="mb-3">
          <label htmlFor="pizzaUpdateNev" className="form-label">Pizza neve</label>
          <input onChange={Name} type="text" className="form-control" id="pizzaUpdateNev" defaultValue={name} />
        </div>
        <div className="mb-3">
          <label htmlFor="pizzaUpdateKepURL" className="form-label">Kép URL</label>
          <input onChange={KepURL} type="text" className="form-control" id="pizzaUpdateKepURL" defaultValue={kepURL} />
        </div>
        <div className="mb-3 form-check">
          <input onChange={GlutenCheck} type="checkbox" className="form-check-input" id="glutenUpdateCheck" checked={glutenCheck} />
          <label className="form-check-label" htmlFor="glutenUpdateCheck">Glutén mentes</label>
        </div>
        <button type="submit" className="btn btn-success">Mentés</button>
      </form>
    </div>
  )
}
