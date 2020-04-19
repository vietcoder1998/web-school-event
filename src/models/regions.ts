export interface IRegion {
    id?: string | number;
    name?: string;
}

export interface IRegions {
    pageIndex?: number;
    pageSize?: number;
    totalItems?: number;
    items?: Array<IRegion>;
}