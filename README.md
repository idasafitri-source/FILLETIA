
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">

<style>

body{
font-family:'Poppins',sans-serif;
margin:0;
background:#f7f7f7;
color:#222;
}

/* HEADER LOGO */

.header-logo{
background:#ff6b35;
display:flex;
justify-content:center;
align-items:center;
padding:30px 0;
}

.logo{
width:320px;
max-width:90%;
}

/* CONTAINER */

.container{
max-width:1100px;
margin:auto;
padding:30px 20px;
}

/* GRID PRODUK */

.product-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(230px,1fr));
gap:20px;
}

.product{
background:white;
border-radius:15px;
overflow:hidden;
box-shadow:0 8px 20px rgba(0,0,0,0.08);
transition:.3s;
}

.product:hover{
transform:translateY(-5px);
}

.product img{
width:100%;
height:220px;
object-fit:cover;
}

/* INFO PRODUK */

.product-info{
padding:15px;
}

.product-title{
font-weight:600;
font-size:17px;
}

.price{
color:#ff6b35;
font-weight:600;
margin-top:5px;
}

/* SELECT BUMBU */

select{
width:100%;
padding:6px;
margin-top:8px;
border-radius:6px;
border:1px solid #ddd;
}

/* QTY BUTTON */

.qty-control{
display:flex;
align-items:center;
margin-top:10px;
gap:10px;
}

.qty-btn{
background:#ff6b35;
border:none;
color:white;
width:30px;
height:30px;
border-radius:6px;
cursor:pointer;
font-size:16px;
}

/* CART */

.cart{
margin-top:40px;
background:white;
padding:20px;
border-radius:15px;
box-shadow:0 6px 15px rgba(0,0,0,0.08);
}

.cart h2{
margin-top:0;
}

.cart-item{
display:flex;
justify-content:space-between;
margin-bottom:10px;
font-size:14px;
}

.total{
margin-top:15px;
font-weight:700;
font-size:18px;
}

/* BUTTON WHATSAPP */

.checkout{
margin-top:15px;
width:100%;
padding:14px;
background:#25D366;
color:white;
border:none;
font-size:16px;
border-radius:10px;
cursor:pointer;
}

.checkout:hover{
opacity:.9;
}

/* INSTAGRAM */

.social{
text-align:center;
margin-top:40px;
}

.ig-btn{
display:inline-block;
padding:12px 25px;
background:#E1306C;
color:white;
text-decoration:none;
border-radius:10px;
font-weight:600;
}

</style>
</head>

<body>

<header class="header-logo">
<img src="logo.png" class="logo">
</header>

<div class="container">

<h2>Produk Kami</h2>

<div class="product-grid" id="products"></div>

<div class="cart">

<h2>Keranjang</h2>

<div id="cart-list"></div>

<div class="total" id="total">Total: Rp 0</div>

<button class="checkout" onclick="checkoutWA()">
Checkout via WhatsApp
</button>

</div>

<div class="social">
<a class="ig-btn" target="_blank" href="https://www.instagram.com/filletia.purwokerto?igsh=MWIxOHJucmZ1c213bA==">
Kunjungi Instagram Kami
</a>
</div>

</div>

<script>

const adminWA="6281234567890"

const products=[
{
id:1,
name:"Fillet Nila",
price:25000,
img:"nila.jpg"
},
{
id:2,
name:"Fillet Gurame",
price:35000,
img:"gurame.jpg"
},
{
id:3,
name:"Fillet Kakap",
price:40000,
img:"kakap.jpg"
},
{
id:4,
name:"Fillet Kembung",
price:20000,
img:"kembung.jpg"
}
]

let cart=[]

function format(price){
return "Rp "+price.toLocaleString("id-ID")
}

function renderProducts(){

const el=document.getElementById("products")

el.innerHTML=products.map(p=>`

<div class="product">

<img src="${p.img}">

<div class="product-info">

<div class="product-title">${p.name}</div>

<div class="price">${format(p.price)}</div>

<select>
<option>Bumbu Marinasi</option>
<option>Bumbu Bakar</option>
<option>Bumbu Pepes</option>
<option>Bumbu Kuah Kuning</option>
</select>

<div class="qty-control">

<button class="qty-btn" onclick="addCart(${p.id})">+</button>

<button class="qty-btn" onclick="removeCart(${p.id})">-</button>

</div>

</div>

</div>

`).join("")

}

function addCart(id){

const item=cart.find(i=>i.id===id)

if(item){
item.qty++
}else{
const product=products.find(p=>p.id===id)
cart.push({...product,qty:1})
}

renderCart()

}

function removeCart(id){

const item=cart.find(i=>i.id===id)

if(!item)return

item.qty--

if(item.qty<=0){
cart=cart.filter(i=>i.id!==id)
}

renderCart()

}

function renderCart(){

const list=document.getElementById("cart-list")

if(cart.length===0){

list.innerHTML="Keranjang masih kosong"

document.getElementById("total").innerText="Total: Rp 0"

return

}

let total=0

list.innerHTML=cart.map(i=>{

total+=i.price*i.qty

return`

<div class="cart-item">

<div>${i.name} x${i.qty}</div>

<div>${format(i.price*i.qty)}</div>

</div>

`

}).join("")

document.getElementById("total").innerText="Total: "+format(total)

}

function checkoutWA(){

if(cart.length===0){
alert("Keranjang kosong")
return
}

let text="Halo admin Filletia%0A%0ASaya ingin pesan:%0A"

let total=0

cart.forEach(i=>{
text+=`%0A${i.name} x${i.qty} = ${format(i.price*i.qty)}`
total+=i.price*i.qty
})

text+=`%0A%0ATotal: ${format(total)}`

const url=`https://wa.me/6282134566290`

window.open(url,"_blank")

}

renderProducts()

</script>

</body>
</html>
