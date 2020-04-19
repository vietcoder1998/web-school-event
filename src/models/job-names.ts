export interface IJobName {
    id?: string | number;
    name?: string;
}

export interface IJobNames {
    pageIndex?: number;
    pageSize?: number;
    totalItems?: number;
    items?: Array<IJobName>;
}