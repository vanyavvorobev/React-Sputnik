import { UserResponseModel } from "../../users/models/user-response.model";

export interface RegisterResponseModel {
	jwt: string,
	user: UserResponseModel
}