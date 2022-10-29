import { getCoreApi } from "core";
import { DemoPort } from "./demo-port";

export const demoApi = getCoreApi(new DemoPort());
