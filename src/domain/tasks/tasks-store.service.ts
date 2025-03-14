import { create } from "zustand";
import { networkInstance } from "../../shared/network/network.instance";
import { GetTasksRequestModel } from "./models/get-tasks-request.model";
import { GetTaskRequstModel } from "./models/get-task-request.model";
import { CreateTaskRequestModel } from "./models/create-task-request.model";
import { EditTaskRequestModel } from "./models/edit-task-request.model";
import { DeleteTaskRequestModel } from './models/delete-task-request.model';
import { storageKeys } from "../../shared/storage/storage-keys.consts";

type Task = {
	id: number,
	attributes: {
		status: string,
		description: string,
		title: string,
	}
}

type TasksStoreState = {
	formTask?: Task & { favorite: boolean },
	tasks?: Task[],
	lastLoadParams?: GetTasksRequestModel,

	clearForm: () => void,
	loadTasks: (loadParams?: GetTasksRequestModel) => Promise<void>,
	loadSelectedTask: (loadParams: GetTaskRequstModel) => Promise<void>,
	createTask: (createParams: CreateTaskRequestModel) => Promise<void>,
	editTask: (editParams: EditTaskRequestModel) => Promise<void>,
	deleteTask: (deleteParams: DeleteTaskRequestModel) => Promise<void>
	addFavorites: (id: number) => Promise<void>
	removeFavorites: (id: number) => Promise<void>
}

export const useTasksStoreService = create<TasksStoreState>((set, get) => ({
	formTask: undefined,
	tasks: undefined,
	lastLoadParams: undefined,

	clearForm: () => {
		set({ formTask: undefined });
	},

	loadTasks: async (loadParams) => {
		try {
			// let path = "";
			// if(loadParams) path = "?" + Object.entries(loadParams)
    		// 	.filter(([_, value]) => value !== undefined && value !== null)
    		// 	.map(([key, value]) => `${key}=${value}`.replace("[", "%5B").replace("]", "%5D")).join("&");
		
			const response = await networkInstance.get<{data: Task[]}>(`tasks`)
			const result = response.data.data;
			
			const statusFilter = loadParams?.filters?.status;
			if(statusFilter) {
				if(statusFilter === "favorites") {
					const favoritesStorage = localStorage.getItem(storageKeys.favoritesTasks);
				const favorites: number[] = favoritesStorage ? JSON.parse(favoritesStorage) : [];
					const filteredResult = result.filter(it => favorites.includes(it.id));
					set({ tasks: filteredResult, lastLoadParams: loadParams });
				}
				else {
					const filteredResult = result.filter(it => it.attributes.status === statusFilter);
					set({ tasks: filteredResult, lastLoadParams: loadParams });
				}
			}
			else {
				set({ tasks: result, lastLoadParams: loadParams });
			}
		}
		catch(error) {
			console.log(error);
		}
	},

	loadSelectedTask: async (loadParams) => {
		const response = await networkInstance.get<{data: Task}>(`tasks/${loadParams.id}`);
		const result = response.data.data;
		const favoritesStorage = localStorage.getItem(storageKeys.favoritesTasks);
		const favorites: number[] = favoritesStorage ? JSON.parse(favoritesStorage) : [];
		console.log(favorites, result.id);
		if(favorites.includes(result.id)) {
			set({ formTask: {...result, favorite: true} });
		}
		else {
			set({ formTask: {...result, favorite: false} });
		}
	},

	createTask: async (createParams) => {
		const response = await networkInstance.post<{data: Task}>("tasks", { data: createParams });
		const result = response.data.data;
		const favoritesStorage = localStorage.getItem(storageKeys.favoritesTasks);
		const favorites: number[] = favoritesStorage ? JSON.parse(favoritesStorage) : [];
		if(favorites.includes(result.id)) {
			set({ formTask: {...result, favorite: true} });
		}
		else {
			set({ formTask: {...result, favorite: false} });
		}
		const { lastLoadParams, loadTasks } = get();
		loadTasks(lastLoadParams);
	},

	editTask: async (editParams) => {
		const response = await networkInstance.put<{data: Task}>(`tasks/${editParams.id}`, { data: editParams.data });
		const result = response.data.data;
		const favoritesStorage = localStorage.getItem(storageKeys.favoritesTasks);
		const favorites: number[] = favoritesStorage ? JSON.parse(favoritesStorage) : [];
		if(favorites.includes(result.id)) {
			set({ formTask: {...result, favorite: true} });
		}
		else {
			set({ formTask: {...result, favorite: false} });
		}
		const { lastLoadParams, loadTasks } = get();
		loadTasks(lastLoadParams);
	},

	deleteTask: async (deleteParams) => {
		await networkInstance.delete(`tasks/${deleteParams.id}`);
		set({ formTask: undefined });
		const { lastLoadParams, loadTasks } = get();
		loadTasks(lastLoadParams);
	},

	addFavorites: async (id) => {
		const { formTask } = get();
		if(!formTask) return;
		const favoritesStorage = localStorage.getItem(storageKeys.favoritesTasks);
		const favorites: number[] = favoritesStorage ? JSON.parse(favoritesStorage) : [];
		if(!favorites.includes(id)) {
			favorites.push(id);
			localStorage.setItem(storageKeys.favoritesTasks, JSON.stringify(favorites));
			set({ formTask: { ...formTask, favorite: true }})
		}
	},

	removeFavorites: async (id) => {
		const { formTask } = get();
		if(!formTask) return;
		const favoritesStorage = localStorage.getItem(storageKeys.favoritesTasks);
		const favorites: number[] = favoritesStorage ? JSON.parse(favoritesStorage) : [];
		if(favorites.includes(id)) {
			const updatedFavorites = favorites.filter(it => it !== id);
			localStorage.setItem(storageKeys.favoritesTasks, JSON.stringify(updatedFavorites));
			set({ formTask: { ...formTask, favorite: false }})
		}
	}
	
}));