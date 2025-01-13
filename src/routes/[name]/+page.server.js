import { error } from '@sveltejs/kit';
import { format } from 'date-fns';
import pb from '../../helper/superuser.js';

export async function load({ params }) {
	try {
		const user = await pb.collection('users').getFirstListItem(`username = "${params.name}"`, {
			fields: 'created, id, username, description, personal_link, avatar, color'
		});

		if (!user) {
			error(404);
		}

		const record = await pb.collection('users').getOne(user.id);

		const userWithAvatar = {
			...user,
			avatarUrl: user.avatar ? pb.files.getURL(record, user.avatar) : null,
			humanReadableCreated: format(new Date(user.created), 'MMMM do, yyyy')
		};

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

		return { user: userWithAvatar, posts: formattedPosts };
	} catch (err) {
		if (err.status == 404) {
			error(404);
		}
		throw err;
	}
}
