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
import { FavoriteScreen } from '../components/menu/FavoriteScreen'
import { CalculateTest } from '../components/user/CalculateTest'
import { FavApplicant } from '../components/company/FavApplicant';
import { CompanyProfile } from '../components/company/CompanyProfile';
import { Test } from '../components/test/Test';
import { Getapplication } from '../components/Job/Getapplication';
import { planCompany } from '../components/Plane/planCompany';

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
                            data.imageUrl,
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
                            data.selfRecognition,
                            data.selfEsteem,
                            data.procrastinationControl,
                            data.victimizationControl,
                            data.adaptability,
                            data.observation,
                            data.creativityInnovation,
                            data.entrepreneurshipInitiative,
                            data.improvisation,
                            data.problemSolving,
                            data.emotionalIntelligence,
                            data.rationalIntelligence,
                            data.focus,
                            data.collaboration,
                            data.negotiation,
                            data.selfConfidence,
                            data.frustrationTolerance,
                            data.assertiveCommunication,
                            data.conflictManagement,
                            data.resilience,
                            data.leadership,
                            data.reliability,
                            data.teamWork,
                            data.belongingSense,
                            data.empathy,
                            data.dateTimeTest,

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
            <h1>Espere...</h1>
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
                        isAuthenticated={isLoggedIn}
                        path="/favorite"
                        component={FavoriteScreen}
                    />


                    <PrivateRoute
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

                    <PrivateRoute
                        isAuthenticated={isLoggedIn}
                        path="/test"
                        component={CalculateTest}
                    />

                    <PrivateRoute
                        isAuthenticated={isLoggedIn}
                        path="/applicant"
                        component={FavApplicant}
                    />

                    <PrivateRoute
                        isAuthenticated={isLoggedIn}
                        path="/perfil"
                        component={CompanyProfile}
                    />

                    <PrivateRoute
                        isAuthenticated={isLoggedIn}
                        path="/test-start"
                        component={Test}
                    />

                    <PrivateRoute
                        isAuthenticated={isLoggedIn}
                        path="/getApplication/:uid"
                        component={Getapplication}
                    />

                    <PrivateRoute
                        isAuthenticated={isLoggedIn}
                        path="/plan"
                        component={planCompany}
                    />




                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
