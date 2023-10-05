import { useMemo } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const getUserDetail = JSON.parse(localStorage.getItem('userDetails'));


const redFunction = (state,action)=>{
    if(action.type==='login'){
        return {
            ...action.payload
        }
    }
    else if(action.type==="logout"){
        return{
            ...state,
            isAuthenticated:false
        }
    }
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, dispatch] = useReducer(redFunction, getUserDetail || null);

    const memoizedDispatch = useMemo(() => dispatch, []); // Memoize the dispatch function

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <AuthContext.Provider value={{ userData, dispatch: memoizedDispatch }}>
            {children}
        </AuthContext.Provider>
    );
};




