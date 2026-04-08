```html
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Filletia | Ikan Fillet Premium</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">

<style>

body{
font-family:'Poppins',sans-serif;
margin:0;
background:#f7f7f7;
color:#222;
}

header{
background:linear-gradient(135deg,#ff6b35,#ff8c42);
padding:50px 20px;
text-align:center;
color:white;
}

header h1{
margin:0;
font-size:40px;
}

header p{
opacity:.9;
}

.container{
max-width:1100px;
margin:auto;
padding:30px 20px;
}

.product-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
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
height:150px;
object-fit:cover;
}

.product-info{
padding:15px;
}

.product-title{
font-weight:600;
font-size:16px;
}

.price{
color:#ff6b35;
font-weight:600;
margin-top:5px;
}

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
width:28px;
height:28px;
border-radius:6px;
cursor:pointer;
}

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

</style>
</head>

<body>

<header>
<h1>Filletia</h1>
<p>Ikan Fillet Premium Segar Setiap Hari</p>
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

</div>

<script>

const adminWA="6281234567890"

const products=[
{
id:1,
name:"Fillet Nila",
price:25000,
img:"https://images.unsplash.com/photo-1604908176997-4316d1b9a5b4"
},
{
id:2,
name:"Fillet Gurame",
price:35000,
img:"https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62"
},
{
id:3,
name:"Fillet Kakap",
price:40000,
img:"https://images.unsplash.com/photo-1553621042-f6e147245754"
},
{
id:4,
name:"Fillet Kembung",
price:20000,
img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
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

const url=`https://wa.me/${adminWA}?text=${text}`

window.open(url,"_blank")

}

renderProducts()

</script>

</body>
</html>
```
