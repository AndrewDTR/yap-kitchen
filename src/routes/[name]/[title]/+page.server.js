import { error } from '@sveltejs/kit';
import markdownit from 'markdown-it';
import mk from '@vscode/markdown-it-katex';
import { format } from 'date-fns';
import pb from '../../../helper/superuser.js';

const md = markdownit().use(mk.default);

export async function load({ params }) {
	const user = await pb.collection('users').getFirstListItem(`username = "${params.name}"`);
	if (!user) {
		throw error(404, 'User not found');
	}

	const post = await pb
		.collection('posts')
		.getFirstListItem(`author = "${user.id}" && slug = "${params.title}"`, { expand: 'author' });

	if (!post) {
		throw error(404, 'Post not found');
	}

	const result = md.render(post.content);

	const author = {
		username: post.expand?.author?.username,
		color: post.expand?.author?.color,
		avatar: post.expand?.author?.avatar
	};

	const avatarUrl = user.avatar ? pb.files.getURL(user, author.avatar) : null;

	const authorWithAvatar = {
		...author,
		avatarUrl
	};

	const sanitizedPost = {
		id: post.id,
		title: post.title,
		slug: post.slug,
		content: post.content,
		created: post.created,
		updated: post.updated,
		createdHumanReadable: format(new Date(post.created), 'MMMM do, yyyy'),
		updatedHumanReadable: format(new Date(post.updated), 'MMMM do, yyyy')
	};

	return {
		post: sanitizedPost,
		result,
		author: authorWithAvatar
	};
}
