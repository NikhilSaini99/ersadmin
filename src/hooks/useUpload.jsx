import React from 'react'
import { API_HOST } from '../constants/server';

const useUpload = () => {
        async function uploadPdfFile(url,selectedFile){
            const formData = new FormData();
            formData.append('file', selectedFile);

            var requestOptions = {
                method: 'POST',
                body: formData,
                redirect: 'follow'
            };

            let response;
            const res = await fetch(API_HOST + url, requestOptions);
            response = await res.json();
           
            return response;
        } 

        return {uploadPdfFile}
}

export default useUpload