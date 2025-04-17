# 🧹 VSCode Extension: Unused Asset Finder

This Visual Studio Code extension scans your project for unused assets such as `.css`, `.js`, image files, and more. It helps you keep your codebase clean by identifying and moving unused files to a separate folder.

---

## 💡 What This Extension Does

- 🔍 Scans `.html`, `.php`, `.js`, and `.css` files to find asset references
- 🧼 Detects unused files like:
  - Styles & scripts: `.css`, `.js`
  - Images: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`
  - Videos (optional): `.mp4`, `.webm`
- 📂 Moves unused files into a `unused_files/` folder (instead of deleting them)
- 🗂️ Recursively works across nested directories

---

## ✅ Technologies Used

### 🟨 1. Language: TypeScript

- A superset of JavaScript that provides type safety
- Helps catch bugs early and improves maintainability
- All core logic (`extension.ts`, `utils.ts`, etc.) is written in TypeScript

### 🟦 2. Environment: Node.js

- Runs in Node.js within VSCode
- Uses built-in `fs` and `path` modules for file and directory operations

### 🧱 3. Platform: Visual Studio Code Extension API

- Utilizes the `vscode` module to:
  - Access the open workspace
  - Display messages to users
  - Register and execute custom commands

### ⚙️ 4. Build Tool: esbuild

- Compiles TypeScript into JavaScript
- A fast and modern alternative to Webpack or Rollup

### 📦 5. Package Manager: npm

- Manages dependencies such as `typescript`, `esbuild`, and `eslint`
- Provides scripts like `npm run compile` for building the extension

### 📁 6. File System Utilities

- Uses Node's `fs` and `path` modules to:
  - Recursively scan directories
  - Move unused files to a dedicated folder

### 📜 7. Configuration Files

- `package.json` — Metadata, commands, and dependency declarations
- `tsconfig.json` — TypeScript compiler configuration
- `esbuild.js` — Build configuration for `esbuild`

---

## 🚀 Getting Started

1. Clone the repo and open it in VSCode.
2. Run `npm install` to install dependencies.
3. Use `npm run compile` to build the extension.
4. Press `F5` to launch the extension in a new Extension Development Host window.

---

## 📂 Example Folder Structure

# clean-unused-assets README

This is the README for your extension "clean-unused-assets". After writing up a brief description, we recommend including the following sections.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

- `myExtension.enable`: Enable/disable this extension.
- `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
- Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
- Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
