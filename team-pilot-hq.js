function sayByte(){speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance("This is our MVP command centre. Let's turn project requirements into clear responsibilities, review the plan together, and prepare messages only after approval."))}
const sampleMembers=[
{id:"m1",name:"Member 1",role:"Backend Engineer",skills:"Python, FastAPI, APIs, SQL",interests:"LangGraph, backend",hours:8,email:"member1@example.com"},
{id:"m2",name:"Member 2",role:"AI Engineer",skills:"Python, LLM, prompting, RAG",interests:"agents, retrieval",hours:8,email:"member2@example.com"},
{id:"m3",name:"Member 3",role:"Frontend Engineer",skills:"HTML, CSS, JavaScript, UI",interests:"UX, visualisation",hours:8,email:"member3@example.com"},
{id:"m4",name:"Member 4",role:"Data Engineer",skills:"Python, SQL, ETL, data modelling",interests:"document processing",hours:7,email:"member4@example.com"},
{id:"m5",name:"Member 5",role:"Cloud Engineer",skills:"AWS, Docker, CI/CD, security",interests:"deployment, observability",hours:7,email:"member5@example.com"},
{id:"m6",name:"Member 6",role:"QA / Analyst",skills:"testing, requirements, documentation, Python",interests:"quality, product analysis",hours:6,email:"member6@example.com"}];
let members=JSON.parse(localStorage.getItem("teampilotMembers")||"null")||sampleMembers.map(x=>({...x}));
let plan=[],decision="pending",emailDrafts=[];
const $=id=>document.getElementById(id);
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function renderMembers(){ $("members").innerHTML=members.map((m,i)=>`<div class="hq-member"><h3>👤 Team member ${i+1}</h3>
<label class="hq-label">Name</label><input class="hq-input" data-i="${i}" data-k="name" value="${esc(m.name)}">
<label class="hq-label">Role</label><input class="hq-input" data-i="${i}" data-k="role" value="${esc(m.role)}">
<label class="hq-label">Skills / experience (comma-separated)</label><textarea class="hq-input" rows="2" data-i="${i}" data-k="skills">${esc(m.skills)}</textarea>
<label class="hq-label">Interests / learning goals</label><input class="hq-input" data-i="${i}" data-k="interests" value="${esc(m.interests)}">
<label class="hq-label">Available hours / week</label><input class="hq-input" type="number" min="0" max="60" data-i="${i}" data-k="hours" value="${m.hours}">
<label class="hq-label">Email</label><input class="hq-input" type="email" data-i="${i}" data-k="email" value="${esc(m.email)}"></div>`).join("");
document.querySelectorAll("#members [data-i]").forEach(el=>el.onchange=()=>{let i=+el.dataset.i,k=el.dataset.k;members[i][k]=k==="hours"?Math.max(0,Number(el.value)||0):el.value;localStorage.setItem("teampilotMembers",JSON.stringify(members));if(plan.length){decision="pending";$("approvalStatus").textContent="Profiles changed. Regenerate the plan and review it again."}})}
function resetMembers(){members=sampleMembers.map(x=>({...x}));localStorage.setItem("teampilotMembers",JSON.stringify(members));renderMembers()}
renderMembers();
$("projectFiles").onchange=e=>$("fileList").textContent=e.target.files.length?[...e.target.files].map(f=>`${f.name} (${Math.round(f.size/1024)} KB)`).join(" • "):"No files selected.";

const tasks=[
{title:"Requirements analysis and scope baseline",desc:"Extract goals, constraints, stakeholders and unresolved questions.",skills:["requirements","analysis","documentation"],hours:5,accept:"Scope summary and ambiguity list reviewed by project lead."},
{title:"Document intake and extraction API",desc:"Design upload endpoint, validate file types and extract text from supported formats.",skills:["python","fastapi","api","document processing"],hours:8,accept:"Supported file types return extracted text; invalid files are rejected safely."},
{title:"LangGraph workflow and state design",desc:"Define typed state, nodes, routing, persistence and human approval flow.",skills:["langgraph","python","agents","backend"],hours:8,accept:"Graph runs through a test fixture and pauses for approval."},
{title:"Research and technology evaluation",desc:"Investigate unfamiliar technology options; record evidence, risks and a small POC plan.",skills:["llm","rag","research","documentation"],hours:6,accept:"Report separates verified facts, assumptions, unknowns and cited sources."},
{title:"Team profile and allocation interface",desc:"Build editable team profiles, allocation table and manager review experience.",skills:["html","css","javascript","ui","ux"],hours:7,accept:"Manager can edit profiles and inspect explainable proposed assignments."},
{title:"Validation, tests and deployment pipeline",desc:"Add unit tests, workload checks, logging, container build and deployment configuration.",skills:["testing","aws","docker","ci/cd","security"],hours:7,accept:"Automated checks pass and deployment configuration is documented."}
];
function tokens(s){return String(s||"").toLowerCase().split(/[^a-z0-9+#.]+/).filter(Boolean)}
function runPlanning(){
const project=$("projectName").value.trim()||"Untitled project",brief=$("projectBrief").value.trim(),unknown=$("unknownTech").value.trim();
plan=tasks.map((t,idx)=>{
let ranked=members.map(m=>{let words=tokens(m.skills+" "+m.role+" "+m.interests),score=t.skills.reduce((a,k)=>a+(words.includes(k.toLowerCase())?2:0),0);return {...m,score}}).sort((a,b)=>b.score-a.score);
let chosen=ranked.find(m=>m.hours>0)||ranked[0];return {...t,id:"T"+(idx+1),owner:chosen?.id||"",ownerName:chosen?.name||"Unassigned",score:chosen?.score||0};
});
if($("includeUnknown").checked&&unknown){plan.push({id:"T7",title:`Technology discovery: ${unknown}`,desc:"Research official documentation, assess prerequisites and risks, and propose a time-boxed learning task or POC.",skills:["research","documentation","llm","rag"],hours:4,accept:"Evidence-backed options and a human-approved next step.",owner:"",ownerName:"Volunteer / manager decision",score:0,unknown:true})}
decision="pending";$("approvalStatus").textContent="Awaiting manager review.";
$("planOutput").innerHTML=`<div class="hq-result"><b>${esc(project)}</b><p>${esc(brief.slice(0,280))}${brief.length>280?"…":""}</p><div class="hq-table-wrap"><table class="hq-table"><tr><th>ID / work package</th><th>Proposed owner</th><th>Estimate</th><th>Acceptance criteria</th><th>Why this match?</th></tr>${plan.map(t=>`<tr><td><b>${t.id} ${esc(t.title)}</b><br>${esc(t.desc)}</td><td>${esc(t.ownerName)}</td><td>${t.hours}h</td><td>${esc(t.accept)}</td><td>${t.unknown?"No automatic assignment: research and volunteer decision required.":`Keyword match score ${t.score}; manager must verify actual suitability.`}</td></tr>`).join("")}</table></div></div>`;
$("validationOutput").innerHTML=validatePlan();
}
function validatePlan(){
let issues=[];if(members.length!==6)issues.push("Expected six profiles.");if(members.some(m=>!m.name||!m.email))issues.push("One or more team members are missing a name or email.");
let totals={};plan.filter(t=>!t.unknown).forEach(t=>totals[t.owner]=(totals[t.owner]||0)+t.hours);
members.forEach(m=>{let assigned=totals[m.id]||0;if(assigned>m.hours)issues.push(`${m.name}: proposed ${assigned}h exceeds ${m.hours}h capacity.`)});
if(plan.some(t=>!t.owner&&!t.unknown))issues.push("A task has no proposed owner.");
return issues.length?`<b>⚠️ Review required</b><ul>${issues.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><p>Also verify dependencies, skill depth, actual workload and estimates manually.</p>`:"<b>✅ Basic prototype checks passed.</b><p>No missing profile fields or capacity overruns detected in this simple demo. This is not proof that the plan is correct—review skill depth, dependencies, priorities and estimates before approval.</p>";
}
function approvePlan(){if(!plan.length){$("approvalStatus").textContent="Generate a plan first.";return}decision="approved";$("approvalStatus").textContent="Manager approved this proposal in the local demo. Generate and review email previews next; no email is sent."}
function rejectPlan(){if(!plan.length){$("approvalStatus").textContent="Generate a plan first.";return}decision="rework";$("approvalStatus").textContent="Rework requested. Update profiles or project inputs, then regenerate the proposal.";plan=[];$("emailPreviews").innerHTML=""}
function generateEmails(){
if(decision!=="approved"){$("emailPreviews").innerHTML='<div class="hq-warning">Email drafts are locked until the manager approves the current plan. Generate a plan and approve it first.</div>';return}
emailDrafts=members.map(m=>{let owned=plan.filter(t=>t.owner===m.id);return {to:m.email,subject:`${$("projectName").value||"Project"} – proposed responsibilities`,body:`Hi ${m.name},\n\nFollowing the project planning review, the following work packages are proposed for you:\n\n${owned.length?owned.map(t=>`• ${t.title} (${t.hours}h)\n  ${t.desc}\n  Acceptance: ${t.accept}`).join("\n\n"):"No work package has been assigned to you in this proposal. Please review the project plan with the manager."}\n\nPlease review the scope, estimate and dependencies with the project manager before starting. This is a draft assignment summary.\n\nRegards,\nProject Manager`}});$("emailPreviews").innerHTML=emailDrafts.map((e,i)=>`<div class="hq-result"><b>Draft ${i+1} • ${esc(e.to)}</b><label class="hq-label">Subject</label><input class="hq-input" data-email="${i}" data-field="subject" value="${esc(e.subject)}"><label class="hq-label">Body</label><textarea class="hq-input" rows="8" data-email="${i}" data-field="body">${esc(e.body)}</textarea></div>`).join("");document.querySelectorAll("[data-email]").forEach(el=>el.onchange=()=>emailDrafts[+el.dataset.email][el.dataset.field]=el.value)}
function downloadEmailPayload(){if(!emailDrafts.length){alert("Generate approved email previews first.");return}let blob=new Blob([JSON.stringify({project:$("projectName").value,manager_approved:decision==="approved",mode:"preview_only",emails:emailDrafts},null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="teampilot-email-previews.json";a.click();URL.revokeObjectURL(a.href)}
$("quizQ").textContent="A research assistant finds an unfamiliar technology with no verified internal expert. What is the safest useful recommendation?";
const answers=["Assign it to the person with the lightest workload.","Recommend evidence gathering and a time-boxed learning task or POC, then ask a manager to approve the plan.","Invent a likely expert based on job title."];
$("quizA").innerHTML=answers.map((a,i)=>`<button class="hq-result" style="display:block;width:100%;text-align:left;cursor:pointer" data-i="${i}">${String.fromCharCode(65+i)}. ${esc(a)}</button>`).join("");
document.querySelectorAll("#quizA button").forEach(b=>b.onclick=()=>$("quizResult").textContent=+b.dataset.i===1?"Correct! The assistant should expose the knowledge gap and offer a controlled way to close it.":"Try again. Capacity alone does not establish competence.");
const checks=[...document.querySelectorAll(".hq-check")],key="teamPilotLaunchChecklist",saved=JSON.parse(localStorage.getItem(key)||"[]");
checks.forEach(c=>{c.checked=saved.includes(c.value);c.onchange=()=>{localStorage.setItem(key,JSON.stringify(checks.filter(x=>x.checked).map(x=>x.value)));progress()}});
function progress(){$("launchProgress").textContent=`${checks.filter(c=>c.checked).length} / 7 complete`}progress();
