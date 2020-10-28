import {Pool} from 'mysql2';
import * as mysql2 from 'mysql2';

export const connection: Pool = mysql2.createPool ({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_USER,
  database: process.env.MYSQL_USER,
  host: process.env.MYSQL_USER,
  port: Number(process.env.MYSQL_USER),
  multipleStatements: true,
  namedPlaceholders: true
});

export const promiseConnection = connection.promise();
