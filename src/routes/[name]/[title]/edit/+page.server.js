import { redirect, error } from '@sveltejs/kit';
import markdownit from 'markdown-it';
import mk from '@vscode/markdown-it-katex';
import { format } from 'date-fns';
import pb from '../../../../helper/superuser.js';

export const actions = {
	edit: async ({ locals, request }) => {
		const formData = await request.formData();
		const title = formData.get('title');
		const slug = formData.get('slug');
		const content = formData.get('content');
		const id = formData.get('id');

		console.log('title:', title);
		console.log('slug:', slug);
		console.log('content:', content);
		console.log('id:', id);

		if (!locals.pb.authStore.isValid) {
			throw error(401, 'Not logged in');
		}

		const post = await pb.collection('posts').getOne(id);
		if (post.author !== locals.pb.authStore.model.id) {
			throw error(403, 'You do not own this post');
		}

		try {
			await pb.collection('posts').update(id, {
				title,
				slug,
				content
			});
		} catch (err) {
			throw error(500, 'Update failed');
		}


		redirect(301, `/${locals.pb.authStore.model.username}/${slug}`);
		return { success: true };


	}
}

export async function load({ locals, params }) {

	if (!locals.pb.authStore.isValid) {
		throw error(401, 'You need to be logged in to do that.');
	}

	if (locals.pb.authStore.model.username != params.name) {
		error(403, "You can't edit somebody else's posts.")
	}

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

	const author = {
		username: post.expand?.author?.username,
		color: post.expand?.author?.color,
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
		author
	};
}
