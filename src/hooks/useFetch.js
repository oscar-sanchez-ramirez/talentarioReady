import { useEffect, useRef, useState } from "react"

export const useFetch = (url) => {

    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {

        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {

        fetch(url)
            .then( resp => resp.json())
            .then(data => {

                if (isMounted.current) {

                    setState({
                        loading: false,
                        data: data,
                        error: null
                    })

                }

            }).catch( reject => {

                setState({
                    loading: false,
                    data: null,
                    error: reject
                })

            })

    }, [url]);

    return state;

}
