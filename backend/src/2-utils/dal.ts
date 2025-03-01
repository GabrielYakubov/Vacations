import mysql from "mysql2";
import dotenv from "dotenv";
import { Error } from "../4-models/Error";

dotenv.config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const execute = <T>(sql: string, values?: (string | number)[]): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    connection.query(sql, values, (err, result) => {
      if (err) {
        reject(new Error(err.message || "Something went wrong", 500));
      } else {
        resolve(result as T);
      }
    });
  });
};

export default {
  execute,
};
