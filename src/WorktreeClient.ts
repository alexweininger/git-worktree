import path from 'path';
import { GitCommand } from './GitCommand';
import { isRepo } from './utils/gitUtils';

export class WorktreeClient {
    constructor(private readonly dir: string) {
        if (!isRepo(dir)) {
            throw Error(`"${dir}" is not a repo`);
        }
    }

    public get repoName(): string {
        return path.basename(this.dir);
    }

    public async run(
        command: string | GitCommand
    ): Promise<string | undefined> {
        const gitCommand =
            command instanceof GitCommand ? command : new GitCommand(command);
        return await gitCommand.run(this.dir);
    }

    public async add(
        worktreePath: string,
        branchName: string,
        newBranch: boolean = true
    ): Promise<void> {
        try {
            const commandText = branchName
                ? `git worktree add ${
                      newBranch ? '-b' : ''
                  } ${branchName} ${worktreePath}`
                : `git worktree add ${worktreePath} ${branchName}`;

            const command = new GitCommand(commandText);

            await command.run(this.dir);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async list(): Promise<any[] | undefined> {
        const command = new GitCommand('git worktree list --porcelain');
        const output = await this.run(command);
        return output
            ?.split('\n')
            .filter((line: string) => line.startsWith('worktree'))
            .map((line: string) => line.replace('worktree ', ''));
    }

    public async remove(worktreePath: string, force?: boolean): Promise<void> {
        const command = new GitCommand(
            `git worktree remove ${worktreePath} ${force ? '-f' : ''}`
        );
        await this.run(command);
    }

    public async prune(): Promise<void> {
        const command = new GitCommand('git worktree prune');
        await this.run(command);
    }
}
