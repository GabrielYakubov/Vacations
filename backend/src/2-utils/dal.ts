import mysql from 'mysql'
import dotenv from 'dotenv'
import { Error } from '../4-models/Error';

dotenv.config();


const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

const execute = <T>(sql: string, values?:(string | number)[]): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if(err){
                reject(new Error(err.sqlMessage || 'Something went wrong',500))
            }else{
                resolve(result)
            }
        })
    });
}

export default {
    execute
}