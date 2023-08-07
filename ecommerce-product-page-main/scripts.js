// Selecting DOM elements
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".header-links");
const cartIcon = document.getElementById("cartIcon");
const cartView = document.querySelector(".cartView");
const cartDisplay = document.querySelector(".cartDisplay");
const plusBtn = document.querySelector(".plusBtn");
const minusBtn = document.querySelector(".minusBtn");
const itemNo = document.querySelector(".itemBuy");
const imageContainer = document.querySelector(".imageContainer");
const thumbnails = document.querySelectorAll(".thumbnails");

// Array of image names for product thumbnails
const imageNames = [
  "image-product-1.jpg",
  "image-product-2.jpg",
  "image-product-3.jpg",
  "image-product-4.jpg",
];

// Function to get the cart items from local storage or create an empty cart

function getCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  return cartItems;
}

// Function to update and save the cart items to local storage
function updateCartItems(cartItems) {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Function to add an item to the cart
function addToCart(item, quantity) {
  const cartItems = getCartItems();
  for (let i = 0; i < quantity; i++) {
    cartItems.push(item);
  }
  updateCartItems(cartItems);
}

// Function to remove an item from the cart
function removeFromCart(item) {
  const cartItems = getCartItems();
  const updatedCartItems = cartItems.filter((cartItem) => cartItem !== item);
  updateCartItems(updatedCartItems);
}

// Function to display cart items in the cart display
function displayCartItems() {
  const cartItems = getCartItems();
  cartDisplay.innerHTML = "";

  cartItems.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item");

    const itemText = document.createElement("span");
    itemText.textContent = item;
    itemText.classList.add("item-text");
    cartItemElement.appendChild(itemText);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      removeFromCart(item);
      displayCartItems();
    });
    cartItemElement.appendChild(removeButton);
    removeButton.classList.add("remove-btn");
    cartDisplay.appendChild(cartItemElement);
  });
}















// Code to display product in big view when thumbnails are clicked
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    // Get the image source for the large view based on the clicked thumbnail index
    const largeImageSrc = "./product-images/" + imageNames[index];
    const largeImage = new Image();
    largeImage.src = largeImageSrc;
    largeImage.alt = "Large Image";
    largeImage.classList.add("large-image");

    // Clear the imageContainer and append the large image to it
    imageContainer.innerHTML = "";
    imageContainer.appendChild(largeImage);
  });
});

// Mobile menu functionality
hamburger.addEventListener("click", () => {
  // Toggle active class on hamburger and navigation links
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close the mobile menu when a navigation link is clicked
const navLink = document.querySelectorAll(".navLink");
navLink.forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLink.forEach((n) => n.classList.remove("active"));
  })
);

// Increase the item count when plus button is clicked
plusBtn.addEventListener("click", () => {
  let total = Number(itemNo.innerText) + 1;
  itemNo.innerHTML = total;
});

// Decrease the item count when minus button is clicked, ensuring it never goes below 0
minusBtn.addEventListener("click", () => {
  let total = Number(itemNo.innerText) - 1;
  itemNo.innerHTML = total < 0 ? 0 : total;
});

// Display the cart view when the cart icon is clicked
cartIcon.addEventListener("click", () => {
  cartView.classList.toggle("active");
  displayCartItems();
});

// Add an item to the cart when the "Add to cart" button is clicked
const shopCartBtn = document.querySelector(".addToCart");
shopCartBtn.addEventListener("click", () => {
  let item = "item added"; // Change to the actual item name or details
  let quantity = Number(itemNo.innerText)
  if (quantity > 0) {
    addToCart(item, quantity);
    displayCartItems()
  }
});
