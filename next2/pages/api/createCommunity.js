import sqlite3 from 'sqlite3';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { name, description, avatar } = req.body;
        const newCommunity = {
            name,
            description,
            avatar
        };
        const db = new sqlite3.Database('./public/next2.db');
        db.run(
            'INSERT INTO communities (name, description, avatar) VALUES (?, ?, ?)',
            [name, description, avatar],
            function (err) {
                if (err) {
                    console.error('Error creating community:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    const communityId = this.lastID;
                    db.get(
                        'SELECT * FROM communities WHERE id = ?',
                        [communityId],
                        (err, row) => {
                            if (err) {
                                console.error('Error fetching community:', err);
                                res.status(500).json({ error: 'Internal Server Error' });
                            } else {
                                res.status(201).json(row);
                            }
                        }
                    );
                }
            }
        );
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
