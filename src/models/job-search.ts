export interface IJobSearchFilter {
    employerID?: string,
    excludedJobIDs?: Array<number>,
    jobGroupIDs?: Array<number>,
    jobNameIDs?:  Array<number>,
    branchIDs?:  Array<number>,
    majorIDs?:  Array<number>,
    jobType?: string,
    shuffle?: boolean,
    startCreatedDate?: number,
    endCreatedDate?: number,
    jobPriorityFilter?: {
      homePriority?: string,
      excludeHomePriority?: boolean,
      searchPriority?: string,
      excludeSearchPriority?: boolean,
      highlight?: string,
      excludeHighlightPriority?: boolean
    },
    jobShiftFilter?: {
      gender?: string ,
      weekDays?: Array<string>,
      dayTimes?: Array<string>
    },
    jobLocationFilter?: {
      regionID?: string,
      lat?: number,
      lon?: number,
      distance?: number
    },
    schoolID?: string,
    schoolIgnored?: boolean,
    schoolEventID?: string
  }