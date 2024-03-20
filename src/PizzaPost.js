import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';

export const PizzaPost = ({setFetchPending}) => {
    const navigate = useNavigate();
    return (
        <div className='container w-25 mt-5'>
            <form onSubmit={async (e) => {
                e.preventDefault();
                e.persist();

                const pizzaNev = e.target.pizzaNev.value
                const pizzaKepURL = e.target.pizzaKepURL.value
                const glutenCheck = e.target.glutenCheck.checked

                const postData = {
                    id: 0,
                    name: pizzaNev,
                    kepURL: pizzaKepURL,
                    isGlutenFree: glutenCheck ? 1 : 0
                }
                await axios.post('https://pizza.kando-dev.eu/Pizza', postData).then(async () => {
                    await setFetchPending(true);
                    navigate('/Pizza');
                });

            }}>
                <div className="mb-3">
                    <label htmlFor="pizzaNev" className="form-label">Pizza neve</label>
                    <input type="text" className="form-control" id="pizzaNev" />
                </div>
                <div className="mb-3">
                    <label htmlFor="pizzaKepURL" className="form-label">Kép URL</label>
                    <input type="text" className="form-control" id="pizzaKepURL" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="glutenCheck" />
                    <label className="form-check-label" htmlFor="glutenCheck">Glutén mentes</label>
                </div>
                <button type="submit" className="btn btn-success">Mentés</button>
            </form>
        </div>
    )
}
