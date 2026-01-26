import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.DB_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,
    // 2. Add pool limits for stability
    max: 10,                 // max connections in the pool
    idleTimeoutMillis: 30000, // close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // return an error after 2 seconds if connection fails
});

// Simple check for required fields
if (!pool.options.user || !pool.options.password || !pool.options.database) {
    throw new Error("Missing required database environment variables.");
}

export const dropTables = async (): Promise<void> => {
    try {
        await pool.query('DROP TABLE IF EXISTS Expense;');
        await pool.query('DROP TABLE IF EXISTS Category;');
        console.log("Tables dropped successfully.");
    } catch (error) {
        console.error("Error dropping tables:", error);
        throw error;
    }
}


// function to create category table if it doesn't exist
export const initializeDB = async (): Promise<void> => {
    try {
        const createCategoryTableQuery =`
            CREATE TABLE IF NOT EXISTS Category (
                Id SERIAL PRIMARY KEY,
                Name VARCHAR(255) NOT NULL
            );
        `;
        const createExpenseTableQuery = `
            CREATE TABLE IF NOT EXISTS Expense (
                Id SERIAL PRIMARY KEY,
                Title VARCHAR(255) NOT NULL,
                Amount float NOT NULL,
                Date timestamp default current_timestamp,
                CategoryId int references Category(Id)
            );
        `;

        await pool.query(createCategoryTableQuery);
        console.log("Categories table is ready.");

        await pool.query(createExpenseTableQuery);
        console.log("Expense table is ready.");        
    } catch (error) {
        console.error("Error initializing database:", error);
        throw error;
    }
}

export default pool;