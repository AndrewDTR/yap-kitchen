import { redirect, error } from '@sveltejs/kit';
import pb from '../../helper/superuser.js';

export const actions = {
    post: async ({ locals, request }) => {
        console.log(locals.pb.authStore.model.id)
        const formData = await request.formData();
        const title = formData.get('title');
        const slug = formData.get('slug');
        const content = formData.get('content');

        console.log('title:', title);
        console.log('slug:', slug);
        console.log('content:', content);

        if (!locals.pb.authStore.isValid) {
            throw error(401, 'Not logged in');
        }

        // TODO check that their account is verified

        try {
            const data = {
                "title": title,
                "slug": encodeURIComponent(slug.toLowerCase()),
                "content": content,
                "author": locals.pb.authStore.model.id
            };
            const record = await pb.collection('posts').create(data);
        } catch (err) {
            throw error(500, 'Post creation failed: ' + err);
        }


        redirect(301, `/${locals.pb.authStore.model.username}/${slug}`);
        return { success: true };


    }
}

export async function load({ locals, params }) {
    if (!locals.pb.authStore.model) {
        error(403, "You have to be signed in to make a post.");
    }

    if (!locals.pb.authStore.model.verified) {
        error(403, "Your account has to be verified to make a post. Check your email.");
    }
}