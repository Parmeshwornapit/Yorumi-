import {getAuthenticatedUser} from '@/lib/auth';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export async function GET(){try{const account=await getAuthenticatedUser();return Response.json({user:account?{id:account.userId,name:account.fullName||'Traveler'}:null},{headers:{'Cache-Control':'private, no-store'}})}catch{return Response.json({error:'Could not verify your session. Please try again.'},{status:503,headers:{'Cache-Control':'private, no-store'}})}}
