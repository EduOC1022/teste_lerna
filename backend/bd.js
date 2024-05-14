const Hapi = require('@hapi/hapi');

export const server = Hapi.server({
    port: 5432,
    host: 'localhost',
    user: 'postgres',
    password: 'STT201209'
})