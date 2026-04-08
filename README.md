
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">

<style>
body{
font-family:'Poppins',sans-serif;
margin:0;
background:#f5f5f5;
color:#333;
}

.container{
max-width:900px;
margin:auto;
padding:20px;
}

.product-item{
display:flex;
gap:20px;
background:white;
padding:15px;
border-radius:12px;
box-shadow:0 5px 15px rgba(0,0,0,0.08);
margin-bottom:20px;
align-items:center;
}

.product-image img{
width:200px;
border-radius:10px;
}

.product-info{
flex:1;
}

.price{
color:#ff6b35;
font-weight:600;
margin:8px 0;
}

select{
width:100%;
padding:8px;
border-radius:6px;
border:1px solid #ddd;
}

.qty-control{
margin-top:10px;
display:flex;
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
}

.cart{
background:white;
padding:20px;
border-radius:12px;
margin-top:30px;
box-shadow:0 5px 15px rgba(0,0,0,0.08);
}

.cart-item{
display:flex;
justify-content:space-between;
margin-bottom:10px;
}

.total{
font-weight:600;
margin-top:10px;
}

.checkout{
margin-top:15px;
width:100%;
padding:12px;
background:#25D366;
border:none;
color:white;
font-size:16px;
border-radius:8px;
cursor:pointer;
}

.input-user{
margin-top:20px;
}

.input-user input, .input-user textarea{
width:100%;
padding:10px;
margin-bottom:10px;
border-radius:8px;
border:1px solid #ddd;
}
</style>
</head>

<body>

<div class="container">

<h2>Pilih Produk</h2>
<div id="products"></div>

<div class="cart">

<h3>Data Pembeli</h3>
<div class="input-user">
<input type="text" id="nama" placeholder="Nama">
<textarea id="alamat" placeholder="Alamat"></textarea>
</div>

<h3>Keranjang</h3>
<div id="cart-list">Keranjang kosong</div>
<div class="total" id="total">Total: Rp 0</div>

<button class="checkout" onclick="checkoutWA()">
Pesan ke WhatsApp
</button>

</div>

</div>

<script>

const adminWA="6282134566290"

const products=[
{ id:1,name:"Fillet Nila",price:25000,img:"nila.jpg"},
{ id:2,name:"Fillet Gurame",price:35000,img:"gurame.jpg"},
{ id:3,name:"Fillet Kakap",price:40000,img:"kakap.jpg"},
{ id:4,name:"Fillet Kembung",price:20000,img:"kembung.jpg"}
]

let cart=[]

function format(price){
return "Rp "+price.toLocaleString("id-ID")
}

function renderProducts(){
const el=document.getElementById("products")

el.innerHTML=products.map(p=>`
<div class="product-item">
<div class="product-image">
<img src="${p.img}">
</div>

<div class="product-info">
<h3>${p.name}</h3>
<div class="price">${format(p.price)}</div>

<select id="bumbu-${p.id}">
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
const bumbu=document.getElementById("bumbu-"+id).value
const item=cart.find(i=>i.id===id && i.bumbu===bumbu)

if(item){
item.qty++
}else{
const product=products.find(p=>p.id===id)
cart.push({...product,qty:1,bumbu:bumbu})
}
renderCart()
}

function removeCart(id){
const item=cart.find(i=>i.id===id)
if(!item)return

item.qty--
if(item.qty<=0){
cart=cart.filter(i=>i!==item)
}
renderCart()
}

function renderCart(){
const list=document.getElementById("cart-list")

if(cart.length===0){
list.innerHTML="Keranjang kosong"
document.getElementById("total").innerText="Total: Rp 0"
return
}

let total=0

list.innerHTML=cart.map(i=>{
const subtotal=i.price*i.qty
total+=subtotal

return`
<div class="cart-item">
<div>${i.name} (${i.bumbu}) x${i.qty}</div>
<div>${format(subtotal)}</div>
</div>
`
}).join("")

document.getElementById("total").innerText="Total: "+format(total)
}

function checkoutWA(){

const nama=document.getElementById("nama").value.trim()
const alamat=document.getElementById("alamat").value.trim()

if(cart.length===0){
alert("Keranjang kosong")
return
}

if(nama==="" || alamat===""){
alert("Isi nama dan alamat dulu")
return
}

let text = `Halo Admin Filletia

Nama: ${nama}
Alamat: ${alamat}

Saya ingin pesan:
`

let total=0

cart.forEach(i=>{
const subtotal=i.price*i.qty
total+=subtotal

text += `
${i.name} - ${i.bumbu}
${i.qty} x ${format(i.price)} = ${format(subtotal)}
`
})

text += `

Total Pesanan: ${format(total)}
`

const url = `https://wa.me/6282134566290`

window.open(url, "_blank")
}

renderProducts()

</script>

</body>
</html>
