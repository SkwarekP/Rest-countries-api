import classes from "./Header.module.scss";

function Header() {

    return (
        <div className={classes.header__container}>
            <h1>Where in the world?</h1>
            <button type="button" className={classes.changeTheme__btn}>Dark Mode</button>
        </div>
    )
}

export default Header;