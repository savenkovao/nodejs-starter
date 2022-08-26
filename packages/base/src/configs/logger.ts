import pino from "pino";

let n = 0;


export default pino({
    mixin() {
        return {
          line: ++n,
          appName: "user-sevice",
          logger: "PINO"
        }
      },
      formatters: {
        level(_, number) {
          return {level: pino.levels.labels[number].toUpperCase()}
        },
      },
      timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`
})