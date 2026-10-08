import SignIn from './signin';
import {publicAuthConfig} from '@/lib/supabase/config';
export const dynamic='force-dynamic';
export default async function Page({searchParams}:{searchParams:Promise<{return_to?:string;mode?:string;error?:string}>}){const p=await searchParams;const returnTo=p.return_to?.startsWith('/')&&!p.return_to.startsWith('//')&&!p.return_to.includes('\\')?p.return_to:'/';return <SignIn returnTo={returnTo} initialMode={p.mode||'signin'} authConfig={publicAuthConfig()} callbackError={p.error==='confirmation_failed'}/>}
