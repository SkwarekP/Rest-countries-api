import classes from "./Filter.module.scss"


function Filter() {

    return (
        <div className={classes.selectRegion}>
            <select name="select_region">
                <option disabled selected style={{display: "none"}}>Filter by Region</option>
                <option value="Africa">Africa</option>
                <option value="America">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
        </div>
    )
}

export default Filter;