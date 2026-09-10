// ================= utilidades =================
const N = v => { const n = parseFloat(String(v).replace(',','.')); return isNaN(n)?0:n; };
const filled = v => v!==null && v!==undefined && String(v).trim()!=='';
const subst = (o,s) => filled(s) ? Math.max(N(o),N(s)) : N(o);
const clamp = x => Math.max(0, Math.min(10, x));
const fmt = x => (Math.round(x*100)/100).toFixed(2).replace('.',',');

// ================= 1º ANO (2025) — currículo fixo do curso =================
const YEAR1 = [
  {cod:'EFB403', nome:'Algoritmos e Programação',            ch:80},
  {cod:'EFB105', nome:'Cálculo Diferencial e Integral I',    ch:160},
  {cod:'EFB302', nome:'Desenho',                             ch:80},
  {cod:'EFB207', nome:'Física I',                            ch:160},
  {cod:'EFB605', nome:'Fundamentos de Engenharia',           ch:80},
  {cod:'PAE116', nome:'Projetos e Atividades Especiais',     ch:160, conceito:true},
  {cod:'EFB502', nome:'Química Geral',                        ch:160},
  {cod:'EFB110', nome:'Vetores, Curvas e Superfícies',       ch:80}
];

// ================= 2º ANO (2026) — critérios detalhados =================
const DISCIPLINAS = [
  {cod:'EFB108', nome:'Matemática Computacional', ch:80,
    rule:'100% trabalhos. MF = 0,4·T1 + 0,6·T2',
    campos:[[{id:'T1',l:'T1 (1º sem)'},{id:'T2',l:'T2 (2º sem)'}]],
    compute:g=>{const mf=0.4*N(g.T1)+0.6*N(g.T2);return{mf,partials:[['MF',mf]]};}},

  {cod:'EFB109', nome:'Cálculo Diferencial e Integral II', ch:80,
    rule:'PS1 substitui a menor de P1/P2; PS2 a menor de P3/P4. MP=(2P1+2P2+3P3+3P4)/10 · MT=média(T1..T4) · MF=0,8MP+0,2MT',
    campos:[
      [{id:'P1',l:'P1'},{id:'P2',l:'P2'},{id:'P3',l:'P3'},{id:'P4',l:'P4'}],
      [{id:'PS1',l:'PS1',sub:1},{id:'PS2',l:'PS2',sub:1}],
      [{id:'T1',l:'T1'},{id:'T2',l:'T2'},{id:'T3',l:'T3'},{id:'T4',l:'T4'}]],
    compute:g=>{const p1=subst(g.P1,g.PS1),p2=subst(g.P2,g.PS1),p3=subst(g.P3,g.PS2),p4=subst(g.P4,g.PS2);
      const mp=(2*p1+2*p2+3*p3+3*p4)/10, mt=(N(g.T1)+N(g.T2)+N(g.T3)+N(g.T4))/4, mf=0.8*mp+0.2*mt;
      return{mf,partials:[['MP',mp],['MT',mt],['MF',mf]]};}},

  {cod:'EFB204', nome:'Mecânica Geral', ch:80,
    rule:'PS substitui a menor de P1/P2. MP=(2P1+3P2)/5 · MT=média(T1,T2) · MF=0,7MP+0,3MT',
    campos:[
      [{id:'P1',l:'P1'},{id:'P2',l:'P2'}],
      [{id:'PS',l:'PS',sub:1}],
      [{id:'T1',l:'T1'},{id:'T2',l:'T2'}]],
    compute:g=>{const p1=subst(g.P1,g.PS),p2=subst(g.P2,g.PS);
      const mp=(2*p1+3*p2)/5, mt=(N(g.T1)+N(g.T2))/2, mf=0.7*mp+0.3*mt;
      return{mf,partials:[['MP',mp],['MT',mt],['MF',mf]]};}},

  {cod:'EFB206', nome:'Física II', ch:160,
    rule:'MP1=0,8Pi1+0,2Te1 · MP2=0,8Pi2+0,2Te2 · MP=0,4MP1+0,6MP2 | MT=lab+projeto · MF=0,6MP+0,4MT. Psub substitui Pi1, Pi2 ou ambas.',
    campos:[
      [{id:'Pi1',l:'Pi1 (prova)'},{id:'Pi2',l:'Pi2 (prova)'}],
      [{id:'Te1',l:'Te1 (sala)'},{id:'Te2',l:'Te2 (sala)'}],
      [{id:'Psub',l:'Psub',sub:1}],
      [{id:'MAt1',l:'Média lab 1º sem'},{id:'Proj1',l:'Projeto 1'}],
      [{id:'MAt2',l:'Média lab 2º sem'},{id:'Proj2',l:'Projeto 2'}]],
    compute:g=>{const pi1=subst(g.Pi1,g.Psub),pi2=subst(g.Pi2,g.Psub);
      const mp1=0.8*pi1+0.2*N(g.Te1),mp2=0.8*pi2+0.2*N(g.Te2),mp=0.4*mp1+0.6*mp2;
      const mt1=0.8*N(g.MAt1)+0.2*N(g.Proj1),mt2=0.8*N(g.MAt2)+0.2*N(g.Proj2),mt=0.5*mt1+0.5*mt2;
      const mf=0.6*mp+0.4*mt; return{mf,partials:[['MP',mp],['MT',mt],['MF',mf]]};}},

  {cod:'EFB803', nome:'Estatística', ch:80,
    rule:'PS (única) substitui a menor de P1/P2. Trabalhos SEM substitutiva. MP=(2P1+3P2)/5 · MT=(3T1+2T2)/5 · MF=0,6MP+0,4MT',
    campos:[
      [{id:'P1',l:'P1'},{id:'P2',l:'P2'}],
      [{id:'PS',l:'PS',sub:1}],
      [{id:'T1',l:'T1'},{id:'T2',l:'T2'}]],
    compute:g=>{const p1=subst(g.P1,g.PS),p2=subst(g.P2,g.PS);
      const mp=(2*p1+3*p2)/5, mt=(3*N(g.T1)+2*N(g.T2))/5, mf=0.6*mp+0.4*mt;
      return{mf,partials:[['MP',mp],['MT',mt],['MF',mf]]};}},

  {cod:'EMC213', nome:'Materiais de Construção Mecânica I', ch:80,
    rule:'C4/2015. MP=(2P1+3P2)/5 · MT=média(T1..T5), pesos K todos=1 · MF=0,6MP+0,4MT (kp=3, kt=2). T3 = projeto integrador extensionista.',
    campos:[
      [{id:'P1',l:'P1'},{id:'P2',l:'P2'}],
      [{id:'T1',l:'T1'},{id:'T2',l:'T2'},{id:'T3',l:'T3'}],
      [{id:'T4',l:'T4'},{id:'T5',l:'T5'}]],
    compute:g=>{const mp=(2*N(g.P1)+3*N(g.P2))/5, mt=(N(g.T1)+N(g.T2)+N(g.T3)+N(g.T4)+N(g.T5))/5, mf=0.6*mp+0.4*mt;
      return{mf,partials:[['MP',mp],['MT',mt],['MF',mf]]};}},

  {cod:'ETM101', nome:'Resistência dos Materiais', ch:160,
    rule:'PS1 substitui menor de P1/P2; PS2 a de P3/P4. MP=(2P1+2P2+3P3+3P4)/10 · MT=0,2T1+0,1T2+0,1T3+0,3T4+0,3T5 · MF=0,6MP+0,4MT',
    campos:[
      [{id:'P1',l:'P1'},{id:'P2',l:'P2'},{id:'P3',l:'P3'},{id:'P4',l:'P4'}],
      [{id:'PS1',l:'PS1',sub:1},{id:'PS2',l:'PS2',sub:1}],
      [{id:'T1',l:'T1 (20%)'},{id:'T2',l:'T2 (10%)'},{id:'T3',l:'T3 (10%)'}],
      [{id:'T4',l:'T4 (30%)'},{id:'T5',l:'T5 (30%)'}]],
    compute:g=>{const p1=subst(g.P1,g.PS1),p2=subst(g.P2,g.PS1),p3=subst(g.P3,g.PS2),p4=subst(g.P4,g.PS2);
      const mp=(2*p1+2*p2+3*p3+3*p4)/10, mt=0.2*N(g.T1)+0.1*N(g.T2)+0.1*N(g.T3)+0.3*N(g.T4)+0.3*N(g.T5), mf=0.6*mp+0.4*mt;
      return{mf,partials:[['MP',mp],['MT',mt],['MF',mf]]};}},

  {cod:'ETM302', nome:'Introdução a Projeto e Manufatura', ch:160,
    rule:'C4/2015. MP=(2P1+3P2)/5 · MT=(T1+T2+2T3+2T4+T5+T6)/8 (K=1,1,2,2,1,1) · MF=0,4MP+0,6MT (kp=4, kt=6). T4=Projeto Integrador, T6=extensionista.',
    campos:[
      [{id:'P1',l:'P1'},{id:'P2',l:'P2'}],
      [{id:'T1',l:'T1 (K1)'},{id:'T2',l:'T2 (K1)'},{id:'T3',l:'T3 (K2)'}],
      [{id:'T4',l:'T4 (K2)'},{id:'T5',l:'T5 (K1)'},{id:'T6',l:'T6 (K1)'}]],
    compute:g=>{const mp=(2*N(g.P1)+3*N(g.P2))/5, mt=(N(g.T1)+N(g.T2)+2*N(g.T3)+2*N(g.T4)+N(g.T5)+N(g.T6))/8, mf=0.4*mp+0.6*mt;
      return{mf,partials:[['MP',mp],['MT',mt],['MF',mf]]};}}
];
const TOTAL_CH2 = DISCIPLINAS.reduce((s,d)=>s+d.ch,0); // 880h

// ================= render 2º ano =================
const grid=document.getElementById('grid');
DISCIPLINAS.forEach((d,di)=>{
  const card=document.createElement('div');card.className='card';
  let h=`<div class="top"><span class="code">${d.cod}</span><span class="ch">${d.ch}h</span></div>
    <h3>${d.nome}</h3><div class="rule ${d.inferido?'inferido':''}">${d.rule}</div>`;
  d.campos.forEach(linha=>{
    const cls=linha.length===1?'one':(linha.length===3?'three':'');
    h+=`<div class="row ${cls}">`;
    linha.forEach(f=>{h+=`<div class="fld ${f.sub?'sub':''}"><label>${f.l}</label>
      <input type="number" step="0.1" min="0" max="10" data-d="${di}" data-f="${f.id}" placeholder="—"></div>`;});
    h+=`</div>`;
  });
  h+=`<div class="result"><div class="partials" id="part-${di}"></div>
    <div class="mf"><span class="val" id="mf-${di}">—</span><span class="badge none" id="badge-${di}">sem nota</span></div></div>`;
  h+=`<button type="button" class="btn-mon-link" data-goto-mon="${d.cod}">📅 Horários de monitoria</button>`;
  card.innerHTML=h;grid.appendChild(card);
});

// ================= render 1º ano =================
const y1=document.getElementById('y1list');
let y1h=`<div class="y1row head"><span>Código</span><span>Disciplina</span><span>CH</span><span>Nota final</span></div>`;
YEAR1.forEach((d,i)=>{
  const inp = d.conceito
    ? `<select data-y1="${i}"><option value="">—</option><option value="AP">Aprovado</option><option value="RE">Reprovado</option></select>`
    : `<input type="number" step="0.1" min="0" max="10" data-y1="${i}" placeholder="—">`;
  y1h+=`<div class="y1row">
    <span class="cd nmcell">${d.cod}</span>
    <span class="nm nmcell">${d.nome}${d.conceito?' <span class="chc">(conceito · fora do CR)</span>':''}</span>
    <span class="chc"><span class="lblm">CH</span>${d.ch}h</span>
    <span><span class="lblm">Nota final</span>${inp}</span></div>`;
});
y1.innerHTML=y1h;

// ================= cálculo geral =================
function coletar(di){const g={};document.querySelectorAll(`input[data-d="${di}"]`).forEach(i=>g[i.dataset.f]=i.value);return g;}
function temNota(di){return[...document.querySelectorAll(`input[data-d="${di}"]`)].some(i=>filled(i.value));}

function recalc(){
  // ---- 2º ano ----
  let soma2=0, ch2=0, okCount=0, comNota=0;
  DISCIPLINAS.forEach((d,di)=>{
    const {mf,partials}=d.compute(coletar(di));
    const has=temNota(di);
    const mfEl=document.getElementById('mf-'+di), badge=document.getElementById('badge-'+di), part=document.getElementById('part-'+di);
    if(!has){mfEl.textContent='—';badge.className='badge none';badge.textContent='sem nota';part.innerHTML='';}
    else{
      const v=clamp(mf); comNota++;
      mfEl.textContent=fmt(v);
      part.innerHTML=partials.slice(0,-1).map(([l,x])=>`${l}: <b>${fmt(clamp(x))}</b>`).join('');
      if(v>=6){badge.className='badge ok';badge.textContent='✓ Aprovado se fechar';okCount++;}
      else{badge.className='badge bad';badge.textContent='Abaixo de 6,0';}
      soma2+=v*d.ch; ch2+=d.ch;
    }
  });
  const media2 = ch2>0 ? soma2/ch2 : null;

  // ---- 1º ano ----
  let soma1=0, ch1=0;
  YEAR1.forEach((d,i)=>{
    if(d.conceito) return; // conceito fora do CR
    const el=document.querySelector(`[data-y1="${i}"]`);
    if(el && filled(el.value)){ soma1+=N(el.value)*d.ch; ch1+=d.ch; }
  });
  const cr1 = ch1>0 ? soma1/ch1 : null;

  // ---- CR projetado ----
  const crProj = (ch1+ch2)>0 ? (soma1+soma2)/(ch1+ch2) : null;

  // ---- KPIs ----
  set('kpiCR1', cr1!==null?fmt(cr1):'—');
  document.getElementById('kpiCR1cap').textContent = cr1!==null ? `base: ${ch1}h numéricas` : 'preencha suas notas de 2025';
  set('kpiM2', media2!==null?fmt(media2):'—');
  document.getElementById('kpiM2cap').textContent = media2!==null ? `${ch2}h de ${TOTAL_CH2}h lançadas` : 'ponderada por CH lançada';
  set('kpiCRp', crProj!==null?fmt(crProj):'—');
  set('kpiOK', comNota>0 ? `${okCount}/${comNota}` : '—');

  // ---- painel CR ----
  set('crBox1', cr1!==null?fmt(cr1):'—');
  bar('barCR1', cr1);
  document.getElementById('crBox1cap').textContent = cr1!==null ? `Σ(nota×CH)=${fmt(soma1)} sobre ${ch1}h` : 'preencha o 1º ano para ver';
  set('crBoxP', crProj!==null?fmt(crProj):'—');
  bar('barCRp', crProj);
  const steps=document.getElementById('crSteps');
  if(crProj!==null){
    steps.innerHTML=
      `<div class="st"><span>1º ano (2025) — ${ch1}h</span><b>Σ = ${fmt(soma1)}</b></div>`+
      `<div class="st"><span>2º ano (2026) — ${ch2}h lançadas</span><b>Σ = ${fmt(soma2)}</b></div>`+
      `<div class="st"><span>CR projetado = ${fmt(soma1+soma2)} ÷ ${ch1+ch2}h</span><b>${fmt(crProj)}</b></div>`;
  } else steps.innerHTML=`<div class="st"><span>Preencha 1º e/ou 2º ano</span><b>—</b></div>`;
}
function set(id,v){document.getElementById(id).textContent=v;}
function bar(id,v){document.getElementById(id).style.width=(v!==null?clamp(v)*10:0)+'%';}

document.addEventListener('input', recalc);
document.addEventListener('change', recalc);

// ---- tabs ----
document.querySelectorAll('.tab').forEach(t=>{
  t.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    document.getElementById('panel-'+t.dataset.tab).classList.add('active');
  });
});

// ---- ações ----
function limpar2(){document.querySelectorAll('input[data-d]').forEach(i=>i.value='');recalc();}
function limpar1(){document.querySelectorAll('[data-y1]').forEach(i=>i.value='');recalc();}
function exemplo(){
  const demo={'0':{T1:8,T2:7},'1':{P1:6,P2:7,P3:8,P4:5,T1:9,T2:8,T3:7,T4:10},
    '2':{P1:6,P2:7,T1:8,T2:9},'4':{P1:7,P2:6,T1:8,T2:7}};
  limpar2();
  Object.entries(demo).forEach(([di,v])=>Object.entries(v).forEach(([f,x])=>{
    const el=document.querySelector(`input[data-d="${di}"][data-f="${f}"]`);if(el)el.value=x;}));
  recalc();
}
// ---- listeners dos botões (sem onclick inline, por segurança) ----
const ACTIONS={limpar2,limpar1,exemplo};
document.querySelectorAll('[data-act]').forEach(b=>b.addEventListener('click',()=>{const fn=ACTIONS[b.dataset.act];if(fn)fn();}));
recalc();

// ================= MONITORIAS 2º ANO (2026) =================
const MONITORIAS = [
  {
    cod: 'EFB109',
    nome: 'Cálculo Diferencial e Integral II',
    ch: 80,
    responsavel: 'Monitor Enzo',
    obs: 'Monitoria de revisão online em vésperas de prova/atividade via Teams.',
    horarios: [
      { dia: 'seg', diaNome: 'Segunda-feira', horario: '09h00 às 11h00', tipo: 'presencial', local: 'Sala U23' },
      { dia: 'qua', diaNome: 'Quarta-feira', horario: '09h00 às 11h00', tipo: 'presencial', local: 'Sala U29' }
    ]
  },
  {
    cod: 'EFB206',
    nome: 'Física II',
    ch: 160,
    responsavel: 'Monitores Sidney Rafael, Breno Rocha e Guilherme Ienna',
    obs: 'Sempre na Sala H331. Atendimento de dúvidas teóricas, listas e apoio prático.',
    horarios: [
      { dia: 'seg', diaNome: 'Segunda-feira', horario: '09h30 às 13h00', tipo: 'presencial', local: 'Sala H331 (Sidney)' },
      { dia: 'seg', diaNome: 'Segunda-feira', horario: '15h00 às 18h00', tipo: 'presencial', local: 'Sala H331 (Breno)' },
      { dia: 'ter', diaNome: 'Terça-feira', horario: '11h20 às 13h00', tipo: 'presencial', local: 'Sala H331 (Breno)' },
      { dia: 'qua', diaNome: 'Quarta-feira', horario: '11h20 às 13h00', tipo: 'presencial', local: 'Sala H331 (Sidney)' },
      { dia: 'sex', diaNome: 'Sexta-feira', horario: '18h30 às 20h00', tipo: 'presencial', local: 'Sala H331 (Guilherme)' }
    ]
  },
  {
    cod: 'EFB204',
    nome: 'Mecânica Geral',
    ch: 80,
    responsavel: 'Equipe de Monitores',
    obs: 'Sessões online via Microsoft Teams e presenciais no bloco H.',
    horarios: [
      { dia: 'seg', diaNome: 'Segunda-feira', horario: '11h20 às 13h00', tipo: 'online', local: 'Teams' },
      { dia: 'ter', diaNome: 'Terça-feira', horario: '11h20 às 13h00', tipo: 'online', local: 'Teams' },
      { dia: 'qua', diaNome: 'Quarta-feira', horario: '16h40 às 18h30', tipo: 'presencial', local: 'Sala H336' },
      { dia: 'sex', diaNome: 'Sexta-feira', horario: '09h30 às 11h10', tipo: 'presencial', local: 'Sala H336' },
      { dia: 'sex', diaNome: 'Sexta-feira', horario: '11h20 às 13h00', tipo: 'presencial', local: 'Sala H336' }
    ]
  },
  {
    cod: 'ETM101',
    nome: 'Resistência dos Materiais',
    ch: 160,
    responsavel: 'Monitor Rafael',
    obs: 'Dúvidas pontuais com o Prof. Caio Santos: caio.santos@maua.br',
    horarios: [
      { dia: 'qui', diaNome: 'Quinta-feira', horario: '09h00 às 12h00', tipo: 'presencial', local: 'Sala R.01' }
    ]
  },
  {
    cod: 'EFB803',
    nome: 'Estatística',
    ch: 80,
    responsavel: 'Monitor Pedro Wilian Palumbo Bevilacqua',
    obs: 'Atendimento presencial na sala J309 e online via Teams.',
    horarios: [
      { dia: 'qua', diaNome: 'Quarta-feira', horario: '14h00 às 15h00', tipo: 'presencial', local: 'Sala J309' },
      { dia: 'sex', diaNome: 'Sexta-feira', horario: '18h00 às 19h00', tipo: 'online', local: 'Teams' }
    ]
  },
  {
    cod: 'EMC213',
    nome: 'Materiais de Construção Mecânica I',
    ch: 80,
    responsavel: 'Monitoria de Materiais',
    obs: 'Plantão presencial de monitoria na sala U19.',
    horarios: [
      { dia: 'seg', diaNome: 'Segunda-feira', horario: '11h30 às 14h30', tipo: 'presencial', local: 'Sala U19' },
      { dia: 'qua', diaNome: 'Quarta-feira', horario: '18h30 às 19h30', tipo: 'presencial', local: 'Sala U19' }
    ]
  },
  {
    cod: 'ETM302',
    nome: 'Introdução a Projeto e Manufatura',
    ch: 160,
    responsavel: 'Monitora Maria Luiza (24.00103-0@maua.br)',
    obs: 'Atendimento presencial nas salas do bloco C e Q.',
    horarios: [
      { dia: 'seg', diaNome: 'Segunda-feira', horario: '11h20 às 14h20', tipo: 'presencial', local: 'Sala C4' },
      { dia: 'ter', diaNome: 'Terça-feira', horario: '13h30 às 15h00', tipo: 'presencial', local: 'Sala C5' },
      { dia: 'ter', diaNome: 'Terça-feira', horario: '16h50 às 19h50', tipo: 'presencial', local: 'Sala C4' },
      { dia: 'qui', diaNome: 'Quinta-feira', horario: '13h30 às 15h00', tipo: 'presencial', local: 'Sala C4' },
      { dia: 'qui', diaNome: 'Quinta-feira', horario: '16h50 às 19h50', tipo: 'presencial', local: 'Sala Q6' }
    ]
  },
  {
    cod: 'EFB108',
    nome: 'Matemática Computacional',
    ch: 80,
    responsavel: 'Profª Drª Lilian Victorino',
    obs: 'Plantão de atendimento docente semanal presencial e online.',
    horarios: [
      { dia: 'qui', diaNome: 'Quinta-feira', horario: '10h30 às 11h30', tipo: 'presencial', local: 'Bloco G02 · Sala 12' }
    ]
  }
];

const gridMon = document.getElementById('gridMonitorias');
function renderMonitorias(filtroDia = 'todos') {
  if (!gridMon) return;
  gridMon.innerHTML = '';
  
  MONITORIAS.forEach(m => {
    const slots = filtroDia === 'todos' 
      ? m.horarios 
      : m.horarios.filter(h => h.dia === filtroDia);
    
    if (slots.length === 0) return;

    const card = document.createElement('div');
    card.className = 'mon-card';
    card.id = 'mon-card-' + m.cod;
    
    let slotsHtml = '<div class="mon-slots">';
    slots.forEach(s => {
      const tagClass = s.tipo === 'online' ? 'online' : 'presencial';
      slotsHtml += `
        <div class="mon-slot">
          <div>
            <span class="mon-day">${s.diaNome}</span>
            <span class="mon-time">${s.horario}</span>
          </div>
          <span class="mon-loc ${tagClass}">${s.local}</span>
        </div>`;
    });
    slotsHtml += '</div>';

    card.innerHTML = `
      <div class="mon-top">
        <span class="code">${m.cod}</span>
        <span class="ch">${m.ch}h</span>
      </div>
      <h3>${m.nome}</h3>
      <div class="mon-resp"><b>Responsável:</b> ${m.responsavel}</div>
      ${slotsHtml}
      ${m.obs ? `<div class="mon-obs">${m.obs}</div>` : ''}
    `;
    gridMon.appendChild(card);
  });
}
renderMonitorias();

// ---- filtros de monitoria ----
document.querySelectorAll('#monFilters .chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#monFilters .chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    renderMonitorias(btn.dataset.dia);
  });
});

// ---- navegação direta do card de notas para a monitoria ----
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-goto-mon]');
  if (!btn) return;
  const cod = btn.dataset.gotoMon;
  
  // ativa aba de monitorias
  document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(x => x.classList.remove('active'));
  const monTab = document.querySelector('.tab[data-tab="monitorias"]');
  const monPanel = document.getElementById('panel-monitorias');
  if (monTab && monPanel) {
    monTab.classList.add('active');
    monPanel.classList.add('active');
  }
  
  // reseta filtro para todos
  document.querySelectorAll('#monFilters .chip').forEach(c => c.classList.remove('active'));
  const allChip = document.querySelector('#monFilters .chip[data-dia="todos"]');
  if (allChip) allChip.classList.add('active');
  renderMonitorias('todos');

  // destaca e rola suavemente até o card
  setTimeout(() => {
    const targetCard = document.getElementById('mon-card-' + cod);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetCard.classList.add('highlight');
      setTimeout(() => targetCard.classList.remove('highlight'), 1800);
    }
  }, 100);
});

// ---- Service Worker (offline / instalável na tela inicial) ----
if('serviceWorker' in navigator){
  window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){});});
}
