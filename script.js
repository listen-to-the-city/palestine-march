(function(){
"use strict";
const $=s=>document.querySelector(s);

/* ---------- i18n ---------- */
const T={
ko:{heroTitle:"Free Palestine,<br>해방을 위해 함께 걷는다",heroText:"온라인 팔레스타인 연대 행진. 깃발과 상징을 골라 나만의 아바타를 만들고, 행렬에 합류한 뒤 참여 인증 이미지를 받아 가세요.",
 heroTextAlt:"An online march in solidarity with Palestine. Pick flags and symbols to build your own avatar, join the procession, and take home a proof-of-participation image.",go:"행진 참여하기",credit:"디자인: 리슨투더시티",foot:"이미지를 소셜미디어에 올릴 때는 #FreePalestine #팔레스타인과연대 해시태그와 대체 텍스트를 함께 적어 주세요. 더 많은 사람이 함께 볼 수 있습니다.",
 back:"← 뒤로",backEdit:"← 다시 꾸미기",nameTitle:"행진에서 불릴<br>이름을 정해 주세요",nickPh:"예: 올리브나무",nickHint:"12자 이내. 다른 참여자에게 보이는 이름이에요.",next:"다음",
 moodQ:n=>`${n} 님, 오늘 어떤 마음으로 걷나요?`,reset:"처음 모습으로",rand:"랜덤 조합",finish:"완성하고 행진 합류",
 certTitle:"참여 인증",certLine:(n,d)=>`${n} 님은 ${d} 온라인 팔레스타인 연대 행진에 함께했습니다.`,no:n=>`행렬 ${n}번째 참여자`,
 tags:"#FreePalestine #팔레스타인과연대 #온라인연대행진",save:"인증 이미지 저장",saving:"만드는 중…",saved:"저장했어요",retry:"다시 시도",seeMarch:"행렬 보기",
 previewNote:"저장 창이 뜨지 않으면 이미지를 길게 누르거나 오른쪽 클릭해서 저장하세요.",altLabel:"대체 텍스트",altSub:"— 이미지를 올릴 때 함께 붙여 넣어 주세요",copy:"복사하기",copied:"복사했어요",
 loading:"행렬을 불러오는 중…",countN:n=>`<b>${n}</b>명이 함께 행진하고 있어요`,countFirst:"첫 번째로 행렬에 합류해 주세요",
 joinOk:"행렬에 합류했어요. 첫 화면에서 함께 걷는 모습을 볼 수 있어요.",joinView:"지금 보기 화면에서는 공유 행렬에 합류할 수 없어요. 인증 이미지는 그대로 저장할 수 있습니다.",joinPerm:"행렬 합류는 참여 권한이 있는 사람만 할 수 있어요. 인증 이미지는 그대로 저장할 수 있습니다.",
 pngSub:"온라인 팔레스타인 연대 행진",pngLine:(n,d)=>`${n} 님은 ${d} 함께 걸었습니다.`,
 date:d=>`${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일`,
 tabs:{look:"얼굴·머리",shirt:"옷",scarf:"스카프",hold:"들고 갈 것",pin:"배지",bg:"배경"},
 g:{skin:"피부색",hair:"머리 모양",hairc:"머리색",shirt:"옷 색",scarf:"목에 두를 것",hold:"손에 들 것",slogan:"피켓 문구",pin:"가슴 배지",bg:"배경"},
 moods:{calm:"차분하게 연대해요",firm:"단호해요",sad:"마음이 아파요",angry:"분노해요",hope:"희망을 품어요",shout:"목소리를 높여요"},
 o:{hair:{short:"짧은 머리",long:"긴 머리",bun:"올림 머리",curly:"곱슬",hijab:"히잡",cap:"모자",none:"없음"},
    scarf:{kbw:"쿠피예 (흑백)",krw:"쿠피예 (적백)",flag:"깃발 스카프",none:"없음"},
    hold:{flag:"팔레스타인 국기",rainbow:"무지개 깃발",progress:"프로그레스 프라이드",sign:"피켓",melon:"수박",olive:"올리브 가지",key:"귀환의 열쇠",none:"빈손"},
    pin:{poppy:"양귀비",melon:"수박 배지",rainbow:"무지개",leaf:"올리브 잎",none:"없음"},
    bg:{street:"거리",gbg:"경복궁",freepal:"Free Palestine",olive:"올리브 언덕",night:"촛불 밤",flag:"국기 색",none:"없음"}},
 slogans:["팔레스타인에 자유를","FREE PALESTINE","지금 당장 휴전","학살을 멈춰라","점령을 끝내라","가자에 구호를"],
 alt:(c,n,L)=>{const p=[`온라인 팔레스타인 연대 행진 참여 인증 이미지. ${n} 님의 아바타가 그려져 있다.`,`표정은 '${L.moods[c.mood]}' 마음을 나타낸다.`];
   if(c.hair!=="none")p.push(`${L.o.hair[c.hair]}를 하고 있다.`);if(c.scarf!=="none")p.push(`목에 ${L.o.scarf[c.scarf]}를 둘렀다.`);
   if(c.hold==="sign")p.push(`손에 '${L.slogans[c.slogan]}'라고 쓴 피켓을 들었다.`);else if(c.hold!=="none")p.push(`한 손에 ${L.o.hold[c.hold]}을(를) 높이 들었다.`);
   if(c.pin!=="none")p.push(`가슴에 ${L.o.pin[c.pin]} 배지를 달았다.`);if(c.bg!=="none")p.push(`배경은 ${L.o.bg[c.bg]}.`);return p.join(" ");},
 lang:"EN"},
en:{heroTitle:"Free Palestine,<br>we march for liberation",heroText:"An online march in solidarity with Palestine. Pick flags and symbols to build your own avatar, join the procession, and take home a proof-of-participation image.",
 heroTextAlt:"",go:"Join the march",credit:"Design: Listen to the City",foot:"When you post your image, add #FreePalestine #SolidarityWithPalestine and alt text so more people can see it.",
 back:"← Back",backEdit:"← Edit avatar",nameTitle:"What should the<br>march call you?",nickPh:"e.g. OliveTree",nickHint:"Up to 12 characters. Other marchers will see this name.",next:"Next",
 moodQ:n=>`${n}, how are you marching today?`,reset:"Start over",rand:"Randomize",finish:"Finish and join the march",
 certTitle:"I marched",certLine:(n,d)=>`${n} joined the Online March for Palestine on ${d}.`,no:n=>`Marcher no. ${n}`,
 tags:"#FreePalestine #SolidarityWithPalestine #OnlineMarch",save:"Save my image",saving:"Creating…",saved:"Saved",retry:"Try again",seeMarch:"See the march",
 previewNote:"If no save dialog appears, long-press or right-click the image to save it.",altLabel:"Alt text",altSub:"— paste this in when you post the image",copy:"Copy",copied:"Copied",
 loading:"Loading the march…",countN:n=>`<b>${n}</b> people are marching together`,countFirst:"Be the first to join the march",
 joinOk:"You've joined the march. You'll see yourself walking on the first screen.",joinView:"This view can't join the shared march, but you can still save your image.",joinPerm:"Only people with participant access can join the shared march. You can still save your image.",
 pngSub:"Online March for Palestine",pngLine:(n,d)=>`${n} marched on ${d}.`,
 date:d=>d.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),
 tabs:{look:"Face & hair",shirt:"Clothes",scarf:"Scarf",hold:"Carry",pin:"Badge",bg:"Background"},
 g:{skin:"Skin tone",hair:"Hairstyle",hairc:"Hair color",shirt:"Shirt color",scarf:"Around your neck",hold:"In your hand",slogan:"Sign text",pin:"Chest badge",bg:"Background"},
 moods:{calm:"Calm and steady",firm:"Resolute",sad:"Heartbroken",angry:"Angry",hope:"Hopeful",shout:"Raising my voice"},
 o:{hair:{short:"Short",long:"Long",bun:"Bun",curly:"Curly",hijab:"Hijab",cap:"Cap",none:"None"},
    scarf:{kbw:"Keffiyeh (black)",krw:"Keffiyeh (red)",flag:"Flag scarf",none:"None"},
    hold:{flag:"Palestinian flag",rainbow:"Rainbow flag",progress:"Progress Pride flag",sign:"Sign",melon:"Watermelon",olive:"Olive branch",key:"Key of return",none:"Nothing"},
    pin:{poppy:"Poppy",melon:"Watermelon",rainbow:"Rainbow",leaf:"Olive leaf",none:"None"},
    bg:{street:"Street",gbg:"Gyeongbokgung",freepal:"Free Palestine",olive:"Olive hill",night:"Candlelight",flag:"Flag colors",none:"None"}},
 slogans:["FREEDOM FOR PALESTINE","FREE PALESTINE","CEASEFIRE NOW","STOP THE GENOCIDE","END THE OCCUPATION","AID FOR GAZA"],
 alt:(c,n,L)=>{const p=[`Proof-of-participation image from the Online March for Palestine, showing ${n}'s avatar.`,`The expression reads "${L.moods[c.mood].toLowerCase()}".`];
   if(c.hair!=="none")p.push(`${L.o.hair[c.hair]} hair${c.hair==="hijab"||c.hair==="cap"?" covering":""}.`.replace("Hijab hair covering","Wearing a hijab").replace("Cap hair covering","Wearing a cap"));
   if(c.scarf!=="none")p.push(`A ${L.o.scarf[c.scarf].toLowerCase()} around the neck.`);
   if(c.hold==="sign")p.push(`Holding a sign that reads "${L.slogans[c.slogan]}".`);else if(c.hold!=="none")p.push(`Holding up a ${L.o.hold[c.hold].toLowerCase()}.`);
   if(c.pin!=="none")p.push(`A ${L.o.pin[c.pin].toLowerCase()} badge on the chest.`);if(c.bg!=="none")p.push(`Background: ${L.o.bg[c.bg]}.`);return p.join(" ");},
 lang:"한국어"}
};
let lang;try{lang=localStorage.getItem("pm_lang");}catch(e){}
if(!T[lang])lang=(navigator.language||"").toLowerCase().startsWith("ko")?"ko":"en";
let L=T[lang];

/* ---------- options ---------- */
const MOODK=["calm","firm","sad","angry","hope","shout"];
const SKIN=["#F6D7B8","#E7B48C","#C98E62","#9C6440","#6B4128"];
const HAIRC=["#1c1714","#4a2f22","#8a5a34","#c9a46a","#9a9690"];
const SHIRT=["#141312","#F3EEE4","#0E7A3E","#C8102E","#3d5a80","#7a6a55"];
const KEYS={hair:["short","long","bun","curly","hijab","cap","none"],scarf:["kbw","krw","flag","none"],hold:["flag","rainbow","progress","sign","melon","olive","key","none"],pin:["poppy","melon","rainbow","leaf","none"],bg:["street","gbg","freepal","olive","night","flag","none"]};
const RAINBOW=["#E40303","#FF8C00","#FFED00","#008026","#004DFF","#750787"];
const DEFAULT={mood:"calm",skin:1,hair:"short",hairc:0,shirt:0,scarf:"kbw",hold:"flag",pin:"poppy",bg:"street",slogan:0};
let st={nick:"",...DEFAULT};
try{const s=JSON.parse(localStorage.getItem("pm_av")||"null");if(s&&typeof s==="object")st={...st,...s};}catch(e){}
if(st.pin==="dove")st.pin="rainbow";
const persist=()=>{try{localStorage.setItem("pm_av",JSON.stringify(st));}catch(e){}};

/* ---------- avatar SVG ---------- */
const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const FONT="'Black Han Sans','Apple SD Gothic Neo','Malgun Gothic',Impact,sans-serif";
function gate(){ // Gwanghwamun-style gate of Gyeongbokgung
  const roof=(y,x1,x2,h)=>`<path d="M${x1-14} ${y+h}Q${x1} ${y+h-4} ${x1+8} ${y}H${x2-8}Q${x2} ${y+h-4} ${x2+14} ${y+h}Q${(x1+x2)/2} ${y+h-8} ${x1-14} ${y+h}Z" fill="#3c3d42"/>`;
  return `<rect width="280" height="320" fill="#cfe1ea"/>
  <path d="M0 150Q60 70 120 110Q170 60 230 100Q260 115 280 120V230H0Z" fill="#8fa48c"/>
  <path d="M0 180Q80 140 150 165Q220 140 280 165V230H0Z" fill="#a9b9a2"/>
  <rect x="10" y="200" width="260" height="60" fill="#c3b9a8"/>
  <g fill="#c3b9a8" stroke="#a89d8a" stroke-width="1">${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${10+i*32.5}" y="200" width="32.5" height="15"/><rect x="${10+i*32.5}" y="215" width="32.5" height="15"/>`).join("")}</g>
  <g fill="#3a2e28">${[60,140,220].map((x,i)=>`<path d="M${x-(i===1?22:17)} 260V${i===1?238:242}A${i===1?22:17} ${i===1?22:17} 0 0 1 ${x+(i===1?22:17)} ${i===1?238:242}V260Z"/>`).join("")}</g>
  <rect x="50" y="176" width="180" height="24" fill="#7e2a22"/>
  <g fill="#2f6b58">${[60,95,130,165,200].map(x=>`<rect x="${x}" y="178" width="20" height="8"/>`).join("")}</g>
  ${roof(160,46,234,16)}
  <rect x="78" y="140" width="124" height="20" fill="#7e2a22"/>
  <g fill="#2f6b58">${[86,116,146,176].map(x=>`<rect x="${x}" y="142" width="18" height="7"/>`).join("")}</g>
  ${roof(118,72,208,22)}
  <rect y="260" width="280" height="60" fill="#d8cfbf"/>`;
}
function avatarSVG(c,uid,lng){
  uid=uid||"a";const LL=T[lng||lang];
  const skin=SKIN[c.skin]||SKIN[1], hc=HAIRC[c.hairc]||HAIRC[0], sh=SHIRT[c.shirt]||SHIRT[0];
  const P=[],H=[]; // H: head layers shifted down (shorter neck)
  const defs=`<defs>
   <pattern id="kf${uid}" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
     <rect width="10" height="10" fill="#f5f1e8"/><path d="M0 0H10M0 0V10" stroke="${c.scarf==="krw"?"#b5121b":"#141312"}" stroke-width="2.4"/></pattern>
   <clipPath id="cl${uid}"><rect width="280" height="320"/></clipPath></defs>`;
  const fpRows=[["FREE PALESTINE","#F3EEE4"],["FREE PALESTINE","#2fa865"],["FREE PALESTINE","#e5455c"]];
  const bg={
    street:`<rect width="280" height="320" fill="#d6d7d9"/><g fill="#b4b6b9"><rect x="0" y="120" width="60" height="140"/><rect x="200" y="96" width="80" height="164"/></g><g fill="#c7c9cc">${[[10,135],[34,135],[10,170],[34,170],[212,110],[244,110],[212,150],[244,150]].map(p=>`<rect x="${p[0]}" y="${p[1]}" width="14" height="20"/>`).join("")}</g><rect y="250" width="280" height="70" fill="#8e9094"/><path d="M0 285H280" stroke="#f3f3f3" stroke-width="4" stroke-dasharray="22 16"/>`,
    gbg:gate(),
    freepal:`<rect width="280" height="320" fill="#141312"/>${[0,1,2,3,4,5,6,7].map(i=>{const r=fpRows[i%3];return `<text x="${i%2?-30:-4}" y="${36+i*40}" font-family="${FONT}" font-size="34" font-weight="900" fill="${r[1]}" opacity="${i===0||i===7?1:.85}">${r[0]} ${r[0]}</text>`;}).join("")}`,
    olive:`<rect width="280" height="320" fill="#dfe8d2"/><path d="M0 250Q90 205 280 240V320H0Z" fill="#8fa874"/><path d="M40 250V200" stroke="#5b4a36" stroke-width="5"/><circle cx="40" cy="190" r="22" fill="#6d8a55"/><circle cx="26" cy="200" r="13" fill="#7c9a62"/>`,
    night:`<rect width="280" height="320" fill="#1d2433"/><g fill="#f6e7b0">${[[30,40],[70,22],[240,58],[205,26],[255,140],[18,120]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="1.8"/>`).join("")}</g><g><rect x="22" y="258" width="12" height="34" fill="#f3eee4"/><path d="M28 244q7 8 0 14q-7-6 0-14z" fill="#ffb648"/><rect x="246" y="262" width="12" height="30" fill="#f3eee4"/><path d="M252 248q7 8 0 14q-7-6 0-14z" fill="#ffb648"/></g>`,
    flag:`<rect width="280" height="107" fill="#141312"/><rect y="107" width="280" height="106" fill="#F3EEE4"/><rect y="213" width="280" height="107" fill="#0E7A3E"/><path d="M0 0L120 160L0 320Z" fill="#C8102E"/>`,
    none:``
  }[c.bg]||"";
  P.push(bg);
  const hj=sh===SHIRT[0]?"#0E7A3E":"#141312";
  // back hair (shifted with head)
  const back=[];
  if(c.hair==="long")back.push(`<path d="M68 150Q62 88 130 84Q198 88 192 150L200 238Q166 222 130 222Q94 222 60 238Z" fill="${hc}"/>`);
  if(c.hair==="curly")back.push([[78,120],[90,92],[112,78],[140,76],[166,86],[182,110],[186,140],[74,146]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="20" fill="${hc}"/>`).join(""));
  if(c.hair==="hijab")back.push(`<path d="M70 156Q64 84 130 82Q196 84 190 156L198 226Q130 246 62 226Z" fill="${hj}"/>`);
  P.push(`<g transform="translate(0 12)">${back.join("")}</g>`);
  // body + short neck
  P.push(`<path d="M52 320Q50 228 130 222Q210 228 208 320Z" fill="${sh}" stroke="${sh===SHIRT[1]?"#cfc6b6":"none"}" stroke-width="2"/>`);
  P.push(`<rect x="118" y="200" width="24" height="28" rx="8" fill="${skin}"/>`);
  const holding=c.hold!=="none";
  if(holding)P.push(`<path d="M190 250Q214 214 222 170" fill="none" stroke="${sh}" stroke-width="30" stroke-linecap="round"/>`);
  // head
  H.push(`<ellipse cx="130" cy="146" rx="46" ry="52" fill="${skin}"/>`);
  H.push(`<ellipse cx="84" cy="150" rx="7" ry="11" fill="${skin}"/><ellipse cx="176" cy="150" rx="7" ry="11" fill="${skin}"/>`);
  const ink="#2a1d16";
  H.push({
    calm:`<path d="M106 140q6-5 12 0M142 140q6-5 12 0" stroke="${ink}" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M118 170q12 9 24 0" stroke="${ink}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`,
    firm:`<path d="M102 126l18 5M158 126l-18 5" stroke="${ink}" stroke-width="3.5" stroke-linecap="round"/><circle cx="112" cy="143" r="4.5" fill="${ink}"/><circle cx="148" cy="143" r="4.5" fill="${ink}"/><path d="M118 172h24" stroke="${ink}" stroke-width="3.5" stroke-linecap="round"/>`,
    sad:`<path d="M104 132l16-5M156 132l-16-5" stroke="${ink}" stroke-width="3.2" stroke-linecap="round"/><circle cx="112" cy="145" r="4.5" fill="${ink}"/><circle cx="148" cy="145" r="4.5" fill="${ink}"/><path d="M118 176q12-9 24 0" stroke="${ink}" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M152 154q4 8 0 12q-4-4 0-12z" fill="#7fb6e0"/>`,
    angry:`<path d="M100 124l20 9M160 124l-20 9" stroke="${ink}" stroke-width="4" stroke-linecap="round"/><circle cx="112" cy="145" r="4.5" fill="${ink}"/><circle cx="148" cy="145" r="4.5" fill="${ink}"/><path d="M116 176q14-8 28 0" stroke="${ink}" stroke-width="3.6" fill="none" stroke-linecap="round"/>`,
    hope:`<circle cx="112" cy="142" r="6" fill="${ink}"/><circle cx="148" cy="142" r="6" fill="${ink}"/><circle cx="114" cy="140" r="2" fill="#fff"/><circle cx="150" cy="140" r="2" fill="#fff"/><ellipse cx="100" cy="160" rx="8" ry="5" fill="#e98a7a" opacity=".5"/><ellipse cx="160" cy="160" rx="8" ry="5" fill="#e98a7a" opacity=".5"/><path d="M116 167q14 14 28 0" stroke="${ink}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`,
    shout:`<path d="M102 127l18 6M158 127l-18 6" stroke="${ink}" stroke-width="3.6" stroke-linecap="round"/><circle cx="112" cy="144" r="4.5" fill="${ink}"/><circle cx="148" cy="144" r="4.5" fill="${ink}"/><ellipse cx="130" cy="174" rx="12" ry="10" fill="${ink}"/><ellipse cx="130" cy="178" rx="7" ry="4" fill="#c4505a"/>`
  }[c.mood]||"");
  const fringe=`<path d="M82 146Q78 92 130 90Q182 92 178 146Q170 112 130 110Q92 112 82 146Z" fill="${hc}"/>`;
  if(c.hair==="short"||c.hair==="long")H.push(fringe);
  if(c.hair==="bun")H.push(fringe+`<circle cx="130" cy="84" r="20" fill="${hc}"/>`);
  if(c.hair==="curly")H.push([[96,104],[118,94],[144,94],[166,106]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="14" fill="${hc}"/>`).join(""));
  if(c.hair==="cap")H.push(fringe+`<path d="M82 124Q84 86 130 84Q176 86 178 124Z" fill="#C8102E"/><path d="M150 122Q186 118 200 128Q176 132 150 130Z" fill="#9b0c22"/>`);
  if(c.hair==="hijab")H.push(`<path fill-rule="evenodd" fill="${hj}" d="M74 150Q70 86 130 84Q190 86 186 150Q186 214 130 216Q74 214 74 150ZM130 100C100 100 90 124 90 148C90 182 108 200 130 200C152 200 170 182 170 148C170 124 160 100 130 100Z"/>`);
  P.push(`<g transform="translate(0 12)">${H.join("")}</g>`);
  // scarf
  if(c.scarf!=="none"){
    const fill=c.scarf==="flag"?"#0E7A3E":`url(#kf${uid})`;
    P.push(`<path d="M84 214Q130 248 176 214L186 234Q130 274 74 234Z" fill="${fill}"/>`);
    if(c.scarf==="flag")P.push(`<path d="M84 214Q130 248 176 214L178 220Q130 254 82 220Z" fill="#141312"/><path d="M80 228Q130 262 182 228L186 234Q130 274 74 234Z" fill="#F3EEE4"/><path d="M150 240l14 46l16-6l-10-44z" fill="#C8102E"/>`);
    else P.push(`<path d="M150 240l14 46l16-6l-10-44z" fill="${fill}"/><path d="M164 286v8M170 284v8M176 282v8" stroke="${c.scarf==="krw"?"#b5121b":"#141312"}" stroke-width="2"/>`);
  }
  // pin
  P.push({
    poppy:`<g transform="translate(98 270)"><circle r="11" fill="#C8102E"/><circle cx="-6" cy="-6" r="7" fill="#e0263f"/><circle cx="6" cy="-6" r="7" fill="#e0263f"/><circle r="4" fill="#141312"/></g>`,
    melon:`<g transform="translate(98 270)"><path d="M-13 -4A13 13 0 0 0 13 -4Z" fill="#0E7A3E"/><path d="M-10 -4A10 10 0 0 0 10 -4Z" fill="#e6334a"/><circle cx="-4" cy="0" r="1.4" fill="#141312"/><circle cx="3" cy="1" r="1.4" fill="#141312"/></g>`,
    rainbow:`<g transform="translate(98 274)"><circle r="14" fill="#fff" stroke="#d8d0c2"/>${RAINBOW.map((col,i)=>`<path d="M${-11+i*1.6} 3A${11-i*1.6} ${11-i*1.6} 0 0 1 ${11-i*1.6} 3" fill="none" stroke="${col}" stroke-width="1.8"/>`).join("")}</g>`,
    leaf:`<g transform="translate(98 270) rotate(-30)"><ellipse rx="12" ry="5" fill="#6d8a55"/><path d="M-12 0H12" stroke="#4b6239" stroke-width="1.4"/></g>`,
    none:""
  }[c.pin]||"");
  // held item (hand 222,166)
  const hand=`<circle cx="222" cy="166" r="14" fill="${skin}"/>`;
  const pole=`<path d="M226 22V200" stroke="#6b5640" stroke-width="5" stroke-linecap="round"/>`;
  const slog=LL.slogans[c.slogan]||LL.slogans[0];
  P.push({
    flag:`${pole}<rect x="150" y="24" width="76" height="16" fill="#141312"/><rect x="150" y="40" width="76" height="16" fill="#F3EEE4"/><rect x="150" y="56" width="76" height="16" fill="#0E7A3E"/><path d="M226 24L190 48L226 72Z" fill="#C8102E"/>${hand}`,
    rainbow:`${pole}${RAINBOW.map((col,i)=>`<rect x="150" y="${24+i*8}" width="76" height="8" fill="${col}"/>`).join("")}${hand}`,
    progress:`${pole}${RAINBOW.map((col,i)=>`<rect x="150" y="${24+i*8}" width="76" height="8" fill="${col}"/>`).join("")}${[[32,"#000"],[24,"#784F17"],[16,"#5BCEFA"],[8,"#F5A9B8"],[0,"#FFFFFF"]].map(([a,col])=>`<path d="M226 24H${226-a}L${202-a} 48L${226-a} 72H226Z" fill="${col}"/>`).join("")}${hand}`,
    sign:(()=>{const w=slog.split(" ");let l1=slog,l2="";if(w.length>1){const h=Math.ceil(w.length/2);l1=w.slice(0,h).join(" ");l2=w.slice(h).join(" ");}const mx=Math.max(l1.length,l2.length);const fs=mx>10?11:mx>7?13:16;return `<path d="M222 96V200" stroke="#6b5640" stroke-width="5"/><rect x="158" y="18" width="116" height="80" fill="#F3EEE4" stroke="#141312" stroke-width="3"/><rect x="158" y="18" width="116" height="10" fill="#C8102E"/><text x="216" y="${l2?58:68}" text-anchor="middle" font-family="${FONT}" font-size="${fs}" font-weight="700" fill="#141312">${esc(l1)}</text>${l2?`<text x="216" y="${58+fs+4}" text-anchor="middle" font-family="${FONT}" font-size="${fs}" font-weight="700" fill="#141312">${esc(l2)}</text>`:""}${hand}`;})(),
    melon:`<g transform="translate(222 132) rotate(-12)"><path d="M-40 0A40 40 0 0 0 40 0Z" fill="#0E7A3E"/><path d="M-34 0A34 34 0 0 0 34 0Z" fill="#F3EEE4"/><path d="M-30 0A30 30 0 0 0 30 0Z" fill="#e6334a"/>${[[-16,8],[-4,14],[10,10],[20,5],[2,5]].map(p=>`<ellipse cx="${p[0]}" cy="${p[1]}" rx="2" ry="3.2" fill="#141312"/>`).join("")}</g>${hand}`,
    olive:`<path d="M222 166Q214 110 190 66" stroke="#6b5640" stroke-width="4" fill="none"/>${[[214,130,-40],[208,112,30],[202,96,-40],[196,80,30],[190,66,-20]].map(p=>`<ellipse cx="${p[0]}" cy="${p[1]}" rx="12" ry="5" fill="#6d8a55" transform="rotate(${p[2]} ${p[0]} ${p[1]})"/>`).join("")}<circle cx="218" cy="118" r="4" fill="#3d3a2a"/><circle cx="200" cy="88" r="4" fill="#3d3a2a"/>${hand}`,
    key:`<g transform="translate(222 100) rotate(-8)"><circle cx="0" cy="-36" r="20" fill="none" stroke="#2b2b2b" stroke-width="9"/><rect x="-5" y="-18" width="10" height="84" fill="#2b2b2b"/><rect x="5" y="44" width="16" height="8" fill="#2b2b2b"/><rect x="5" y="56" width="11" height="8" fill="#2b2b2b"/></g>${hand}`,
    none:""
  }[c.hold]||"");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 320" aria-hidden="true">${defs}<g clip-path="url(#cl${uid})">${P.join("")}</g></svg>`;
}

/* ---------- static text ---------- */
function applyLang(){
  document.documentElement.lang=lang;
  document.querySelectorAll("[data-t]").forEach(e=>{const v=L[e.dataset.t];if(typeof v==="string")e.textContent=v;});
  document.querySelectorAll("[data-h]").forEach(e=>{e.innerHTML=L[e.dataset.h];});
  $("#lang").textContent=L.lang;
  $("#nick").placeholder=L.nickPh;
  document.title=lang==="ko"?"온라인 팔레스타인 연대 행진":"Online March for Palestine";
  $("#moodQ").textContent=L.moodQ(st.nick||"");
  renderLane();
  if($("#s-mood").classList.contains("on"))renderMoods();
  if($("#s-build").classList.contains("on")){renderStage();renderTabs();}
  if($("#s-cert").classList.contains("on"))fillCert();
}
$("#lang").onclick=()=>{lang=lang==="ko"?"en":"ko";L=T[lang];try{localStorage.setItem("pm_lang",lang);}catch(e){}applyLang();};

/* ---------- navigation ---------- */
function show(id){document.querySelectorAll(".screen").forEach(s=>s.classList.toggle("on",s.id===id));window.scrollTo(0,0);}
document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>show(b.dataset.go));
$("#go").onclick=()=>{show("s-name");setTimeout(()=>$("#nick").focus(),50);};
const nick=$("#nick");nick.value=st.nick||"";
const upd=()=>{$("#toMood").disabled=!nick.value.trim();};
nick.oninput=upd;upd();
nick.onkeydown=e=>{if(e.key==="Enter"&&nick.value.trim())$("#toMood").click();};
$("#toMood").onclick=()=>{st.nick=nick.value.trim().slice(0,12);persist();$("#moodQ").textContent=L.moodQ(st.nick);renderMoods();show("s-mood");};
function renderMoods(){
  const box=$("#moods");box.innerHTML="";
  MOODK.forEach(k=>{const b=document.createElement("button");b.className="mood";b.textContent=L.moods[k];b.setAttribute("aria-pressed",st.mood===k);b.onclick=()=>{st.mood=k;persist();renderMoods();};box.appendChild(b);});
}
$("#toBuild").onclick=()=>{renderStage();renderTabs();show("s-build");};

/* ---------- builder ---------- */
const TABK=["look","shirt","scarf","hold","pin","bg"];
let tab="hold";
function renderStage(){$("#stage").innerHTML=avatarSVG(st,"m");$("#stage").setAttribute("aria-label",L.alt(st,st.nick,L));}
function chips(key,items,cur,onPick){
  const wrap=document.createElement("div");wrap.innerHTML=`<h3>${L.g[key]}</h3>`;
  const g=document.createElement("div");g.className="chips";
  items.forEach(([v,t])=>{const b=document.createElement("button");b.className="chip";b.textContent=t;b.setAttribute("aria-pressed",cur===v);b.onclick=()=>onPick(v);g.appendChild(b);});
  wrap.appendChild(g);return wrap;
}
const setK=(k,v)=>{st[k]=v;persist();renderStage();renderPanel();};
const optChips=k=>chips(k,KEYS[k].map(v=>[v,L.o[k][v]]),st[k],v=>setK(k,v));
function swatches(key,colors){
  const wrap=document.createElement("div");wrap.innerHTML=`<h3>${L.g[key]}</h3>`;
  const g=document.createElement("div");g.className="chips";
  colors.forEach((c,i)=>{const b=document.createElement("button");b.className="sw";b.style.background=c;b.setAttribute("aria-label",`${L.g[key]} ${i+1}`);b.setAttribute("aria-pressed",st[key]===i);b.onclick=()=>setK(key,i);g.appendChild(b);});
  wrap.appendChild(g);return wrap;
}
function renderTabs(){
  const t=$("#tabs");t.innerHTML="";
  TABK.forEach(k=>{const b=document.createElement("button");b.className="tab";b.setAttribute("role","tab");b.textContent=L.tabs[k];b.setAttribute("aria-selected",tab===k);b.onclick=()=>{tab=k;renderTabs();};t.appendChild(b);});
  renderPanel();
}
function renderPanel(){
  const p=$("#panel");p.innerHTML="";
  if(tab==="look"){p.appendChild(swatches("skin",SKIN));p.appendChild(optChips("hair"));if(st.hair!=="hijab"&&st.hair!=="none")p.appendChild(swatches("hairc",HAIRC));}
  if(tab==="shirt")p.appendChild(swatches("shirt",SHIRT));
  if(tab==="scarf")p.appendChild(optChips("scarf"));
  if(tab==="hold"){p.appendChild(optChips("hold"));if(st.hold==="sign")p.appendChild(chips("slogan",L.slogans.map((s,i)=>[i,s]),st.slogan,v=>setK("slogan",v)));}
  if(tab==="pin")p.appendChild(optChips("pin"));
  if(tab==="bg")p.appendChild(optChips("bg"));
}
const rnd=n=>Math.floor(Math.random()*n), pick=a=>a[rnd(a.length)];
$("#rand").onclick=()=>{Object.assign(st,{skin:rnd(SKIN.length),hairc:rnd(HAIRC.length),shirt:rnd(SHIRT.length),hair:pick(KEYS.hair),scarf:pick(KEYS.scarf),hold:pick(KEYS.hold.filter(k=>k!=="none")),pin:pick(KEYS.pin),bg:pick(KEYS.bg),slogan:rnd(6)});persist();renderStage();renderPanel();};
$("#reset").onclick=()=>{Object.assign(st,DEFAULT,{mood:st.mood});persist();renderStage();renderPanel();};

/* ---------- march (shared db) ---------- */
let db=null,uid=null,marchers=[],loaded=false;
const cfgOf=d=>({mood:d.mood,skin:d.skin,hair:d.hair,hairc:d.hairc,shirt:d.shirt,scarf:d.scarf,hold:d.hold,pin:d.pin==="dove"?"rainbow":d.pin,bg:"none",slogan:d.slogan});
const SAMPLE=[{...DEFAULT,bg:"none"},{...DEFAULT,hair:"hijab",shirt:3,hold:"sign",slogan:1,mood:"firm",scarf:"none",bg:"none"},
  {...DEFAULT,hair:"long",hairc:1,skin:3,hold:"melon",scarf:"krw",mood:"hope",bg:"none"},{...DEFAULT,hair:"cap",skin:4,shirt:2,hold:"progress",pin:"rainbow",mood:"shout",bg:"none"},
  {...DEFAULT,hair:"curly",hairc:2,skin:2,shirt:1,hold:"olive",scarf:"flag",mood:"sad",bg:"none"},{...DEFAULT,hair:"bun",skin:0,shirt:4,hold:"key",mood:"angry",bg:"none"}];
let seed=7;const srnd=n=>{seed=(seed*16807)%2147483647;return seed%n;};
const VARIETY=Array.from({length:18},()=>({mood:MOODK[srnd(6)],skin:srnd(SKIN.length),hair:KEYS.hair[srnd(6)],hairc:srnd(HAIRC.length),shirt:srnd(SHIRT.length),scarf:KEYS.scarf[srnd(4)],hold:KEYS.hold[srnd(7)],pin:KEYS.pin[srnd(5)],bg:"none",slogan:srnd(6)}));
function renderLane(){
  const real=marchers.map(cfgOf).slice(0,24);
  const seq=real.length>=16?real:[...real,...SAMPLE,...VARIETY].slice(0,Math.max(16,real.length));
  const html=seq.map((c,i)=>avatarSVG(c,"l"+i)).join("");
  $("#lane").innerHTML=html+html.replace(/(kf|cl)l(\d+)/g,"$1r$2");
  const n=marchers.length;
  $("#count").innerHTML=n?L.countN(n>=200?"200+":n):(loaded?L.countFirst:L.loading);
}
(async()=>{
  if(!window.claude||!claude.use){loaded=true;renderLane();return;}
  try{
    db=await claude.use("db");const user=await claude.use("user");
    if(user)uid=await user.id();
    if(!db){loaded=true;renderLane();return;}
    db.collection("marchers").orderBy("ts","desc").limit(200).onSnapshot(snap=>{loaded=true;marchers=snap.docs.map(d=>d.data()).filter(Boolean);renderLane();},()=>{loaded=true;renderLane();});
  }catch(e){loaded=true;renderLane();}
})();
let joinState="";
async function join(){
  if(!db||!uid){joinState="joinView";return null;}
  try{
    const ref=db.doc("marchers/"+uid);const prev=await ref.get();const pd=prev.exists?prev.data():null;
    const data={nick:st.nick,mood:st.mood,skin:st.skin,hair:st.hair,hairc:st.hairc,shirt:st.shirt,scarf:st.scarf,hold:st.hold,pin:st.pin,slogan:st.slogan,ts:pd&&pd.ts?pd.ts:Date.now(),updated:Date.now()};
    await ref.set(data);joinState="joinOk";return data.ts;
  }catch(e){joinState="joinPerm";return null;}
}

/* ---------- certificate ---------- */
let certN=0;
function fillCert(){
  $("#certAv").innerHTML=avatarSVG(st,"c");
  $("#certLine").textContent=L.certLine(st.nick,L.date(new Date()));
  $("#certNo").textContent=certN?L.no(certN):"";
  $("#altText").value=L.alt(st,st.nick,L);
  $("#joinMsg").textContent=joinState?L[joinState]:"";
}
$("#finish").onclick=async()=>{
  const btn=$("#finish");btn.disabled=true;
  joinState="";certN=0;$("#preview").style.display="none";fillCert();show("s-cert");
  const ts=await join();
  certN=ts?(marchers.filter(m=>m.ts<=ts).length||1):0;
  fillCert();btn.disabled=false;
};
$("#seeMarch").onclick=()=>show("s-home");
$("#copyAlt").onclick=async()=>{const t=$("#altText");try{await navigator.clipboard.writeText(t.value);}catch(e){t.select();try{document.execCommand("copy");}catch(_){}}$("#copyAlt").textContent=L.copied;setTimeout(()=>$("#copyAlt").textContent=L.copy,1600);};

function wrapText(ctx,text,maxW){const out=[];const units=lang==="en"?text.split(/(\s+)/):[...text];let line="";for(const u of units){const t=line+u;if(ctx.measureText(t).width>maxW&&line.trim()){out.push(line.trim());line=u.trimStart();}else line=t;}if(line.trim())out.push(line.trim());return out;}
async function makePNG(){
  await document.fonts.ready;
  const W=1080,Hh=1350,cv=document.createElement("canvas");cv.width=W;cv.height=Hh;const x=cv.getContext("2d");
  x.fillStyle="#F3EEE4";x.fillRect(0,0,W,Hh);
  ["#141312","#F3EEE4","#0E7A3E","#C8102E"].forEach((c,i)=>{x.fillStyle=c;x.fillRect(i*W/4,0,W/4,18);});
  x.fillStyle="#141312";x.font="88px 'Black Han Sans', Impact, sans-serif";x.fillText(L.certTitle,72,150);
  x.font="500 34px 'IBM Plex Sans KR', sans-serif";x.fillStyle="#5d5850";x.fillText(L.pngSub,72,205);
  const img=new Image();
  await new Promise((res,rej)=>{img.onload=res;img.onerror=rej;img.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(avatarSVG(st,"p"));});
  x.fillStyle="#141312";x.fillRect(70,250,940,780);x.drawImage(img,74,254,932,776);
  x.fillStyle="#141312";x.font="700 44px 'IBM Plex Sans KR', sans-serif";
  let y=1100;wrapText(x,L.pngLine(st.nick,L.date(new Date())),936).forEach(l=>{x.fillText(l,72,y);y+=58;});
  if(certN){x.font="40px 'Black Han Sans', Impact, sans-serif";x.fillText(L.no(certN),72,y+4);y+=58;}
  x.fillStyle="#0E7A3E";x.font="500 32px 'IBM Plex Sans KR', sans-serif";x.fillText(L.tags,72,Math.min(y+10,1300));
  return new Promise(r=>cv.toBlob(r,"image/png"));
}
$("#save").onclick=async()=>{
  const b=$("#save");b.disabled=true;b.textContent=L.saving;
  try{
    const blob=await makePNG();
    $("#previewImg").src=URL.createObjectURL(blob);$("#previewImg").alt=$("#altText").value;$("#preview").style.display="block";
    let saved=false;
    if(window.claude&&claude.use){try{const dl=await claude.use("downloads");if(dl){await dl.save({filename:`palestine-march-${st.nick||"me"}.png`,data:blob});saved=true;}}catch(e){}}
    b.textContent=saved?L.saved:L.save;
  }catch(e){b.textContent=L.retry;}
  b.disabled=false;
};
applyLang();
})();
