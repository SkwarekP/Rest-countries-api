import React from 'react';
import "./assets/style.scss"
import {Route, Routes} from "react-router-dom";
import MainPage from "./MainPage";
import CountryDesc from "./CountryDesc";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/country/:name" element={<CountryDesc/>}/>
        </Routes>
    );
}

export default App;
