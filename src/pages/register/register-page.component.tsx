import styled from "styled-components";
import { RegisterFormComponent } from "../../components/authorization/register/register-form.component";

const RegisterPageWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	height: calc(100dvh - 64px);
	width: 100%;
	align-items: center;
`;

const RegisterFormWrapper = styled.div`
	grid-column: 2;
	justify-self: stretch;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const RegisterPageComponent = () => {

	return (
		<RegisterPageWrapper>
			<RegisterFormWrapper>
				<RegisterFormComponent/>
			</RegisterFormWrapper>
		</RegisterPageWrapper>
	)
}

export default RegisterPageComponent;