import { Avatar, Button, Dropdown, Menu, MenuProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';
import { useAuthorizationStoreService } from '../../domain/authorization/authorization-store.service';

const HeaderWrapper = styled.header<{ $isAuth?: boolean }>`
	height: 64px;
	background-color: #ffffff;
	padding: 8px 32px;
	display: grid;
	grid-template-columns: ${(props) => (props.$isAuth ? "48px 1fr 48px" : "48px 1fr")};
	justify-items: end;
	align-items: center;
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;
	right: 0;
	box-shadow: -1px -1px 10px 1px #16161632,
		2px 2px 10px 1px #16161632;
`;

const Logo = styled.img`
	height: 48px;
	width: 48px;
`;

const NavMenu = styled(Menu)`
	background-color: transparent;
	border: none;
	width: 100%;
	display: flex;
	justify-content: center;
`

const menuItems: MenuProps['items'] = [
	{ key: "tasks", label: <Link to="/tasks">Задачи</Link> },
	{ key: "favorites", label: <Link to="/favorites">Избранное</Link> },
];

const dropdownItems: (onLogout: () => void) => MenuProps['items'] = (onLogout) => [
	{ key: "profile", label: <Link to="/profile">Профиль</Link> },
	{ key: "logout", label: "Выйти", onClick: onLogout }
]

export const HeaderComponent = () => {
	const navigate = useNavigate();
	const { isAuth, logout } = useAuthorizationStoreService();

	const handleLogout = () => {
		logout().then(() => {
			navigate("/home");
		})
	}

	return (
		<HeaderWrapper $isAuth={isAuth}>
			<Link to="/home">
				<Logo src="/assets/svg/logo.svg"/>
			</Link>
			{ isAuth && <NavMenu
				mode="horizontal"
				items={menuItems}
			/> }
			{ isAuth
				?<Dropdown menu={{ items: dropdownItems(handleLogout) }}>
					<Avatar size={48} icon={<UserOutlined />} />
				</Dropdown>
				:<Link to="/login">
					<Button type={"text"}>
						Войти
					</Button>
				</Link>
			}
		</HeaderWrapper>
	)
}
