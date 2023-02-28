import data from "../data.json";
import classes from "./ListOfNations.module.scss";
import React from "react";
import {useNavigate} from "react-router-dom";

const dataOfNations = data.map(item => item);


function ListOfNations() {
    const navigate = useNavigate();

    const redirectToDescPage = (event: React.MouseEvent<HTMLDivElement>) => {
        const attr = (event.currentTarget.getAttribute("datatype"));
        navigate(`/country/${attr}`)
    }

    const mapNationsData: JSX.Element[] = dataOfNations.map(item => (
        <div className={classes.card} key={item.alpha2Code} datatype={item.name} onClick={redirectToDescPage}>
            <div className={classes.card__flag__container}>
                <img src={item.flag} alt={item.flag}/>
            </div>
            <div className={classes.card__description}>
                <h3>{item.name}</h3>
                <p>Population: {item.population}</p>
                <p>Region: {item.region}</p>
                <p>Capital: {item.capital}</p>
            </div>
        </div>
    ))


    return (
        <>
            {mapNationsData}
        </>
    )
}

export default ListOfNations;