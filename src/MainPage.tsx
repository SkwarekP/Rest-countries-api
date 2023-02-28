import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import ListOfNations from "./components/ListOfNations";
import React from "react";
import "./assets/style.scss"


function MainPage() {

    return (
        <>
            <Header/>
            <div className="container">
                <SearchBar/>
                <Filter/>
                <ListOfNations/>
            </div>
        </>
    )
}

export default MainPage;