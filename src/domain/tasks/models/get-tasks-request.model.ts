
export interface GetTasksRequestModel {
	sort?: "asc" | "desc",
	"pagination[withCount]"?: boolean,
	"pagination[page]"?: number,
	"pagination[pageSize]"?: number,
	"pagination[start]"?: number,
	"pagination[limit]"?: number,
	fields?: string,
	populate?: string,
	filters?: {
		status?: string,
	},
	locale?: string
}