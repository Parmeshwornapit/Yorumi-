import 'server-only';
import {createServerClient} from '@supabase/ssr';
import {cookies} from 'next/headers';
import {publicAuthConfig} from './config';
export async function authClient(){const config=publicAuthConfig();if(!config.configured)return null;const jar=await cookies();return createServerClient(config.url,config.key,{cookies:{getAll(){return jar.getAll()},setAll(values){try{for(const {name,value,options} of values)jar.set(name,value,options)}catch{/* Server Components rely on the session proxy. */}}}});}
