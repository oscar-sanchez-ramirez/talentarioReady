import { db } from "../firebase/firebase-config";
import { types } from '../types/types';



export const startNewUser = (uid, name) => {
    return async (dispatch) => {


        const newUser = {
            isCompany: true,
            name: `${name}`,
            fullName: "test OSR",
            birthday: "test",
            age: "test",
            sex: 1,
            phone1: "test",
            phone2: "test",
            rfc: "test",
            nationality: 2,
            state: 2,
            city: "test",
            postalCode: "test",
            country: 0,
            migrationStatus: 0,
            noStudiesNeeded: true,
            secundaria: true,
            bachillerato: true,
            licenciatura: true,
            licStatus: 2,
            licCareer: "",
            licIndustry: 2,
            maestria: true,
            maesDropdown: 2,
            doctorado: true,
            docDropdown: 2,
            urlVideo: "test",
            urlCurriculum: "test",
            experienceDescription: "test",
            plan: 2,
            position: "test",
            proofAdress: "test",
            socialReason: "test",
            hdaUrl: "test",
            actaConsUrl: "O.S.R rules",
            sitFiscalUrl: "test",
            domFiscUrl: "test",
            ineUrl: "test"
        };

        await db.ref('users/' + uid).set(newUser);

        dispatch(userNew(
            newUser.isCompany,
            newUser.name,
            newUser.fullName,
            newUser.birthday,
            newUser.age,
            newUser.sex,
            newUser.phone1,
            newUser.phone2,
            newUser.rfc,
            newUser.nationality,
            newUser.state,
            newUser.city,
            newUser.postalCode,
            newUser.country,
            newUser.migrationStatus,
            newUser.noStudiesNeeded,
            newUser.secundaria,
            newUser.bachillerato,
            newUser.licenciatura,
            newUser.licStatus,
            newUser.licCareer,
            newUser.licIndustry,
            newUser.maestria,
            newUser.maesDropdown,
            newUser.doctorado,
            newUser.docDropdown,
            newUser.urlVideo,
            newUser.urlCurriculum,
            newUser.experienceDescription,
            newUser.plan,
            newUser.position,
            newUser.proofAdress,
            newUser.socialReason,
            newUser.hdaUrl,
            newUser.actaConsUrl,
            newUser.sitFiscalUrl,
            newUser.domFiscUrl,
            newUser.ineUrl,
        ));


    }
}


export const userNew = (
    isCompany,
    name,
    fullName,
    birthday,
    age,
    sex,
    phone1,
    phone2,
    rfc,
    nationality,
    state,
    city,
    postalCode,
    country,
    migrationStatus,
    noStudiesNeeded,
    secundaria,
    bachillerato,
    licenciatura,
    licStatus,
    licCareer,
    licIndustry,
    maestria,
    maesDropdown,
    doctorado,
    docDropdown,
    urlVideo,
    urlCurriculum,
    experienceDescription,
    plan,
    position,
    proofAdress,
    socialReason,
    hdaUrl,
    actaConsUrl,
    sitFiscalUrl,
    domFiscUrl,
    ineUrl,
) => ({
    type: types.userNew,
    payload: {
        isCompany,
        name,
        fullName,
        birthday,
        age,
        sex,
        phone1,
        phone2,
        rfc,
        nationality,
        state,
        city,
        postalCode,
        country,
        migrationStatus,
        noStudiesNeeded,
        secundaria,
        bachillerato,
        licenciatura,
        licStatus,
        licCareer,
        licIndustry,
        maestria,
        maesDropdown,
        doctorado,
        docDropdown,
        urlVideo,
        urlCurriculum,
        experienceDescription,
        plan,
        position,
        proofAdress,
        socialReason,
        hdaUrl,
        actaConsUrl,
        sitFiscalUrl,
        domFiscUrl,
        ineUrl,
    }
});

export const userCleaning = () => ({
    type: types.userCleaning
})