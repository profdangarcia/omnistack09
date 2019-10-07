import React, { useState } from 'react';
//we have yarn add axios to handle api requests in the file bellow
import api from '../../services/api'

//react needs a greater tag around your content, it allows even an empty tag like <></>
export default function Login({ history }) {

    //*we create states to the component to manipulate any data it carries
    //*the blank value is associated to the default value from the input i need (email)
    //*the useState() function will return an array with 2 objects
    //*'email' is the last value of email field, the newest one, and 'setEmail' the function wich 
    //  updates it on every change
    const [email, setEmail] = useState('');

    //this function is associated to te form atribute onSubmit
    async function handleSubmit(event){
        event.preventDefault();
        
        //using the api to the route in the backend with an object containing the email (email : email)
        const response = await api.post('/sessions', { email });
        // const response = await api.post('/session', { email : email });

        const { _id } = response.data;
        console.log(_id);
        //localStorage is a browser database, bellow we create a variable 'user' with the value _id
        localStorage.setItem('user', _id);

        //history comes from the routes and we can use it to redirect to another route
        history.push('/dashboard');
    }
    return(
        <>
        <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para a sua empresa
        </p>
        <form onSubmit = {handleSubmit}>
          <label htmlFor="email">E-MAIL *</label>
          <input 
            id="email"
            type="email"
            placeholder="Seu melhor e-mail"
            value = {email}
            onChange = {event => setEmail(event.target.value)}
          />
          <button className="btn" type="submit">Entrar</button>
        </form>
        </>
    );
}