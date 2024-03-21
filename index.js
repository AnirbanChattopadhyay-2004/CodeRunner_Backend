import { createPool } from 'mysql2'
import app from 'express'
import 'dotenv/config'
console.log(process.env.dbName)
const pool=createPool({
    host:process.env.dbHost,
    user:process.env.dbUser,
    password:process.env.dbPassword,
    database:process.env.dbName,
}).promise()

// const res1=await pool.query(`CREATE TABLE codes(
//         id INTEGER PRIMARY KEY AUTO_INCREMENT,
//         username VARCHAR(255) NOT NULL,
//         stdinput TEXT NOT NULL, 
//         sourcecode TEXT NOT NULL,
//         language VARCHAR(255) NOT NULL,
//         created TIMESTAMP NOT NULL DEFAULT NOW(),
//         stdoutput VARCHAR(255) NOT NULL,
//         status VARCHAR(255) NOT NULL 
    // )`) 
export async function getAllCodes(){
    try{
    const res2 = await pool.query(`select * from codes`);
    
    
    
    return res2[0];
    }
    catch(err){
        console.log(err)
    }
} 

export async function insertNewCode(username , srcCode , stdinp , lang , stdout,status){
    try{
      await pool.query(`INSERT INTO codes (username , sourceCode , stdinput , language , stdoutput,status) VALUES (? , ? , ? , ? , ?, ?);`, [username , srcCode , stdinp , lang , stdout,status]);
   
    }catch(err){
        return err;
    }
    finally{
        return 1;
    }
}

export async function getCodeById(k){
    try{
    const res1 = await pool.query(`select * from codes where id = ?` , [k]);
    return res1[0];
    }
    catch(err)
    {
        console.log(err)
    }
}
