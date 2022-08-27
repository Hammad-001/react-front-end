import { useContext } from "react";
import AuthContext from "../User/UserAuth";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;