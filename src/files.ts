import * as fs from 'fs/promises'

export async function fileExists(path: string) {
    try {
        await fs.access(path, fs.constants.F_OK);

        return true;
    } catch (err) {
        return false;
    }
}
