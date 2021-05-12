import React from 'react'
// import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';

export const CompanyOffers = () => {

    // const { uid } = useSelector(state => state.auth)
    // const state = useFetch(`https://us-central1-talentario-a3d9a.cloudfunctions.net/api/companyJobOffers/${uid}`);


    const state = useFetch(`https://us-central1-talentario-a3d9a.cloudfunctions.net/api/companyJobOffers/sdDQmkjPYaXba17r5GJrDrg6zUE3`);
    const { data, loading } = state;
    console.log(data)

    return (
        <div>
            <hr />
            <p>Ofertas de la empresa</p>
            <br />
            <p>Ofertas populares</p>
        </div>
    )
}
