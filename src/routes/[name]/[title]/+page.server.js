import { error } from '@sveltejs/kit';
import markdownit from 'markdown-it';
import mk from '@vscode/markdown-it-katex';
import { format } from 'date-fns';
import pb from '../../../helper/superuser.js';

const md = markdownit().use(mk.default);

export async function load({ params }) {
	let user;
	try {
		user = await pb.collection('users').getFirstListItem(`username = "${params.name}"`);
		// eslint-disable-next-line no-unused-vars
	} catch (err) {
		error(404, "That user doesn't exist.");
	}

	if (!user) {
		error(404, 'User not found');
	}

	let post;
	const encodedSlug = encodeURIComponent(params.title);
	const safeSlug = encodedSlug.replace(/"/g, '\\"');
	try {
		const filter = `author = "${user.id}" && slug = "${safeSlug}"`;
		post = await pb.collection('posts').getFirstListItem(filter, { expand: 'author' });
		// eslint-disable-next-line no-unused-vars
	} catch (err) {
		error(404, 'Blog post does not exist.');
	}
	if (!post) {
		error(404, 'Post not found');
	}

	const result = md.render('---\n' + post.content);

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
		created: post.created,
		updated: post.updated,
		createdHumanReadable: format(new Date(post.created), 'MMMM do, yyyy'),
		updatedHumanReadable: format(new Date(post.updated), 'MMMM do, yyyy')
	};

	const comments = await pb.collection('comments').getFullList({
		filter: "",
		sort: '-created',
		expand: 'author',
		fields: 'comment, created, expand.author.username, expand.author.avatar, expand.author.color'
	});

	const withAvatarUrls = comments.map((c) => {
		const a = c.expand?.author;
		return {
			comment: c.comment,
			created: c.created,
			author: a && {
				username: a.username,
				color: a.color,
				avatarUrl: a.avatar ? pb.files.getURL(a, a.pngAvatar) : null
			}
		};
	});

	return {
		post: sanitizedPost,
		result,
		comments: withAvatarUrls,
		author: authorWithAvatar
	};
}
