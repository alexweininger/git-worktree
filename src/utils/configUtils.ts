import path from "path";
import { configFileName } from "../constants";
import { getHomePath } from "../utils/pathUtils";

export function getConfigPath(dir = getHomePath()): string {
    return path.join(dir, configFileName);
}
