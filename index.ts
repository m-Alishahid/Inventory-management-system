// Product Interface
interface Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

// Global Variables
let products: Product[] = [];
let currentId = 0;

// DOM Elements
const form = document.getElementById('product-form') as HTMLFormElement;
const nameInput = document.getElementById('product-name') as HTMLInputElement;
const quantityInput = document.getElementById('product-quantity') as HTMLInputElement;
const priceInput = document.getElementById('product-price') as HTMLInputElement;
const productBody = document.getElementById('product-body') as HTMLTableSectionElement;

// Event Listener for Form Submission
form.addEventListener('submit', addProduct);

// Function to Add Product
function addProduct(event: Event): void {
    event.preventDefault(); // Prevents the form from submitting traditionally

    const name = nameInput.value.trim();
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceInput.value);

    // Validation
    if (!name || isNaN(quantity) || quantity <= 0 || isNaN(price) || price <= 0) {
        alert('Please enter valid product details.');
        return;
    }

    const newProduct: Product = {
        id: currentId++,
        name,
        quantity,
        price
    };

    products.push(newProduct);
    renderProducts();

    // Clear input fields after adding the product
    nameInput.value = '';
    quantityInput.value = '';
    priceInput.value = '';
}

// Function to Render Products in Table
function renderProducts(): void {
    productBody.innerHTML = ''; // Clear the table before re-rendering

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>$${(product.quantity * product.price).toFixed(2)}</td>
            <td class="action-buttons">
                <button class="delete" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        productBody.appendChild(row);
    });
}

// Function to Delete Product
function deleteProduct(id: number): void {
    products = products.filter(product => product.id !== id);
    renderProducts();
}

// Attach the deleteProduct function to the global window object
(window as any).deleteProduct = deleteProduct;