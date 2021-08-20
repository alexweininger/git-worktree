import { getGitPath } from '../src/utils/gitUtils';

describe('Get git path', () => {
    it('works', () => {
        expect(getGitPath('/Users/name/pathToProject')).toStrictEqual(
            '/Users/name/pathToProject/.git'
        );
    });
});
