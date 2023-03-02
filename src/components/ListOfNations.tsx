import data from "../data.json";
import classes from "./ListOfNations.module.scss";
import React from "react";
import {useNavigate} from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";

interface IProps {
    dataOfNations: Array<typeof data>;
    flag: boolean | null;
    error: { isError: boolean, message: string },
    loading: boolean;
    filteredRegion: string;
}


function ListOfNations({dataOfNations, flag, error, loading, filteredRegion}: IProps) {
    const navigate = useNavigate();

    const redirectToDescPage = (event: React.MouseEvent<HTMLDivElement>) => {
        const attr = (event.currentTarget.getAttribute("datatype"));
        navigate(`/country/${attr}`)
    }

    const mapNationsData: JSX.Element[] = dataOfNations.map((item: any) => {
            return (
                <div className={classes.card} key={item.alpha2Code} datatype={item.alpha3Code} onClick={redirectToDescPage}>
                    <div className={classes.card__flag__container}>
                        <img src={item.flags.png} alt={item.flag}/>
                    </div>
                    <div className={classes.card__description}>
                        <h3>{item.name}</h3>
                        <p>Population: {item.population}</p>
                        <p>Region: {item.region}</p>
                        <p>Capital: {item.capital}</p>
                    </div>
                </div>
            )
        }
    )

    const filteredDataByRegion: JSX.Element[] = dataOfNations.map((item: any) => item).filter((item: any) => item.region === filteredRegion).map((item: any) => (
        <div className={classes.card} key={item.alpha2Code} datatype={item.name} onClick={redirectToDescPage}>
            <div className={classes.card__flag__container}>
                <img src={item.flags.png} alt={item.flag}/>
            </div>
            <div className={classes.card__description}>
                <h3>{item.name}</h3>
                <p>Population: {item.population}</p>
                <p>Region: {item.region}</p>
                <p>Capital: {item.capital}</p>
            </div>
        </div>
    ))


    const filteredData: JSX.Element[] = dataOfNations.map((item: any) => (
        <div className={classes.card} key={item.name.common} datatype={item.name.common} onClick={redirectToDescPage}>
            <div className={classes.card__flag__container}>
                <img src={item.flags.png} alt={item.flag}/>
            </div>
            <div className={classes.card__description}>
                <h3>{item.name.common}</h3>
                <p>Population: {item.population}</p>
                <p>Region: {item.region}</p>
                <p>Capital: {item.capital}</p>
            </div>
        </div>
    ))


    return (
        <>
            {loading && <LoadingSpinner/>}
            {!flag && !error.isError && filteredRegion === "" &&
                <div className={classes.desktop__flex__row}>{mapNationsData}</div>}
            {flag && <div className={classes.desktop__flex__row}>{filteredData}</div>}
            {filteredRegion !== "" && !flag && <div className={classes.desktop__flex__row}>{filteredDataByRegion}</div>}
            {(!flag && error.isError && error.message !== "") && <p style={{margin: "2rem"}}>{error.message}</p>}
        </>
    )
}

export default ListOfNations;