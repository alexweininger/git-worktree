import { exec } from './utils/execUtils';
import { createGitCommand } from './utils/gitUtils';

export class GitCommand {
    constructor(public gitCommand: string) {}

    public async run(dir: string = process.cwd()): Promise<string | undefined> {
        const command = createGitCommand(this.gitCommand, dir);
        return await exec(command);
    }
}
