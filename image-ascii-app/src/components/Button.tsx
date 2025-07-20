import React, {useState} from "react";

const ButtonDemo: React.FC = () => {
	const handleClick = () : void  => {
		alert('Button Clicked!');
	}

	return (
		<button onClick={handleClick}>
			Click Me
		</button>
	);
};

export default ButtonDemo;
