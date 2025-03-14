type UserResponseModel = {
	id: string
	username: string,
	email: string,
	provider: string,
	confirmed: boolean,
	blocked: boolean
}
export interface ChangePasswordResponseModel {
	jwt: string,
	user: UserResponseModel
}