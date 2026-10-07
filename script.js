(()=>{"use strict";
const menu=document.querySelector(".menu-toggle"),nav=document.querySelector(".site-nav");
if(menu&&nav){const close=()=>{nav.classList.remove("is-open");menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","Open navigation")};menu.addEventListener("click",()=>{const open=nav.classList.toggle("is-open");menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Close navigation":"Open navigation")});nav.addEventListener("click",e=>{if(e.target.closest("a"))close()});document.addEventListener("click",e=>{if(!nav.contains(e.target)&&!menu.contains(e.target))close()});document.addEventListener("keydown",e=>{if(e.key==="Escape"){close();menu.focus()}})}
const carousel=document.querySelector("[data-carousel]");
if(carousel){const viewport=carousel.querySelector(".carousel-viewport"),track=carousel.querySelector(".carousel-track"),slides=[...carousel.querySelectorAll(".product-slide")],prev=carousel.querySelector(".prev"),next=carousel.querySelector(".next");let index=0,timer=null,startX=null;
const perView=()=>window.matchMedia("(max-width:780px)").matches?1:window.matchMedia("(max-width:1050px)").matches?2:3,maxIndex=()=>Math.max(0,slides.length-perView());
const render=()=>{index=Math.min(index,maxIndex());const first=slides[0],gap=parseFloat(getComputedStyle(track).gap)||0,amount=first?first.getBoundingClientRect().width+gap:0;track.style.transform="translateX(-"+index*amount+"px)";prev.disabled=index===0;next.disabled=index>=maxIndex();const current=carousel.querySelector("[data-carousel-current]");if(current)current.textContent=String(index+1).padStart(2,"0")};
const stop=()=>{if(timer){clearInterval(timer);timer=null}},start=()=>{if(window.matchMedia("(prefers-reduced-motion:reduce)").matches)return;stop();timer=setInterval(()=>{index=index>=maxIndex()?0:index+1;render()},4500)};
prev.addEventListener("click",()=>{index=Math.max(0,index-1);render();start()});next.addEventListener("click",()=>{index=Math.min(maxIndex(),index+1);render();start()});viewport.addEventListener("mouseenter",stop);viewport.addEventListener("mouseleave",start);viewport.addEventListener("focusin",stop);viewport.addEventListener("focusout",start);viewport.addEventListener("touchstart",e=>startX=e.changedTouches[0].clientX,{passive:true});viewport.addEventListener("touchend",e=>{if(startX===null)return;const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>45){index=dx<0?Math.min(maxIndex(),index+1):Math.max(0,index-1);render()}startX=null},{passive:true});window.addEventListener("resize",render);render();start()}
const calc=document.querySelector("#roof-calculator");
if(calc){const v=id=>Number.parseFloat(document.querySelector("#"+id).value);calc.addEventListener("submit",e=>{e.preventDefault();const a=v("length"),w=v("width"),p=v("pitch"),sl=v("sheet-length"),cw=v("cover-width"),area=document.querySelector("#area-result"),sheets=document.querySelector("#sheet-result");if([a,w,p,sl,cw].some(n=>!Number.isFinite(n)||n<=0)){area.textContent="Enter all values";sheets.textContent="Enter all values";return}area.textContent=(a*w*p).toFixed(2)+" m²";sheets.textContent=Math.ceil((a*w*p)/(sl*cw))+" sheets"})}
})();

/* Commercial cart + WhatsApp ordering module */
(() => {
  "use strict";
  const WA = "254762380946", KEY = "mrm_cart_v1";
  const money = n => `KSh ${Number(n).toLocaleString("en-KE",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
  const esc = s => String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY)||"[]"); if(!Array.isArray(cart)) cart=[]; } catch(e) { cart=[]; }

  const products = {
    "Versatile Mabati": {gauge:"28",length:"1 metre",colour:"Not specified",price:600},
    "Eurotile Mabati": {gauge:"28",length:"1 metre",colour:"Not specified",price:700},
    "Romantile Mabati": {gauge:"28",length:"1 metre",colour:"Not specified",price:700},
    "Roofing Nails": {gauge:"Not specified",length:"Not specified",colour:"Not specified",price:100,unit:"kg"},
    "Roofing Rubber Washers": {gauge:"Not specified",length:"Not specified",colour:"Not specified",price:50,unit:"catalogue unit not specified"}
  };
  const boxVariants = [
    {name:"Box Profile 914 Tile Red Gloss",gauge:"30",length:"1 metre",colour:"Tile Red Gloss",price:480},
    {name:"Box Profile 914 Charcoal Grey Gloss",gauge:"28",length:"1 metre",colour:"Charcoal Grey Gloss",price:480},
    {name:"Box Profile 914 Brick Red Gloss",gauge:"30",length:"1 metre",colour:"Brick Red Gloss",price:480},
    {name:"Box Profile 914 Tile-Red Gloss",gauge:"30",length:"1 metre",colour:"Tile-Red Gloss",price:350},
    {name:"BOX PROFILE MABATI",gauge:"28",length:"1 metre",colour:"Not specified",price:450}
  ];
  const corrugated = [
    {name:"Corrugated Mabati",gauge:"28",length:"1 metre",colour:"Not specified",price:400},
    {name:"Corrugated Mabati",gauge:"30",length:"1 metre",colour:"Not specified",price:350}
  ];

  function key(x){return [x.name,x.gauge,x.length,x.colour,x.price].join("|");}
  function save(){localStorage.setItem(KEY,JSON.stringify(cart)); render();}
  function count(){return cart.reduce((a,x)=>a+x.qty,0);}
  function subtotal(){return cart.reduce((a,x)=>a+x.qty*x.price,0);}
  function add(item,qty){qty=Math.max(1,Math.floor(Number(qty)||1));let old=cart.find(x=>key(x)===key(item));if(old)old.qty+=qty;else cart.push({...item,qty});save();open();}
  function remove(i){cart.splice(i,1);save();}
  function change(i,d){if(!cart[i])return;cart[i].qty=Math.max(1,cart[i].qty+d);save();}

  function buildDrawer(){
    if(document.getElementById("cart-drawer")) return;
    document.body.insertAdjacentHTML("beforeend",`
      <div class="cart-overlay" data-cart-overlay hidden></div>
      <aside class="cart-drawer" id="cart-drawer" aria-labelledby="cart-title" aria-hidden="true">
        <div class="cart-head"><div><p class="eyebrow">Your order</p><h2 id="cart-title">Shopping Cart</h2></div><button class="icon-button" type="button" data-cart-close aria-label="Close shopping cart">×</button></div>
        <div class="cart-body">
          <div class="cart-items" data-cart-items><p class="empty-cart">Your cart is empty. Add products to begin.</p></div>
          <div class="cart-summary"><span>Subtotal</span><strong data-cart-subtotal>KSh 0.00</strong></div><div class="cart-summary cart-total"><span>Total</span><strong data-cart-total>KSh 0.00</strong></div>
          <p class="cart-note">Prices shown are catalogue listings and may change. Please confirm current price, availability, colour and purchasing details with MRM before making payment or collection arrangements.</p>
          <section class="checkout-section" aria-labelledby="checkout-title"><h3 id="checkout-title">Customer details</h3><p>Only the minimum details needed to prepare the WhatsApp order are requested.</p>
            <div class="checkout-grid">
              <label>Full Name<input type="text" autocomplete="name" data-customer-name></label>
              <label>Phone Number<input type="tel" autocomplete="tel" data-customer-phone></label>
              <label>Town / County<input type="text" autocomplete="address-level2" data-customer-location></label>
              <label class="full-width">Order Notes<textarea rows="3" data-customer-notes placeholder="e.g. Please confirm current availability and final price."></textarea></label>
            </div>
          </section>
        </div>
        <div class="cart-foot"><button type="button" class="button button-secondary" data-cart-close>Continue Shopping</button><button type="button" class="button button-whatsapp" data-checkout-whatsapp>Order via WhatsApp</button><p class="whatsapp-status" data-whatsapp-status role="status" aria-live="polite"></p></div>
      </aside>`);
  }

  function render(){
    document.querySelectorAll("[data-cart-count]").forEach(x=>x.textContent=count());
    const list=document.querySelector("[data-cart-items]"), total=document.querySelector("[data-cart-subtotal]"), grand=document.querySelector("[data-cart-total]");
    if(!list||!total)return;
    total.textContent=money(subtotal());if(grand)grand.textContent=money(subtotal());
    if(!cart.length){list.innerHTML='<p class="empty-cart">Your cart is empty. Add products to begin.</p>';return;}
    list.innerHTML=cart.map((x,i)=>`<article class="cart-item">
      <div class="cart-item-main"><h3>${esc(x.name)}</h3><p>Gauge ${esc(x.gauge)} · ${esc(x.length)}${x.colour&&x.colour!=="Not specified"?" · "+esc(x.colour):""}</p><strong>${money(x.price)}</strong></div>
      <div class="cart-item-actions"><div class="quantity-control"><button type="button" data-minus="${i}" aria-label="Decrease quantity of ${esc(x.name)}">−</button><input type="number" min="1" value="${x.qty}" data-cart-input="${i}" aria-label="Quantity of ${esc(x.name)}"><button type="button" data-plus="${i}" aria-label="Increase quantity of ${esc(x.name)}">+</button></div><button type="button" class="remove-button" data-remove="${i}" aria-label="Remove ${esc(x.name)} from cart">Remove</button></div>
      <div class="cart-line-total">${money(x.price*x.qty)}</div></article>`).join("");
  }

  function open(){
    const d=document.getElementById("cart-drawer"),o=document.querySelector("[data-cart-overlay]");if(!d)return;
    d.classList.add("is-open");d.setAttribute("aria-hidden","false");if(o){o.hidden=false;requestAnimationFrame(()=>o.classList.add("is-visible"));}
    document.querySelectorAll("[data-cart-open]").forEach(x=>x.setAttribute("aria-expanded","true"));document.body.classList.add("cart-open");
  }
  function close(){
    const d=document.getElementById("cart-drawer"),o=document.querySelector("[data-cart-overlay]");if(!d)return;
    d.classList.remove("is-open");d.setAttribute("aria-hidden","true");if(o){o.classList.remove("is-visible");setTimeout(()=>o.hidden=true,220);}
    document.querySelectorAll("[data-cart-open]").forEach(x=>x.setAttribute("aria-expanded","false"));document.body.classList.remove("cart-open");
  }

  function addControls(){
    const cards=[...document.querySelectorAll(".catalogue-card")];
    cards.forEach(card=>{
      if(card.querySelector(".shop-controls"))return;
      const title=card.querySelector("h2")?.textContent.trim(); if(!title)return;
      let controls="";
      if(title==="Box Profile Mabati"){
        controls=`<div class="shop-controls"><label for="box-profile-option">Colour / specification</label><select id="box-profile-option" data-product-select>${boxVariants.map((x,i)=>`<option value="${i}">${esc(x.colour==="Not specified"?x.name:x.colour)} — Gauge ${x.gauge} — ${money(x.price)}</option>`).join("")}</select><label for="box-profile-qty">Quantity</label><div class="quantity-control"><button type="button" data-local-minus aria-label="Decrease Box Profile quantity">−</button><input id="box-profile-qty" type="number" min="1" value="1" data-local-qty aria-label="Box Profile quantity"><button type="button" data-local-plus aria-label="Increase Box Profile quantity">+</button></div><div class="shop-price" data-box-price>${money(boxVariants[0].price)}</div><div class="shop-actions"><button type="button" class="button button-primary" data-box-add>Add to Cart</button><button type="button" class="button button-whatsapp" data-box-order>Order on WhatsApp</button></div></div>`;
      } else if(title==="Corrugated Mabati"){
        controls=`<div class="shop-controls"><label for="corrugated-option">Gauge / specification</label><select id="corrugated-option" data-product-select>${corrugated.map((x,i)=>`<option value="${i}">Gauge ${x.gauge} — ${money(x.price)}</option>`).join("")}</select><label for="corrugated-qty">Quantity</label><div class="quantity-control"><button type="button" data-local-minus aria-label="Decrease Corrugated Mabati quantity">−</button><input id="corrugated-qty" type="number" min="1" value="1" data-local-qty aria-label="Corrugated Mabati quantity"><button type="button" data-local-plus aria-label="Increase Corrugated Mabati quantity">+</button></div><div class="shop-price" data-card-price>${money(corrugated[0].price)}</div><div class="shop-actions"><button type="button" class="button button-primary" data-generic-add>Add to Cart</button><button type="button" class="button button-whatsapp" data-generic-order>Order on WhatsApp</button></div></div>`;
      } else if(products[title]){
        const x=products[title];
        controls=`<div class="shop-controls"><label for="${title.replace(/[^a-z]+/gi,"-").toLowerCase()}-qty">Quantity${x.unit?" ("+esc(x.unit)+")":""}</label><div class="quantity-control"><button type="button" data-local-minus aria-label="Decrease ${esc(title)} quantity">−</button><input id="${title.replace(/[^a-z]+/gi,"-").toLowerCase()}-qty" type="number" min="1" value="1" data-local-qty aria-label="${esc(title)} quantity"><button type="button" data-local-plus aria-label="Increase ${esc(title)} quantity">+</button></div><div class="shop-price">${money(x.price)}${x.unit==="kg"?" per kg":""}</div><div class="shop-actions"><button type="button" class="button button-primary" data-generic-add>Add to Cart</button><button type="button" class="button button-whatsapp" data-generic-order>Order on WhatsApp</button></div></div>`;
      } else return;
      card.querySelector(".catalogue-body")?.insertAdjacentHTML("beforeend",controls);
    });
  }

  function selectedFor(card){
    const title=card.querySelector("h2")?.textContent.trim();
    const select=card.querySelector("[data-product-select]");
    if(title==="Box Profile Mabati") return boxVariants[Number(select.value)||0];
    if(title==="Corrugated Mabati") return corrugated[Number(select.value)||0];
    return products[title];
  }

  function checkout(){
    if(!cart.length){setStatus("Add at least one product to the cart first.");return;}
    const name=document.querySelector("[data-customer-name]")?.value.trim(),phone=document.querySelector("[data-customer-phone]")?.value.trim(),town=document.querySelector("[data-customer-location]")?.value.trim(),notes=document.querySelector("[data-customer-notes]")?.value.trim()||"Please confirm current availability and final price.";
    if(!name||!phone||!town){setStatus("Please enter your full name, phone number and town/county before ordering.");return;}
    const lines=["Hello MRM,","","I would like to make an enquiry/order for the following products:",""];
    cart.forEach((x,i)=>{lines.push(`${i+1}. ${x.name}`,`Gauge: ${x.gauge}`,`Length: ${x.length}`,...(x.colour&&x.colour!=="Not specified"?[`Colour: ${x.colour}`]:[]),`Quantity: ${x.qty}`,`Unit price: ${money(x.price)}`,`Subtotal: ${money(x.price*x.qty)}`,"");});
    lines.push("Estimated catalogue total:",money(subtotal()),"","Customer details:",`Name: ${name}`,`Phone: ${phone}`,`Town/County: ${town}`,"","Order notes:",notes,"","Thank you.");
    setStatus("Your WhatsApp order has been prepared. MRM will confirm availability, final pricing and purchasing arrangements.");
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(lines.join("\n"))}`,"_blank","noopener,noreferrer");
  }
  function setStatus(t){const x=document.querySelector("[data-whatsapp-status]");if(x)x.textContent=t;}

  buildDrawer();addControls();render();
  document.addEventListener("click",e=>{
    if(e.target.closest("[data-cart-open]")){open();return;}
    if(e.target.closest("[data-cart-close]")||e.target.closest("[data-cart-overlay]")){close();return;}
    const m=e.target.closest("[data-minus]"),p=e.target.closest("[data-plus]"),r=e.target.closest("[data-remove]");
    if(m){change(Number(m.dataset.minus),-1);return} if(p){change(Number(p.dataset.plus),1);return} if(r){remove(Number(r.dataset.remove));return}
    const lm=e.target.closest("[data-local-minus]"),lp=e.target.closest("[data-local-plus]");
    if(lm){const i=lm.parentElement.querySelector("[data-local-qty]");i.value=Math.max(1,Number(i.value||1)-1);return}
    if(lp){const i=lp.parentElement.querySelector("[data-local-qty]");i.value=Math.max(1,Number(i.value||1)+1);return}
    const box=e.target.closest("[data-box-add], [data-box-order]");
    if(box){const card=box.closest(".catalogue-card"),item=selectedFor(card),qty=Number(card.querySelector("[data-local-qty]").value)||1;add(item,qty);return}
    const gen=e.target.closest("[data-generic-add], [data-generic-order]");
    if(gen){const card=gen.closest(".catalogue-card"),item=selectedFor(card),qty=Number(card.querySelector("[data-local-qty]").value)||1;add(item,qty);return}
    if(e.target.closest("[data-checkout-whatsapp]"))checkout();
  });
  document.addEventListener("change",e=>{
    const input=e.target.closest("[data-cart-input]");if(input){const i=Number(input.dataset.cartInput);if(cart[i]){cart[i].qty=Math.max(1,Math.floor(Number(input.value)||1));save();}}
    const select=e.target.closest("#box-profile-option, #corrugated-option");if(select){const card=select.closest(".catalogue-card"),item=selectedFor(card),price=card.querySelector(".shop-price");if(price)price.textContent=money(item.price);}
  });
  document.addEventListener("keydown",e=>{if(e.key==="Escape")close();});
})();
