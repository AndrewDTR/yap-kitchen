import pb from '../helper/superuser.js';

export async function load() {
	const userResult = await pb.collection('users').getList(1, 1, {
		filter: 'verified = True'
	});
	const userCount = userResult.totalItems;

	const postResult = await pb.collection('posts').getList(1, 1);
	const postCount = postResult.totalItems;

	return { userCount, postCount };
}
