import Swal from 'sweetalert2';

import { db, firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { startLoading, finishLoading } from './ui';
import { startNewUser, userCleaning, userNew } from './user';



export const startLoginEmailPassword = (email, password, empresa) => {
    return (dispatch) => {

        dispatch(startLoading());
        // console.log(empresa)


        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {

                dispatch(login(user.uid, user.displayName, user.photoURL, user.email));

                const starCountRef = db.ref('users/' + user.uid);
                db.ref('users/' + user.uid).update({
                    isCompany: (empresa === "true") ? true : false,
         
                 });
                starCountRef.on('value', (snapshot) => {
                    const data = snapshot.val();

                   

                    if(data){
                        dispatch(userNew(
                            data.isCompany,
                            data.name,
                            data.fullName,
                            data.birthday,
                            data.age,
                            data.sex,
                            data.phone1,
                            data.phone2,
                            data.rfc,
                            data.nationality,
                            data.state,
                            data.city,
                            data.postalCode,
                            data.country,
                            data.migrationStatus,
                            data.noStudiesNeeded,
                            data.secundaria,
                            data.bachillerato,
                            data.licenciatura,
                            data.licStatus,
                            data.licCareer,
                            data.licIndustry,
                            data.maestria,
                            data.maesDropdown,
                            data.doctorado,
                            data.docDropdown,
                            data.urlVideo,
                            data.urlCurriculum,
                            data.experienceDescription,
                            data.plan,
                            data.position,
                            data.proofAdress,
                            data.socialReason,
                            data.hdaUrl,
                            data.actaConsUrl,
                            data.sitFiscalUrl,
                            data.domFiscUrl,
                            data.ineUrl,
                        ));
                    }

                });

                dispatch(finishLoading());
            })
            .catch(e => {
                console.log(e);
                dispatch(finishLoading());
                Swal.fire('Error', e.message, 'error');
            })


    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    const imgURL = "https://firebasestorage.googleapis.com/v0/b/talentario-a3d9a.appspot.com/o/sprt_defaultImage.png?alt=media&token=51ee6bce-801a-4a20-9862-838bb3903185";
    return (dispatch) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {

                await user.updateProfile({ displayName: name, photoURL: imgURL });

                dispatch(
                    login(user.uid, user.displayName, user.photoURL, user.email)
                );

                dispatch(startNewUser(user.uid, user.displayName));

            })
            .catch(e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            })

    }
}



export const startGoogleLogin = () => {
    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(
                    login(user.uid, user.displayName, user.photoURL, user.email)
                )

                const starCountRef = db.ref('users/' + user.uid);
                starCountRef.on('value', (snapshot) => {
                    const data = snapshot.val();
                    if(data){
                        dispatch(userNew(
                            data.isCompany,
                            data.name,
                            data.fullName,
                            data.birthday,
                            data.age,
                            data.sex,
                            data.phone1,
                            data.phone2,
                            data.rfc,
                            data.nationality,
                            data.state,
                            data.city,
                            data.postalCode,
                            data.country,
                            data.migrationStatus,
                            data.noStudiesNeeded,
                            data.secundaria,
                            data.bachillerato,
                            data.licenciatura,
                            data.licStatus,
                            data.licCareer,
                            data.licIndustry,
                            data.maestria,
                            data.maesDropdown,
                            data.doctorado,
                            data.docDropdown,
                            data.urlVideo,
                            data.urlCurriculum,
                            data.experienceDescription,
                            data.plan,
                            data.position,
                            data.proofAdress,
                            data.socialReason,
                            data.hdaUrl,
                            data.actaConsUrl,
                            data.sitFiscalUrl,
                            data.domFiscUrl,
                            data.ineUrl,
                        ));
                    }


                });
            });

    }
}


export const login = (uid, displayName, photoURL, email) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
        photoURL,
        email
    }
});


export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();

        dispatch(userCleaning());
        dispatch(logout());
    }
}


export const logout = () => ({
    type: types.logout
})


