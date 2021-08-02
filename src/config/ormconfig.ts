import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const ormConfig: MysqlConnectionOptions = {
  host: 'localhost', //process.env.DB_HOST,
  port: 3306, // +process.env.DB_PORT,
  username: 'root', //process.env.DB_USERNAME,
  password: 'password', //process.env.DB_PASSWORD,
  type: 'mysql',
  database: 'ssa', // process.env.DB_INSTANCE_NAME,
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  // migrations: ['dist/src/db/migrations/*.js'],
  // cli: {
  //     migrationsDir: 'src/db/migrations'
  // }
};

export default ormConfig;
