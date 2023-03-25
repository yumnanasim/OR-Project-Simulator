import { useContext } from 'react';
import { AppContext } from '../context/AppContext.js';

const useApp = ()=>{
    return useContext(AppContext);
}

export default useApp;