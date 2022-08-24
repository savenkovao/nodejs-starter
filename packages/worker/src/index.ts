import { $log } from "@tsed/common";
import { PlatformExpress } from "@tsed/platform-express";
import { Server } from "./server";

async function bootstrap(): Promise<void> {
  try {
    $log.debug("Start server...");
    const express = await PlatformExpress.bootstrap(Server, {});

    await express.listen();
    $log.debug("Server initialized");
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();