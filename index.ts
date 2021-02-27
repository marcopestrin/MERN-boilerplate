import { createServer } from "./server";

async function start(): Promise<void> {
    try {
        startSingle()
    } catch (e) {

    }
}

function startSingle(): void {
	createServer();
}

start(); 