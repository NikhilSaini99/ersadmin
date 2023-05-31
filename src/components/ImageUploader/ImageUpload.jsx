import React, { useRef, useState } from 'react';
import { Typography, Button } from '@mui/material';
import './image-Uploader.css';
 import fileImg from 'src/assets/images/file-png-solid-240.png';
import uploadImg from '../../assets/images/cloud-upload-regular-240.png';
// import request from 'src/utils/request';

const DropFileInput = ({ setLoading, setMsg, maxImg, afterAdd }) => {
    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');


    const onFileDrop = (e) => {
        console.log("filtype==============> ");
        const newFile = e.target.files[0];
        const updatedList = [...fileList, newFile];
        setFileList(updatedList);
        setLoading(true);

    };

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        // props.onFileChange(updatedList);
    };

    return (
        <>
            <form onSubmit={postData}>
                {/* {!fileList.length === maxImg && ( */}
                <div
                    ref={wrapperRef}
                    className="drop-file-input"
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}>
                    <div className="drop-file-input__label">
                        <img src={uploadImg} alt="" />
                        <Typography varquantityiant="h3">
                            Drag & Drop your files here
                        </Typography>
                    </div>
                    <input
                        type="file"
                        value=""
                        accept=".jpg .png .jpeg .svg"
                        onChange={onFileDrop}
                    />
                </div>
                {/* )} */}
                {/* {fileList.length > 0 ? ( */}
                <div className="drop-file-preview">
                    <Typography variant="h6">Ready to upload</Typography>
                    {fileList.map((item, index) => (
                        <div key={index} className="drop-file-preview__item">
                            <img src={fileImg} alt="" />
                            <div className="drop-file-preview__item__info">
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography variant="h6">{item.size}B</Typography>
                            </div>
                            <span
                                className="drop-file-preview__item__del"
                                onClick={() => fileRemove(item)}>
                                x
                            </span>
                        </div>
                    ))}
                </div>
                {/* ) : null} */}
                {/* <Button
                    color="primary"
                    style={{ height: '3em', margin: '10px 0px' }}
                    fullWidth
                    margin="normal"
                    size="large"
                    type="submit"
                    variant="contained">
                    Add
                </Button> */}
            </form>
        </>
    );
    async function postData(values) {
        // if (formik.isValid) {
        //     if (xlxOutput) {
        //         setLoading(true);
        //         let requestType, requestUrl;
        //         let body = {};

        //         switch (excelType) {
        //             case "Tender":
        //                 requestType = 'POST';
        //                 requestUrl = '/tenders';
        //                 body = {
        //                     projectId: projectId,
        //                     name: values.name,
        //                     tasks: xlxOutput
        //                 };
        //                 break;
        //             case "Checkpoint":
        //                 requestType = 'PUT';
        //                 requestUrl = `/reporting-forms/${formId}/checkpoints`;
        //                 body = {
        //                     checkpointName: values.name,
        //                     questions: xlxOutput
        //                 };
        //                 break;
        //         }

        //         let [err, response] = await request(requestType, requestUrl, body);
        //         setLoading(false);
        //         if (err) {
        //             setMsg({
        //                 active: true,
        //                 msg: 'Server Error',
        //                 severity: 'error'
        //             });
        //         }
        //         if (response.success) {
        //             setMsg({
        //                 active: true,
        //                 msg: response.data.message,
        //                 severity: 'success'
        //             });
        //             afterAdd();
        //         }
        //     } else {
        //         setMsg({
        //             active: true,
        //             msg: 'Please Upload Excel',
        //             severity: 'error'
        //         });
        //     }
        // }
    }
};

export default DropFileInput;
