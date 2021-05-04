import { useEffect, useRef, useState } from "react"

export const useFetchOut = (url) => {

    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true });

    useEffect(() => {

        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {

        fetch(url)
            .then(resp => resp.json())
            .then(data => {

                if (isMounted.current) {

                    setState({
                        loading: false,
                        data: data
                    })

                }

            })

    }, [url]);

    return state;

}
