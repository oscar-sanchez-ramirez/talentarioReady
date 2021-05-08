import React, { useEffect } from 'react'
// import { useFetch } from '../../hooks/useFetch'
import { Sidebar } from './SideBar'
import { db } from '../../firebase/firebase-config';

export const HomeScreen = () => {

    // const state = useFetch(`https://us-central1-talentario-a3d9a.cloudfunctions.net/api/user/t0mH5L55oBgsWa6raawwBNu6U3k2`);
    // console.log(state)

    const handleInputChange = (e) => {
        // console.log(e.target.value)
        const parr = document.querySelectorAll('h5');
        for (const key in parr) {
            if (parr[key].innerHTML === e.target.value) {
                console.log(parr[key].innerHTML)
            }
        }

    }

    const [dataJobs, setData] = useState({data: null, loading: false})
    console.log(dataJobs);

    const jobsData = () => {

        const jobsArray = [];
        const starCountRef = db.ref('jobOffers');
        starCountRef.on('value', (snapshot) => {
            const data = snapshot.val();

            // console.log(data)

            for (const item in data) {
                // console.log(item)


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

                    const positionName = document.createElement('h5');
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

                    jobsArray.push({
                        uidJob: item,
                        companyId: data[item].companyId,
                        imgURL: dataI.imageUrl,
                        nameE: dataI.name,
                        positionName: data[item].positionName,
                        salary: data[item].salary,
                        location: data[item].location,
                    })

                    
                    
                });
                
            }
            
        });
        
        // setData({data: jobsArray, loading:true});
        return starCountRef;

    }

    useEffect(() => {

        jobsData();

    }, [])

    return (
        <div>
            <Sidebar />
            <hr />
            <input
                type='text'
                name="search"
                placeholder="Buscador..."
                onChange={handleInputChange}
                style={{ marginBottom: '20px' }}
            />
            <div>
                <h1>Ofertas de trabajo</h1>
            </div>
            <div id="jobFs"></div>
        </div>
    )
}
