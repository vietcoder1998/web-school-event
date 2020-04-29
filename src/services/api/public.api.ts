export const LANGUAGES = "/api/languages?sortBy=name&sortType=asc";
export const SKILLS = "/api/skills";
export const LIST_JOB_NAMES = "/api/jobNames/active";
export const LIST_REGIONS = "/api/regions/active";
export const FIND_JOB = "/api/jobs/active";
export const JOB = "/api/jobs";
export const EMPLOYER = "/api/employers";
export const ANNOUNCEMENTS = '/api/announcements'
export const oauth2 = "/api/users/emailVerification/request";

export const EVENT_PUBLIC = {
    JOBS: {
        HOME: `/api/schools/${process.env.REACT_APP_SCHOOL_ID}/events/${process.env.REACT_APP_EVENT_ID}/jobs/active/home`,
       
    }
}