export const authUserPassword  = '/api/authentication/username-password';
export const appliedJobs = '/api/students/appliedJobs';
export const desiredJobs = '/api/students/desiredJobs';
export const education = '/api/students/schools';
export const exprience = '/api/students/experiences';
export const jobActive = '';
export const fullProfile = '/api/students/profile';
export const PERSON_INFO = '/api/students/personalInfo';
export const DESCRIPTION = '/api/students/description';
export const skillsController = '/api/students/skills';
export const LANGUAGE_SKILL = '/api/students/languageSkills';
export const educationController= '/api/students/schools'
export const experienceController = '/api/students/experiences';
export const isLookingFobJobState = '/api/students/isLookingForJob/';
export const AVATAR = '/api/students/avatar';
export const registrasionController = '/api/students/registration/email';
export const APPLY_JOB ='/api/students/jobs/';
export const SAVED_JOB = '/api/students/jobs';
// export const JOBS = '/api/students/jobs';
export const notiController = '/api/students/notifications';
export const RATE_EMPLOYER_CONTROLLER = '/api/students/employers';


export const JOBS = {
    EVENT: {
        ACTIVE: '/api/students/schools/events/{eid}/jobs/active',
        HOME: '/api/students/schools/events/{eid}/jobs/active/home',
        SEARCH: '/api/students/schools/events/{eid}/jobs/active/search',
        DETAIL: "/api/students/schools/events/{eid}/jobs/{jid}/active",
    },
    NORMAL: {
        ACTIVE: '/api/students/jobs/active',
        HOME: '/api/students/jobs/active/home',
        SEARCH: '/api/students/jobs/active/search',
        DETAIL: "/api/students/jobs/{id}/active",
    }
}