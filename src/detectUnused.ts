import * as path from 'path';

export function detectUnusedAssets(assetPaths: string[], referenced: Set<string>, root: string): string[] {
	return assetPaths.filter((filePath) => {
		const relativePath = path.relative(root, filePath).replace(/\\/g, '/');
		return !Array.from(referenced).some(ref => relativePath.endsWith(ref));
	});
}
