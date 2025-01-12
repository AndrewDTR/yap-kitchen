import { error } from '@sveltejs/kit';
import pb from '../../helper/superuser.js';

export async function load({ params }) {
	const users = await pb
		.collection('users')
		.getFullList({ fields: 'username, description, color' });
	return { users };
}
