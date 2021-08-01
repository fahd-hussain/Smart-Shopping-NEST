import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const ormConfig: MysqlConnectionOptions = {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    type: 'mysql',
    database: process.env.DB_INSTANCE_NAME,
    entities: ['dist/src/**/*.entity.js'],
    synchronize: true,
    // migrations: ['dist/src/db/migrations/*.js'],
    // cli: {
    //     migrationsDir: 'src/db/migrations'
    // }
}

export default ormConfig;