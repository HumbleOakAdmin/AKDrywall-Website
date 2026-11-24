document.querySelectorAll('#year').forEach(el => { el.textContent = new Date().getFullYear(); });

// Public portfolio uses manually approved entries; it does not access Command Center.
(function(){
 const grid=document.getElementById('portfolio-grid'); if(!grid)return;
 const tabs=[...document.querySelectorAll('.portfolio-tab')];
 const projects=Array.isArray(window.AK_PUBLIC_PROJECTS)?window.AK_PUBLIC_PROJECTS:[];
 const empty={completed:'Completed projects will be featured here soon.',ongoing:'Current commercial projects will be featured here soon.',upcoming:'Upcoming projects will be announced here when confirmed.'};
 const node=(tag,cls,txt)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(txt)el.textContent=txt;return el};
 function show(status){
  tabs.forEach(b=>{const active=b.dataset.status===status;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1});
  grid.replaceChildren();const matching=projects.filter(p=>p&&p.status===status&&p.name);
  if(!matching.length){grid.append(node('p','portfolio-empty',empty[status]));return;}
  matching.forEach(p=>{const card=node('article','portfolio-card');if(p.image){const img=node('img','portfolio-image');img.src=p.image;img.alt=p.name+' project';img.loading='lazy';card.append(img);}else{card.append(node('div','portfolio-image portfolio-image-placeholder','A&K DRYWALL'));}
   const content=node('div','portfolio-card-content');content.append(node('span','portfolio-location',p.location||'Commercial project'));content.append(node('h3','',p.name));if(p.description)content.append(node('p','',p.description));card.append(content);grid.append(card);});
 }
 tabs.forEach(b=>b.addEventListener('click',()=>show(b.dataset.status)));show('completed');
})();

document.querySelectorAll('form.ak-form').forEach(function (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    var note = document.createElement('p');
    note.className = 'ak-mock-note';
    note.setAttribute('role', 'status');
    note.textContent = 'Preview only. This request was not sent to A&K Drywall. Use akdrywall.ca for a real quote.';
    form.replaceWith(note);
  });
});
