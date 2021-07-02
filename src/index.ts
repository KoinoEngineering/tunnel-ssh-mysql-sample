/* eslint-disable no-console */
import fs from "fs";
import { Client } from "ssh2";
import dotEnv from "dotenv";
dotEnv.config();

if (process.env.DB_SSH_KEY) {
    const conn = new Client();
    conn.on("ready", () => {
        console.log("Client :: ready");
        conn.shell((err, stream) => {
            if (err) throw err;
            stream
                .on("close", () => {
                    console.log("Stream :: close");
                    conn.end();
                })
                .on("data", (data: unknown) => {
                    console.log("OUTPUT: " + data);
                });
            stream.end("ls -la\nexit\n");
        });
    }).connect({
        host: process.env.DB_SSH_HOST,
        port: 22,
        username: process.env.DB_SSH_USER,
        privateKey: fs.readFileSync(process.env.DB_SSH_KEY),
    });
} else {
    console.log("no DB_SSH_KEY");
}
