function $(i){return document.getElementById(i)}
var baseSec=1500,ps=1500,pi=null,st={lang:'ar',cycle:'primary',grade:'1ap',track:'',read:[],solved:[],busy:{}},db={cycles:[],grades:[],tracks:[],subjects:[],lessons:[]};
try{var sv=localStorage.getItem('mk_st');if(sv)st=Object.assign(st,JSON.parse(sv))}catch(e){}
function saveSt(){try{localStorage.setItem('mk_st',JSON.stringify(st))}catch(e){}}
var T={
ar:{dir:'rtl',n1:'الرئيسية',n2:'الدروس',n3:'التمارين والفروض',n4:'الملخصات',n5:'أستاذ مذاكر',n6:'قارئ الصور والجدول',n7:'وضع التركيز والوقت',n8:'تقدمي',ht:'مذاكر – المنصة التعليمية المغربية',hd:'من 1 ابتدائي إلى 2 باكالوريا مجاناً بالكامل.',gb:'استكشف الدروس',cg:'اختيار المستوى والشعبة',ct:'الشعبة:',et:'التمارين',pt:'الفروض PDF',emp:'لا توجد عناصر مضافة لهذا المستوى بعد.',all:'-- كل المواد --',mcq:'🎯 سؤال اختياري',wr:'✍️ تمرين تحريري',sol:'إظهار الحل المفصل ✓'},
fr:{dir:'ltr',n1:'Accueil',n2:'Cours',n3:'Exercices & Devoirs',n4:'Résumés',n5:'Prof IA',n6:'Emploi & Coefs',n7:'Mode Focus',n8:'Progrès',ht:'Moudhakkir – Programme Marocain',hd:'De la 1ère AP au 2ème Bac gratuitement.',gb:'Explorer les cours',cg:'Choisir le niveau',ct:'Filière :',et:'Exercices',pt:'Devoirs PDF',emp:'Aucun contenu pour ce niveau.',all:'-- Toutes --',mcq:'🎯 QCM',wr:'✍️ Exercice écrit',sol:'Voir la correction ✓'},
ber:{dir:'ltr',n1:'ⴰⵎⵣⵡⴰⵔⵓ',n2:'ⵜⵉⵎⵙⵉⵔⵉⵏ',n3:'ⵉⵍⵓⵖⵎⴰ',n4:'ⵜⵉⴳⵣⴰⵍ',n5:'ⴰⵙⵍⵎⴰⴷ',n6:'ⴰⵖⴰⵡⴰⵙ',n7:'ⴰⴽⵓⴷ',n8:'ⴰⵏⴼⵍⵓⵙ',ht:'ⵎⵓⴷⴰⴽⵉⵔ – ⴰⵖⴰⵡⴰⵙ ⴰⵎⵖⵔⴰⴱⵉ',hd:'ⵙⴳ ⵓⵎⵏⵣⵓ ⴰⵔ ⵍⴱⴰⴽⴰⵍⵓⵔⵢⴰ.',gb:'ⵜⵉⵎⵙⵉⵔⵉⵏ',cg:'ⵙⵜⵉ ⴰⵙⵡⵉⵔ',ct:'ⵜⴰⵣⵓⵏⵉ:',et:'ⵉⵍⵓⵖⵎⴰ',pt:'ⵉⵙⵉⵜⵏ PDF',emp:'ⵓⵔ ⵍⵍⵉⵏⵜ ⵜⵎⵙⵉⵔⵉⵏ ⵙⵓⵍ.',all:'-- ⵎⴰⵕⵕⴰ --',mcq:'🎯 QCM',wr:'✍️ ⴰⵍⵓⵖⵎⵓ',sol:'ⵙⴽⵏ ⴰⴼⵙⵙⴰⵢ ✓'}
};
var COEFS={primary:[['الرياضيات',3],['العربية',3],['الفرنسية',3],['النشاط العلمي',2],['الإسلاميات/اجتماعيات',1]],middle:[['الرياضيات',3],['العربية',3],['الفرنسية',3],['الفيزياء',2],['ع.ح.أ',2],['اجتماعيات/إسلاميات',2]],'tc-sci':[['الرياضيات',4],['الفيزياء والكيمياء',4],['ع.ح.أ',4],['الفرنسية',3],['العربية/إنجليزية/فلسفة',2]],'tc-lit':[['العربية',4],['الفرنسية',4],['اجتماعيات',3],['إنجليزية',3],['فلسفة/رياضيات',2]],'1bac-se':[['الرياضيات',7],['الفيزياء',7],['ع.ح.أ',5],['الفرنسية (جهوي)',4],['مواد الجهوي',2]],'1bac-sm':[['الرياضيات',9],['الفيزياء',7],['الفرنسية (جهوي)',4],['ع.ح.أ',3],['مواد الجهوي',2]],'1bac-lit':[['العربية',4],['الفرنسية',4],['اجتماعيات',4],['إنجليزية',3],['رياضيات/إسلاميات',2]],'2bac-pc':[['الفيزياء والكيمياء',7],['الرياضيات',7],['ع.ح.أ',5],['الإنجليزية',2],['الفلسفة',2]],'2bac-svt':[['ع.ح.أ',7],['الرياضيات',7],['الفيزياء',5],['الإنجليزية',2],['الفلسفة',2]],'2bac-sm':[['الرياضيات',9],['الفيزياء',7],['ع.ح.أ/م',3],['الإنجليزية',2],['الفلسفة',2]],'2bac-eco':[['المحاسبة',6],['الاقتصاد',6],['الرياضيات',4],['الإنجليزية',2],['الفلسفة',2]],'2bac-sh':[['العربية',4],['الفلسفة',4],['الاجتماعيات',4],['الإنجليزية',4],['الرياضيات',1]]};
function getCoefs(){if(st.track&&COEFS[st.track])return COEFS[st.track];if(st.cycle==='primary')return COEFS.primary;if(st.cycle==='middle')return COEFS.middle;return COEFS['tc-sci']}
function showCoefs(){var l=getCoefs(),ag=db.grades.find(function(g){return g.id===st.grade}),tr=db.tracks.find(function(t){return t.id===st.track});$('coef-lbl').textContent=(tr?nm(tr):(ag?nm(ag):''));$('coef-tags').innerHTML=l.map(function(x){return'<span class="tag">'+x[0]+' (معامل '+x[1]+')</span>'}).join('')}
function esc(s){return String(s||'').replace(/[&<>"']/g,function(m){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]})}
function nm(o){return o?(o['name_'+st.lang]||o.name_ar||''):''}
function go(id){document.querySelectorAll('.sec').forEach(function(s){s.classList.remove('active')});var t=$(id);if(t)t.classList.add('active');document.querySelectorAll('.nb,nav.bnav button').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-s')===id)});window.scrollTo(0,0)}
function setLang(l){st.lang=T[l]?l:'ar';saveSt();document.documentElement.lang=st.lang;document.documentElement.dir=T[st.lang].dir;['ar','fr','ber'].forEach(function(x){$('la-'+x).classList.toggle('active',x===st.lang)});document.querySelectorAll('[data-k]').forEach(function(el){var k=el.getAttribute('data-k');if(T[st.lang][k])el.textContent=T[st.lang][k]});renderUI();loadC()}
function renderUI(){
var gObj=db.grades.find(function(g){return g.id===st.grade});$('ag').textContent=gObj?nm(gObj):'جاهز ✓';
if(!db.cycles.length){showCoefs();return}
$('cyc').innerHTML='';db.cycles.forEach(function(c){var b=document.createElement('button');b.className='pill'+(st.cycle===c.id?' active':'');b.textContent=nm(c);b.onclick=function(){st.cycle=c.id;var f=db.grades.find(function(g){return g.cycle_id===c.id});if(f)st.grade=f.id;st.track='';saveSt();renderUI();loadC()};$('cyc').appendChild(b)});
$('grd').innerHTML='';db.grades.filter(function(g){return g.cycle_id===st.cycle}).forEach(function(g){var d=document.createElement('div');d.className='item';if(st.grade===g.id)d.style.cssText='border-color:var(--nv);background:var(--ns)';d.innerHTML='<strong>'+esc(nm(g))+'</strong>';d.onclick=function(){st.grade=g.id;st.track='';saveSt();renderUI();loadC()};$('grd').appendChild(d)});
var trs=db.tracks.filter(function(t){return t.grade_id===st.grade});$('trk').innerHTML='';
if(trs.length){$('trw').style.display='block';if(!st.track||!trs.some(function(x){return x.id===st.track}))st.track=trs[0].id;trs.forEach(function(t){var b=document.createElement('button');b.className='pill'+(st.track===t.id?' active':'');b.textContent=nm(t);b.onclick=function(){st.track=t.id;saveSt();renderUI();loadC()};$('trk').appendChild(b)})}else{$('trw').style.display='none';st.track=''}
var pv=$('sf').value;$('sf').innerHTML='<option value="">'+esc(T[st.lang].all)+'</option>'+db.subjects.map(function(s){return'<option value="'+s.id+'">'+esc(nm(s))+'</option>'}).join('');$('sf').value=pv;showCoefs();
}
var sb=window.supabase?window.supabase.createClient('https://rdbdfirmgatghmxdrmbp.supabase.co','sb_publishable_BPJGaWqlyS6vw--_Ha1mGQ_2f4fT4cl'):null;
function mbtns(p,i){var h='<div class="mbox">';if(p)h+='<a href="https://docs.google.com/viewer?embedded=true&url='+encodeURIComponent(p)+'" target="_blank" class="btn bg">👁️ قراءة PDF</a><a href="'+esc(p)+'?download=" target="_blank" class="btn bn">⬇️ تحميل PDF</a>';if(i)h+='<a href="'+esc(i)+'" target="_blank" class="btn bg">👁️ فتح الصورة</a><a href="'+esc(i)+'?download=" target="_blank" class="btn bn">⬇️ تحميل الصورة</a>';return h+'</div>'}
async function loadC(){
if(!sb)return;
var r=await sb.from('curriculum_subjects').select('*').eq('grade_id',st.grade);
var mcs=(r.data||[]).filter(function(x){return(!st.track||x.track_id===st.track||x.track_id===null)&&(!$('sf').value||x.subject_id===$('sf').value)});
var ids=mcs.map(function(x){return x.id});
if(!ids.length){['lb','eb','exb','sbx'].forEach(function(i){$(i).innerHTML='<p>'+esc(T[st.lang].emp)+'</p>'});return}
var res=await Promise.all([sb.from('lessons').select('*').in('curriculum_subject_id',ids).order('order_index'),sb.from('exams').select('*').in('curriculum_subject_id',ids).order('created_at',{ascending:false})]);
db.lessons=res[0].data||[];
$('lb').innerHTML=db.lessons.length?db.lessons.map(function(l){var ti=l['title_'+st.lang]||l.title_ar,bd=(l['content_'+st.lang]||l.content_ar).replace(/═+/g,'').trim();return'<div class="item" onclick="openL(\''+l.id+'\')"><h4>'+esc(ti)+'</h4><p style="font-size:.82rem;color:#475569">'+esc(bd.slice(0,55))+'...</p>'+(l.pdf_url?'<span class="tag">📄 PDF</span>':'')+(l.image_url?'<span class="tag">🖼️ صورة</span>':'')+'</div>'}).join(''):'<p>'+esc(T[st.lang].emp)+'</p>';
var exm=res[1].data||[];
$('exb').innerHTML=exm.length?exm.map(function(e){return'<div class="item" style="cursor:default"><strong>'+esc(e['title_'+st.lang]||e.title_ar)+'</strong>'+mbtns(e.subject_pdf_url,null)+(e.correction_pdf_url?'<div class="mbox"><a href="https://docs.google.com/viewer?embedded=true&url='+encodeURIComponent(e.correction_pdf_url)+'" target="_blank" class="btn bg">👁️ قراءة التصحيح</a><a href="'+esc(e.correction_pdf_url)+'?download=" target="_blank" class="btn bn">⬇️ تحميل التصحيح</a></div>':'')+'</div>'}).join(''):'<p>'+esc(T[st.lang].emp)+'</p>';
var lids=db.lessons.map(function(l){return l.id});
if(!lids.length){$('eb').innerHTML=$('sbx').innerHTML='<p>'+esc(T[st.lang].emp)+'</p>';return}
var r2=await Promise.all([sb.from('exercises').select('*').in('lesson_id',lids).order('created_at'),sb.from('summaries').select('*').in('lesson_id',lids)]);
var exs=r2[0].data||[];$('eb').innerHTML=exs.length?'':'<p>'+esc(T[st.lang].emp)+'</p>';
exs.forEach(function(q){
var d=document.createElement('div');d.className='card';d.style.background='var(--bg)';
var hasOpts=q.options&&q.options.length>0,solTxt=q['explanation_'+st.lang]||q.explanation_ar||'';
d.innerHTML='<span class="tag">'+(hasOpts?T[st.lang].mcq:T[st.lang].wr)+'</span><div style="white-space:pre-line;font-weight:700;margin-bottom:6px">'+esc(q['question_'+st.lang]||q.question_ar)+'</div>'+(q.image_url?'<img src="'+esc(q.image_url)+'" class="th">':'')+((q.pdf_url||q.image_url)?mbtns(q.pdf_url,q.image_url):'');
if(hasOpts){(q.options||[]).forEach(function(o){var b=document.createElement('button');b.className='opt';b.textContent=o['text_'+st.lang]||o.text_ar;b.onclick=function(){d.querySelectorAll('.opt').forEach(function(z){z.className='opt'});b.className='opt '+(o.is_correct?'ok':'no');if($('x'+q.id).textContent)$('x'+q.id).style.display='block';if(o.is_correct&&st.solved.indexOf(q.id)<0){st.solved.push(q.id);saveSt();updP()}};d.appendChild(b)})}
else if(solTxt){var sbBtn=document.createElement('button');sbBtn.className='btn bg';sbBtn.style.marginTop='6px';sbBtn.textContent=T[st.lang].sol;sbBtn.onclick=function(){var el=$('x'+q.id);el.style.display=el.style.display==='block'?'none':'block';if(st.solved.indexOf(q.id)<0){st.solved.push(q.id);saveSt();updP()}};d.appendChild(sbBtn)}
var sd=document.createElement('div');sd.id='x'+q.id;sd.className='sol';sd.textContent=solTxt;d.appendChild(sd);$('eb').appendChild(d);
});
var sms=r2[1].data||[];
$('sbx').innerHTML=sms.length?sms.map(function(s){return'<div class="item" style="cursor:default"><strong>'+esc(s['title_'+st.lang]||s.title_ar)+'</strong><ul style="padding-inline-start:16px;font-size:.84rem;margin-top:4px">'+(s.key_points||[]).map(function(p){return'<li>'+esc(p[st.lang]||p.ar)+'</li>'}).join('')+'</ul>'+(s.mindmap_url?'<img src="'+esc(s.mindmap_url)+'" class="th">':'')+mbtns(s.pdf_url,s.mindmap_url)+'</div>'}).join(''):'<p>'+esc(T[st.lang].emp)+'</p>';
updP();
}
function openL(id){var l=db.lessons.find(function(x){return x.id===id});if(!l)return;$('mt').textContent=l['title_'+st.lang]||l.title_ar;var btns=mbtns(l.pdf_url,l.image_url);$('mm').innerHTML=btns;$('mm2').innerHTML=btns;if(l.image_url){$('mi').src=l.image_url;$('mi').style.display='block'}else{$('mi').style.display='none'}$('mb').textContent=(l['content_'+st.lang]||l.content_ar).replace(/═+/g,'---');$('md').className='modal open';if(st.read.indexOf(id)<0){st.read.push(id);saveSt();updP()}}
function updP(){$('pgt').textContent='الدروس المقروءة: '+st.read.length+' | التمارين المنجزة: '+st.solved.length}
function drawP(){var t=String(Math.floor(ps/60)).padStart(2,'0')+':'+String(ps%60).padStart(2,'0');$('pm').textContent=t;$('fpm').textContent=t}
function setFoc(m,btn){pauseP();baseSec=m*60;ps=baseSec;drawP();btn.parentElement.querySelectorAll('.pill').forEach(function(b){b.classList.remove('active')});btn.classList.add('active')}
function startP(){if(pi)return;pi=setInterval(function(){if(ps>0){ps--;drawP()}else{pauseP();$('flbl').textContent='أحسنت! انتهت حصة التركيز 🎉'}},1000)}
function pauseP(){clearInterval(pi);pi=null}
function resetP(){pauseP();ps=baseSec;drawP()}
var days=[['mon','الإثنين'],['tue','الثلاثاء'],['wed','الأربعاء'],['thu','الخميس'],['fri','الجمعة'],['sat','السبت'],['sun','الأحد']];
$('tti').innerHTML=days.map(function(d){if(d[0]==='sun')return'<div class="ttr"><b>'+d[1]+'</b><span>عطلة — مراجعة عامة</span></div>';return'<div class="ttr"><b>'+d[1]+'</b><div style="display:flex;gap:8px"><label><input type="checkbox" '+(st.busy[d[0]+'_m']?'checked':'')+' onchange="st.busy[\''+d[0]+'_m\']=this.checked;saveSt()"> صباحاً</label><label><input type="checkbox" '+(st.busy[d[0]+'_a']?'checked':'')+' onchange="st.busy[\''+d[0]+'_a\']=this.checked;saveSt()"> مساءً</label></div></div>'}).join('');
function mkPlan(){
var list=getCoefs(),pool=[];list.forEach(function(x){var n=x[1]>=6?3:(x[1]>=3?2:1);for(var k=0;k<n;k++)pool.push(x[0]+' (معامل '+x[1]+')')});
var h='<table class="st"><thead><tr><th>اليوم</th><th>الوقت المناسب</th><th>المادة (حسب المعامل)</th></tr></thead><tbody>';
days.forEach(function(d,i){var sl='19:00 - 20:30 (مساءً)';if(d[0]==='sun')sl='10:00 - 12:30 (صباحاً)';else if(!st.busy[d[0]+'_m']&&st.busy[d[0]+'_a'])sl='09:30 - 11:30 (صباحاً)';else if(st.busy[d[0]+'_m']&&!st.busy[d[0]+'_a'])sl='15:30 - 17:30 (مساءً)';else if(!st.busy[d[0]+'_m']&&!st.busy[d[0]+'_a'])sl='10:00 - 11:30 + 16:00 - 17:30';h+='<tr><td><b>'+d[1]+'</b></td><td>'+sl+'</td><td>'+pool[i%pool.length]+(d[0]==='sun'?' + '+pool[(i+3)%pool.length]:'')+'</td></tr>'});
h+='</tbody></table>';$('tto').innerHTML=h;$('pmr').innerHTML=h;try{localStorage.setItem('mk_pl',h)}catch(e){}
}
try{var mp=localStorage.getItem('mk_pl');if(mp){$('tto').innerHTML=mp;$('pmr').innerHTML=mp}}catch(e){}
setLang(st.lang);
if(sb){Promise.all([sb.from('cycles').select('*').order('order_index'),sb.from('grades').select('*').order('order_index'),sb.from('tracks').select('*'),sb.from('subjects').select('*')]).then(function(r){
if(r[0].error){$('err').style.display='block';$('err').textContent=r[0].error.message;return}
db.cycles=r[0].data||[];db.grades=r[1].data||[];db.tracks=r[2].data||[];db.subjects=r[3].data||[];renderUI();loadC();
})}
