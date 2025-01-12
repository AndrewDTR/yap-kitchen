import { error } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';

export async function load({ params }) {
	const pb = new PocketBase(env.POCKETBASE_URL);
	await pb.admins.authWithPassword(env.POCKETBASE_ADMIN_EMAIL, env.POCKETBASE_ADMIN_PASSWORD);

	const userResult = await pb.collection('users').getList(1, 1);
	const userCount = userResult.totalItems;

	const postResult = await pb.collection('posts').getList(1, 1);
	const postCount = postResult.totalItems;

	return { userCount, postCount };
}
