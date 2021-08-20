import untildify from 'untildify';
import os from 'os';

export function expandHomePath(path: string): string {
    return untildify(path);
}

export function getHomePath(): string {
    return os.homedir();
}
