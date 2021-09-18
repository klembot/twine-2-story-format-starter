import codeMirrorMode from './codemirror-mode';
import codeMirrorCommands from './codemirror-commands';
import codeMirrorToolbar from './codemirror-toolbar';
import parseReferences from './parse-references';

export default {
	'^2.4.0-alpha1': {
		codeMirror: {
			commands: codeMirrorCommands,
			mode: codeMirrorMode,
			toolbar: codeMirrorToolbar
		},
		references: {
			parsePassageText: parseReferences
		}
	}
};
