/* eslint-disable no-console */
import mysql from "mysql2";
import fs from "fs";
import { Client } from "ssh2";
import dotEnv from "dotenv";
dotEnv.config();

if (process.env.DB_SSH_KEY) {
    const conn = new Client();
    conn.on("ready", () => {
        console.log("connection ready");
        if (process.env.DB_HOST) {
            conn.forwardOut("127.0.0.1", Number(process.env.DB_PORT), process.env.DB_HOST, Number(process.env.DB_PORT), (err, stream) => {
                const mysqlConnection = mysql.createConnection({
                    host: process.env.DB_HOST,
                    port: Number(process.env.DB_PORT),
                    database: process.env.DB_DATABASE,
                    user: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    stream,
                });
                mysqlConnection.connect((err) => {
                    if (err) {
                        console.log("connecton filed");
                        console.log(err);
                    } else {
                        console.log("connecton success");
                    }
                });
                mysqlConnection.query("select * from segments", (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);
                        mysqlConnection.end();
                        conn.end();
                    }
                });
            });
        } else {
            console.error("no DB_HOST");
        }
    })
        .on("end", () => {
            console.error("connection end");
        })
        .on("error", (...args) => {
            console.error(...args);
        })
        .connect({
            host: process.env.DB_SSH_HOST,
            port: 22,
            username: process.env.DB_SSH_USER,
            privateKey: fs.readFileSync(process.env.DB_SSH_KEY),
        });
} else {
    console.log("no DB_SSH_KEY");
}
