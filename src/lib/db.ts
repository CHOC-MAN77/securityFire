import postgres from 'postgres';

const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_PRISMA_URL;

if (!connectionString) {
  throw new Error('Database connection string not found');
}

const sql = postgres(connectionString);

export default sql;
