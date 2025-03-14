import { create } from "zustand"
import { LoginRequstModel } from "./models/login-requst.model"
import { networkInstance } from "../../shared/network/network.instance"
import { LoginResponseModel } from "./models/login-response.model"
import { storageKeys } from "../../shared/storage/storage-keys.consts"
import { RegisterRequestModel } from "./models/register-requst.model"
import { RegisterResponseModel } from "./models/register-response.model"
import { ResetPasswordRequstModel } from "./models/reset-password-requst.model"
import { ForgotPasswordRequestModel } from "./models/forgot-password-request.model"
import { ResetPasswordResponseModel } from "./models/reset-password-response.model"
import { ChangePasswordRequestModel } from "./models/change-password-request.model"
import { ChangePasswordResponseModel } from "./models/change-password-response.model"
import { EmailConfirmationRequestModel } from "./models/email-confirmation-request.model"
import { EmailConfirmationResponseModel } from "./models/email-confirmation-response.model"
import { ConfirmEmailRequestModel } from "./models/confirm-email-request.model"
import { MyProfileResponseModel } from "./models/my-profile-response.model"

type UserProfile = {
	id: string,
	username: string,
	email: string,
	provider: string,
	confirmed: boolean,
	blocked: boolean,
}

type AuthorizationStoreState = {
	isAuth?: boolean,
	myProfile?: UserProfile,

	logout: () => Promise<void>,
	loadMyProfile: () => Promise<void>,
	login: (loginParams: LoginRequstModel) => Promise<void>,
	register: (registerParams: RegisterRequestModel) => Promise<void>,
	sendEmailConfirmation: (confirmationParams: EmailConfirmationRequestModel) => Promise<void>,
	confirmEmail: (confirmParams: ConfirmEmailRequestModel) => Promise<void>
	sendRestPasswordEmail: (restParams: ForgotPasswordRequestModel) => Promise<void>,
	resetPassword: (resetParams: ResetPasswordRequstModel) => Promise<void>,
	changePassword: (changeParams: ChangePasswordRequestModel) => Promise<void>
};

export const useAuthorizationStoreService = create<AuthorizationStoreState>((set) => ({
	// isAuth: undefined,
	isAuth: true,
	myProfile: undefined,

	logout: async () => {
		set({ isAuth: false, myProfile: undefined });
	},

	loadMyProfile: async () => {
		try {
			const response = await networkInstance.get<MyProfileResponseModel>("users/me");
			const result = response.data;
			set({ isAuth: true, myProfile: result });
		}
		catch(error) {
			console.log(error);
			set({ isAuth: false, myProfile: undefined });
		}
	},

	login: async (loginParams) => {
		localStorage.removeItem(storageKeys.accessToken);
		try {
			const response = await networkInstance.post<LoginResponseModel>("auth/local", loginParams);
			const result = response.data;
			localStorage.setItem(storageKeys.accessToken, result.jwt);
			set({ isAuth: true, myProfile: result.user });
		}
		catch(error) {
			console.log(error);
			set({ isAuth: false, myProfile: undefined })
		}
	},

	register: async (registerParams) => {
		localStorage.removeItem(storageKeys.accessToken);
		try {
			const response = await networkInstance.post<RegisterResponseModel>("auth/local/register", registerParams);
			const result = response.data;
			localStorage.setItem(storageKeys.accessToken, result.jwt);
			set({ isAuth: true, myProfile: result.user });
		}
		catch(error) {
			console.log(error);
			set({ isAuth: false, myProfile: undefined });
		}
	},

	sendEmailConfirmation: async (confirmationParams) => {
		try {
			await networkInstance.post<EmailConfirmationResponseModel>("auth/send-email-confirmation", confirmationParams);
		}
		catch(error) {
			console.log(error);
		}
	},

	confirmEmail: async (confirmParams) => {
		try {
			await networkInstance.get(`auth/email-confirmation?confirmation=${confirmParams.confirmation}`);
		}
		catch(error) {
			console.log(error);
		}
	},

	sendRestPasswordEmail: async (restParams) => {
		try {
			await networkInstance.post("auth/forgot-password", restParams);
		}
		catch(error) {
			console.log(error);
		}
	},

	resetPassword: async (resetParams) => {
		try {
			const response = await networkInstance.post<ResetPasswordResponseModel>("auth/reset-password", resetParams);
			const result = response.data;
			localStorage.setItem(storageKeys.accessToken, result.jwt);
			set({ isAuth: true, myProfile: result.user });
		}
		catch(error) {
			console.log(error);
			set({ isAuth: false, myProfile: undefined });
		}
	},

	changePassword: async (changeParams) => {
		try {
			const response = await networkInstance.post<ChangePasswordResponseModel>("auth/change-password", changeParams);
			const result = response.data;
			localStorage.setItem(storageKeys.accessToken, result.jwt);
			set({ isAuth: true, myProfile: result.user });
		}
		catch(error) {
			console.log(error);
			set({ isAuth: false, myProfile: undefined });
		}
	}

}));