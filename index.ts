import { createServer } from "./server";
import { logSettings } from "./const";
import Logger from "@ptkdev/logger"
import cluster from "cluster";
import os from "os";

const optionsLogger: object = logSettings;
const logger = new Logger(optionsLogger);

async function startCluster(): Promise<void> {
    if (cluster.isMaster){
		os.cpus().forEach((cpu: os.CpuInfo): cluster.Worker => {
            return cluster.fork();
        });

        cluster.on("exit", (worker: cluster.Worker, signal: number): void => {
			logger.error(JSON.stringify({
                pidDied: worker.process.pid,
                clusterRemained: Object.keys(cluster.workers).length
            }));
			cluster.fork();
		});

    } else {
        logger.info(`Start single - ${process.pid}`);
        startSingle()
    }
};

async function start(): Promise<void> {
    try {
        //logger.info('start application');
        if (process.env.CLUSTER?.toLowerCase() === "true") {
            startCluster();
        } else {
            logger.info('Start single');
            startSingle();
        }
    } catch (e) {
        logger.error(JSON.stringify(e));
    }
};

function startSingle(): void {
	createServer();
};

start(); 