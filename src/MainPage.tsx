import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import ListOfNations from "./components/ListOfNations";
import React, {useState} from "react";
import "./assets/style.scss"
import data from "./data.json";


function MainPage() {

    const [dataNations, setDataNations] = useState<Array<any>>(data);
    const [isSearched, setIsSearched] = useState<boolean>(false);
    const [error, setError] = useState({isError: false, message: ""})
    const [isLoading, setIsLoading] = useState(true);
    const [filteredRegion, setFilteredRegion] = useState("");
    const [theme, setTheme] = useState("lightMode");

    const loadCountriesHandler = (countriesArray: [], flag: boolean, isError: boolean, message: string, isLoading: boolean): void => {

        if (!flag && !isError && message === "") {
            setDataNations(data);
            setIsSearched(flag);
            setError({isError, message});
            setIsLoading(isLoading);

        } else if (flag && !isError && message === "") {
            setDataNations(countriesArray);
            setIsSearched(flag);
            setError({isError, message});
            setIsLoading(isLoading);

        } else if (!flag && isError && message !== "") {
            setIsSearched(flag);
            setError({isError, message});
            setIsLoading(isLoading);
        }
    }

    const receiveFilteredRegion = (region: string) => {
        setFilteredRegion(region);
    }

    const onChangeTheme = (theme: string) => {
        setTheme(theme);
    }

    return (
        <div data-theme={theme}>
            <Header theme={onChangeTheme}/>
            <div className="container">
                <div className="mobile-block">
                    <SearchBar onLoadCountries={loadCountriesHandler}/>
                    <Filter filteredRegion={receiveFilteredRegion}/>
                </div>
                <div className="desktop-flex-filters">
                    <SearchBar onLoadCountries={loadCountriesHandler}/>
                    <Filter filteredRegion={receiveFilteredRegion}/>
                </div>
                <ListOfNations dataOfNations={dataNations} flag={isSearched} error={error} loading={isLoading}
                               filteredRegion={filteredRegion}/>
            </div>
        </div>
    )
}

export default MainPage;