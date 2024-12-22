
import {Contexto} from "./MyContext";
interface props {
    children: JSX.Element 
}
export const MyContextProvider =({children}:props)=>{
        return <Contexto.Provider value={{}}>

        </Contexto.Provider>
}