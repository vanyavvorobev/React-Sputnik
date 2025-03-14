
export interface EditTaskRequestModel {
	id: number,
	data: {
		status: string,
		title: string,
		description: string,
	}
}