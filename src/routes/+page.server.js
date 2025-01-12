import { error } from '@sveltejs/kit';
import pb from '../helper/superuser.js';

export async function load({ params }) {
	const userResult = await pb.collection('users').getList(1, 1);
	const userCount = userResult.totalItems;

	const postResult = await pb.collection('posts').getList(1, 1);
	const postCount = postResult.totalItems;

	return { userCount, postCount };
}
