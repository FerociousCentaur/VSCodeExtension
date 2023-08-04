// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */



async function getDefinitionLocation(word) {
    // Get the active text editor
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    // Find the position of the word in the document
    const position = editor.document.getText().indexOf(word);
    if (position === -1) {
        // Word not found in the document
        return;
    }

    // Execute the "editor.action.goToDefinition" command
    await vscode.commands.executeCommand("editor.action.goToDefinition", editor.document.uri, editor.document.positionAt(position));

    // Get the location of the current cursor position after executing "Go to Definition"
    const definitionLocation = await vscode.languages.getLocation(editor.document.uri, editor.selection.active);

    // definitionLocation contains the location of the definition file without actually navigating to it
    console.log('Definition location:', definitionLocation.uri.fsPath);
	return definitionLocation;
}


function getSelectedWord() {
    // Get the active text editor
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        // No active text editor found
        return;
    }

    // Get the selection(s) in the editor
    const selections = editor.selections;
    if (selections.length === 0) {
        // No selection found
        return;
    }

    // Get the first selection (assuming there's only one selection for a word)
    const selection = selections[0];

    // Get the text of the selection
    const selectedText = editor.document.getText(selection);

    // If you want to trim the selected word from leading/trailing whitespaces:
    const selectedWord = selectedText.trim();

    return selectedWord;
}

// Example usage:


function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "history-tree" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('history-tree.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		const selectedWord = getSelectedWord();
		
		vscode.window.showInformationMessage(getDefinitionLocation(selectedWord));

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
