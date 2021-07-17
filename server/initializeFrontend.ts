import { isProduction } from "../const";
import express, { Express } from "express";
import path from "path";

export default function initializeFrontend(app: Express): void {
  const indexBuild = path.resolve(path.resolve("./"), "client/build", "index.html");
  if(isProduction) {
      app.use(express.static(indexBuild));
  }
}