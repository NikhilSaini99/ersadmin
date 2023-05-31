import { to } from "await-to-js";
import { API_HOST } from "../constants";

export default async function request(
    method,
    url,
    body = {},
    file,
    params = {}
) {
    let headers = {
        "Content-Type": "application/json;charset=utf-8",
    };
    //   let token =
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjZhNGIwZDIwNDI3MzBjMWM2OGJmY2EiLCJyb2xlIjoiQWRtaW4iLCJwbGF0Zm9ybU5hbWUiOiJBZG1pbl9QYW5lbCIsImlhdCI6MTY1ODQwMjY5MSwiZXhwIjoxNjc1NjgyNjkxfQ.YIGenq4yAcb9x4BGU5-r-YCMRa3eLIdYPKP_NKgvHCU";
    //   if (token !== null) headers.Authorization = `Bearer ${token}`;

    let err, response;

    url = `${API_HOST}${url}`;

    switch (method.toLowerCase()) {
        case "get":
            [err, response] = await to(
                fetch(url, {
                    headers,
                    method: "get",
                    ...params,
                })
            );
            break;
        case "post":
        case "put":
        case "patch":
        case "delete":
            [err, response] = await to(
                fetch(url, {
                    headers,
                    method: method.toLowerCase(),
                    body: file ? body : JSON.stringify(body),
                    ...params,
                })
            );
            break;
        default:
            err = new Error("Invalid method");
            break;
    }
    if (response.ok) {
        response = response && (await response.json());
        err = false
    }
    else if (!response.ok) {
        err = response
        response = ''
    }
    return [err, response];
}