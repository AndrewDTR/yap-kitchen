import { redirect, error } from '@sveltejs/kit';
import pb from '../../../../helper/superuser.js';

export const actions = {
    delete: async ({ locals, request, params }) => {
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

        await pb.collection('posts').delete(post.id);

        throw redirect(301, `/${locals.pb.authStore.model.username}`);
    }
};


export async function load({ locals, params }) {

    if (!locals.pb.authStore.isValid) {
        throw error(401, 'You need to be logged in to do that.');
    }

    if (locals.pb.authStore.model.username != params.name) {
        error(403, "You can't delete somebody else's posts.")
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
        updated: post.updated
    };

    return {
        post: sanitizedPost,
        author
    };
}