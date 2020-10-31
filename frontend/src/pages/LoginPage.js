import React from 'react';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import CreateUser from '../components/CreateUser';

const LoginPage = () =>
{
    return(
        <div>
            <PageTitle />
            <Login />
            <CreateUser />
        </div>
    );
};

export default LoginPage;