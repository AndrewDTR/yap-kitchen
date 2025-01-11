import { error } from '@sveltejs/kit';
import { pb } from '../../helper/database';

export async function load({ params }) {
	const user = await pb
		.collection('users')
		.getFirstListItem(`username = "${params.name}"`, { fields: 'created, id, username, description, personal_link' });

	if (!user) {
		error(404);
	}

	const posts = await pb.collection('posts').getFullList({
		filter: `author = "${user.id}"`
	});

	return { user, posts };
}
