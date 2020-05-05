
export const authUserPassword = '/api/authentication/username-password';
export const resetPassword = '/api/users/password/new';
export const forgotPassword = '/api/users/password/reset/request';


export const appliedJobs = '/api/students/appliedJobs';
export const desiredJobs = '/api/students/desiredJobs';
export const education = '/api/students/educations';
export const exprience = '/api/students/experiences';
export const jobActive = '';
export const fullProfile = '/api/students/profile';
export const PERSON_INFO = '/api/students/personalInfo';
export const DESCRIPTION = '/api/students/description';
export const skillsController = '/api/students/skills';
export const LANGUAGE_SKILL = '/api/students/languageSkills';
export const MAJORS = `/api/majors?schoolID=${process.env.REACT_APP_SCHOOL_ID}`;
export const educationController = '/api/students/educations'
export const experienceController = '/api/students/experiences';
export const isLookingFobJobState = '/api/students/lookingForJob/';
export const AVATAR = '/api/students/avatar';
export const registrasionController = `/api/students/registration?schoolID=${process.env.REACT_APP_SCHOOL_ID}`;
export const APPLY_JOB = '/api/students/jobs/';
export const SAVED_JOB = '/api/students/jobs';
export const JOBS = '/api/students/jobs';
export const notiController = '/api/students/notifications';
export const RATE_EMPLOYER_CONTROLLER = '/api/students/employers';
export const PROFILE_EMPLOYER = '/api/students/employers';


export const EVENT_PRIVATE = {
    QUERY: `/api/students/schools/events/$${process.env.REACT_APP_EVENT_ID}/employers/query`,
    DETAIL: `/api/students/schools/events/${process.env.REACT_APP_EVENT_ID}/employers/{emid}`,
    JOBS: {
        HOME: `/api/students/schools/events/${process.env.REACT_APP_EVENT_ID}/jobs/active/home`,
        ACTIVE: `/api/students/schools/events/${process.env.REACT_APP_EVENT_ID}/jobs/active`,
        SEARCH: `/api/students/schools/events/${process.env.REACT_APP_EVENT_ID}/jobs/search`,
        DETAIL: `/api/students/schools/events/${process.env.REACT_APP_EVENT_ID}/jobs/{jid}/active`
    },
    EMPLOYER: {
        HOME: `/api/students/schools/events/${process.env.REACT_APP_EVENT_ID}/employers/query`,
        DETAIL: `/api/students/schools/events/${process.env.REACT_APP_EVENT_ID}/employers/{emid}`
    },
    BRANCH: `/api/students/schools/events/${process.env.REACT_APP_EVENT_ID}/jobs/branches`,
}