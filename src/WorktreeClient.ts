import path from 'path';
import { GitCommand } from './GitCommand';
import { getGitPath, isRepo } from './utils/gitUtils';

interface ListOptions {
    locked?: boolean;
}

export class WorktreeClient {
    constructor(private readonly dir: string) {
        if (!isRepo(dir)) {
            throw Error(`"${getGitPath(dir)}" is not a repo`);
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

    public async list(options?: ListOptions): Promise<any[] | undefined> {
        if (!options?.locked) {
            return await this.listAll();
        }

        if (options.locked) {
            return await this.listLocked();
        }
    }

    private async listAll(): Promise<any[] | undefined> {
        const command = new GitCommand('git worktree list --porcelain');
        const output = await this.run(command);

        return output
            ?.split('\n')
            .filter((line: string) => line.startsWith('worktree'))
            .map((line: string) => line.replace('worktree ', ''));
    }

    private async listLocked(): Promise<any[] | undefined> {
        const command = new GitCommand('git worktree list');
        const output = await this.run(command);

        const isLineLocked = (line: string) => {
            return line.split(' ').includes('locked');
        };

        return output
            ?.split('\n')
            .filter(isLineLocked)
            .map(line => line.split(' ')[0]);
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

    public async lock(worktreePath: string, reason?: string): Promise<void> {
        const command = new GitCommand(
            `git worktree lock ${
                reason ? `--reason ${reason}` : ''
            } ${worktreePath}`
        );
        await this.run(command);
    }

    public async unlock(worktreePath: string): Promise<void> {
        const command = new GitCommand(`git worktree unlock ${worktreePath}`);
        await this.run(command);
    }

    public async move(
        worktreePath: string,
        newPath: string,
        force?: boolean
    ): Promise<void> {
        const command = new GitCommand(
            `git worktree move ${worktreePath} ${newPath} ${force ? '-f' : ''}`
        );
        await this.run(command);
    }

    public async isWorktreeLocked(worktreePath: string): Promise<boolean> {
        const lockedWorktrees = await this.listLocked();
        return lockedWorktrees?.includes(worktreePath) ?? false;
    }
}
