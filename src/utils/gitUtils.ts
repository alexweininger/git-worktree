import fs from 'fs';

export function getGitPath(path: string = process.cwd()): string {
    return `${path}/.git`;
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
