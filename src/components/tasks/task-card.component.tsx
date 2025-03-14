import { Tag, Typography } from "antd";
import React from "react"
import { Link, useParams } from "react-router-dom";
import styled from "styled-components"

const CardWrapper = styled(Link)<{ $isSelected: boolean }>`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: auto 1fr;
	grid-template-areas: 'T T T S' 'D D D D';
	gap: 12px;
	padding: 24px 32px;
	background-color: #ffffff;
	border: 2px solid #161616;
	border-radius: 16px;
	text-align: start;
	text-decoration: none;
	box-shadow: ${(props) => (props.$isSelected ? "2px 2px 5px 1px #1677ff64" : "2px 2px 5px 1px #16161632")};
`;

const StatusWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const getStatusColor = (status: string) => {
	switch(status) {
		case "completed": return "#52c41a";
		case "active": return "#1677ff"
		default: return undefined;
	}
}

type TaskCardProps = {
	id: number,
	title: string,
	description: string,
	status: string,
}

export const TaskCardComponent: React.FC<TaskCardProps> = ({
	id,
	title,
	description,
	status
}) => {
	const { selectedTask } = useParams();

	return (
		<CardWrapper $isSelected={Number(selectedTask) == id} to={`/tasks/${id}`} replace>
			<Typography.Title style={{gridArea: "T"}} level={4}>{title}</Typography.Title>
			<Typography.Text style={{gridArea: "D"}}>{description}</Typography.Text>
			<StatusWrapper>
				<Tag color={getStatusColor(status)} style={{gridArea: "S"}}>{status}</Tag>
			</StatusWrapper>
		</CardWrapper>
	)
}