import fs from 'fs';
import path from 'path';

export function getGitPath(dir: string = process.cwd()): string {
    return path.join(dir, '.git');
}

export function createGitCommand(command: string, dir: string) {
    const strippedGit = command.startsWith('git')
        ? command.substr(3).trim()
        : command;
    return `git --git-dir ${getGitPath(dir)} ${strippedGit}`;
}

export function isRepo(dir: string): boolean {
    return fs.existsSync(getGitPath(dir));
}
