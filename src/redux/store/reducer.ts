import { TopEmployer } from './../reducers/employers';
import { ShortPersonalInfo, FullPersonalInfo } from './../reducers/person-info';
import { EventStatusReducer } from './../reducers/event/status';
import { EventEmployerMoreJob } from './../reducers/event/employer/more-jobs';
import { GetEventJobSave } from './../reducers/event/job/save-job';
import { GetEventJobDetail } from './../reducers/event/job/job-detail';
import { DetailEvent } from './../reducers/event/detail';
import { EventBranch } from './../reducers/event/branch';
import { BannerEmployer} from './../reducers/event/employer';
import { EventHotJobResults, EventJobResults } from '../reducers/event/jobs';


import { Announcements } from './../reducers/announcements';
import { InDayResult } from './../reducers/in-day';
import { Regions } from './../reducers/regions';
import { JobNames } from './../reducers/job-names';
import { combineReducers } from 'redux';
// import Todo from '../reducers/todo';

import { PopupState } from '../reducers/popup';
import { AuthState } from '../reducers/auth';
import { MapState } from '../reducers/map';
import { SideBarState } from '../reducers/side-bar';
import { JobResult } from '../reducers/job-result';
import { GetJobDetail } from '../reducers/job-detail';
import { EmployerDetail } from '../reducers/employer-detail';
import { EmployerMoreJob } from '../reducers/employer-more-job';
import { SimilarJob } from '../reducers/job-similar';
import { GetJobSave } from '../reducers/job-save';
import { GetHistoryApply } from '../reducers/history-apply';
import { Noti } from '../reducers/noti';
import { HotJobResult } from '../reducers/hot-job';
import { AllJobResult } from '../reducers/all-job';

import { HighLightResult } from '../reducers/highlight-job';
import { ChatRoom } from '../reducers/chat-room';
import { MobileState } from './../reducers/change-mobile-state';
import {Majors} from './../reducers/major';
import {FitJob} from './../reducers/fit-job';

let rootReducer = {
  ShortPersonalInfo,
  FullPersonalInfo,
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
  GetHistoryApply,
  SimilarJob,
  AllJobResult,
  /// event

  EventHotJobResults,
  EventJobResults,
  TopEmployer,
  BannerEmployer,
  EventBranch,
  DetailEvent,
  GetEventJobDetail,
  GetEventJobSave,
  EventEmployerMoreJob,
  EventStatusReducer,
  Majors,
  FitJob
};

const myReducer = combineReducers(rootReducer);

// @ts-ignore
export type IAppState = ReturnType<typeof rootReducer>;

export default myReducer;