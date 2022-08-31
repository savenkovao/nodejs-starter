import pino from "pino";
import moment from "moment";

let n = 0;

export default pino({
    mixin() {
        return {
          line: ++n,
          logger: "PINO"
        }
      },
    formatters: {
      level(_, number) {
        return {level: pino.levels.labels[number].toUpperCase()}
      },
    },
    timestamp: () => `,timestamp: "${moment().format('MMMM Do YYYY, h:mm:ss a')}"`
});