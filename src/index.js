import React from 'react';
import ReactDOM from 'react-dom';
import {firebase} from './firebase';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
const App = (props)=>{
    return(
        <BrowserRouter>
            <Routes {...props}/>
        </BrowserRouter>
    )
}
firebase.auth().onAuthStateChanged((user)=>{
    ReactDOM.render(<App user={user}/>,document.querySelector('#root'));
})
// 13th