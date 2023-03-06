import classes from "./Filter.module.scss"
import React from "react";

interface IProps {
    filteredRegion: (region: string) => void;
}

function Filter({filteredRegion}: IProps) {


    const sendFilteredRegion = (event: React.ChangeEvent<HTMLSelectElement>) => {
        filteredRegion(event.currentTarget.value)
    }

    return (
        <div className={classes.selectRegion}>
            <select name="select_region"
                    onChange={sendFilteredRegion}
                    defaultValue="Filter by Region">
                <option disabled value="Filter by Region" style={{display: "none"}}>Filter by Region</option>
                <option value="Africa">Africa</option>
                <option value="Americas">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
        </div>
    )
}

export default Filter;