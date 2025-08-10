// import clsx from "clsx";
import styles from "./AboutMePage.module.css";

export default function AboutMePage() {
	return (
		<div className={styles.container}>
			<h3 style={{ textAlign: 'center' }}>What About Me?</h3>
				<section className={styles.biography}>
					<p>
						I'm a self-taught technologist with a passion for systems, security, and creative problem-solving. I’ve been programming since I was a teen, starting with Batch scripts and eventually diving deep into languages like C/C++, Python, JavaScript, and beyond. I split my time between Arch Linux and Windows, often working from the command line and customizing my tools to fit my workflow. 
					</p>
					<p>
						My projects range from image-to-ASCII art tools using advanced edge-detection algorithms to interactive websites and networked applications. I enjoy digging into low-level behavior, whether it's debugging driver issues, exploring firmware interactions, or analyzing how the operating system communicates with hardware.
					</p>
					<p>
						Outside of software, I work on embedded systems and electronics. I’ve programmed microcontrollers like the PIC18F4550, ATmega, and Arduino for various projects — from I/O interfacing to USB communication. I design basic to intermediate AC/DC circuits using Proteus, implement them on breadboards, and transition to soldered perfboards. I haven’t made a PCB yet, but I’ve dabbled in designing them for when that step comes.
						I’m deeply curious about how systems interact — from firmware and drivers to how electrical signals move through real-world circuits. 
					</p>
					<p>
						When I'm not coding, I rotate between hobbies like digital drawing, piano, and studying electronics or network systems. This site is where I share some of the tools I build, ideas I explore, and the technical rabbit holes I fall into. Thanks for stopping by.
					</p>
				</section>
				<section>
					Certifications & Stuff..
				</section>
			</div>
	);
}
