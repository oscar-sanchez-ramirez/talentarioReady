import React, { useEffect } from 'react'
// import { useFetch } from '../../hooks/useFetch'
import { Sidebar } from './SideBar'
import { db } from '../../firebase/firebase-config';

export const HomeScreen = () => {

    // const state = useFetch(`https://us-central1-talentario-a3d9a.cloudfunctions.net/api/user/t0mH5L55oBgsWa6raawwBNu6U3k2`,
    //     {
    //         mode: 'cors',
    //         headers: {
    //         	'Access-Control-Allow-Origin': '*',
    //     	}
    //     });
    // console.log(state)

    const jobsData = () => {

        const starCountRef = db.ref('jobOffers');
        starCountRef.on('value', (snapshot) => {
            const data = snapshot.val();

            // console.log(data)

            for (const item in data) {

                const list = document.querySelector('#jobFs');

                const starCountRef = db.ref('users/' + data[item].companyId);
                starCountRef.on('value', (snapshot) => {
                    const dataI = snapshot.val();
                    // console.log(dataI)

                    const imageUrl = document.createElement('img');
                    const imageUrlItem = dataI.imageUrl;
                    imageUrl.style.width = '50px'
                    imageUrl.src = imageUrlItem;
                    list.append(imageUrl);

                    const name = document.createElement('p');
                    const nameItem = dataI.name;
                    name.innerHTML = nameItem;
                    list.append(name);

                    const positionName = document.createElement('p');
                    const positionNameItem = data[item].positionName;
                    positionName.innerHTML = positionNameItem;
                    list.append(positionName);

                    const salary = document.createElement('p');
                    const salaryItem = data[item].salary;
                    salary.innerHTML = salaryItem;
                    list.append(salary);

                    const location = document.createElement('p');
                    const locationItem = data[item].location;
                    location.innerHTML = locationItem;
                    list.append(location);

                    const linea = document.createElement('hr');
                    list.append(linea);


                });

            }

        });

        return starCountRef;

    }

    useEffect(() => {

        jobsData();

    }, [])



    return (
        <>
            <Sidebar />
            <hr />
            <div>
                <h1>Ofertas de trabajo</h1>
            </div>
            <div id="jobFs"></div>
        </>
    )
}
