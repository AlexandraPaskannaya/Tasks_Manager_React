import "./Users.scss";

export const UsersPage = () => {
    return (
        <>
            <form className="form">
            <h1>Пользователи</h1>
            <form className="form-search">
            <input className="form-search-admins" placeholder="Искать здесь..." type="search"></input>
            <button className="form-search-admins-btn" type="submit">Поиск</button>
            </form>
        </form>
        </>
    )    
}