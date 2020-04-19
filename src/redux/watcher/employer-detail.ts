import { IEmployerDetail } from './../../models/employer-detail';
import { call, takeEvery, put } from 'redux-saga/effects';
import { REDUX_SAGA } from "../../const/actions";
import { EMPLOYER } from '../../services/api/public.api';
import { _requestToServer } from '../../services/exec';
import { PUBLIC_HOST } from '../../environment/development';
import { noInfoHeader } from '../../services/auth';
import { REDUX } from '../../const/actions';
import { GET } from '../../const/method';

function* getEmployerDetailData(action) {
    let res = yield call(getEmployerData, action);
    let data: IEmployerDetail = {
        id: null,
        employerName: null,
        email: null,
        phone: null,
        address: null,
        region: {
            id: null,
            name: null
        },
        lat: null,
        lon: null,
        logoUrl: null,
        coverUrl: null,
        taxCode: null,
        description: null,
        identityCardFrontImageUrl: null,
        identityCardBackImageUrl: null,
        rating: {
            workingEnvironmentRating: null,
            salaryRating: null,
            ratingCount: null
        },
        profileVerified: null,
        createdDate: null
    };

    if (res) {
        data = res.data;
    }

    yield put({ type: REDUX.EMPLOYER_DETAIL.GET_EMPLOYER_DETAIL, data });
};

// get EmployerData
function getEmployerData(action) {
    let res = _requestToServer(
        GET,
        null,
        EMPLOYER + `/${action.id}`,
        PUBLIC_HOST,
        noInfoHeader,
        null,
        false
    )

    return res;
};

export function* EmployerWatcher() {
    yield takeEvery(
        REDUX_SAGA.EMPLOYER_DETAIL.GET_EMPLOYER_DETAIL, getEmployerDetailData
    );
};