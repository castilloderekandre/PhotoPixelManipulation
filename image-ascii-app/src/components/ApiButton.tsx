import React, {useState} from "react";
import type { ApiTestResponse } from "../api/types";
import { apiGet } from "../api/client";

const PORT = 8000;

const ApiButton = () => {
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState<null|string>(null);
	const [error, setError] = useState<null|string>(null);

	const callApi = async () => {
		setLoading(true);
		setResponse('');
		setError('');

		apiGet<ApiTestResponse>('api/imagegenerator')
			.then((data) => setResponse(data.msg))
			.catch((error) => setError(`Error connecting to API: ${error}`))
			.finally(() => setLoading(false));
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
