import {createServerClient} from '@supabase/ssr';
import {NextResponse,type NextRequest} from 'next/server';
import {publicAuthConfig} from '@/lib/supabase/config';
export async function proxy(request:NextRequest){let response=NextResponse.next({request});const auth=publicAuthConfig();const {url,key}=auth;if(!auth.configured)return response;const supabase=createServerClient(url,key,{cookies:{getAll(){return request.cookies.getAll()},setAll(values){for(const {name,value} of values)request.cookies.set(name,value);response=NextResponse.next({request});for(const {name,value,options} of values)response.cookies.set(name,value,options)}}});await supabase.auth.getClaims();response.headers.set('Cache-Control','private, no-store');return response;}
export const config={matcher:['/api/:path*','/auth/:path*','/signin']};
