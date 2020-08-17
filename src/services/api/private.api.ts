
export const authUserPassword = '/api/authentication/username-password';
export const resetPassword = '/api/users/password/new';
export const forgotPassword = '/api/users/password/reset/request';


export const appliedJobs = '/api/students/appliedJobs';
export const desiredJobs = '/api/students/desiredJobs';
export const exprience = '/api/students/experiences';
export const jobActive = '';
export const FULL_PROFILE = '/api/students/profile';
export const SHORT_PROFILE = '/api/students/headerProfile';
export const PERSON_INFO_P = '/api/students/personalInfo';
export const DESCRIPTION_P = '/api/students/description';
export const SKILLS_P = '/api/students/skills';
export const TOOLS_P = '/api/students/workingTool';
export const LANGUAGE_SKILL = '/api/students/languageSkills';
export const EDUCATIONS = '/api/students/educations';
export const EXPERIENCES = '/api/students/experiences';
export const isLookingFobJobState = '/api/students/lookingForJob/';
export const AVATAR = '/api/students/avatar';
export const APPLY_JOB = '/api/students/jobs/';
export const SAVED_JOB = '/api/students/jobs';
export const JOBS = '/api/students/jobs';
export const notiController = '/api/students/notifications';
export const RATE_EMPLOYER_CONTROLLER = '/api/students/employers';
export const PROFILE_EMPLOYER = '/api/students/employers';
export const SCHOOLS = `/api/schools/query`;

export const EVENT_PRIVATE = {
    // QUERY: `/api/students/schools/events/$${process.env.REACT_APP_EVENT_ID}/employers/query`,
    // DETAIL: `/api/students/schools/events/${process.env.REACT_APP_EVENT_ID}/employers/{emid}`,
    JOBS: {
        // HOME: `/api/students/schools/events/${process.env.REACT_APP_EVENT_ID}/jobs/active/home`,
        // ACTIVE: `/api/students/schools/events/${process.env.REACT_APP_EVENT_ID}/jobs/active`,
        // SEARCH: `/api/students/schools/events/${process.env.REACT_APP_EVENT_ID}/jobs/active/search`,
        // DETAIL: `/api/students/schools/events/${process.env.REACT_APP_EVENT_ID}/jobs/{jid}/active`
    },
    EMPLOYER: {
        // HOME: `/api/students/schools/events/${process.env.REACT_APP_EVENT_ID}/employers/query`,
        // DETAIL: `/api/students/schools/events/${process.env.REACT_APP_EVENT_ID}/employers/{emid}`
    },
    BRANCH: `/api/students/schools/events/${process.env.REACT_APP_EVENT_ID}/jobs/branches`,
}
export const ANNOUNCEMENTS_PRIVATE = {
    ADD_COMMENT: `/api/students/announcements/{id}/comments`,
    DELETE_COMMENT: `/api/students/announcements/{id}/comments`
  };
  
export const NORMAL_PRIVATE = {
    JOBS: {
        HOME: `/api/students/jobs/active/home`,
        ACTIVE: `/api/students/jobs/active`,
        SEARCH: `/api/students/jobs/active/search`,
        DETAIL: `/api/students/jobs/{id}/active`
    },
}

export const UPCVSTUDENT = '/api/students/curriculumVitae'