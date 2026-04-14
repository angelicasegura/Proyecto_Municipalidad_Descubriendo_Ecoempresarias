import type {NavigateFunction} from "react-router-dom";
export function handleLogout(navigate: NavigateFunction) {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");

}
