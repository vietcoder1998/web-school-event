export interface Ischools {
    items?: Array<IEducation>
    totalItems?: number;
    pageIndex?: number;
    pageSize?: number;
}

export default interface IEducation {
    id?: string,
    school?: string,
    branchOfLearning?: string,
    startedDate?: number,
    finishedDate?: number,
    description?: string
}