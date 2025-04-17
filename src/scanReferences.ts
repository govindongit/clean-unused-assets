import * as fs from 'fs';

export function findReferencedAssets(sourceFiles: string[]): Set<string> {
	const regex = /(["'(])([^"'()]+?\.(css|js|png|jpg|jpeg|gif|svg|webp|mp4|webm|ogg))\1/g;
	const referenced = new Set<string>();

	for (const filePath of sourceFiles) {
		try {
			const content = fs.readFileSync(filePath, 'utf8');
			let match;
			while ((match = regex.exec(content)) !== null) {
				referenced.add(match[2].replace(/^\.?\/?/, '').replace(/\\/g, '/'));
			}
		} catch (err) {
			console.error(`Error reading ${filePath}`, err);
		}
	}

	return referenced;
}
