import classes from "./SearchBar.module.scss"
import searchIcon from "../assets/images/icons8-search.svg"
import React, {useEffect, useRef, useState} from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

interface IProps {
    onLoadCountries: (arr: [], flag: boolean, isError: boolean, message: string, isLoading: boolean) => void;
}

function SearchBar({onLoadCountries}: IProps) {


    const [fillArray, setFillArray] = useState("")
    const inputRef = useRef<null | HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const inputValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFillArray(event.target.value)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            console.time("generate");
            if (fillArray === inputRef.current?.value && inputRef.current.value !== "") {
                setIsLoading(true);
                fetch(`https://restcountries.com/v3.1/name/${fillArray}`, {
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    method: "GET"
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 404) {
                            onLoadCountries([], false, true, "No countries matched.", false)
                        } else {
                            onLoadCountries(res, true, false, "", false)
                        }
                        return res;
                    })
                    .then(() => setIsLoading(false))
                    .catch((error) => console.log(error))

            } else if (inputRef.current?.value === "") {
                setIsLoading(false);
                onLoadCountries([], false, false, "", false)
            }
        }, 500);
        console.timeEnd("generate")
        return () => {
            clearTimeout(timer);
        }
        //eslint-disable-next-line
    }, [fillArray, inputRef])

    return (
        <div className={classes.searchBar}>
            <img src={searchIcon} alt="icon"/>
            <input type="text" placeholder="Search for a country..."
                   value={fillArray}
                   ref={inputRef}
                   onChange={inputValueHandler}
            />
            {isLoading && <LoadingSpinner/>}
        </div>
    )
}

export default SearchBar;