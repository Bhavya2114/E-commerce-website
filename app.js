const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "Air Force",
    price: 119,
    colors: [
      {
        code: "black",
        img: "./img/air.png",
      },
      {
        code: "darkblue",
        img: "./img/air2.png",
      },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    colors: [
      {
        code: "lightgray",
        img: "./img/jordan.png",
      },
      {
        code: "green",
        img: "./img/jordan2.png",
      },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 109,
    colors: [
      {
        code: "lightgray",
        img: "./img/blazer.png",
      },
      {
        code: "green",
        img: "./img/blazer2.png",
      },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 129,
    colors: [
      {
        code: "black",
        img: "./img/crater.png",
      },
      {
        code: "lightgray",
        img: "./img/crater2.png",
      },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 99,
    colors: [
      {
        code: "gray",
        img: "./img/hippie.png",
      },
      {
        code: "black",
        img: "./img/hippie2.png",
      },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

let selectedSize = null;

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    choosenProduct = products[index];

    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
    
    selectedSize = null;
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    document.getElementById("sizeError").style.display = "none";
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
    selectedSize = size.textContent;
    document.getElementById("sizeError").style.display = "none";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

let cart = [];

productButton.addEventListener("click", () => {
  if (!selectedSize) {
    document.getElementById("sizeError").style.display = "block";
    document.getElementById("sizeError").scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  
  const existingItemIndex = cart.findIndex(
    item => item.productId === choosenProduct.id && item.size === selectedSize
  );
  
  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
  } else {
    cart.push({
      productId: choosenProduct.id,
      title: choosenProduct.title,
      price: choosenProduct.price,
      img: currentProductImg.src,
      size: selectedSize,
      quantity: 1,
      id: Date.now()
    });
  }
  
  console.log("Added to cart:", choosenProduct.title, "Size:", selectedSize);
  console.log("Cart items:", cart.length);
  
  localStorage.setItem('cart', JSON.stringify(cart));
  
  alert("✓ " + choosenProduct.title + " (Size " + selectedSize + ") added to cart!");
  
  selectedSize = null;
  currentProductSizes.forEach((size) => {
    size.style.backgroundColor = "white";
    size.style.color = "black";
  });
});


close.addEventListener("click", () => {
  payment.style.display = "none";
});

const cartButton = document.querySelector(".cartButton");
cartButton.addEventListener("click", () => {
  
  localStorage.setItem('cart', JSON.stringify(cart));
  
  window.location.href = "cart.html";
});


const productImages = {
  1: ["./img/air.png", "./img/air2.png", "./img/air.png"], // Air Force images
  2: ["./img/jordan.png", "./img/jordan2.png", "./img/jordan.png"], // Air Jordan images
  3: ["./img/blazer.png", "./img/blazer2.png", "./img/blazer.png"], // Blazer images
  4: ["./img/crater.png", "./img/crater2.png", "./img/crater.png"], // Crater images
  5: ["./img/hippie.png", "./img/hippie2.png", "./img/hippie.png"] // Hippie images
};

let currentImageIndex = 0;
let currentProductId = 1;

const mainProductImg = document.getElementById("mainProductImg");
const indicators = document.querySelectorAll(".indicator");


function getProductImages() {
  return productImages[currentProductId] || productImages[1];
}


function showImage(index) {
  const images = getProductImages();
  
  if (index < 0) {
    currentImageIndex = images.length - 1;
  } else if (index >= images.length) {
    currentImageIndex = 0;
  } else {
    currentImageIndex = index;
  }
  
  
  mainProductImg.style.opacity = "0";
  setTimeout(() => {
    mainProductImg.src = images[currentImageIndex];
    mainProductImg.style.opacity = "1";
  }, 250);
  
  
  updateIndicators();
}

// Next image
function nextImage() {
  showImage(currentImageIndex + 1);
}

// Previous image
function previousImage() {
  showImage(currentImageIndex - 1);
}

// Update indicator dots
function updateIndicators() {
  indicators.forEach((indicator, index) => {
    if (index === currentImageIndex) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}

// Update product when menu item is clicked
const originalMenuItemListener = menuItems[0].onclick;
menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentProductId = index + 1;
    currentImageIndex = 0;
    updateIndicators();
  });
});

// Initialize indicators
updateIndicators();

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  const productSection = document.getElementById("product");
  if (productSection && window.innerHeight > productSection.getBoundingClientRect().top) {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") previousImage();
  }
});


