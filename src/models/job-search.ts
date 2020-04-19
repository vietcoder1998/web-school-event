export interface IJobSearchFilter {
    employerID?: string | number,
    excludedJobIDs?: Array<string>,
    jobNameIDs?: Array<number | string>,
    jobType?: 'PARTTIME' | 'FULLTIME' | 'INTERNSHIP',
    shuffle?: boolean,
    jobPriorityFilter?: {
        homePriority?: 'IN_DAY' | 'TOP' | 'HIGHLIGHT',
        excludeHomePriority?: boolean,
        searchPriority?: 'HIGHLIGHT',
        excludeSearchPriority?: boolean,
    },
    jobShiftFilter?: {
        gender?: 'MALE' | 'FEMALE' | 'BOTH',
        weekDays?: Array<string>,
        dayTimes?: Array<string>,
    },
    jobLocationFilter?: {
        regionID?: string | number,
        lat?: number,
        lon?: number,
        distance?: number
    },
    schoolConnected?: boolean
}