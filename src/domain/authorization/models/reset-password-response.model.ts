import { MyProfileResponseModel } from "./my-profile-response.model";

export interface ResetPasswordResponseModel {
	jwt: string,
	user: MyProfileResponseModel
}