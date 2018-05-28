export interface Invocation {
	id: Number;
	task_id: Number;
	started_at: Date;
	finished_at: Date;
	scheduled_at: Date;
	success: Boolean;
	error_message: String;
}