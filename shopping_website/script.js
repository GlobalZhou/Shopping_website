let cart = [];

function addToCart(product, price) {
    const existingProduct = cart.find(item => item.product === product);
    if (existingProduct) {
        existingProduct.quantity += 1; // 增加商品数量
    } else {
        cart.push({ product, price, quantity: 1 }); // 新商品
    }
    updateCart();
    alert(`${product} 已加入购物车!`); // 弹窗提示
}

function removeFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1; // 减少商品数量
    } else {
        cart.splice(index, 1); // 删除商品
    }
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalPrice = document.getElementById("total-price");
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.product} - ￥${item.price} x ${item.quantity}`;
        li.innerHTML += ` <button onclick="removeFromCart(${index})">移除</button>`;
        cartList.appendChild(li);
        total += item.price * item.quantity;
    });

    cartCount.textContent = cart.length;
    totalPrice.textContent = `总价: ￥${total.toFixed(2)}`;
    localStorage.setItem("cart", JSON.stringify(cart)); // 保存购物车到本地存储
}

function clearCart() {
    cart = [];
    updateCart();
}

function saveProfile() {
    const username = document.getElementById("username").value;
    if (username) {
        localStorage.setItem("username", username); // 保存用户名
        alert("用户名已保存：" + username);
    } else {
        alert("请输入用户名！");
    }
}

// 页面加载时恢复用户名
document.addEventListener("DOMContentLoaded", () => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
        document.getElementById("username").value = savedUsername;
    }

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
});
