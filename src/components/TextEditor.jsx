/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.bubble.css';
// import 'react-quill/dist/quill.snow.css';

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";


const TextEditor = ({ gettingHtmlData,initialContent }) => {
	const [editorContent, setEditorContent] = useState(initialContent);
	const editorRef = useRef(null);
	// const changeHandler = (content, delta, source, editor) => {
	// 	console.log(editor.getHTML()); // rich text
	// 	setText(editor.getHTML());
	// 	console.log(editor.getText()); // plain text
	// 	console.log(editor.getLength()); // number of characters
	// };
	

	// const handleChange = () => {
	// 	if (editorRef.current && editorRef.current.editor) {
	// 		const htmlContent = editorRef.current.editor.core.getContents();
	// 		// console.log(htmlContent)
	// 		gettingHtmlData(htmlContent)
	// 	  }
	// }
	const handleChange = (content) => {
		setEditorContent(content);
		if (gettingHtmlData) {
		  gettingHtmlData(content);
		}
	  };

	function handleImageUpload(
		targetImgElement,
		index,
		state,
		imageInfo,
		remainingFilesCount
	) {
		console.log(targetImgElement);
	}
	function handleVideoUpload(
		targetElement,
		index,
		state,
		info,
		remainingFilesCount
	) {
		if (targetElement === null) {
			return;
		}

		console.log(targetElement.src);
	}
	useEffect(() => {
		setEditorContent(initialContent);
	}, [initialContent])

	return (
		<>
		<div id="editor">
		<SunEditor
		// setContents={htmlContent&&htmlContent}
		ref={editorRef}
			autoFocus={true}
			// onInput={handleInput}
			// onDrop={handleDrop}
			onChange={handleChange}
			onImageUpload={handleImageUpload}
			onVideoUpload={handleVideoUpload}
			setContents={editorContent}
			setOptions={{
				height: 200,
				buttonList: [
					["undo", "redo"],
					["font", "fontSize", "formatBlock"],
					["paragraphStyle", "blockquote"],
					[
						"bold",
						"underline",
						"italic",
						"strike",
						"subscript",
						"superscript"
					],
					["fontColor", "hiliteColor", "textStyle"],
					["removeFormat"],
					"/", // Line break
					["outdent", "indent"],
					["align", "horizontalRule", "list", "lineHeight"],
					["table", "link", "image", "video", "audio" /** ,'math' */], 
            /** ['imageGallery'] */["fullScreen", "showBlocks", "codeView"],
					["preview", "print"],
					["save"]
				]
			}}
		/>
		{/* <button onClick={handlePrintClick}>Print HTML</button> */}
		</div>
		</>
	);
};

export default TextEditor;

// const modules = {
// 	toolbar: [
// 		[{ font: [] }],
// 		[{ size: ['small', false, 'large', 'huge'] }],
// 		['bold', 'italic', 'underline'],
// 		[{ list: 'ordered' }, { list: 'bullet' }],
// 		[{ align: [] }],
// 		[{ color: [] }, { background: [] }],
// 		['clean']
// 	]
// };

// const formats = [
// 	'font',
// 	'size',
// 	'bold',
// 	'italic',
// 	'underline',
// 	'list',
// 	'bullet',
// 	'align',
// 	'color',
// 	'background'
// ];
