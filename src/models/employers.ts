import { IEmployerDetail } from './employer-detail';

export default interface IEmployers {
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
    items: Array<IEmployerDetail>
}