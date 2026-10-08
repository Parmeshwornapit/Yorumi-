import 'server-only';
import {authClient} from './supabase/server';
export async function getAuthenticatedUser(){const supabase=await authClient();if(!supabase)return null;const {data:{user},error}=await supabase.auth.getUser();if(error||!user||!user.email_confirmed_at)return null;return {userId:user.id,email:user.email||'',fullName:typeof user.user_metadata?.display_name==='string'?user.user_metadata.display_name.slice(0,50):null};}
