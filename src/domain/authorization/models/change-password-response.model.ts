import { UserResponseModel } from "../../users/models/user-response.model";

export interface ChangePasswordResponseModel {
	jwt: string,
	user: UserResponseModel
}