import { PlatformApplication, Inject, PlatformAcceptMimesMiddleware } from "@tsed/common";
import {Configuration} from "@tsed/di";
import "@tsed/platform-express";
import "@tsed/swagger";
import * as bodyParser from "body-parser";

const rootDir = __dirname;

@Configuration({
    rootDir,
    acceptMimes: ["application/json"],
    httpPort: process.env.PORT || 5000,
    httpsPort: false,
    mount: {
        "/api/v1": [`${rootDir}/controllers/*.ts`],
    },
    swagger: [
        {
            path: "/v2/docs",
            specVersion: "2.0"
        }
    ]
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