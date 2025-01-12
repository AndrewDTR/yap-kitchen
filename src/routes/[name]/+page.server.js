import { error } from '@sveltejs/kit';
import { format } from 'date-fns';
import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';

const pb = new PocketBase(env.POCKETBASE_URL);
await pb.admins.authWithPassword(env.POCKETBASE_ADMIN_EMAIL, env.POCKETBASE_ADMIN_PASSWORD);

export async function load({ params }) {
	try {
		const user = await pb.collection('users').getFirstListItem(`username = "${params.name}"`, {
			fields: 'created, id, username, description, personal_link, color'
		});

		if (!user) {
			error(404);
		}

		const posts = await pb.collection('posts').getFullList({
			filter: `author = "${user.id}"`
		});

		// for every post, add a human readable time
		const formattedPosts = posts.map((post) => {
			return {
				...post,
				humanReadableTime: format(new Date(post.created), 'MMMM do, yyyy')
			};
		});

		return { user, posts: formattedPosts };
	} catch (err) {
		if (err.status == 404) {
			error(404);
		}
		throw err;
	}
}
