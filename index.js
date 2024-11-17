const loginButton = document.getElementById('loginButton');
const storeContainer = document.getElementById('storeContainer');
const loginContainer = document.getElementById('loginContainer');
const userNameSpan = document.getElementById('userName');
const profileNameSpan = document.getElementById('profileName');
const profileNumberSpan = document.getElementById('profileNumber');
const orderCodeSpan = document.getElementById('orderCode');

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
            <img src="${image}" alt="${product}" style="width: 138px; height: 130px;"> 
            ${product} - ${price}₣ 
            <div class="quantity-controls">
                <button class="decrease">➖</button>
                <span class="quantity">1</span>
                <button class="increase">➕</button>
                <button class="remove">🗑️</button> <!-- Botão de remover -->
            </div>`;
        
        cartItemsList.appendChild(listItem);

        const decreaseButton = listItem.querySelector('.decrease');
        const increaseButton = listItem.querySelector('.increase');
        const quantitySpan = listItem.querySelector('.quantity');
        const removeButton = listItem.querySelector('.remove'); // Botão de remover

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

        removeButton.addEventListener('click', () => {
            cartItemsList.removeChild(listItem); // Remove o item da lista
            cartCount--;
            cartCountSpan.textContent = cartCount;
            updateTotal(); // Atualiza o total
        });

        totalAmount += price;
        totalAmountSpan.textContent = totalAmount.toFixed(2);
        cartCount++;
        cartCountSpan.textContent = cartCount;
    });
});

function updateTotal() {
    totalAmount = 0;
    cartItemsList.querySelectorAll('li').forEach(item => {
        const price = parseFloat(item.innerText.split('-')[1].split('₣')[0].trim());
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        totalAmount += price * quantity;
    });
    totalAmountSpan.textContent = totalAmount.toFixed(2);
}

document.getElementById('checkoutButton').addEventListener('click', () => {
    if (cartCount === 0) {
        alert("O carrinho está vazio! Adicione produtos antes de finalizar a compra.");
        return;
    }

    const orderCode = Math.floor(Math.random() * 10000);
    orderCodeSpan.textContent = orderCode;
    document.getElementById('orderConfirmation').style.display = 'block';

    cartItemsList.innerHTML = '';
    totalAmount = 0;
    cartCount = 0;
    totalAmountSpan.textContent = '0.00';
    cartCountSpan.textContent = '0';
    document.getElementById('products').style.display = 'grid'; // Mantenha o estilo grid
    document.getElementById('cart').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
});

// Função para mostrar a seção de produtos
function showProducts() {
    document.getElementById('products').style.display = 'grid'; // Mantenha o estilo grid
    document.getElementById('cart').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
}

// Eventos para mostrar as seções
document.getElementById('cartLink').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('cart').style.display = 'block';
    document.getElementById('profile').style.display = 'none';
    document.getElementById('products').style.display = 'none';
});

document.getElementById('profileLink').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('profile').style.display = 'block';
    document.getElementById('cart').style.display = 'none';
    document.getElementById('products').style.display = 'none';
});

// Evento para mostrar a seção de produtos
document.getElementById('homeLink').addEventListener('click', (event) => {
    event.preventDefault();
    showProducts();
});
