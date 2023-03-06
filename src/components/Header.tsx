import classes from "./Header.module.scss";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";

interface IPropsHeader {
    theme: (theme: string) => void;
}

function Header({theme}: IPropsHeader) {
    const navigate = useNavigate();

    const [colorTheme, setColorTheme] = useState("lightMode");

    const changeColorTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
        const attr = event.currentTarget.getAttribute("data-theme");
        if (attr === "lightMode") {
            setColorTheme("darkMode")
            theme("darkMode")
        } else {
            setColorTheme("lightMode")
            theme("lightMode");
        }
    }

    return (
        <div className={classes.header__container}>
            <button className={classes.head} onClick={() => navigate("/")}>Where in the world?</button>
            <button type="button" className={classes.changeTheme__btn} data-theme={colorTheme}
                    onClick={changeColorTheme}>{colorTheme === "lightMode" ? "Dark mode" : "Light mode"}</button>
        </div>
    )
}

export default Header;