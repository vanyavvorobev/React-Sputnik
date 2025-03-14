
import { Button, Form, Input } from "antd"
import { useAuthorizationStoreService } from "../../../domain/authorization/authorization-store.service"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

type RegisterFormType = {
	username: string,
	email: string,
	password: string
}

const StyledButton = styled(Button)`
	width: 100%;
`;

export const RegisterFormComponent = () => {
	const navigate = useNavigate();
	const { register } = useAuthorizationStoreService();

	const handleOnSubmit = (values: RegisterFormType) => {
		register(values).then(() => {
			navigate("/home");
		});
	}

	return (
		<Form<RegisterFormType>
			onFinish={handleOnSubmit}
			layout="vertical"
		>
			<Form.Item
				label="Имя пользователя"
				name="username"
				required
			>
				<Input/>
			</Form.Item>
			<Form.Item
				label="Email"
				name="email"
				required
				rules={[
					{ required: true, message: "Введите пароль!" },
					{ min: 8, message: "Минимальная длина 8 символов!" }
				]}
				hasFeedback
			>
				<Input/>
			</Form.Item>
			<Form.Item
				label="Пароль"
				name="password"
				required
				hasFeedback
				rules={[
					{ required: true, message: "Введите пароль!" },
					{ min: 8, message: "Пароль должен содержать минимум 8 символов!" },
					{ 
					  pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/, 
					  message: "Пароль должен содержать хотя бы одну заглавную букву и одну цифру!" 
					}
				]}
			>
				<Input.Password/>
			</Form.Item>
			<StyledButton type="primary" htmlType="submit">
				Войти
			</StyledButton>
		</Form>
	)
}