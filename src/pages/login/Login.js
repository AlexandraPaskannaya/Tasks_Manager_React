import {Link} from "react-router-dom";

import "./Login.scss";

export const LoginPage = () => {

    return (
        <>
            <from className="form">
                    <h1>Вход</h1>
                    <span>Логин:</span>
                    <input className="form-input" type="text" placeholder="Введите логин"></input>

                    <span>Пароль:</span>
                    <input className="form-input" type="password" placeholder="Введите пароль"></input>

                    <Link to = "/tasks">
                        <button className="form-bntSignIn" type="sibmit" value="Войти">Войти</button>
                      
                    </Link>

                    <Link to = "/signUp" className="form-bntSignUp">Зарегистрироваться</Link>
           </from>
        </>
    )
}