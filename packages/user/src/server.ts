import { PlatformApplication, Inject, PlatformAcceptMimesMiddleware } from "@tsed/common";
import {Configuration} from "@tsed/di";
import "@tsed/platform-express";
import * as bodyParser from "body-parser";

const rootDir = __dirname;

@Configuration({
    rootDir,
    acceptMimes: ["application/json"],
    httpPort: 4000,
    httpsPort: false,
    mount: {
        "/api/v1": [`${rootDir}/controllers/*.ts`],
    }
})
export class Server {
  @Inject()
  app: PlatformApplication

  $beforeRoutesInit(): void | Promise<any> {
    this.app
      .use(PlatformAcceptMimesMiddleware)
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));

    return null;
  }

  $afterRoutesInit() {
    
    // this.app.use(GlobalErrorHandlerMiddleware);
  }
}