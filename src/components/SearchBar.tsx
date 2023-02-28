import classes from "./SearchBar.module.scss"
import searchIcon from "../assets/images/icons8-search.svg"

function SearchBar() {

    return (
        <div className={classes.searchBar}>
            <img src={searchIcon} alt="icon"/>
            <input type="text" placeholder="Search for a country..."/>
        </div>
    )
}

export default SearchBar;