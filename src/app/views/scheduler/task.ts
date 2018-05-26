export interface Task {
	id: Number;
	name: String;
	schedule: String;
	script_uri: String;
	is_aql: Boolean;
	coalesce: Boolean;
	enabled: Boolean;
	next_run?: Date;
	created_at?: Date;
	updated_at?: Date;
	deleted_at?: Date;
}