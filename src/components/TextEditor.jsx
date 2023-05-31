import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ text, setText }) => {
	const changeHandler = (content, delta, source, editor) => {
		console.log(editor.getHTML()); // rich text
		setText(editor.getHTML());
		console.log(editor.getText()); // plain text
		console.log(editor.getLength()); // number of characters
	};
	return (
		<ReactQuill
			theme="snow"
			modules={modules}
			formats={formats}
			onChange={changeHandler}
			className="h-40"
			value={text || ''}
		/>
	);
};

export default TextEditor;

const modules = {
	toolbar: [
		[{ font: [] }],
		[{ size: ['small', false, 'large', 'huge'] }],
		['bold', 'italic', 'underline'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		[{ align: [] }],
		[{ color: [] }, { background: [] }],
		['clean']
	]
};

const formats = [
	'font',
	'size',
	'bold',
	'italic',
	'underline',
	'list',
	'bullet',
	'align',
	'color',
	'background'
];
