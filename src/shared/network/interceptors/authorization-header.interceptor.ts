import { InternalAxiosRequestConfig } from "axios";
import { storageKeys } from "../../storage/storage-keys.consts";

export const AuthorizationHeaderInterceptor = (config: InternalAxiosRequestConfig) => {
	const accessToken = localStorage.getItem(storageKeys.accessToken);
	if(accessToken !== null) {
		// config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
}