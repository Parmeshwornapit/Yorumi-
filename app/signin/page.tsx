import SignIn from './signin';
export const dynamic='force-dynamic';
export default async function Page({searchParams}:{searchParams:Promise<{return_to?:string;mode?:string}>}){const p=await searchParams;const returnTo=p.return_to?.startsWith('/')&&!p.return_to.startsWith('//')&&!p.return_to.includes('\\')?p.return_to:'/';return <SignIn returnTo={returnTo} initialMode={p.mode||'signin'} configured={!!process.env.NEXT_PUBLIC_SUPABASE_URL&&!!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY}/>}
