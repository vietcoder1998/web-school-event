
import { PersonInfoWatcher } from '../watcher/person-info';
import { all } from 'redux-saga/effects';
import { JobResultWatcher } from '../watcher/job-result';
import { JobDetailWatcher } from '../watcher/job-detail';
import { EmployerWatcher } from '../watcher/employer-detail';
import { EmployerMoreJobWatcher } from '../watcher/employer-more-job';
import { SimilarJobWatcher } from '../watcher/job-similar';
import { JobSaveWatcher } from '../watcher/job-save';
import { HistoryApplyWatcher } from '../watcher/history-apply';

import { notiInfoWatcher } from '../watcher/noti';
import { HotJobWatcher } from '../watcher/hot-job';
import { AllJobWatcher } from '../watcher/all-job';

import { HighLightJobWatcher } from '../watcher/highlight-job';
import { JobNameWatcher } from '../watcher/job-names';
import { RegionWatcher } from '../watcher/regions';
import { InDayWatcher } from '../watcher/in-day';
import { AnnouncementsWatcher } from '../watcher/announcements';
import { EventHotJobWatcher, EventJobWatcher } from '../watcher/event/jobs';
import { EventTopEmployerWatcher, EventBannerEmployerWatcher } from '../watcher/event/employer';
import { EventDetail } from '../watcher/event/detail';
import { EventJobDetailWatcher } from '../watcher/event/jobs/job-detail';
import { EventEmployerMoreJobWatcher } from '../watcher/event/employer/em-more-jobs';
import { ShortProfileWatcher } from '../watcher/short-profile';
import { EventJobResultWatcher } from '../watcher/event/search';
import { TopEmployersWatcher} from'../watcher/top-employer';
import { MajorsWatcher} from '../watcher/majors';


export default function* rootSaga() {
    yield all([
        PersonInfoWatcher(),
        ShortProfileWatcher(),
        JobResultWatcher(),
        JobDetailWatcher(),
        EmployerWatcher(),
        EmployerMoreJobWatcher(),
        JobSaveWatcher(),
        notiInfoWatcher(),
        HotJobWatcher(),
        AllJobWatcher(),
        HighLightJobWatcher(),
        JobNameWatcher(),
        RegionWatcher(),
        InDayWatcher(),
        AnnouncementsWatcher(),
        HistoryApplyWatcher(),
        SimilarJobWatcher(),
        EventHotJobWatcher(),
        EventJobWatcher(),
        EventTopEmployerWatcher(),
        EventBannerEmployerWatcher(),
        EventDetail(),
        EventJobDetailWatcher(),
        EventEmployerMoreJobWatcher(),
        EventJobResultWatcher(),
        TopEmployersWatcher(),
        MajorsWatcher()
    ])
} 