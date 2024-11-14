import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 4002,
    dbUrl: process.env.DATABASE_URL || '',
    jwtSecret: process.env.JWT_SECRET || 'secret',
};