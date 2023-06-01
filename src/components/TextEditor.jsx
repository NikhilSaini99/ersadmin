/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.bubble.css';
// import 'react-quill/dist/quill.snow.css';

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";


const TextEditor = ({ text, setText }) => {
	// const changeHandler = (content, delta, source, editor) => {
	// 	console.log(editor.getHTML()); // rich text
	// 	setText(editor.getHTML());
	// 	console.log(editor.getText()); // plain text
	// 	console.log(editor.getLength()); // number of characters
	// };
	const handleChange= (content)=> {
		 console.log(content)
		 }
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

	return (
		<SunEditor
        autoFocus={true}
        // onInput={handleInput}
        // onDrop={handleDrop}
        onChange={handleChange}
        onImageUpload={handleImageUpload}
        onVideoUpload={handleVideoUpload}
        setOptions={{
			height:200,
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
            ["table", "link", "image", "video", "audio" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin. // You must add the "imageGalleryUrl".
            /** ['imageGallery'] */ ["fullScreen", "showBlocks", "codeView"],
            ["preview", "print"],
            ["save"]
            /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
          ]
        }}
      />
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
