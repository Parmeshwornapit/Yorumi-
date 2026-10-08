export const anime=[
['Moonblade Chronicle','Action',9.2,2025,24,'A wandering swordswoman follows a fallen moon through a kingdom that has forgotten the night.'],
['Beyond the Blue','Adventure',8.9,2024,12,'An ocean cartographer discovers a city beneath the waves, and the memories it keeps.'],
['The Forest Remembers','Fantasy',9.1,2025,16,'A quiet guardian and a restless traveler learn the language of an ancient forest.'],
['Spring, After You','Romance',8.8,2026,12,'Two strangers trade letters at an abandoned station as the cherry blossoms return.'],
['Starfall Express','Sci-Fi',9.0,2025,24,'The last train across the galaxy carries a crew with nowhere else to call home.'],
['Midnight Alchemist','Fantasy',8.7,2026,13,'Every spell costs a memory. A young alchemist tries to remember who she is saving.'],
['Redline Reverie','Action',8.6,2024,12,'Underground riders race through a city where daylight never arrives.'],
['Neon Hearts','Sci-Fi',8.9,2026,24,'An android finds an impossible message hidden inside her own heartbeat.'],
['Snowbound Letters','Drama',8.5,2023,12,'A mountain postman delivers letters written a hundred years in the future.'],
['Afterglow Sessions','Slice of Life',8.8,2025,12,'Four rooftop musicians find their voice beneath the noise of the city.'],
['The Quiet Cosmos','Mystery',9.3,2024,16,'An astronomer receives a signal that sounds exactly like her childhood.'],
['Islands in the Sky','Adventure',8.7,2026,24,'A mapmaker and a runaway prince chase a floating island that appears only at dawn.'],
['Paper Lantern Days','Slice of Life',8.4,2023,12,'A small town prepares for its first lantern festival in twenty years.'],
['Crimson Orbit','Sci-Fi',8.6,2025,24,'Pilots on opposite sides of a solar war share a secret frequency.'],
['Glass Garden','Drama',9.0,2024,12,'A glassblower rebuilds her hometown one fragile sculpture at a time.'],
['Foxglove Academy','Fantasy',8.2,2026,13,'Students at a school for shapeshifters must learn to live as themselves.'],
['Echoes of Tomorrow','Mystery',8.8,2025,24,'A radio host discovers that her late-night callers are all from tomorrow.'],
['Summer on Platform Nine','Romance',8.6,2024,12,'Missed trains and chance meetings turn one summer into a lifetime.'],
['Skybound Kitchen','Slice of Life',8.3,2026,12,'A chef opens the first noodle shop on a migrating island.'],
['Ember Pact','Action',8.9,2025,24,'An apprentice firekeeper is bound to the dragon she was sent to defeat.'],
['Dream Circuit','Sci-Fi',8.7,2024,16,'A mechanic repairs the machines that keep a sleeping city dreaming.'],
['Rain Song','Drama',8.5,2023,12,'A silent pianist hears music only when the rain begins.'],
['Thirteen Moons','Fantasy',9.1,2026,24,'Each moon opens a different door. One must remain closed forever.'],
['The Last Daylight','Adventure',8.8,2025,12,'A lighthouse keeper crosses the world to bring one final sunrise home.']
].map((a,i)=>({id:'a'+(i+1),title:String(a[0]),genre:String(a[1]),rating:Number(a[2]),year:Number(a[3]),episodes:Number(a[4]),description:String(a[5]),tile:i%12,studio:['Lumen House','Cloudline Studio','Paper Moon Works'][i%3],status:i%3?'Completed':'Airing'}));
export const communities=[
{id:'c1',name:'The Midnight Society',category:'General',description:'Late-night conversations, hidden gems, and people who get you.',symbol:'☾',color:'#9b85fb',members:'12.4k'},
{id:'c2',name:'Worlds Beyond',category:'Fantasy',description:'For the worlds we wish we could get lost in.',symbol:'✧',color:'#66c2b0',members:'8.2k'},
{id:'c3',name:'Sakura Stories',category:'Romance',description:'Slow burns, second chances, and all the feelings.',symbol:'❀',color:'#ed9aaa',members:'6.8k'},
{id:'c4',name:'Frame by Frame',category:'Art',description:'Share your art, process, and your next big idea.',symbol:'◈',color:'#f4b971',members:'4.1k'},
{id:'c5',name:'Shonen Central',category:'Action',description:'Big battles. Bigger theories. Bring your best takes.',symbol:'⚡',color:'#f17c6c',members:'18.6k'},
{id:'c6',name:'Cosmic Café',category:'Sci-Fi',description:'A little space for a very big universe.',symbol:'✺',color:'#79b3ec',members:'3.5k'}];
export const posts=[
{id:'p1',author:'hana.exe',title:'The Forest Remembers is the kind of anime that stays with you.',body:'The quiet moments between the big scenes are everything. What’s an anime that made you pause and just sit with it?',tag:'Discussion',community:'Worlds Beyond',likes:124},
{id:'p2',author:'Kai',title:'A little rooftop study from last night',body:'Inspired by Afterglow Sessions. Still figuring out the lighting — would love your thoughts!',tag:'Fan art',community:'Frame by Frame',likes:89},
{id:'p3',author:'mika.chan',title:'Your comfort anime for a rainy evening?',body:'Looking for something warm, gentle, and a little magical. Drop your hidden gems below.',tag:'Question',community:'The Midnight Society',likes:62}];
export const rooms=[{id:'r1',name:'Midnight movie club',anime:'The Quiet Cosmos',theme:'Space',tile:10,host:'hana.exe',public:true},{id:'r2',name:'A little spring romance',anime:'Spring, After You',theme:'Sakura',tile:3,host:'mika.chan',public:true},{id:'r3',name:'One more episode?',anime:'Moonblade Chronicle',theme:'Cinema',tile:0,host:'Kai',public:true}];
export const themes=['Anime Night','Cyber Tokyo','Sakura Dream','Shonen Fire','Ocean Blue','Purple Galaxy','Crimson Cloud','Minimal Light','Pure Dark','Retro Anime'];
