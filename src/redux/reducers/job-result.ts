import { REDUX } from "../../const/actions";

let data = {
    result: {
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
        items: [],
    },
    filter: {
        jobType: null,
        show_days: false,
        jobTitle: null,
        list_shift: {
            MOR: true,
            AFT: true,
            EVN: true,
        },
        list_day: {
            MON: true,
            TUE: true,
            WED: true,
            THU: true,
            FRI: true,
            SAT: true,
            SUN: true,
        },
        area: JSON.parse(localStorage.getItem('region')),
        jobName: { name: null, id: null },
        major: { name: null, id: null }
    },
    loading: true,
    setFilter: false,
};

export const JobResult = (state = data, action) => {
    switch (action.type) {
        case REDUX.JOB_RESULT.GET_JOB_RESULT:
            return { ...state, result: action.data };
        case REDUX.JOB_RESULT.SET_FILTER_JOB_TYPE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    jobType: action.jobType,
                    show_days: action.show_days
                }
            };
        case REDUX.JOB_RESULT.SET_FILTER_LIST_SHIFT:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    list_shift: action.list_shift
                }
            };
        case REDUX.JOB_RESULT.SET_FILTER_LIST_DAY:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    list_day: action.list_day
                }
            };
        case REDUX.JOB_RESULT.SET_FILTER_AREA:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    area: action.area
                }
            };
        case REDUX.JOB_RESULT.SET_FILTER_JOBNAME:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    jobName: action.jobName
                }
            };
        case REDUX.JOB_RESULT.SET_LOADING_RESULT:
            return {
                ...state,
                loading: action.loading
            };
        case REDUX.JOB_RESULT.SET_FILTER:
            return {
                ...state,
                setFilter: action.setFilter
            };
        case REDUX.JOB_RESULT.SET_FILTER_MAJOR:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    major: action.major
                }
            };
        case REDUX.JOB_RESULT.SET_JOB_TITLE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    jobTitle: action.jobTitle
                }
            };
        default:
            return { ...state };
    }
}
