import React from 'react';
import UserProfile from '../components/user/UserProfile';

function UserAccount({user}) {
  return (
    <>
        <UserProfile user={user}/>
    </>
  );
}

export default UserAccount;