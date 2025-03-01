import fsPromises from "fs/promises";
import eventEmitter from "./Emitter";

//error logger
const filePath = "./logger.txt";

eventEmitter.on("logger-fs", async (msg: string) => {
  const now = new Date();
  let line = `${now.toLocaleDateString()} \t ${msg} \n`;
  line += "----------------------------------\n";

  await fsPromises.appendFile(filePath, line);
});

const logger = async (eventName: string, msg: string) => {
  eventEmitter.emit(eventName, msg);
};

export default logger;
