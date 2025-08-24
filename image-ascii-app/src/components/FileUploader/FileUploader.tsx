import type { FileUploaderProps } from "../../utilities/types";


const FileUploader = ({onSingleFileSelect, accept, multiple = false}: FileUploaderProps) => {
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		
		if (!files) return;

		if (!multiple)
			onSingleFileSelect(files[0])
	}

	return (
		<div>
			<input
				type="file"
				accept={accept}
				multiple={multiple}
				onChange={handleFileChange}
			/>
		</div>
	);
}

export default FileUploader;
