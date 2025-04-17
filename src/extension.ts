import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

const ASSET_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.css', '.js'];

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('unused-assets-cleaner.scanAndClean', async () => {
		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (!workspaceFolders) {
			vscode.window.showErrorMessage('Please open a folder first.');
			return;
		}

		const rootPath = workspaceFolders[0].uri.fsPath;
		const allFiles = await getAllFiles(rootPath);
		const assetFiles = allFiles.filter(f => ASSET_EXTENSIONS.includes(path.extname(f).toLowerCase()));
		const codeFiles = allFiles.filter(f => /\.(html|ts|js|jsx|tsx|css)$/.test(f));

		// Read all code files and combine contents
		const usedAssets: Set<string> = new Set();
		for (const file of codeFiles) {
			const content = fs.readFileSync(file, 'utf-8');
			for (const asset of assetFiles) {
				const relativeAsset = path.relative(rootPath, asset).replace(/\\/g, '/');
				if (content.includes(relativeAsset)) {
					usedAssets.add(asset);
				}
			}
		}

		// Find unused files
		const unusedAssets = assetFiles.filter(file => !usedAssets.has(file));

		if (unusedAssets.length === 0) {
			vscode.window.showInformationMessage('No unused assets found!');
			return;
		}

		// Show QuickPick to delete
		const selected = await vscode.window.showQuickPick(
			unusedAssets.map(f => path.relative(rootPath, f)),
			{
				canPickMany: true,
				placeHolder: 'Select unused assets to delete',
			}
		);

		if (selected && selected.length > 0) {
			for (const relPath of selected) {
				const fullPath = path.join(rootPath, relPath);
				fs.unlinkSync(fullPath);
			}
			vscode.window.showInformationMessage(`${selected.length} unused assets deleted.`);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}

async function getAllFiles(dir: string): Promise<string[]> {
	let results: string[] = [];
	const list = fs.readdirSync(dir);

	for (const file of list) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat && stat.isDirectory()) {
			results = results.concat(await getAllFiles(filePath));
		} else {
			results.push(filePath);
		}
	}

	return results;
}
