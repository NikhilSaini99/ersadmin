import { API_HOST } from '../constants/server';
const useFile = () => {
	async function UploadFile(url, images) {
		var formdata = new FormData();
		images.forEach((element) => {
			formdata.append('file', element);
		});

		var requestOptions = {
			method: 'POST',
			body: formdata,
			redirect: 'follow'
		};

		let response;
		
		console.log(API_HOST,url)
		const res = await fetch(API_HOST + url, requestOptions);
		response = await res.json();
		// .then((response) => response.json())
		// .then((result) => {
		// 	response = result;
		// })
		// .catch((error) => console.log('error', error));
		// console.log('i am in use file',response)
		return response;
	}
	return { UploadFile };
};

export default useFile;
