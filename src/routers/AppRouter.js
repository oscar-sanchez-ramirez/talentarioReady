import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { db, firebase } from '../firebase/firebase-config'
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';

// import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { HomeScreen } from '../components/menu/HomeScreen';
import { ProfileScreen } from '../components/menu/ProfileScreen';
import { userNew } from '../actions/user';
import { UpdateDescribe } from '../components/user/UpdateDescribe'
import { CalendarScreen } from '../components/menu/CalendarScreen';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);



    useEffect(() => {

        firebase.auth().onAuthStateChanged((user) => {

            if (user?.uid) {
                dispatch(login(user.uid, user.displayName, user.photoURL, user.email));

                const starCountRef = db.ref('users/' + user.uid);
                starCountRef.on('value', (snapshot) => {
                    const data = snapshot.val();
                    if (data) {

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

                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }



            setChecking(false);

        });

    }, [dispatch, setChecking, setIsLoggedIn])


    if (checking) {
        return (
            <h1>Wait...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}
                    />

                    <PrivateRoute
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/"
                        component={HomeScreen}
                    />

                    <PrivateRoute
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/calendar"
                        component={CalendarScreen}
                    />

                    <PrivateRoute
                        isAuthenticated={isLoggedIn}
                        path="/profile"
                        component={ProfileScreen}
                    />

                    <PrivateRoute
                        isAuthenticated={isLoggedIn}
                        path="/describe"
                        component={UpdateDescribe}
                    />



                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
