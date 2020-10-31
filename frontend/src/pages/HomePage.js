import React from 'react';

import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import ScheduleUI from '../components/ScheduleUI';

const HomePage = () =>
{
    return(
        <div>
            <PageTitle />
            <LoggedInName />
            <ScheduleUI />
        </div>
    );
}

export default HomePage;