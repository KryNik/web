import React from 'react';

const UserCommunitiesPage = ({ user, userCommunities }) => {
    return (
        <div>
            <h1>Communities of {user}</h1>
            <ul>
                {userCommunities.map((community, index) => (
                    <li key={index}>
                        <strong>{community.name}</strong>: {community.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserCommunitiesPage;
