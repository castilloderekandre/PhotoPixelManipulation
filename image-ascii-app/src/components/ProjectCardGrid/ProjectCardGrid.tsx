import ProjectCard from "../ProjectCard/ProjectCard";
import type { ProjectCardMeta } from "../../api/types";

const ProjectCardGrid = (projectCardObjects: ProjectCardMeta[], cols: number) => {
	return (
		<div>
			{projectCardObjects.map((projectCardObject: ProjectCardMeta) => {
				return (<ProjectCard coverimage={projectCardObject.coverimage} description={projectCardObject.description} />)
			})}
		</div>
	);
}

export default ProjectCardGrid;
