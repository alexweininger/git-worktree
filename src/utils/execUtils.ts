import execa, { ExecaError } from 'execa';

export async function exec(
    command: string,
    options?: execa.Options<string>
): Promise<string | undefined> {
    try {
        const { stdout } = await execa.command(command, {
            ...options,
            all: true,
        });
        return stdout;
    } catch (e) {
        const error = e as ExecaError;
        console.error(`Error running command "${error.command}"`);
        console.error(error.all);
    }
}
