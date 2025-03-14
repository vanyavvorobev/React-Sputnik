import styled from "styled-components";
import { LoginFormComponent } from "../../components/authorization/login-form/login-form.component"
import { Link } from "react-router-dom";

const LoginPageWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	height: calc(100dvh - 64px);
	width: 100%;
	align-items: center;
`;

const LoginFormWrapper = styled.div`
	grid-column: 2;
	justify-self: stretch;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const RegisterLinkWrapper = styled(Link)`
	display: block;
	text-align: center;
	width: 100%
`;

const LoginPageComponent = () => {

	return (
		<LoginPageWrapper>
			<LoginFormWrapper>
				<LoginFormComponent/>
				<RegisterLinkWrapper to="/register">Регистрация</RegisterLinkWrapper>
			</LoginFormWrapper>
		</LoginPageWrapper>
	)
}

export default LoginPageComponent;