import FileUploader from "../../../components/FileUploader/FileUploader";
import { useState } from "react";
import type { ApiAsciiRequest, ApiAsciiResponse } from "../../../utilities/types";
import { apiPost } from "../../../api/client";

const fileToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file!);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = error => reject(error);
	});
}

// [TODO] Add input for image and return text
export default function ASCIIPage() {
	const [response, setResponse] = useState<null|string>(null);
	const [error, setError] = useState<null|string>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const fileHandler = async (file: File) => {
		setLoading(true);
		setError(null);
		setResponse(null);

		try {
			const image = await fileToBase64(file);
			const response = await apiPost<ApiAsciiResponse>('api/ascii/generate', { image } as ApiAsciiRequest)
			setResponse(response.data.asciiText);
		} catch (error) {
			setError(error instanceof Error ? error.message : String(error));	
		} finally {
			setLoading(false);
		}
	}

	return (
		<div>
			<h2>Image to ASCII Project</h2>
			<p>
				Utilizing image processing techniques to achieve a refined transformation from an image to ASCII text.
			</p>
			<FileUploader accept="image/*" onSingleFileSelect={fileHandler} />
			<p>{response}</p>
		</div>
	);
}
