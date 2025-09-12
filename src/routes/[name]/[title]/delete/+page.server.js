import { redirect, error } from '@sveltejs/kit';
import pb from '../../../../helper/superuser.js';

export const actions = {
    delete: async ({ locals, params }) => {
    const user = await pb.collection('users').getFirstListItem(`username = "${params.name}"`);
        if (!user) {
            error(404, 'User not found');
        }

        const encodedSlug = encodeURIComponent(params.title);
        const safeSlug = encodedSlug.replace(/"/g, '\\"');
        const post = await pb
            .collection('posts')
            .getFirstListItem(`author = "${user.id}" && slug = "${safeSlug}"`, { expand: 'author' });

        if (!post) {
            error(404, 'Post not found');
        }

        await pb.collection('posts').delete(post.id);

        redirect(301, `/${locals.pb.authStore.model.username}`);
    }
};


export async function load({ locals, params }) {

    if (!locals.pb.authStore.isValid) {
        error(401, 'You need to be logged in to do that.');
    }

    if (locals.pb.authStore.model.username != params.name) {
        error(403, "You can't delete somebody else's posts.")
    }

    const user = await pb.collection('users').getFirstListItem(`username = "${params.name}"`);
    if (!user) {
        error(404, 'User not found');
    }

    // Re-encode slug from route param because SvelteKit provides decoded value
    const encodedSlug = encodeURIComponent(params.title);
    const safeSlug = encodedSlug.replace(/"/g, '\\"');
    const post = await pb
        .collection('posts')
        .getFirstListItem(`author = "${user.id}" && slug = "${safeSlug}"`, { expand: 'author' });

    if (!post) {
        error(404, 'Post not found');
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
        updated: post.updated
    };

    return {
        post: sanitizedPost,
        author
    };
}