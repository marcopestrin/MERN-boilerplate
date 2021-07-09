import React from "react";
import { Typography } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import "./styles.scss";

const MenuAuth = () => {

    const { pathname } = useLocation();

    const isSignUpPage = pathname === "/signUp";
    const isLoginPage = pathname === "/login";
    const isResetPasswordPage = pathname === "/resetPassword";

    return (
        <div className="menuAuth">
            <Typography
                variant="subtitle1"
                gutterBottom
                color="primary"
                className="hypertext"
            >
                <Link
                    to="/signUp"
                    disabled={isSignUpPage}
                >
                    <p className={isSignUpPage ? "active" : ""}>Registra un nuovo account</p>
                </Link>   
            </Typography>
            <Typography
                variant="subtitle1"
                gutterBottom
                color="primary"
                className="hypertext"
            >
                <Link
                    to="/login"
                    disabled={isLoginPage}
                >
                    <p className={isLoginPage ? "active" : ""}>Accedi alla piattaforma</p>
                </Link>   
            </Typography>

            <Typography
                variant="subtitle1"
                gutterBottom
                color="primary"
                className="hypertext"
            >
                <Link
                    to="/resetPassword"
                    disabled={isResetPasswordPage}
                >
                    <p className={isResetPasswordPage ? "active" : ""}>Recupera la password dimenticata</p>    
                </Link>    
            </Typography>
        </div>
    );
}

export default MenuAuth