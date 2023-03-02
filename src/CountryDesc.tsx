import Header from "./components/Header";
import React, {useEffect, useState} from "react";
import classes from "./CountryDesc.module.scss"
import {useNavigate, useParams} from "react-router-dom";
import LoadingSpinner from "./UI/LoadingSpinner";

interface IPropsCountryDesc {
    theme: (theme: string) => void;
}

function CountryDesc({theme}: IPropsCountryDesc) {
    const params = useParams();
    const [data, setData] = useState<null | object | any>(null)
    const [isLoading, setIsLoading] = useState(true);
    const [currency, setCurrency] = useState("");
    const [languages, setLanguages] = useState("");
    const [error, setError] = useState({isError: false, message: ""})
    const [borderCountryRender, setBorderCountryRender] = useState(params.name);
    const navigate = useNavigate();

    useEffect(() => {

        fetch(`https://restcountries.com/v2/alpha/${borderCountryRender}`, {
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
                // const currency = res.map((item: any) => item.currencies)
                const currency = res.currencies.map((item: any) => item)
                // const languages = res.map((item: any) => item.languages);
                const languages = res.languages.map((item: any) => item);
                if (currency !== undefined) {
                    currency.forEach((item: []) => setCurrency(Object.keys(item)[1]));
                }
                if (languages !== undefined) {
                    languages.forEach((item: []) => setLanguages(Object.keys(item)[2]))
                }
                return false;
            })
            .then(res => setIsLoading(res))
            .catch(error => {
                setError({isError: true, message: `something went wrong ${error.message} `})
                setIsLoading(false);
            })

    }, [borderCountryRender])

    const borderCountryHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        setBorderCountryRender(event.currentTarget.innerHTML);
    }


    return (
        <>
            <Header theme={() => {
            }}/>
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
                        <div key={data.name !== undefined ? data.name : ""}
                             className={`${classes.desc__container__content} ${classes.desc__container__content__mobile}`}>
                            <div className={classes.flag__container}>
                                <img src={data.flags.png !== undefined ? data.flags.png : ""} alt=""/>
                            </div>
                            <div className={classes.description}>

                                <div className={classes.description__row}>
                                    <p>Native
                                        Name: <span>{data.nativeName !== undefined ? data.nativeName : ""}</span>
                                    </p>
                                    <p>Population: <span>{data.population !== undefined ? data.population : ""}</span>
                                    </p>
                                    <p>Region: <span>{data.region !== undefined ? data.region : ""}</span></p>
                                    <p>Sub Region: <span>{data.subregion !== undefined ? data.subregion : ""}</span>
                                    </p>
                                    <p>Capital: <span>{data.capital !== undefined ? data.capital : ""}</span>
                                    </p>
                                    <div
                                        className={classes.border__countries__desktop}>
                                        <div className={classes.border__countries__flex}>
                                            <h4>Border Countries</h4>
                                            {data.borders !== undefined ? data.borders.map((item: any) => (
                                                <button key={item} onClick={borderCountryHandler}>{item}</button>
                                            )) : ""}
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.description__row}>
                                    <p className={classes.break__line}>Top Level
                                        Domain: <span>{data.topLevelDomain[0]}</span>
                                    </p>
                                    <p>Currencies: {data.currencies.map((item: any) => <span
                                        key={item[currency]}> {item[currency]}</span>)}
                                    </p>
                                    <p>Languages:{data.languages.map((item: any) => <span
                                        key={item[languages]}> {item[languages]} </span>)}
                                    </p>
                                </div>
                            </div>

                            <div className={classes.border__countries}>
                                <h4>Border Countries</h4>
                                <div className={classes.border__countries__flex}>
                                    {data.borders !== undefined ? data.borders.map((item: any) => (
                                        <button key={item} onClick={borderCountryHandler}>{item} </button>
                                    )) : ""}
                                </div>
                            </div>
                        </div>

                    </div>
            }
        </>
    )
}

export default CountryDesc;