import { WorktreeClient } from '../src/WorktreeClient';

describe('WorktreeClient', () => {
    const client = new WorktreeClient('test/testRepos/repo1/');
    it('Constructor should work', () => {
        expect(client).toBeDefined();
    });

    it('Should find three worktrees', async () => {
        expect(await client.list()).toHaveLength(3);
    });

    it('Should find one locked worktree', async () => {
        expect(await client.list({ locked: true })).toHaveLength(1);
    });
});
