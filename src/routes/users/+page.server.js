import { error } from '@sveltejs/kit';
import { pb } from '../../helper/database';

export async function load({ params }) {
	const users = await pb.collection('users').getFullList({ fields: 'username, description' });
	return { users };
}
