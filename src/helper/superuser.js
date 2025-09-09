import PocketBase from "pocketbase"
import { env } from '$env/dynamic/private';
import { env as penv } from '$env/dynamic/public';

const pb = new PocketBase(penv.PUBLIC_POCKETBASE_URL);
pb.autoCancellation(false);

await pb.collection('_superusers').authWithPassword(env.POCKETBASE_ADMIN_EMAIL, env.POCKETBASE_ADMIN_PASSWORD, {
    autoRefreshThreshold: 30 * 60
})

export default pb;