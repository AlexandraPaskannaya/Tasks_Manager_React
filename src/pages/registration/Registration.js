import {Link} from "react-router-dom";

import "./Registration.scss";

export const RegistrationPage = () => {

    return (
        <>
        
        <form className="form">
                <Link to="/" className="form-backtoSignIn">
                    Вернуться назад
                </Link>

                <h1>Регистрация</h1>

                <span>Имя:</span>
                <input className="form-input" type="text" placeholder="Введите имя"></input>

                <span>Фамилия:</span>
                <input className="form-input" type="text" placeholder="Введите фамилию"></input>
                
                <span>Роль:</span>
                <select name="select-enter" className="form-select-enter" required>

                    <option value="Выберите роль">Выберите роль</option>         
                    <option value="Пользователь">Пользователь</option>
                    <option value="Админ">Админ</option>

                </select>

                <span>Админ:</span>
              
                    <select name="select-admins" className="form-select-admins">

                        <option>Админ</option>
                        <option>Админ 1</option>
                        <option>Админ 2</option>
                        <option>Админ 3</option>
                        
                    </select>
                

                <Link to="/">
                    <button type="submit" className="form-bnt-SignUp">
                        Зарегистрироваться
                    </button>
                </Link>
            </form>       
        </>
    )
}