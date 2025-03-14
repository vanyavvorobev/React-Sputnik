import { Button, Form, Input } from "antd"
import { useAuthorizationStoreService } from "../../../domain/authorization/authorization-store.service"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

type LoginFormType = {
	identifier: string,
	password: string
}

const StyledButton = styled(Button)`
	width: 100%;
`;

export const LoginFormComponent = () => {
	const navigate = useNavigate();
	const { login } = useAuthorizationStoreService();

	const handleOnSubmit = (values: LoginFormType) => {
		login(values).then(() => {
			navigate("/home");
		});
	}

	return (
		<Form<LoginFormType>
			onFinish={handleOnSubmit}
			layout="vertical"
		>
			<Form.Item
				label="Email или имя пользователя"
				name="identifier"
				required
			>
				<Input/>
			</Form.Item>
			<Form.Item
				label="Пароль"
				name="password"
				required
				rules={[
					{ required: true, message: "Введите пароль!" },
					{ min: 8, message: "Пароль должен содержать минимум 8 символов!" },
					{ 
					  pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/, 
					  message: "Пароль должен содержать хотя бы одну заглавную букву и одну цифру!" 
					}
				]}
				hasFeedback
			>
				<Input.Password/>
			</Form.Item>
			<StyledButton type="primary" htmlType="submit">
				Войти
			</StyledButton>
		</Form>
	)
}