import React from "react";
import { useTasksStoreService } from "../../domain/tasks/tasks-store.service";
import { TaskCardComponent } from "../../components/tasks/task-card.component";
import { Button, Spin } from "antd";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { TaskFormComponent } from "../../components/tasks/task-form.component";
import ButtonGroup from "antd/es/button/button-group";

type FilterType = "all" | "active" | "completed" | "favorites";

const TasksPageWrapper = styled.div`
	display: grid;
	grid-template-columns: 2fr 2px 1fr;
	padding: 16px;
	gap: 16px;
	@media(max-width: 720px) {
		display: flex;
		flex-direction: column;
	}
`;

const TasksContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const TasksListWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 8px;

	@media(max-width: 720px) {
		grid-template-columns: 1fr;
	} 
`;
const Divider = styled.div`
	width: 2px;
	height: 100%;
	background-color: #16161632;
`;

const TasksPageComponent = () => {
	const { selectedTask } = useParams();
	const navigate = useNavigate();
	const { tasks, loadSelectedTask, loadTasks } = useTasksStoreService();
	const [ selectedFilter, setSelectedFilter ] = React.useState<FilterType>("all");

	React.useEffect(() => {
		if(selectedTask) {
			loadSelectedTask({id: Number(selectedTask)}).catch(() => {
				navigate("/tasks", { replace: true });
			})
		};
	}, [selectedTask, loadSelectedTask, navigate]);

	React.useEffect(() => {
		if(selectedFilter !== "all") {
			loadTasks({
				filters: {
					status: selectedFilter
				}
			});
		}
		else {
			loadTasks();
		}
	}, [selectedTask, loadTasks, selectedFilter]);

	if(!tasks) return <Spin/>;
	
	return (
		<TasksPageWrapper>
			<TasksContentWrapper>
				<ButtonGroup style={{justifyContent: "center"}}>
					<Button 
						type={selectedFilter === "all" ? "primary" : "default"} 
						onClick={() => setSelectedFilter("all")}
					>
						Все
					</Button>
					<Button 
						type={selectedFilter === "completed" ? "primary" : "default"}
						onClick={() => setSelectedFilter("completed")}
					>
						Выполненные
					</Button>
					<Button 
						type={selectedFilter === "active" ? "primary" : "default"}
						onClick={() => setSelectedFilter("active")}
					>
						Не Выполненные
					</Button>
					<Button 
						type={selectedFilter === "favorites" ? "primary" : "default"}
						onClick={() => setSelectedFilter("favorites")}
					>
						Избранные
					</Button>
				</ButtonGroup>
				<TasksListWrapper>
					{tasks?.map(it => (
						<TaskCardComponent 
							key={it.id} 
							id={it.id}
							title={it.attributes.title} 
							description={it.attributes.description} 
							status={it.attributes.status}
						/>
					))}
				</TasksListWrapper>
			</TasksContentWrapper>
			<Divider/>
			<TaskFormComponent/>
		</TasksPageWrapper>
	)
}

export default TasksPageComponent;