const pg = require('pg');
let pool;

// DATABASE_URL=postgres://quynhdao:o6iLlF59lpReKZguWdkVU9SAotMcBZ15@dpg-cj22ps407spkp67jj0m0-a/playwme
if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
// When we're running this app on our own computer
// we'll connect to the postgres database that is 
// also running on our computer (localhost)
else {
    pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'playwme',  
    });
}

module.exports = pool;