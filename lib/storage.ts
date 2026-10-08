import 'server-only';
import {createClient} from '@supabase/supabase-js';
const storageUrl=()=>process.env.NEXT_PUBLIC_SUPABASE_URL||process.env.SUPABASE_URL;
const storageKey=()=>process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
function client(){const url=storageUrl();const key=storageKey();if(!url||!key)throw Error('Image storage is not configured.');return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}}).storage.from(process.env.SUPABASE_STORAGE_BUCKET||'yorumi-media');}
const bucket={async put(id:string,bytes:Uint8Array,metadata:{httpMetadata:{contentType:string}}){const {error}=await client().upload(id,bytes,{contentType:metadata.httpMetadata.contentType,upsert:false});if(error)throw Error('Could not save this image.');},async get(id:string){const {data,error}=await client().download(id);if(error||!data)return null;return {body:await data.arrayBuffer(),httpMetadata:{contentType:data.type}}},async delete(id:string){const {error}=await client().remove([id]);if(error)throw Error('Could not remove this image.');}};
export function storage(){if(!storageUrl()||!storageKey())return null;return bucket;}
