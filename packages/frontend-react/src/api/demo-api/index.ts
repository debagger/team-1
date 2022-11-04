import { getCoreApiRequest, ICoreClientApi } from "core";
import { DemoPort } from "./demo.port";

const coreApiRequest = getCoreApiRequest(new DemoPort());

export const demoApi = new Proxy({} as ICoreClientApi, {
  get(_, controllerName) {
    if (typeof controllerName !== "string") return;
    return new Proxy(
      {},
      {
        get(_, methodName) {
          if (typeof methodName !== "string") return;
          return (data: any) => {
            const token = localStorage.getItem("token");
            return coreApiRequest(controllerName as any, methodName as any, {
              context: { token },
              data,
            });
          };
        },
      }
    );
  },
});
