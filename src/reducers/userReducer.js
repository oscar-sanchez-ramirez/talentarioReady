import { types } from '../types/types';

/*
{
    "isCompany": true,
    "name": "test",
    "fullName": "test OSR",
    "birthday": "test",
    "age": "test",
    "sex": 1,
    "phone1": "test",
    "phone2": "test",
    "rfc": "test",
    "nationality": 2,
    "state": 2,
    "city": "test",
    "postalCode": "test",
    "country": 0,
    "migrationStatus": 0,
    "noStudiesNeeded": true,
    "secundaria": true,
    "bachillerato": true,
    "licenciatura": true,
    "licStatus": 2,
    "licCareer":"",
    "licIndustry": 2,
    "maestria": true,
    "maesDropdown": 2,
    "doctorado": true,
    "docDropdown": 2,
    "urlVideo": "test",
    "urlCurriculum": "test",
    "experienceDescription": "test",
    "plan": 2,
    "position": "test",
    "proofAdress": "test",
    "socialReason": "test",
    "hdaUrl": "test",
    "actaConsUrl": "Fede rules",
    "sitFiscalUrl": "test",
    "domFiscUrl": "test",
    "ineUrl": "test"
    }
    */

const initialState = {};



export const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.userNew:
            return {
                isCompany: action.payload.isCompany,
                name: action.payload.name,
                fullName: action.payload.fullName,
                birthday: action.payload.birthday,
                age: action.payload.age,
                sex: action.payload.sex,
                phone1: action.payload.phone1,
                phone2: action.payload.phone2,
                rfc: action.payload.rfc,
                nationality: action.payload.nationality,
                state: action.payload.state,
                city: action.payload.city,
                postalCode: action.payload.postalCode,
                country: action.payload.country,
                migrationStatus: action.payload.migrationStatus,
                noStudiesNeeded: action.payload.noStudiesNeeded,
                secundaria: action.payload.secundaria,
                bachillerato: action.payload.bachillerato,
                licenciatura: action.payload.licenciatura,
                licStatus: action.payload.licStatus,
                licCareer: action.payload.licCareer,
                licIndustry: action.payload.licIndustry,
                maestria: action.payload.maestria,
                maesDropdown: action.payload.maesDropdown,
                doctorado: action.payload.doctorado,
                docDropdown: action.payload.docDropdown,
                urlVideo: action.payload.urlVideo,
                urlCurriculum: action.payload.urlCurriculum,
                experienceDescription: action.payload.experienceDescription,
                plan: action.payload.plan,
                position: action.payload.position,
                proofAdress: action.payload.proofAdress,
                socialReason: action.payload.socialReason,
                hdaUrl: action.payload.hdaUrl,
                actaConsUrl: action.payload.actaConsUrl,
                sitFiscalUrl: action.payload.sitFiscalUrl,
                domFiscUrl: action.payload.domFiscUrl,
                ineUrl: action.payload.ineUrl,
            }

        case types.userCleaning:
            return {}

        default:
            return state;
    }

}