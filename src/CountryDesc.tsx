import Header from "./components/Header";
import React, {useEffect, useState} from "react";
import classes from "./CountryDesc.module.scss"
import {useNavigate, useParams} from "react-router-dom";
import LoadingSpinner from "./UI/LoadingSpinner";

function CountryDesc() {
    const params = useParams();
    const [data, setData] = useState<Array<any>>([])
    const [isLoading, setIsLoading] = useState(true);
    const [currency, setCurrency] = useState("");
    const [languages, setLanguages] = useState<Array<string>>([]);
    const [error, setError] = useState({isError: false, message: ""})
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/name/${params.name}`, {
            headers: {
                "Content-Type": "Application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                setData(res)
                return res;
            })
            .then(res => {
                const currency = res.map((item: any) => item.currencies)
                const languages = res.map((item: any) => item.languages);
                if (currency !== undefined) {
                    currency.forEach((item: []) => setCurrency(Object.keys(item)[0]));
                }
                if (languages !== undefined) {
                    languages.forEach((item: []) => setLanguages(Object.keys(item)))
                }
                return false;
            })
            .then(res => setIsLoading(res))
            .catch(error => {
                setError({isError: true, message: `something went wrong `})
                setIsLoading(false);
            })

    }, [])


    return (
        <>
            <Header/>
            {isLoading ? <LoadingSpinner/>
                : error.isError
                    ?
                    <div className={classes.desc__container}>
                        <div className={classes.button__container}>
                            <button type="button" onClick={() => navigate(-1)}>Back</button>
                        </div>
                        <p style={{margin: "2rem", color: "indianred", fontSize: "1.25rem"}}>{error.message} </p>

                    </div>
                    :
                    <div className={classes.desc__container}>
                        <div className={classes.button__container}>
                            <button type="button" onClick={() => navigate(-1)}>Back</button>

                        </div>
                        {data.map(item => (
                            <div key={item.name !== undefined ? item.name : ""}
                                 className={`${classes.desc__container__content} ${classes.desc__container__content__mobile}`}>
                                <div className={classes.flag__container}>
                                    <img src={item.flags.png !== undefined ? item.flags.png : ""} alt=""/>
                                </div>
                                <div className={classes.description}>

                                    <div className={classes.description__row}>
                                        {/*<h3>{item.name.common !== undefined ? item.name.common : ""}</h3>*/}
                                        <p>Native
                                            Name: <span>{item.name.official !== undefined ? item.name.official : ""}</span>
                                        </p>
                                        <p>Population: <span>{item.population !== undefined ? item.population : ""}</span>
                                        </p>
                                        <p>Region: <span>{item.region !== undefined ? item.region : ""}</span></p>
                                        <p>Sub Region: <span>{item.subregion !== undefined ? item.subregion : ""}</span>
                                        </p>
                                        <p>Capital: <span>{item.capital[0] !== undefined ? item.capital[0] : ""}</span>
                                        </p>
                                        <div
                                            className={classes.border__countries__desktop}>
                                            <div className={classes.border__countries__flex}>
                                                <h4>Border Countries</h4>
                                                {item.borders !== undefined ? item.borders.map((item: any) => (
                                                    <button key={item}>{item}</button>
                                                )) : ""}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.description__row}>
                                        <p className={classes.break__line}>Top Level Domain: <span>{item.tld[0]}</span>
                                        </p>
                                        <p>Currencies: <span>{item.currencies[currency] !== undefined ? item.currencies[currency].name : ""}</span>
                                        </p>
                                        <p>Languages:
                                            <span>
                                        {item.languages !== undefined ? item.languages[languages[0]] : ""}
                                    </span>
                                        </p>
                                    </div>
                                </div>

                                <div className={classes.border__countries}>
                                    <h4>Border Countries</h4>
                                    <div className={classes.border__countries__flex}>
                                        {item.borders !== undefined ? item.borders.map((item: any) => (
                                            <button key={item}>{item}</button>
                                        )) : ""}
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
            }
        </>
    )
}

export default CountryDesc;