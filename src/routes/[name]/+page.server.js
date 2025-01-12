import { error } from '@sveltejs/kit';
import { pb } from '../../helper/database';
import { format } from 'date-fns';

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
