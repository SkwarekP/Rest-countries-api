import Header from "./components/Header";
import React, {useEffect, useState} from "react";
import classes from "./CountryDesc.module.scss"
import {useNavigate, useParams} from "react-router-dom";

function CountryDesc() {
    const params = useParams();
    const [data, setData] = useState<Array<any>>([])
    const [currency, setCurrency] = useState("");
    const [languages, setLanguages] = useState<Array<string>>([]);
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
                currency.forEach((item: []) => setCurrency(Object.keys(item)[0]));
                res.map((item: []) => console.log(item));

                res.map((item: any) => console.log(item.languages))
                const languages = res.map((item: any) => item.languages);
                languages.forEach((item: []) => setLanguages(Object.keys(item)))
                return res;
            })


    }, [])

    return (
        <>
            <Header/>
            <div className={classes.desc__container}>
                <div className={classes.button__container}>
                    <button type="button" onClick={() => navigate(-1)}>Back</button>
                </div>
                {data.map(item => (
                    <div key={item.name}>
                        <div className={classes.flag__container}>
                            <img src={item.flags.png} alt=""/>
                        </div>
                        <div className={classes.description}>
                            <h3>{item.name.common}</h3>
                            <p>Native Name: <span>{item.name.official}</span></p>
                            <p>Population: <span>{item.population}</span></p>
                            <p>Region: <span>{item.region}</span></p>
                            <p>Sub Region: <span>{item.subregion}</span></p>
                            <p>Capital: <span>{item.capital[0]}</span></p>

                            <p>Top Level Domain: <span>{item.tld[0]}</span></p>
                            <p>Currencies: <span>{item.currencies[currency].name}</span></p>
                            <p>Languages:
                                <span>{item.languages[languages[0]]}</span>
                            </p>
                        </div>

                        <div className={classes.border__countries}>
                            <h4>Border Countries</h4>
                            <div className={classes.border__countries__flex}>
                                <button>France</button>
                                <button>Germany</button>
                                <button>Netherlands</button>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </>
    )
}

export default CountryDesc;