import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { db } from '../../firebase/firebase-config'




export const DeleteFav = ({ company, job }) => {

    const { uid } = useSelector(state => state.auth);

    const handleDeleteFav = () => {

        db.ref('users/' + uid + '/favoriteJobs/'+job).remove( 
            (error) => {
            if (error) {
                
            } else {
                console.log('Data saved successfully');
                document.getElementById('favoriteID').click();

            }
        });

    };

    
    return (
        <div>
            <Link to="/favorite" id="favoriteID"></Link>
            <button className="btn btn-danger" onClick={handleDeleteFav}>Borrar</button>
        </div>
    )
}
