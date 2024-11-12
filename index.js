const loginButton = document.getElementById('loginButton');
const storeContainer = document.getElementById('storeContainer');
const loginContainer = document.getElementById('loginContainer');
const userNameSpan = document.getElementById('userName');
const profileNameSpan = document.getElementById('profileName');
const profileNumberSpan = document.getElementById('profileNumber');

const cartItemsList = document.getElementById('cartItems');
const totalAmountSpan = document.getElementById('totalAmount');
const cartCountSpan = document.getElementById('cartCount');
let totalAmount = 0;
let cartCount = 0;

loginButton.addEventListener('click', () => {
    const nome = document.getElementById('nome').value;
    const numero = document.getElementById('numero').value;
    if (nome && numero) {
        userNameSpan.textContent = nome;
        profileNameSpan.textContent = nome;
        profileNumberSpan.textContent = numero;
        loginContainer.style.display = 'none';
        storeContainer.style.display = 'block';
    } else {
        alert("Por favor, preencha ambos os campos: Nome e Número.");
    }
});

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.product');
        const product = productElement.getAttribute('data-product');
        const price = parseFloat(productElement.getAttribute('data-price'));
        const image = productElement.getAttribute('data-image');

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${image}" alt="${product}" style="width: 110px; height: 100px;"> 
            ${product} - ${price}₣ x <span class="cart-quantity">1</span>
            <div class="quantity-controls">
                <button class="decrease">-</button>
                <span class="quantity">1</span>
                <button class="increase">+</button>
            </div>`;
        
        cartItemsList.appendChild(listItem);

        // Adicionar eventos de clique aos botões de quantidade
        const decreaseButton = listItem.querySelector('.decrease');
        const increaseButton = listItem.querySelector('.increase');
        const quantitySpan = listItem.querySelector('.quantity');

        decreaseButton.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;
                updateTotal();
            }
        });

        increaseButton.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            quantity++;
            quantitySpan.textContent = quantity;
            updateTotal();
        });

        totalAmount += price;
        totalAmountSpan.textContent = totalAmount.toFixed(2);
        cartCount++;
        cartCountSpan.textContent = cartCount;
    });
});

// Função para atualizar o total
function updateTotal() {
    totalAmount = 0;
    cartItemsList.querySelectorAll('li').forEach(item => {
        const price = parseFloat(item.innerText.split('-')[1].split('₣')[0].trim());
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        totalAmount += price * quantity;
    });
    totalAmountSpan.textContent = totalAmount.toFixed(2);
}

// Evento de checkout
document.getElementById('checkoutButton').addEventListener('click', () => {
    const orderCode = Math.floor(Math.random() * 10000);
    document.getElementById('orderCode').textContent = orderCode;
    document.getElementById('orderConfirmation').style.display = 'block';

    // Limpar o carrinho e voltar para a página principal
    cartItemsList.innerHTML = '';
    totalAmount = 0;
    cartCount = 0;
    totalAmountSpan.textContent = '0.00';
    cartCountSpan.textContent = '0';
    document.getElementById('products').style.display = 'block';
    document.getElementById('cart').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
});

// Eventos para mostrar as seções
document.getElementById('cartLink').addEventListener('click', (event) => {
    event.preventDefault();
    const cart = document.getElementById('cart');
    const profile = document.getElementById('profile');
    const products = document.getElementById('products');

    cart.style.display = 'block';
    profile.style.display = 'none';
    products.style.display = 'none';
});

document.getElementById('profileLink').addEventListener('click', (event) => {
    event.preventDefault();
    const profile = document.getElementById('profile');
    const cart = document.getElementById('cart');
    const products = document.getElementById('products');

    profile.style.display = 'block';
    cart.style.display = 'none';
    products.style.display = 'none';
});

// Evento para mostrar a seção de produtos
document.getElementById('homeLink').addEventListener('click', (event) => {
    event.preventDefault();
    const products = document.getElementById('products');
    const cart = document.getElementById('cart');
    const profile = document.getElementById('profile');

    products.style.display = 'block';
    cart.style.display = 'none';
    profile.style.display = 'none';
});
