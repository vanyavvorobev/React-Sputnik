
export interface MyProfileResponseModel {
	id: string,
	username: string,
	email: string,
	provider: string,
	confirmed: boolean,
	blocked: boolean,
}