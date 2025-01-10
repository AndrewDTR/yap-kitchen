import { error } from '@sveltejs/kit';
import { db } from '../../../helper/database'
import markdownit from 'markdown-it'

const md = markdownit()

export async function load({ params }) {
    const query = `
        SELECT posts.*, users.username
        FROM posts
        JOIN users ON users.id = posts.author
        WHERE users.username = ? AND posts.slug = ?;
    `;

    const post = db.prepare(query).get(params.name, params.title);

    if (post) {
		const result = md.render(post.content);
        return { post, result };
    }

    throw error(404, 'Post not found');
}
