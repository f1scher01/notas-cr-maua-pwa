// ================= utilidades =================
const N = v => { const n = parseFloat(String(v).replace(',','.')); return isNaN(n)?0:n; };
const filled = v => v!==null && v!==undefined && String(v).trim()!=='';
const subst = (o,s) => filled(s) ? Math.max(N(o),N(s)) : N(o);
const clamp = x => Math.max(0, Math.min(10, x));
const fmt = x => (Math.round(x*100)/100).toFixed(2).replace('.',',');

// ================= 1º ANO (2025) =================
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

// ================= 2º ANO (2026) =================
// Ordem de prioridade oficial do portal Canvas IMT: Cálculo II, Física II, ResMat, MecGeral, MatComp, IPM, MCM, Estatística
const DISCIPLINAS = [
  {
    cod: 'EFB109',
    nome: 'Cálculo Diferencial e Integral II',
    ch: 80,
    criterio: {
      resolucao: 'Critério CEPE 16/2024',
      mf: 'MF = 0,8·MP + 0,2·MT',
      mp: '(2·P₁ + 2·P₂ + 3·P₃ + 3·P₄) / 10',
      mt: 'Média Aritmética (T₁..T₄)',
      ps: 'PS₁ substitui min(P₁, P₂) · PS₂ substitui min(P₃, P₄)',
      obs: null
    },
    campos: [
      [{id:'P1',l:'P1'},{id:'P2',l:'P2'},{id:'P3',l:'P3'},{id:'P4',l:'P4'}],
      [{id:'PS1',l:'PS1',sub:1},{id:'PS2',l:'PS2',sub:1}],
      [{id:'T1',l:'T1'},{id:'T2',l:'T2'},{id:'T3',l:'T3'},{id:'T4',l:'T4'}]
    ],
    compute: g => {
      const p1 = subst(g.P1, g.PS1), p2 = subst(g.P2, g.PS1), p3 = subst(g.P3, g.PS2), p4 = subst(g.P4, g.PS2);
      const mp = (2*p1 + 2*p2 + 3*p3 + 3*p4) / 10;
      const mt = (N(g.T1) + N(g.T2) + N(g.T3) + N(g.T4)) / 4;
      const mf = 0.8 * mp + 0.2 * mt;
      return { mf, partials: [['MP', mp], ['MT', mt], ['MF', mf]] };
    }
  },
  {
    cod: 'EFB206',
    nome: 'Física II',
    ch: 160,
    criterio: {
      resolucao: 'Critério CEPE 16/2024',
      mf: 'MF = 0,6·MP + 0,4·MT',
      mp: '0,4·MP₁ + 0,6·MP₂ (com MPᵢ = 0,8·Piᵢ + 0,2·Teᵢ)',
      mt: '0,5·MT₁ + 0,5·MT₂ (Lab 80% + Projeto 20%)',
      ps: 'Psub substitui Pi₁, Pi₂ ou ambas as provas',
      obs: null
    },
    campos: [
      [{id:'Pi1',l:'Pi1 (prova)'},{id:'Pi2',l:'Pi2 (prova)'}],
      [{id:'Te1',l:'Te1 (sala)'},{id:'Te2',l:'Te2 (sala)'}],
      [{id:'Psub',l:'Psub',sub:1}],
      [{id:'MAt1',l:'Média lab 1º sem'},{id:'Proj1',l:'Projeto 1'}],
      [{id:'MAt2',l:'Média lab 2º sem'},{id:'Proj2',l:'Projeto 2'}]
    ],
    compute: g => {
      const pi1 = subst(g.Pi1, g.Psub), pi2 = subst(g.Pi2, g.Psub);
      const mp1 = 0.8 * pi1 + 0.2 * N(g.Te1);
      const mp2 = 0.8 * pi2 + 0.2 * N(g.Te2);
      const mp = 0.4 * mp1 + 0.6 * mp2;
      const mt1 = 0.8 * N(g.MAt1) + 0.2 * N(g.Proj1);
      const mt2 = 0.8 * N(g.MAt2) + 0.2 * N(g.Proj2);
      const mt = 0.5 * mt1 + 0.5 * mt2;
      const mf = 0.6 * mp + 0.4 * mt;
      return { mf, partials: [['MP', mp], ['MT', mt], ['MF', mf]] };
    }
  },
  {
    cod: 'ETM101',
    nome: 'Resistência dos Materiais',
    ch: 160,
    criterio: {
      resolucao: 'Critério CEPE 16/2024',
      mf: 'MF = 0,6·MP + 0,4·MT',
      mp: '(2·P₁ + 2·P₂ + 3·P₃ + 3·P₄) / 10',
      mt: '0,2·T₁ + 0,1·T₂ + 0,1·T₃ + 0,3·T₄ + 0,3·T₅',
      ps: 'PS₁ substitui min(P₁, P₂) · PS₂ substitui min(P₃, P₄)',
      obs: null
    },
    campos: [
      [{id:'P1',l:'P1'},{id:'P2',l:'P2'},{id:'P3',l:'P3'},{id:'P4',l:'P4'}],
      [{id:'PS1',l:'PS1',sub:1},{id:'PS2',l:'PS2',sub:1}],
      [{id:'T1',l:'T1 (20%)'},{id:'T2',l:'T2 (10%)'},{id:'T3',l:'T3 (10%)'}],
      [{id:'T4',l:'T4 (30%)'},{id:'T5',l:'T5 (30%)'}]
    ],
    compute: g => {
      const p1 = subst(g.P1, g.PS1), p2 = subst(g.P2, g.PS1), p3 = subst(g.P3, g.PS2), p4 = subst(g.P4, g.PS2);
      const mp = (2*p1 + 2*p2 + 3*p3 + 3*p4) / 10;
      const mt = 0.2*N(g.T1) + 0.1*N(g.T2) + 0.1*N(g.T3) + 0.3*N(g.T4) + 0.3*N(g.T5);
      const mf = 0.6 * mp + 0.4 * mt;
      return { mf, partials: [['MP', mp], ['MT', mt], ['MF', mf]] };
    }
  },
  {
    cod: 'EFB204',
    nome: 'Mecânica Geral',
    ch: 80,
    criterio: {
      resolucao: 'Critério CEPE 16/2024',
      mf: 'MF = 0,7·MP + 0,3·MT',
      mp: '(2·P₁ + 3·P₂) / 5',
      mt: 'Média Aritmética (T₁, T₂)',
      ps: 'PS substitui a menor nota entre P₁ e P₂',
      obs: null
    },
    campos: [
      [{id:'P1',l:'P1'},{id:'P2',l:'P2'}],
      [{id:'PS',l:'PS',sub:1}],
      [{id:'T1',l:'T1'},{id:'T2',l:'T2'}]
    ],
    compute: g => {
      const p1 = subst(g.P1, g.PS), p2 = subst(g.P2, g.PS);
      const mp = (2*p1 + 3*p2) / 5;
      const mt = (N(g.T1) + N(g.T2)) / 2;
      const mf = 0.7 * mp + 0.3 * mt;
      return { mf, partials: [['MP', mp], ['MT', mt], ['MF', mf]] };
    }
  },
  {
    cod: 'EFB108',
    nome: 'Matemática Computacional',
    ch: 80,
    criterio: {
      resolucao: 'Avaliação Prática Contínua',
      mf: 'MF = 0,4·T₁ + 0,6·T₂',
      mp: null,
      mt: 'T₁ (1º Bimestre - 40%) · T₂ (2º Bimestre - 60%)',
      ps: null,
      obs: '100% trabalhos práticos computacionais (sem provas teóricas)'
    },
    campos: [
      [{id:'T1',l:'T1 (1º sem)'},{id:'T2',l:'T2 (2º sem)'}]
    ],
    compute: g => {
      const mf = 0.4 * N(g.T1) + 0.6 * N(g.T2);
      return { mf, partials: [['MF', mf]] };
    }
  },
  {
    cod: 'ETM302',
    nome: 'Introdução a Projeto e Manufatura',
    ch: 160,
    criterio: {
      resolucao: 'Resolução C4/2015 (kp=4, kt=6)',
      mf: 'MF = 0,4·MP + 0,6·MT',
      mp: '(2·P₁ + 3·P₂) / 5',
      mt: '(T₁ + T₂ + 2·T₃ + 2·T₄ + T₅ + T₆) / 8',
      ps: null,
      obs: 'T₄ = Projeto Integrador · T₆ = Extensão Universitária'
    },
    campos: [
      [{id:'P1',l:'P1'},{id:'P2',l:'P2'}],
      [{id:'T1',l:'T1 (K1)'},{id:'T2',l:'T2 (K1)'},{id:'T3',l:'T3 (K2)'}],
      [{id:'T4',l:'T4 (K2)'},{id:'T5',l:'T5 (K1)'},{id:'T6',l:'T6 (K1)'}]
    ],
    compute: g => {
      const mp = (2 * N(g.P1) + 3 * N(g.P2)) / 5;
      const mt = (N(g.T1) + N(g.T2) + 2*N(g.T3) + 2*N(g.T4) + N(g.T5) + N(g.T6)) / 8;
      const mf = 0.4 * mp + 0.6 * mt;
      return { mf, partials: [['MP', mp], ['MT', mt], ['MF', mf]] };
    }
  },
  {
    cod: 'EMC213',
    nome: 'Materiais de Construção Mecânica I',
    ch: 80,
    criterio: {
      resolucao: 'Resolução C4/2015 (kp=3, kt=2)',
      mf: 'MF = 0,6·MP + 0,4·MT',
      mp: '(2·P₁ + 3·P₂) / 5',
      mt: 'Média Aritmética (T₁..T₅) · Pesos iguais',
      ps: null,
      obs: 'T₃ = Projeto Integrador Extensionista'
    },
    campos: [
      [{id:'P1',l:'P1'},{id:'P2',l:'P2'}],
      [{id:'T1',l:'T1'},{id:'T2',l:'T2'},{id:'T3',l:'T3'}],
      [{id:'T4',l:'T4'},{id:'T5',l:'T5'}]
    ],
    compute: g => {
      const mp = (2 * N(g.P1) + 3 * N(g.P2)) / 5;
      const mt = (N(g.T1) + N(g.T2) + N(g.T3) + N(g.T4) + N(g.T5)) / 5;
      const mf = 0.6 * mp + 0.4 * mt;
      return { mf, partials: [['MP', mp], ['MT', mt], ['MF', mf]] };
    }
  },
  {
    cod: 'EFB803',
    nome: 'Estatística',
    ch: 80,
    criterio: {
      resolucao: 'Critério CEPE 16/2024',
      mf: 'MF = 0,6·MP + 0,4·MT',
      mp: '(2·P₁ + 3·P₂) / 5',
      mt: '(3·T₁ + 2·T₂) / 5',
      ps: 'PS substitui menor(P₁, P₂) · Trabalhos sem substitutiva',
      obs: null
    },
    campos: [
      [{id:'P1',l:'P1'},{id:'P2',l:'P2'}],
      [{id:'PS',l:'PS',sub:1}],
      [{id:'T1',l:'T1'},{id:'T2',l:'T2'}]
    ],
    compute: g => {
      const p1 = subst(g.P1, g.PS), p2 = subst(g.P2, g.PS);
      const mp = (2*p1 + 3*p2) / 5;
      const mt = (3*N(g.T1) + 2*N(g.T2)) / 5;
      const mf = 0.6 * mp + 0.4 * mt;
      return { mf, partials: [['MP', mp], ['MT', mt], ['MF', mf]] };
    }
  }
];
const TOTAL_CH2 = DISCIPLINAS.reduce((s,d)=>s+d.ch,0); // 880h

// ================= RENDER 2º ANO =================
const grid = document.getElementById('grid');
DISCIPLINAS.forEach((d,di)=>{
  const card=document.createElement('div');card.className='card';
  const c = d.criterio;
  
  let h=`<div class="top"><span class="code">${d.cod}</span><span class="ch">${d.ch}h</span></div>
    <h3>${d.nome}</h3>
    
    <div class="acad-spec">
      <div class="acad-header">
        <span class="acad-title">🏛️ ${c.resolucao}</span>
        <span class="acad-mf">${c.mf}</span>
      </div>
      <div class="acad-body">
        ${c.mp ? `
          <div class="acad-row">
            <span class="acad-pill mp">Provas</span>
            <span class="acad-formula"><b>MP:</b> ${c.mp}</span>
          </div>` : ''}
        ${c.mt ? `
          <div class="acad-row">
            <span class="acad-pill mt">Trabalhos</span>
            <span class="acad-formula"><b>MT:</b> ${c.mt}</span>
          </div>` : ''}
        ${c.ps ? `
          <div class="acad-row">
            <span class="acad-pill ps">Sub</span>
            <span class="acad-formula"><b>PS:</b> ${c.ps}</span>
          </div>` : ''}
        ${c.obs ? `
          <div class="acad-row">
            <span class="acad-pill obs">Regime</span>
            <span class="acad-formula">${c.obs}</span>
          </div>` : ''}
      </div>
    </div>`;

  d.campos.forEach(linha=>{
    const cls=linha.length===1?'one':(linha.length===3?'three':'');
    h+=`<div class="row ${cls}">`;
    linha.forEach(f=>{h+=`<div class="fld ${f.sub?'sub':''}"><label>${f.l}</label>
      <input type="number" step="0.1" min="0" max="10" data-d="${di}" data-f="${f.id}" placeholder="—"></div>`;});
    h+=`</div>`;
  });
  h+=`<div class="result"><div class="partials" id="part-${di}"></div>
    <div class="mf"><span class="val" id="mf-${di}">—</span><span class="badge none" id="badge-${di}">sem nota</span></div></div>`;
  h+=`<div class="card-mon-shortcut" data-goto-mon="${d.cod}">
        <span>📅 Ver plantão de monitoria</span>
        <span>→</span>
      </div>`;
  card.innerHTML=h;grid.appendChild(card);
});

// ================= RENDER 1º ANO =================
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

// ================= CÁLCULO GERAL =================
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
    if(d.conceito) return;
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
function set(id,v){const el=document.getElementById(id);if(el)el.textContent=v;}
function bar(id,v){const el=document.getElementById(id);if(el)el.style.width=(v!==null?clamp(v)*10:0)+'%';}

document.addEventListener('input', recalc);
document.addEventListener('change', recalc);

// ================= BASE COMPLETA DE MONITORIAS (CANVAS IMT) =================
// Ordem de prioridade oficial do portal Canvas IMT: Cálculo II, Física II, ResMat, MecGeral, MatComp, IPM, MCM, Estatística
const MONITORIAS = [
  {
    cod: 'EFB109',
    nome: 'Cálculo Diferencial e Integral II',
    ch: 80,
    responsavel: 'Monitor Enzo',
    teamsLink: 'https://teams.microsoft.com/l/team/19%3Abpt30Dk6V8pcKeJG0bRqa-9NhumgIdEcw4Fzi8CrnjY1%40thread.tacv2/conversations?groupId=ca42acdc-9c4a-40d8-8a3f-41de51bda94c&tenantId=c49e1939-4b53-4738-bb64-41fb2990e41c',
    obs: 'Atendimentos presenciais com resolução de listas e dúvidas teóricas nas salas U23 e U29. Canal de monitoria no Microsoft Teams disponível para suporte aos alunos.',
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
    obs: 'Plantão centralizado sempre na Sala H331 (Bloco H). Abrange dúvidas de teoria, listas de exercícios e preparação para as práticas de laboratório.',
    horarios: [
      { dia: 'seg', diaNome: 'Segunda-feira', horario: '09h30 às 13h00', tipo: 'presencial', local: 'Sala H331 (Sidney)' },
      { dia: 'seg', diaNome: 'Segunda-feira', horario: '15h00 às 18h00', tipo: 'presencial', local: 'Sala H331 (Breno)' },
      { dia: 'ter', diaNome: 'Terça-feira', horario: '11h20 às 13h00', tipo: 'presencial', local: 'Sala H331 (Breno)' },
      { dia: 'qua', diaNome: 'Quarta-feira', horario: '11h20 às 13h00', tipo: 'presencial', local: 'Sala H331 (Sidney)' },
      { dia: 'sex', diaNome: 'Sexta-feira', horario: '18h30 às 20h00', tipo: 'presencial', local: 'Sala H331 (Guilherme)' }
    ]
  },
  {
    cod: 'ETM101',
    nome: 'Resistência dos Materiais',
    ch: 160,
    responsavel: 'Monitor Rafael (Contato docente: caio.santos@maua.br)',
    obs: 'Atendimentos presenciais de 3 horas contínuas todas as quintas na Sala R.01 para esclarecimento de diagramas de esforço, tensões e deformações.',
    horarios: [
      { dia: 'qui', diaNome: 'Quinta-feira', horario: '09h00 às 12h00', tipo: 'presencial', local: 'Sala R.01 (Bloco R)' }
    ]
  },
  {
    cod: 'EFB204',
    nome: 'Mecânica Geral',
    ch: 80,
    responsavel: 'Equipe de Monitores de Mecânica Geral',
    teamsLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_YTU0Y2M0YjQtZWI4Yy00MzNiLTg1ZDAtNDZhNGZlNTAzMDMx%40thread.v2/0?context=%7b%22Tid%22%3a%22c49e1939-4b53-4738-bb64-41fb2990e41c%22%2c%22Oid%22%3a%2226d04049-6185-49e3-a0ac-68b725485b42%22%7d',
    obs: 'Atendimento híbrido: sessões online no início da semana via Microsoft Teams e plantões presenciais na Sala H336 nas quartas e sextas.',
    horarios: [
      { dia: 'seg', diaNome: 'Segunda-feira', horario: '11h20 às 13h00', tipo: 'online', local: 'Online (Teams)', link: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_YTU0Y2M0YjQtZWI4Yy00MzNiLTg1ZDAtNDZhNGZlNTAzMDMx%40thread.v2/0?context=%7b%22Tid%22%3a%22c49e1939-4b53-4738-bb64-41fb2990e41c%22%2c%22Oid%22%3a%2226d04049-6185-49e3-a0ac-68b725485b42%22%7d' },
      { dia: 'ter', diaNome: 'Terça-feira', horario: '11h20 às 13h00', tipo: 'online', local: 'Online (Teams)', link: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_NzcyODQyMDctY2FlNi00M2IzLTgzZTctOWI5MmQ1ZjMwZTJh%40thread.v2/0?context=%7b%22Tid%22%3a%22c49e1939-4b53-4738-bb64-41fb2990e41c%22%2c%22Oid%22%3a%2226d04049-6185-49e3-a0ac-68b725485b42%22%7d' },
      { dia: 'qua', diaNome: 'Quarta-feira', horario: '16h40 às 18h30', tipo: 'presencial', local: 'Sala H336' },
      { dia: 'sex', diaNome: 'Sexta-feira', horario: '09h30 às 11h10', tipo: 'presencial', local: 'Sala H336' },
      { dia: 'sex', diaNome: 'Sexta-feira', horario: '11h20 às 13h00', tipo: 'presencial', local: 'Sala H336' }
    ]
  },
  {
    cod: 'EFB108',
    nome: 'Matemática Computacional',
    ch: 80,
    responsavel: 'Profª Drª Lilian Victorino',
    teamsLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_MmM2OGVhODgtNjU1Ni00NjJjLWJjMGQtYWUyMWQ0MzVjMjM1%40thread.v2/0?context=%7b%22Tid%22%3a%22c49e1939-4b53-4738-bb64-41fb2990e41c%22%2c%22Oid%22%3a%22d62fc926-6011-40bb-a9c1-83b1c000b27d%22%7d',
    obs: 'Plantão docente de esclarecimento e orientação para os trabalhos computacionais (T1 e T2) e métodos numéricos. Atendimento híbrido presencial no Bloco G02 e online via Microsoft Teams.',
    horarios: [
      { dia: 'qui', diaNome: 'Quinta-feira', horario: '10h30 às 11h30', tipo: 'online', local: 'Bloco G02 · Sala 12 / Teams', link: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_MmM2OGVhODgtNjU1Ni00NjJjLWJjMGQtYWUyMWQ0MzVjMjM1%40thread.v2/0?context=%7b%22Tid%22%3a%22c49e1939-4b53-4738-bb64-41fb2990e41c%22%2c%22Oid%22%3a%22d62fc926-6011-40bb-a9c1-83b1c000b27d%22%7d' }
    ]
  },
  {
    cod: 'ETM302',
    nome: 'Introdução a Projeto e Manufatura',
    ch: 160,
    responsavel: 'Monitora Maria Luiza Rito (24.00103-0@maua.br)',
    obs: 'Ampla disponibilidade semanal distribuída entre as salas C4, C5 e Q6 para acompanhamento de modelagem CAD, usinagem e projeto de redutor.',
    horarios: [
      { dia: 'seg', diaNome: 'Segunda-feira', horario: '11h20 às 14h20', tipo: 'presencial', local: 'Sala C4' },
      { dia: 'ter', diaNome: 'Terça-feira', horario: '13h30 às 15h00', tipo: 'presencial', local: 'Sala C5' },
      { dia: 'ter', diaNome: 'Terça-feira', horario: '16h50 às 19h50', tipo: 'presencial', local: 'Sala C4' },
      { dia: 'qui', diaNome: 'Quinta-feira', horario: '13h30 às 15h00', tipo: 'presencial', local: 'Sala C4' },
      { dia: 'qui', diaNome: 'Quinta-feira', horario: '16h50 às 19h50', tipo: 'presencial', local: 'Sala Q6' }
    ]
  },
  {
    cod: 'EMC213',
    nome: 'Materiais de Construção Mecânica I',
    ch: 80,
    responsavel: 'Monitoria de Materiais Metálicos e Ensaios',
    obs: 'Apoio aos estudos de diagramas de fase, tratamentos térmicos, ensaios mecânicos e ao projeto integrador extensionista (T3) na Sala U19.',
    horarios: [
      { dia: 'seg', diaNome: 'Segunda-feira', horario: '11h30 às 14h30', tipo: 'presencial', local: 'Sala U19 (Bloco U)' },
      { dia: 'qua', diaNome: 'Quarta-feira', horario: '18h30 às 19h30', tipo: 'presencial', local: 'Sala U19 (Bloco U)' }
    ]
  },
  {
    cod: 'EFB803',
    nome: 'Estatística',
    ch: 80,
    responsavel: 'Monitor Pedro Wilian Palumbo Bevilacqua',
    teamsLink: 'https://teams.microsoft.com/meet/27939028084151?p=Bj4eZBwgOE9cBvm42G',
    obs: 'Atendimento presencial na Sala J309 e sessão remota às sextas-feiras à noite pelo Microsoft Teams.',
    horarios: [
      { dia: 'qua', diaNome: 'Quarta-feira', horario: '14h00 às 15h00', tipo: 'presencial', local: 'Sala J309 (Bloco J)' },
      { dia: 'sex', diaNome: 'Sexta-feira', horario: '18h00 às 19h00', tipo: 'online', local: 'Online (Teams)', link: 'https://teams.microsoft.com/meet/27939028084151?p=Bj4eZBwgOE9cBvm42G' }
    ]
  }
];

const DIAS_SEMANA = [
  { id: 'seg', nome: 'Segunda-feira', idx: 1 },
  { id: 'ter', nome: 'Terça-feira', idx: 2 },
  { id: 'qua', nome: 'Quarta-feira', idx: 3 },
  { id: 'qui', nome: 'Quinta-feira', idx: 4 },
  { id: 'sex', nome: 'Sexta-feira', idx: 5 }
];

let monFiltroDia = 'todos';
let monViewMode = 'timeline'; // 'timeline' ou 'cards'
let monSearchQuery = '';

// ================= MOTOR DE BUSCA INTELIGENTE (SEM ACENTO E COM SIGLAS) =================
// Remove acentuação, caracteres especiais e normaliza espaços
function normalizeSearchText(str) {
  if (!str) return '';
  return String(str)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Dicionário acadêmico de siglas, abreviações e termos populares da Mauá
const SEARCH_ALIASES = {
  'EFB109': [
    'calc', 'cal', 'calculo', 'calculo 2', 'calculo ii', 'cdi', 'cdi2', 'cdi 2',
    'integral', 'derivada', 'limites', 'series', 'enzo', 'teams', 'online', 'u23', 'u29'
  ],
  'EFB206': [
    'fis', 'fisica', 'fisica 2', 'fisica ii', 'laboratorio', 'lab', 'eletromagnetismo',
    'optica', 'h331', 'sidney', 'breno', 'guilherme', 'presencial'
  ],
  'ETM101': [
    'resmat', 'res mat', 'res', 'resmat1', 'resistencia', 'resistencia dos materiais',
    'tensao', 'deformacao', 'torcao', 'flexao', 'r01', 'r 01', 'caio', 'santos', 'rafael', 'presencial'
  ],
  'EFB204': [
    'mec', 'mecanica', 'mecanica geral', 'mec geral', 'estatica', 'cinematica',
    'dinamica', 'h336', 'teams', 'online', 'hibrido'
  ],
  'EFB108': [
    'matcomp', 'mat comp', 'comp', 'matematica computacional', 'metodos numericos',
    'programacao', 'python', 'lilian', 'victorino', 'g02', 'bloco g', 'trabalhos'
  ],
  'ETM302': [
    'ipm', 'projeto e manufatura', 'manufatura', 'projeto', 'cad', 'solidworks',
    'redutor', 'usinagem', 'torno', 'c4', 'c5', 'q6', 'maria luiza', 'rito'
  ],
  'EMC213': [
    'mcm', 'mcm1', 'mcm 1', 'materiais', 'materiais de construcao mecanica',
    'metalicos', 'ensaios', 'tracao', 'dureza', 'diagrama de fases', 'u19', 'extensao'
  ],
  'EFB803': [
    'est', 'estat', 'estatistica', 'probabilidade', 'prob', 'distribuicao',
    'pedro', 'bevilacqua', 'j309', 'bloco j', 'teams', 'online', 'noturno'
  ]
};

// Validador inteligente de busca: suporta múltiplos termos, sem acento e siglas
function matchesSearch(m, slot = null) {
  const qNorm = normalizeSearchText(monSearchQuery);
  if (!qNorm) return true;

  const tokens = qNorm.split(' ').filter(Boolean);
  if (tokens.length === 0) return true;

  const aliases = SEARCH_ALIASES[m.cod] || [];
  const parts = [
    m.cod,
    m.nome,
    m.responsavel,
    m.obs,
    ...aliases
  ];

  if (slot) {
    parts.push(slot.diaNome, slot.horario, slot.local, slot.tipo);
  } else {
    m.horarios.forEach(h => {
      parts.push(h.diaNome, h.horario, h.local, h.tipo);
    });
  }

  const corpus = normalizeSearchText(parts.join(' '));

  return tokens.every(token => corpus.includes(token));
}

// ================= TEMPO E FUSO HORÁRIO OFICIAL (SÃO PAULO / BRASÍLIA UTC-3) =================
// Garante precisão absoluta do dia e horário de São Paulo independente do fuso do dispositivo do aluno
function getSaoPauloNow() {
  const now = new Date();
  const spDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const dayIdx = spDate.getDay(); // 0 dom, 1 seg, 2 ter, 3 qua, 4 qui, 5 sex, 6 sab
  const diaMap = { 1: 'seg', 2: 'ter', 3: 'qua', 4: 'qui', 5: 'sex' };
  const diaNomeMap = { 
    0: 'Domingo', 
    1: 'Segunda-feira', 
    2: 'Terça-feira', 
    3: 'Quarta-feira', 
    4: 'Quinta-feira', 
    5: 'Sexta-feira', 
    6: 'Sábado' 
  };
  const hours = spDate.getHours();
  const minutes = spDate.getMinutes();
  const timeFormatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  const dateFormatted = spDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'America/Sao_Paulo' });

  return {
    spDate,
    dayIdx,
    diaId: diaMap[dayIdx] || null,
    diaNome: diaNomeMap[dayIdx] || 'Hoje',
    timeFormatted,
    dateFormatted,
    hours,
    minutes
  };
}

// ================= RENDERIZADOR DE MONITORIAS =================
function renderMonitorias() {
  const container = document.getElementById('monContainer');
  if (!container) return;
  container.innerHTML = '';

  if (monViewMode === 'timeline') {
    // ---- VISÃO AGENDA SEMANAL ----
    const wrap = document.createElement('div');
    wrap.className = 'timeline-wrap';

    const diasParaExibir = monFiltroDia === 'todos' 
      ? DIAS_SEMANA 
      : DIAS_SEMANA.filter(d => d.id === monFiltroDia);

    const spNow = getSaoPauloNow();
    const hojeIdx = spNow.dayIdx;
    let totalSlotsEncontrados = 0;

    diasParaExibir.forEach(d => {
      const slotsDoDia = [];
      MONITORIAS.forEach(m => {
        m.horarios.forEach(h => {
          if (h.dia === d.id) {
            if (matchesSearch(m, h)) {
              slotsDoDia.push({ ...h, materia: m.nome, cod: m.cod, resp: m.responsavel });
            }
          }
        });
      });

      if (slotsDoDia.length === 0) return;
      totalSlotsEncontrados += slotsDoDia.length;

      const isToday = (hojeIdx === d.idx);
      const sec = document.createElement('div');
      sec.className = 'day-section';
      sec.innerHTML = `
        <div class="day-header">
          <div class="day-title">
            <span>📅 ${d.nome}</span>
            ${isToday ? '<span class="day-badge today">● HOJE</span>' : ''}
          </div>
          <span class="day-badge">${slotsDoDia.length} atendimento${slotsDoDia.length>1?'s':''}</span>
        </div>
        <div class="day-slots">
          ${slotsDoDia.map(s => `
            <div class="slot-card">
              <div class="slot-time">
                <span>⏰ ${s.horario}</span>
                <span class="slot-room ${s.tipo}">${s.local}</span>
              </div>
              <div class="slot-subject">${s.cod} · ${s.materia}</div>
              <div class="slot-person">👤 ${s.resp}</div>
              <div class="slot-footer">
                <span style="color:var(--dim);font-size:.7rem">${s.tipo==='online'?'💻 Sessão Remota no Teams':'📍 Presencial no Campus Mauá'}</span>
                <div style="display:flex;align-items:center;gap:6px">
                  ${s.link ? `<a href="${s.link}" target="_blank" rel="noopener noreferrer" class="btn-teams">🚀 Entrar no Teams ↗</a>` : ''}
                  <button type="button" class="slot-btn" data-copy-slot="${s.cod} - ${s.materia}: ${s.diaNome}, ${s.horario} (${s.local}) ${s.link ? 'Link: ' + s.link : ''}">📋 Copiar</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      wrap.appendChild(sec);
    });

    if (totalSlotsEncontrados === 0) {
      container.innerHTML = `<div class="note" style="text-align:center;padding:32px">
        Nenhum plantão encontrado para a busca "<b>${monSearchQuery}</b>".
        <div style="margin-top:8px;font-size:.8rem;color:var(--dim)">Dica: você pode buscar por siglas como <b>CALC</b>, <b>FIS</b>, <b>RESMAT</b>, <b>MEC</b>, <b>MATCOMP</b>, <b>IPM</b>, <b>MCM</b>, <b>EST</b>, salas ou monitores.</div>
      </div>`;
    } else {
      container.appendChild(wrap);
    }

  } else {
    // ---- VISÃO POR MATÉRIA (CARDS DETALHADOS) ----
    const grid = document.createElement('div');
    grid.className = 'mon-grid';

    let count = 0;
    MONITORIAS.forEach(m => {
      const slots = m.horarios.filter(h => {
        const matchesDay = (monFiltroDia === 'todos' || h.dia === monFiltroDia);
        const matchesQ = matchesSearch(m, h);
        return matchesDay && matchesQ;
      });

      const matchesCard = matchesSearch(m);
      if (slots.length === 0 && (monSearchQuery.trim() || monFiltroDia !== 'todos')) {
        if (!matchesCard || monFiltroDia !== 'todos') return;
      }
      count++;

      const card = document.createElement('div');
      card.className = 'mon-card';
      card.id = 'mon-card-' + m.cod;

      const scheduleText = `${m.cod} - ${m.nome}\n${m.responsavel}\n` + 
        m.horarios.map(h => `• ${h.diaNome}: ${h.horario} (${h.local})${h.link ? ' - Link Teams: ' + h.link : ''}`).join('\n');

      card.innerHTML = `
        <div class="mon-top">
          <span class="code">${m.cod}</span>
          <span class="ch">${m.ch}h</span>
        </div>
        <h3>${m.nome}</h3>
        <div class="mon-resp"><b>Responsável:</b> ${m.responsavel}</div>
        
        <div class="mon-slots-list">
          ${(slots.length > 0 ? slots : m.horarios).map(s => `
            <div class="mon-slot-row">
              <div>
                <span class="mon-day">${s.diaNome}</span>
                <span class="mon-time" style="color:var(--muted);margin-left:6px">${s.horario}</span>
              </div>
              <div style="display:flex;align-items:center;gap:6px">
                <span class="slot-room ${s.tipo}">${s.local}</span>
                ${s.link ? `<a href="${s.link}" target="_blank" rel="noopener noreferrer" class="btn-teams">Entrar ↗</a>` : ''}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="mon-obs">${m.obs}</div>

        <div class="mon-actions">
          <button type="button" class="btn-copy" data-copy-text="${encodeURIComponent(scheduleText)}">
            📋 Copiar Horários
          </button>
          ${m.teamsLink ? `
            <a href="${m.teamsLink}" target="_blank" rel="noopener noreferrer" class="btn-teams-primary">
              <span>💻</span> Acessar Teams da Matéria ↗
            </a>
          ` : ''}
        </div>
      `;
      grid.appendChild(card);
    });

    if (count === 0) {
      container.innerHTML = `<div class="note" style="text-align:center;padding:32px">
        Nenhuma matéria encontrada para a busca "<b>${monSearchQuery}</b>".
        <div style="margin-top:8px;font-size:.8rem;color:var(--dim)">Dica: você pode buscar por siglas como <b>CALC</b>, <b>FIS</b>, <b>RESMAT</b>, <b>MEC</b>, <b>MATCOMP</b>, <b>IPM</b>, <b>MCM</b>, <b>EST</b>.</div>
      </div>`;
    } else {
      container.appendChild(grid);
    }
  }
}

// ================= ATUALIZADOR DO HERO LIVE (HOJE NA MAUÁ) =================
function updateLiveHero() {
  const sp = getSaoPauloNow();
  const elDay = document.getElementById('todayDayName');
  const elClock = document.getElementById('todayLiveClock');
  const elTitle = document.getElementById('todayHeroTitle');
  const elSub = document.getElementById('todayHeroSub');
  const elCount = document.getElementById('statTodayCount');

  if (elDay) elDay.textContent = `Plantão de ${sp.diaNome}`;
  if (elClock) elClock.textContent = `• ${sp.timeFormatted} (Brasília)`;

  if (sp.diaId) {
    let slotsHoje = 0;
    const materiasHoje = [];
    MONITORIAS.forEach(m => {
      m.horarios.forEach(h => {
        if (h.dia === sp.diaId) {
          slotsHoje++;
          if (!materiasHoje.includes(m.cod)) materiasHoje.push(m.cod);
        }
      });
    });

    if (elCount) elCount.textContent = slotsHoje;
    if (elTitle) elTitle.textContent = `${slotsHoje} plantão${slotsHoje > 1 ? 'ões' : ''} ativo${slotsHoje > 1 ? 's' : ''} hoje na Mauá`;
    if (elSub) elSub.textContent = `Atendimentos em: ${materiasHoje.join(', ')}. Horário oficial de Brasília (${sp.timeFormatted}).`;
  } else {
    if (elCount) elCount.textContent = '0';
    if (elTitle) elTitle.textContent = 'Fim de semana · Próximas monitorias na Segunda-feira';
    if (elSub) elSub.textContent = 'Segunda começam as monitorias às 09h00 (Cálculo II na Sala U23).';
  }
}

// ================= CONTROLES E EVENTOS DE MONITORIA =================
// Filtro por dia
document.querySelectorAll('#monDayChips .chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#monDayChips .chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    monFiltroDia = btn.dataset.dia;
    renderMonitorias();
  });
});

// Alternador de visão (Timeline vs Cards)
const btnTimeline = document.getElementById('btnViewTimeline');
const btnCards = document.getElementById('btnViewCards');

if (btnTimeline && btnCards) {
  btnTimeline.addEventListener('click', () => {
    btnTimeline.classList.add('active');
    btnCards.classList.remove('active');
    monViewMode = 'timeline';
    renderMonitorias();
  });
  btnCards.addEventListener('click', () => {
    btnCards.classList.add('active');
    btnTimeline.classList.remove('active');
    monViewMode = 'cards';
    renderMonitorias();
  });
}

// Busca instantânea com suporte a ESC e botão limpar do navegador
const searchInput = document.getElementById('monSearch');
if (searchInput) {
  const onSearchChange = e => {
    monSearchQuery = e.target.value;
    renderMonitorias();
  };
  searchInput.addEventListener('input', onSearchChange);
  searchInput.addEventListener('search', onSearchChange);
  searchInput.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      monSearchQuery = '';
      renderMonitorias();
    }
  });
}

// Copiar texto para área de transferência
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-copy-text]');
  if (btn) {
    const text = decodeURIComponent(btn.dataset.copyText);
    navigator.clipboard.writeText(text).then(() => {
      showToast('📋 Horários copiados para a área de transferência!');
    }).catch(() => {
      showToast('Erro ao copiar.');
    });
    return;
  }
  const btnSlot = e.target.closest('[data-copy-slot]');
  if (btnSlot) {
    navigator.clipboard.writeText(btnSlot.dataset.copySlot).then(() => {
      showToast('📋 Horário copiado com sucesso!');
    });
  }
});

// ================= SISTEMA DE NAVEGAÇÃO DE ABAS & MOBILE DOCK =================
function switchTab(tabId) {
  // desativa abas desktop e itens do dock
  document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
  document.querySelectorAll('.dock-item').forEach(x => x.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(x => x.classList.remove('active'));

  // ativa aba desktop
  const tabEl = document.querySelector(`.tab[data-tab="${tabId}"]`);
  if (tabEl) tabEl.classList.add('active');

  // ativa item dock
  const dockEl = document.querySelector(`.dock-item[data-tab="${tabId}"]`);
  if (dockEl) dockEl.classList.add('active');

  // ativa painel
  const panelEl = document.getElementById('panel-' + tabId);
  if (panelEl) panelEl.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Click nas abas desktop
document.querySelectorAll('.tab').forEach(t => {
  t.addEventListener('click', () => switchTab(t.dataset.tab));
});

// Click no mobile dock
document.querySelectorAll('.dock-item').forEach(d => {
  d.addEventListener('click', () => switchTab(d.dataset.tab));
});

// Atalho do card de notas para a monitoria
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-goto-mon]');
  if (!btn) return;
  const cod = btn.dataset.gotoMon;

  // muda para a visão de matérias para localizar o card
  monViewMode = 'cards';
  if (btnCards && btnTimeline) {
    btnCards.classList.add('active');
    btnTimeline.classList.remove('active');
  }
  monFiltroDia = 'todos';
  document.querySelectorAll('#monDayChips .chip').forEach(c => c.classList.remove('active'));
  const allChip = document.querySelector('#monDayChips .chip[data-dia="todos"]');
  if (allChip) allChip.classList.add('active');
  monSearchQuery = '';
  if (searchInput) searchInput.value = '';

  switchTab('monitorias');
  renderMonitorias();

  setTimeout(() => {
    const target = document.getElementById('mon-card-' + cod);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.classList.add('highlight');
      setTimeout(() => target.classList.remove('highlight'), 2000);
    }
  }, 120);
});

// ================= TOAST FEEDBACK =================
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ================= PWA INSTALLATION & SYNC =================
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  const btnPrompt = document.getElementById('installBrowserPrompt');
  if (btnPrompt) btnPrompt.style.display = 'block';
});

const installModal = document.getElementById('installModal');
const btnInstall = document.getElementById('btnInstall');
const closeInstall = document.getElementById('closeInstallModal');
const btnDoInstall = document.getElementById('btnDoInstall');

if (btnInstall && installModal) {
  btnInstall.addEventListener('click', () => {
    installModal.classList.add('open');
  });
}
if (closeInstall && installModal) {
  closeInstall.addEventListener('click', () => {
    installModal.classList.remove('open');
  });
}
if (installModal) {
  installModal.addEventListener('click', e => {
    if (e.target === installModal) installModal.classList.remove('open');
  });
}
if (btnDoInstall) {
  btnDoInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        showToast('App instalado com sucesso! 🎉');
      }
      deferredPrompt = null;
      installModal.classList.remove('open');
    }
  });
}

// Sincronizar / Limpar Cache
const btnSync = document.getElementById('btnSync');
if (btnSync) {
  btnSync.addEventListener('click', async () => {
    showToast('🔄 Atualizando e recarregando app...');
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    }
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      for (let r of regs) await r.update();
    }
    setTimeout(() => {
      window.location.reload(true);
    }, 600);
  });
}

// ---- ações dos botões de notas ----
function limpar2(){document.querySelectorAll('input[data-d]').forEach(i=>i.value='');recalc();showToast('Notas do 2º ano limpas.');}
function limpar1(){document.querySelectorAll('[data-y1]').forEach(i=>i.value='');recalc();showToast('Notas do 1º ano limpas.');}
function exemplo(){
  const demoByCod = {
    'EFB109': { P1: 6.5, P2: 7.0, P3: 7.5, P4: 6.0, T1: 8.5, T2: 9.0, T3: 8.0, T4: 7.5 },
    'EFB206': { Pi1: 6.0, Pi2: 7.0, Te1: 8.0, Te2: 8.5, MAt1: 7.5, Proj1: 8.0, MAt2: 8.0, Proj2: 8.5 },
    'ETM101': { P1: 6.0, P2: 7.0, P3: 7.5, P4: 6.5, T1: 8.0, T2: 8.0, T3: 7.5, T4: 8.5, T5: 9.0 },
    'EFB204': { P1: 6.0, P2: 7.5, T1: 8.0, T2: 8.5 },
    'EFB108': { T1: 8.5, T2: 9.0 },
    'ETM302': { P1: 7.0, P2: 7.5, T1: 8.0, T2: 8.0, T3: 8.5, T4: 8.5, T5: 9.0, T6: 9.0 },
    'EMC213': { P1: 6.5, P2: 7.0, T1: 8.0, T2: 8.5, T3: 9.0, T4: 8.0, T5: 8.5 },
    'EFB803': { P1: 7.0, P2: 6.5, T1: 8.0, T2: 7.5 }
  };
  limpar2();
  DISCIPLINAS.forEach((d, di) => {
    if (demoByCod[d.cod]) {
      Object.entries(demoByCod[d.cod]).forEach(([f, val]) => {
        const el = document.querySelector(`input[data-d="${di}"][data-f="${f}"]`);
        if (el) el.value = val;
      });
    }
  });
  recalc();
  showToast('Exemplo de notas carregado!');
}
const ACTIONS={limpar2,limpar1,exemplo};
document.querySelectorAll('[data-act]').forEach(b=>b.addEventListener('click',()=>{const fn=ACTIONS[b.dataset.act];if(fn)fn();}));

// Inicialização
recalc();
renderMonitorias();
updateLiveHero();

// Atualiza o relógio oficial e status de monitoria a cada 30 segundos
if (typeof setInterval === 'function') {
  setInterval(updateLiveHero, 30000);
}

// Service Worker (Auto-claim e Auto-refresh quando houver nova versão)
if('serviceWorker' in navigator){
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(reg => {
      reg.update().catch(() => {});
    }).catch(() => {});
  });
}
