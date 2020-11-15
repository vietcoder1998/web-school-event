export interface IJobDetail {
    id?: string,
    jobName?: {
        id?: number,
        name?: string,
        jobGroup?: {
            id?: number,
            name?: string,
            priority?: number
        }
    },
    jobTitle?: string,
    address?: string,
    region?: {
        id?: number,
        name?: string
    },
    lat?: number,
    lon?: number,
    distance?: number,
    employerBranchID?: string,
    employerBranchName?: string,
    employerID?: string,
    employerName?: string,
    employerLogoUrl?: string,
    employerCoverUrl?: string,
    employerVerified?: boolean,
    createdDate?: number,
    description?: string,
    shifts?: Array<{
        id?: string,
        startTime?: string,
        endTime?: string,
        minSalary?: number,
        maxSalary?: number,
        unit?: string,
        mon?: boolean,
        tue?: boolean,
        wed?: boolean,
        thu?: boolean,
        fri?: boolean,
        sat?: boolean,
        sun?: boolean,
        genderRequireds?: Array<{
            id?: string,
            gender?: string,
            quantity?: number,
            applied?: number
        }>
    }>,
    expirationDate?: number,
    requiredSkills?: Array<{
        id?: number,
        name?: string
    }>,
    timeLeft?: string,
    priority?: any,
    jobType?: 'FULLTIME' | 'PARTTIME' | 'INTERNSHIP',
    applyState?: 'PENDING' | 'ACCEPTED' | 'REJECTED',
    offerState?: 'PENDING' | 'ACCEPTED' | 'REJECTED', 
    saved?: boolean,
    schoolIgnored?: boolean,
    schoolConnected?: boolean,
    maxSalary?: number
    minSalary?: number
    finishedDate?: number
    minSalaryUnit?: string
    maxSalaryUnit?: string
}