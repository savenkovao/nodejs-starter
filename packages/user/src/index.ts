import { $log } from "@tsed/common";
import { PlatformExpress } from "@tsed/platform-express";
import { Server } from "./server";
import ExampleConsumer from "./services/kafka-consumer";

async function bootstrap(): Promise<void> {
  try {
    $log.debug("Start server...");
    const express = await PlatformExpress.bootstrap(Server, {});

    const consumer = new ExampleConsumer();
    await consumer.startBatchConsumer();
    await express.listen();
    
    $log.debug("Server initialized");
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();