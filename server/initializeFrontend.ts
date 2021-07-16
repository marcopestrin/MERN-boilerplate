import { isProduction } from "../const";
import express, { Express } from "express";
import path from "path";

export default function initializeFrontend(app: Express): void {
    if(isProduction) {
        const rootPath = path.resolve("./");
        app.use(express.static('client/build'));
        app.get('/*', (req, res) => {
          res.sendFile(path.resolve(rootPath, 'client/build', 'index.html'));
        });
    }
}