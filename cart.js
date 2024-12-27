// Create a file named cart.js and add this code
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadCart();
    }

    loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
            this.updateCartCount();
            this.renderCartItems();
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image
            });
        }
        
        this.saveCart();
        this.renderCartItems();
        showNotification('Item added to cart');
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.renderCartItems();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item && newQuantity > 0) {
            item.quantity = newQuantity;
            this.saveCart();
            this.renderCartItems();
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        const itemCount = this.items.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = itemCount;
        cartCount.classList.toggle('hidden', itemCount === 0);
    }

    renderCartItems() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        cartItems.innerHTML = '';
        
        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'flex items-center gap-4 border-b border-gray-200 py-4';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <h4 class="font-semibold">${item.name}</h4>
                    <div class="text-green-600">$${item.price.toFixed(2)}</div>
                    <div class="flex items-center gap-2 mt-2">
                        <button onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})" 
                                class="bg-gray-200 px-2 rounded">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})" 
                                class="bg-gray-200 px-2 rounded">+</button>
                    </div>
                </div>
                <button onclick="cart.removeItem('${item.id}')" 
                        class="text-red-500 hover:text-red-700">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            `;
            cartItems.appendChild(itemElement);
        });

        cartTotal.textContent = `Total: $${this.getTotal().toFixed(2)}`;
    }

    checkout() {
        if (this.items.length === 0) {
            showNotification('Your cart is empty');
            return;
        }
        
        // Here you would typically integrate with a payment processor
        alert('Proceeding to checkout...');
        // After successful payment:
        this.items = [];
        this.saveCart();
        this.renderCartItems();
        toggleModal('cartModal');
        showNotification('Order placed successfully!');
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// Initialize cart
const cart = new ShoppingCart();