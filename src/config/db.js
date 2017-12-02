
const db = {
    user: process.env.DBUSERNAME,
    host: 'localhost',
    database: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    port: 5432,
};

export default db;