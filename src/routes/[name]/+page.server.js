import { error } from '@sveltejs/kit';
import { format } from 'date-fns';
import pb from '../../helper/superuser.js';

export async function load({ params, locals }) {
	let unverified;
	try {
		const user = await pb.collection('users').getFirstListItem(`username = "${params.name}"`, {
			fields: 'created, id, username, description, personal_link, avatar, pngAvatar, color, verified'
		});

		if (!user) {
			error(404);
		}

		if (locals.pb.authStore.model?.username != params.name && !user.verified) {
			error(403, "User not verified.");
		}

		if (!locals.pb.authStore.model.verified && locals.pb.authStore.model?.username == params.name) {
			unverified = true;
		}

		const record = await pb.collection('users').getOne(user.id);

		const userWithAvatar = {
			...user,
			avatarUrl: user.avatar ? pb.files.getURL(record, user.avatar) : null,
			pngAvatarUrl: user.pngAvatar ? pb.files.getURL(record, user.pngAvatar) : null,
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

		return { user: userWithAvatar, posts: formattedPosts, unverified };
	} catch (err) {
		if (err.status == 404) {
			error(404, "That user doesn't exist.");
		}
		throw err;
	}
}
