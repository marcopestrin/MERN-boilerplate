import { isProduction } from "../const";
import express, { Express } from "express";
import path from "path";

export default function initializeFrontend(app: Express): void {
  //const root = path.resolve("./")
  // const indexBuild = path.resolve(__dirname, "client/build", "index.html");
  // app.use(express.static(path.resolve(__dirname, "client/build")));
  // app.get("/cane", (req, res) => {
  //   res.sendFile(indexBuild);
  // });
} 