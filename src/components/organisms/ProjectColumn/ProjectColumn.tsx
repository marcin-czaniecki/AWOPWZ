import ProjectColumnHeader from "components/molecules/ProjectColumnHeader/ProjectColumnHeader";
import ProjectColumnTasks from "components/molecules/ProjectColumnTasks/ProjectColumnTasks";
import styled from "styled-components";
import { IColumn } from "types/types";

const WrapperProjectColumnFooter = styled.div`
  padding: 7px 10px;
`;

const ProjectColumn = ({ column }: { column: IColumn }) => {
  return (
    <div>
      <ProjectColumnHeader column={column} />
      <ProjectColumnTasks column={column} />
      <WrapperProjectColumnFooter>WIP: {column.wip}</WrapperProjectColumnFooter>
    </div>
  );
};

export default ProjectColumn;
