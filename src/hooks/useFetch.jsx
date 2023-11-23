import { useCallback, useReducer, useState } from 'react';
import request from '../utils/request';

function fetchReducer(state, action) {
	if (action.type === 'fetch') {
		return {
			...state,
			loading: true
		};
	} else if (action.type === 'success') {
		return {
			data: action.data,
			error: null,
			loading: false
		};
	} else if (action.type === 'error') {
		return {
			...state,
			error: action.err,
			loading: false
		};
	} else {
		throw new Error(`That action type isn't supported.`);
	}
}

export default function useFetch(method, url) {
		
	const [state, dispatch] = useReducer(fetchReducer, {
		data: null,
		error: null,
		loading: false
	});
	
	const callAPI = useCallback(
		(body) => {
			dispatch({ type: 'fetch' });
			request(method, url, body)
				.then(([err, response]) => {
					if (err) return dispatch({ type: 'error', err });
					else {
						dispatch({ type: 'success', data: response });
					}
				})
				.catch((e) => {
					console.warn(e.message);
					dispatch({ type: 'error', err: e });
				});
		},
		[method, url]
	);

	return {
		loading: state.loading,
		data: state.data,
		error: state.error,
		callAPI,
	};
}
