import { getCoreApi, ICoreClientApi, IControllerMethodInput } from "core";
import { DemoPort } from "./demo-port";

const coreApi = getCoreApi(new DemoPort());

export const demoApi = new Proxy({} as ICoreClientApi, {
  get(_, controllerName) {
    if (typeof controllerName === "symbol") return;

    return new Proxy(
      {},
      {
        get(_, methodName) {
          if (typeof methodName === "symbol") return;
          return (data: any) => {
            if (controllerName in (coreApi as any)) {
              const controller = (coreApi as any)[controllerName];
              if (methodName in controller) {
                const token = localStorage.getItem("token");

                const input: IControllerMethodInput<any> = {
                  context: { token },
                  data,
                };

                return controller[methodName](input);
              }
              throw new Error(
                `У контроллера ${controllerName} не найден метод ${methodName}`
              );
            }
            throw new Error(
              `Контроллер с именем ${controllerName as string} не найден`
            );
          };
        },
      }
    );
  },
});
