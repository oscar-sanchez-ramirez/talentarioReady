import { useEffect, useState } from "react"

export const useFetch = ( url ) => {

    const [state, setState] = useState({ data: null, loading: true });

     useEffect( ()=> {
 
          fetch( url )
            .then( resp => resp.json() )
            .then( data =>  {

                setState({
                    loading: false,
                    data: data
                })

            })

     },[url]);

     return state;
    
}
