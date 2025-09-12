import { redirect, error } from '@sveltejs/kit';
import pb from '../../../helper/superuser.js';

export const actions = {
    edit: async ({ locals, request }) => {
        const formData = await request.formData();
        const username = formData.get('username').toLowerCase();
        const description = formData.get('description');
        let color = formData.get('color');
        const personal_link = formData.get('personal-link');

        if (!locals.pb.authStore.isValid) {
            throw error(401, 'Not logged in');
        }

        // TODO VERIFY OWNERSHIP OF ACCOUNT

        if (typeof color !== 'string') {
            throw error(400, 'Color is required');
        }
        color = color.trim();
        if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
            throw error(400, 'Invalid color format');
        }
        const normalizedColor = color.toLowerCase();

        const data = {
            username,
            description,
            personal_link,
            color: normalizedColor,
            avatar: '',
            pngAvatar: ''
        };

        try {
            await pb.collection('users').update(locals.pb.authStore.model.id, data);
        } catch (err) {
            throw error(500, 'Update failed: ' + err);
        }

        throw redirect(301, `/${username}`);
    }
};

export async function load({ locals, params }) {
    const user = await pb.collection('users').getFirstListItem(`username = "${params.name}"`);
    if (!user) {
        throw error(404, 'User not found');
    }

    if (!locals.pb.authStore.isValid) {
        throw error(403, 'You must be logged in to perform this action.');
    }

    if (locals.pb.authStore.model.username !== params.name) {
        throw error(403, "You can't edit somebody else's account.");
    }

    return { user };
}
