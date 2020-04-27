import { Announcements } from './../reducers/announcements';
import { InDayResult } from './../reducers/in-day';
import { Regions } from './../reducers/regions';
import { JobNames } from './../reducers/job-names';
import { combineReducers } from 'redux';
// import Todo from '../reducers/todo';
import { PersonalInfo } from '../reducers/person-info';
import { PopupState } from '../reducers/popup';
import { AuthState } from '../reducers/auth';
import { MapState } from '../reducers/map';
import { SideBarState } from '../reducers/side-bar';
import { JobResult } from '../reducers/job-result';
import { GetJobDetail } from '../reducers/job-detail';
import { EmployerDetail } from '../reducers/employer-detail';
import { EmployerMoreJob } from '../reducers/employer-more-job';
import { GetJobSave } from '../reducers/job-save';
import { Noti } from '../reducers/noti';
import { HotJobResult } from '../reducers/hot-job';
import { HighLightResult } from '../reducers/highlight-job';
import { ChatRoom } from '../reducers/chat-room';
import { MobileState } from './../reducers/change-mobile-state';
import { EventTopJobReducer, EventJobReducer } from './../reducers/eventJob';
let rootReducer = {
  PersonalInfo,
  PopupState,
  AuthState,
  MapState,
  SideBarState,
  JobResult,
  GetJobDetail,
  EmployerDetail,
  EmployerMoreJob,
  GetJobSave,
  Noti,
  HotJobResult,
  HighLightResult,
  ChatRoom,
  MobileState,
  JobNames,
  Regions,
  InDayResult,
  Announcements,
  EventJobReducer,
  EventTopJobReducer
};

const myReducer = combineReducers(rootReducer);

// @ts-ignore
export type IAppState = ReturnType<typeof rootReducer>;

export default myReducer;