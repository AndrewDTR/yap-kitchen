import PocketBase from "pocketbase"
import { env } from '$env/dynamic/private';

const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL);
pb.autoCancellation(false);

await pb.collection('_superusers').authWithPassword(env.POCKETBASE_ADMIN_EMAIL, env.POCKETBASE_ADMIN_PASSWORD, {
    autoRefreshThreshold: 30 * 60
})

export default pb;