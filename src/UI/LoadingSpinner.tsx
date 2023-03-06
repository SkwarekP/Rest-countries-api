import classes from "./LoadingSpinner.module.scss";

function LoadingSpinner() {

    return (
        <div className={classes.spinner__container}>
            <div className={classes.spinner__container__spinner}>
            </div>
        </div>
    )
}

export default LoadingSpinner;