import pg from 'pg'

export const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    password: "12345678",
    database: "Center_Civic",
    port: "5432"
})