import pb from '../../helper/superuser.js';

export async function load() {
	const users = await pb.collection('users').getFullList({
		fields: 'id, username, description, color, avatar',
		filter: 'verified = True'
	});

	const usersWithAvatarUrls = await Promise.all(
		users.map(async (user) => {
			const record = await pb.collection('users').getOne(user.id);

			return {
				...user,
				avatarUrl: user.avatar ? pb.files.getURL(record, user.avatar) : null
			};
		})
	);
	return { users: usersWithAvatarUrls };
}
