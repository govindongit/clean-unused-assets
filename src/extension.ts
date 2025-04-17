import * as vscode from 'vscode';
import { getAllFiles } from './utils';
import { findReferencedAssets } from './scanReferences';
import { detectUnusedAssets } from './detectUnused';
import { moveToUnusedFolder } from './moveUnused';
import { ASSET_EXTENSIONS, SOURCE_FILE_EXTENSIONS } from './constants';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('clean-unused-assets.scanAndMove', async () => {
		const folder = vscode.workspace.workspaceFolders?.[0];
		if (!folder) {
			vscode.window.showErrorMessage('Open a folder first.');
			return;
		}

		const rootPath = folder.uri.fsPath;

		const sourceFiles = getAllFiles(rootPath, SOURCE_FILE_EXTENSIONS);
		const assetFiles = getAllFiles(rootPath, ASSET_EXTENSIONS);

		const referenced = findReferencedAssets(sourceFiles);
		const unused = detectUnusedAssets(assetFiles, referenced, rootPath);

		if (unused.length === 0) {
			vscode.window.showInformationMessage('No unused assets found 🎉');
			return;
		}

		const confirm = await vscode.window.showWarningMessage(
			`${unused.length} unused files found. Move to unused_files folder?`,
			'Yes', 'No'
		); 

		if (confirm === 'Yes') {
			moveToUnusedFolder(unused, rootPath);
			vscode.window.showInformationMessage(`Moved ${unused.length} files to unused_files/`);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
