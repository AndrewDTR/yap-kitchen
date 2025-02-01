import { error } from '@sveltejs/kit';
import { format } from 'date-fns';

export async function load({ locals, params }) {

    if (!locals.pb.authStore.isValid) {
        error(403, "You must be logged in to perform this action.");
    }
    if (locals.pb.authStore.model.username != params.name) {
        error(403, "You can't edit somebody else's account.");
    }
    return {};
}
