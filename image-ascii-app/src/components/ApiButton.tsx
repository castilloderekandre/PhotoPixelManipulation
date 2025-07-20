import React, {useState} from "react";
import type { ApiTestResponse } from "../api/types";

const PORT = 8000;

const ApiButton = () => {
	const [response, setResponse] = useState<null|string>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<null|string>(null);

	const callApi = async () => {
		setResponse('');
		setError('');
		setLoading(true);

		fetch(`http://localhost:${PORT}/api/imagegenerator/`)
			.then((res) => {
				if(!res.ok) {
					return Promise.reject(new Error(`HTTP ${res.status}`));
				}
				return res.json() as Promise<ApiTestResponse>;
			})
			.then((data) => {
				setResponse(data.msg);
			})
			.catch((error) => {
				setError(`Error connecting to API: ${error}`);
			})
			.finally(() => {
				setLoading(false);
			})
	};

	return (
		<div>
			<button onClick={callApi} disabled={loading}>
				{loading ? 'Loading...' : 'Call API'}
			</button>
		</div>
	);
}

export default ApiButton;
