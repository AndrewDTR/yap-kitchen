import { error } from '@sveltejs/kit';
import { db } from '../../helper/database';

export async function load({ params }) {
	const user = db.prepare('SELECT username FROM users WHERE username = ?').get(params.name);

	if (!user) {
		throw error(404, 'User not found');
	}

	const posts = db
		.prepare(
			`
        SELECT id, title, date, slug, content, edit_date
        FROM posts
        WHERE author = (SELECT id FROM users WHERE username = ?);
    `
		)
		.all(params.name);

	return {
		username: user.username,
		posts
	};
}
