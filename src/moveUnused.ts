import * as fs from 'fs';
import * as path from 'path';


export function moveToUnusedFolder(filePaths: string[], root: string) {
	const targetDir = path.join(root, 'unused_files');
	if (!fs.existsSync(targetDir)) {
		fs.mkdirSync(targetDir);
	}

	for (const filePath of filePaths) {
		const relative = path.relative(root, filePath);
		const dest = path.join(targetDir, path.basename(relative));

		try {
			fs.renameSync(filePath, dest);
			console.log(`Moved ${relative} -> unused_files/`);
		} catch (err) {
			console.error(`Failed to move ${filePath}`, err);
		}
	}
}
