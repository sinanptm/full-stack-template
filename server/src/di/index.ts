import { Container } from "inversify";
import { Controllers } from "./controllers";
import { MiddleWares } from "./middlewares";

const container = new Container({ defaultScope: "Singleton" });

export const resolve = <T>(type: Controllers | MiddleWares): T => {
  return container.get<T>(type);
};

export default container;
