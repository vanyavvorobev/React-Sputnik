import { Button, Form, Input, Select, Typography } from "antd";
import { useTasksStoreService } from "../../domain/tasks/tasks-store.service"
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";

type TaskFormType = {
	status: string,
	title: string,
	description: string,
}

const StyledButton = styled(Button)`
	width: 100%;
	margin-bottom: 8px;
`;

const selectStatusOptions = [
	{ key: "active", label: "active" },
	{ key: "completed", label: "completed" }
]

export const TaskFormComponent = () => {
	const { selectedTask } = useParams();
	const navigate = useNavigate();
	const { formTask, createTask, deleteTask, editTask, clearForm, addFavorites, removeFavorites } = useTasksStoreService();
	const [ form ] = Form.useForm<TaskFormType>();

	React.useEffect(() => {
		if(formTask) {
			form.setFieldsValue({
				title: formTask.attributes.title,
				description: formTask.attributes.description,
				status: formTask.attributes.status
			});
		}
	}, [formTask]);

	React.useEffect(() => {
		if(!selectedTask) {
			form.resetFields();
		}
	}, [selectedTask]);

	const handleOnSubmit = (values: TaskFormType) => {
		if(selectedTask) {
			editTask({id: Number(selectedTask), data: values});
		}
		else {
			createTask(values);
		}
	}

	const handleOnDelete = () => {
		if(selectedTask) {
			deleteTask({id: Number(selectedTask)}).then(() => {
				navigate("/tasks");
			});
		}
	}

	const handleOnFavorite = () => {
		if(formTask && selectedTask) {
			if(formTask.favorite) {
				removeFavorites(Number(selectedTask));
			}
			else {
				addFavorites(Number(selectedTask));
			}
		}
	}

	const handleOnBackCreate = () => {
		navigate("/tasks");
		clearForm();
	}

	return (
		<Form<TaskFormType>
			onFinish={handleOnSubmit}
			layout="vertical"
			form={form}
		>
			<Typography.Title level={3}>
				{ selectedTask ? "Редактировать задачу" : "Создать задачу" }
			</Typography.Title>
			<Form.Item
				label="Заголовок"
				name="title"
				required
			>
				<Input/>
			</Form.Item>
			<Form.Item
				label="Описание"
				name="description"
				required
			>
				<Input.TextArea style={{minHeight: 128}}/>
			</Form.Item>
			<Form.Item
				label="Статус"
				name="status"
				required
			>
				<Select  options={selectStatusOptions}/>
			</Form.Item>
			<StyledButton type="primary" htmlType="submit">
				{ selectedTask ? "Изменить" : "Сохранить" }
			</StyledButton>
			{formTask !== undefined && <StyledButton htmlType="button" onClick={handleOnFavorite}>
				{ formTask.favorite ? "Убрать из избранного" : "Добавить в избранное" }
			</StyledButton> }
			<StyledButton htmlType="button" onClick={handleOnDelete}>
				Удалить
			</StyledButton>
			<StyledButton htmlType="button" type="text" onClick={handleOnBackCreate}>
				Вернуться к созданию
			</StyledButton>
		</Form>
	)
}