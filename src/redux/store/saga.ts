import { PersonInfoWatcher } from '../watcher/person-info';
import { all } from 'redux-saga/effects';
import { JobResultWatcher } from '../watcher/job-result';
import { JobDetailWatcher } from '../watcher/job-detail';
import { EmployerWatcher } from '../watcher/employer-detail';
import { EmployerMoreJobWatcher } from '../watcher/employer-more-job';
import { JobSaveWatcher } from '../watcher/job-save';
import { notiInfoWatcher } from '../watcher/noti';
import { HotJobWatcher } from '../watcher/hot-job';
import { HighLightJobWatcher } from '../watcher/highlight-job';
import { JobNameWatcher } from '../watcher/job-names';
import { RegionWatcher } from '../watcher/regions';
import { InDayWatcher } from '../watcher/in-day';
import { AnnouncementsWatcher } from '../watcher/announcements';

export default function* rootSaga() {
    yield all([
        PersonInfoWatcher(),
        JobResultWatcher(),
        JobDetailWatcher(),
        EmployerWatcher(),
        EmployerMoreJobWatcher(),
        JobSaveWatcher(),
        notiInfoWatcher(),
        HotJobWatcher(),
        HighLightJobWatcher(),
        JobNameWatcher(),
        RegionWatcher(),
        InDayWatcher(),
        AnnouncementsWatcher(),
    ])
} 