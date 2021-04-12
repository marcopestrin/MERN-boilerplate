import { createServer } from "./server";
import cluster from "cluster";
import os from "os";


async function startCluster(): Promise<void> {
    if (cluster.isMaster){
        os.cpus().forEach((cpu: os.CpuInfo): cluster.Worker => {
        return cluster.fork();
    });

    cluster.on("exit", (worker: cluster.Worker, signal: number): void => {
        cluster.fork();
    });

    } else {
        console.log(`Start single - ${process.pid}`);
        startSingle()
    }
};

async function start(): Promise<void> {
    try {
        if (process.env.CLUSTER?.toLowerCase() === "true") {
            startCluster();
        } else {
            console.log('Start single');
            startSingle();
        }
    } catch (e) {
        console.error(JSON.stringify(e));
    }
};

function startSingle(): void {
	createServer();
};

start(); 