import sqlite3 from 'sqlite3';

export default function handler(req, res) {
    const db = new sqlite3.Database('./public/next2.db');
    db.all('SELECT * FROM communities', (err, rows) => {
        if (err) {
            console.error('Error fetching communities:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(rows);
        }
    });
    db.close();
}
