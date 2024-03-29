import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const Community = () => {
    const [communities, setCommunities] = useState([]);
    const [newCommunity, setNewCommunity] = useState({
        name: '',
        description: '',
        avatar: ''
    });

    useEffect(() => {
        fetchCommunities();
    }, []);

    const fetchCommunities = async () => {
        try {
            const res = await fetch('/api/getCommunities');
            const data = await res.json();
            setCommunities(data);
        } catch (error) {
            console.error('Error fetching communities:', error);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setNewCommunity(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch('/api/createCommunity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCommunity)
            });
            if (res.ok) {
                const data = await res.json();
                setCommunities(prevCommunities => [...prevCommunities, data]);
                setNewCommunity({
                    name: '',
                    description: '',
                    avatar: ''
                });
            } else {
                console.error('Error creating community:', res.status);
            }
        } catch (error) {
            console.error('Error creating community:', error);
        }
    };

    return (
        <div>
            <Head>
                <title>Community</title>
                <meta name="description" content="Community page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Communities</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Community Name"
                        value={newCommunity.name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={newCommunity.description}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="avatar"
                        placeholder="Avatar URL"
                        value={newCommunity.avatar}
                        onChange={handleChange}
                    />
                    <button type="submit">Create Community</button>
                </form>
                <ul>
                    {communities.map(community => (
                        <li key={community.id}>
                            <h3>{community.name}</h3>
                            <p>{community.description}</p>
                            <img src={community.avatar} alt={community.name} height={50} width={50} />
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
};

export default Community;
