// Global Variables
var products = [];
var currentId = 0;
// DOM Elements
var form = document.getElementById('product-form');
var nameInput = document.getElementById('product-name');
var quantityInput = document.getElementById('product-quantity');
var priceInput = document.getElementById('product-price');
var productBody = document.getElementById('product-body');
// Event Listener for Form Submission
form.addEventListener('submit', addProduct);
// Function to Add Product
function addProduct(event) {
    event.preventDefault(); // Prevents the form from submitting traditionally
    var name = nameInput.value.trim();
    var quantity = parseInt(quantityInput.value);
    var price = parseFloat(priceInput.value);
    // Validation
    if (!name || isNaN(quantity) || quantity <= 0 || isNaN(price) || price <= 0) {
        alert('Please enter valid product details.');
        return;
    }
    var newProduct = {
        id: currentId++,
        name: name,
        quantity: quantity,
        price: price
    };
    products.push(newProduct);
    renderProducts();
    // Clear input fields after adding the product
    nameInput.value = '';
    quantityInput.value = '';
    priceInput.value = '';
}
// Function to Render Products in Table
function renderProducts() {
    productBody.innerHTML = ''; // Clear the table before re-rendering
    products.forEach(function (product) {
        var row = document.createElement('tr');
        row.innerHTML = "\n            <td>".concat(product.name, "</td>\n            <td>").concat(product.quantity, "</td>\n            <td>$").concat(product.price.toFixed(2), "</td>\n            <td>$").concat((product.quantity * product.price).toFixed(2), "</td>\n            <td class=\"action-buttons\">\n                <button class=\"delete\" onclick=\"deleteProduct(").concat(product.id, ")\">Delete</button>\n            </td>\n        ");
        productBody.appendChild(row);
    });
}
// Function to Delete Product
function deleteProduct(id) {
    products = products.filter(function (product) { return product.id !== id; });
    renderProducts();
}
// Attach the deleteProduct function to the global window object
window.deleteProduct = deleteProduct;
