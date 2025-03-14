import axios, { AxiosInstance } from "axios"
import { AuthorizationHeaderInterceptor } from "./interceptors/authorization-header.interceptor";

const settings = import.meta.env;
const baseApiUrl = settings.VITE_BASE_API_URL;

const setupInterceptors = (instance: AxiosInstance) => {
	instance.interceptors.request.use(AuthorizationHeaderInterceptor);
	return instance;
}

const createInstance = () => {
	const instance = axios.create({
		baseURL: baseApiUrl
	});

	return instance;
}

export const networkInstance = setupInterceptors(createInstance());  