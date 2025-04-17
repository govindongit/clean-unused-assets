import * as fs from 'fs';
import * as path from 'path';

export function getAllFiles(dir: string, extensions: string[]): string[] {
	const results: string[] = [];

	function recurse(currentPath: string) {
		const entries = fs.readdirSync(currentPath, { withFileTypes: true });

		for (const entry of entries) {
			const fullPath = path.join(currentPath, entry.name);
			if (entry.isDirectory()) {
				recurse(fullPath);
			} else if (extensions.includes(path.extname(entry.name).toLowerCase())) {
				results.push(fullPath);
			}
		}
	}

	recurse(dir);
	return results;
}
