import { UserResponseModel } from "../../users/models/user-response.model";

export interface LoginResponseModel {
	jwt: string,
	user: UserResponseModel
}