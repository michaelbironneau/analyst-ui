export interface Repository {
	id: Number;
	created_at: Date;
	updated_at: Date;
	name: String;
	remote_url: String;
	auth_user: String;
	auth_password?: String;
	last_commit_hash?: String;
	last_commit_author?: String;
	last_commit_message?: String;
}