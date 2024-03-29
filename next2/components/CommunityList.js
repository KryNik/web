import React from 'react';

export default function CommunityList({ communities }) {
    return (
        <div>
            <h2>My Communities</h2>
            <ul>
                {communities.map((community, index) => (
                    <li key={index}>
                        <strong>{community.name}</strong> - {community.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}
