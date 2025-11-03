const registerNameInput = document.getElementById("registerNameInput");
const registerLastNameInput = document.getElementById("registerLastNameInput");
const registerEmailInput = document.getElementById("registerEmailInput");
const registerPasswordInput = document.getElementById("registerPasswordInput");

const registerBtn = document.getElementById("registerBtn");

const loginEmailInput = document.getElementById("loginEmailInput");
const loginPasswordInput = document.getElementById("loginPasswordInput");
const rememberCheckbox = document.getElementById("remember");

const loginBtn = document.getElementById("loginBtn");

// ==================== REGISTER ====================
const registerUser = async () => {
  try {
    const res = await fetch("https://ilkinibadov.com/api/v1/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        firstname: registerNameInput.value,
        lastname: registerLastNameInput.value,
        email: registerEmailInput.value,
        password: registerPasswordInput.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (res.ok) {
      window.location.href = "http://127.0.0.1:5500/index.html";
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error(error);
  }
};

registerBtn?.addEventListener("click", registerUser);

// ==================== LOGIN ====================
const loginUser = async () => {
  try {
    const res = await fetch("https://ilkinibadov.com/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: loginEmailInput.value,
        password: loginPasswordInput.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
      const token = data.token || data.accessToken || null;

      if (token) {
        if (rememberCheckbox?.checked) {
          localStorage.setItem("authToken", token);
          localStorage.setItem("rememberMe", "true");
        } else {
          sessionStorage.setItem("authToken", token);
          localStorage.setItem("rememberMe", "false");
        }
      }

      window.location.href = "http://127.0.0.1:5500/index.html";
    } else {
      alert(data.error || "Login failed");
    }
  } catch (error) {
    console.error(error);
  }
};

loginBtn?.addEventListener("click", loginUser);

// window?.addEventListener("DOMContentLoaded", () => {
//   const token =
//     localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
//   const remember = localStorage.getItem("rememberMe");

//   const isLoginPage = window.location.pathname.includes("login.html");

//   if (isLoginPage && token && remember === "true") {
//     window.location.href = "http://127.0.0.1:5500/index.html";
//   }
// });


// ==================== PRODUCTS ====================
const productsContainer = document.getElementById("productsContainer");

const getProductData = async () => {
  try {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    const res = await fetch("https://ilkinibadov.com/api/v1/products", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error(error);
  }
};

const renderProduct = async () => {
  const products = await getProductData();

  products.forEach((product) => {
    const productCard = document.createElement("div");
    const imgContainer = document.createElement("div");
    const productPhoto = document.createElement("img");
    const addToCart = document.createElement("button");
    const productTitle = document.createElement("p");
    const productPrice = document.createElement("p");

    productPhoto.src = product.images?.[0];
    productPhoto.alt = product.title;
    productPhoto.classList.add("w-full", "h-60", "object-contain");

    addToCart.innerText = "Add To Basket";
    addToCart.classList.add(
      "inter-medium",
      "absolute",
      "bottom-0",
      "left-0",
      "right-0",
      "bg-black",
      "text-white",
      "py-2",
      "opacity-0",
      "group-hover:opacity-100",
      "transition",
      "duration-300"
    );

    productTitle.innerText = product.title;
    productPrice.innerText = `${product.currency}${product.price}`;

    productCard.classList.add("group", "cursor-pointer", "transition", "duration-300");
    imgContainer.classList.add(
      "relative",
      "bg-[#F5F5F5]",
      "flex",
      "items-center",
      "justify-center",
      "p-7"
    );
    productTitle.classList.add("inter-medium", "text-lg", "pt-4", "pb-2", "truncate");
    productPrice.classList.add("inter-medium", "text-xl", "text-[#DB4444]");

    imgContainer.append(productPhoto, addToCart);
    productCard.append(imgContainer, productTitle, productPrice);
    productsContainer?.append(productCard);
  });
};

renderProduct();

// ==================== DARK MODE ====================
const modeBtn = document.getElementById("modeBtn");
const body = document.getElementById("body");
const loginh1 = document.getElementById("loginh1");
const loginp1 = document.getElementById("loginp1");
const loginp2 = document.getElementById("loginp2");
const registerPage = document.getElementById("registerPage");


modeBtn?.addEventListener("click", () => {
  body.classList.toggle("bg-black");
  const isDarkModeActive = body.classList.contains("bg-black");
  modeBtn.innerText = isDarkModeActive ? "Disable Darkmode" : "Enable Darkmode";
  isDarkModeActive? localStorage.setItem("mode","dark"): localStorage.setItem("mode","light");
  modeBtn.classList.toggle("text-white");
  loginh1?.classList.toggle("text-white");
  loginp1?.classList.toggle("text-white");
  loginp2?.classList.toggle("text-white");
  loginEmailInput?.classList.toggle("text-white");
  loginPasswordInput?.classList.toggle("text-white");
  loginBtn?.classList.toggle("text-white");
  registerPage?.classList.toggle("text-white");
});

window?.addEventListener("DOMContentLoaded", () => {
  const savedMode = localStorage.getItem("mode");

  if (savedMode === "dark") {
    body.classList.add("bg-black");
    modeBtn.innerText = "Disable Darkmode";
    modeBtn.classList.add("text-white");

    loginh1?.classList.add("text-white");
    loginp1?.classList.add("text-white");
    loginp2?.classList.add("text-white");
    loginEmailInput?.classList.add("text-white");
    loginPasswordInput?.classList.add("text-white");
    loginBtn?.classList.add("text-white");
    registerPage?.classList.add("text-white");
  } else {
    body.classList.remove("bg-black");
    modeBtn.innerText = "Enable Darkmode";
    modeBtn.classList.remove("text-white");

    loginh1?.classList.remove("text-white");
    loginp1?.classList.remove("text-white");
    loginp2?.classList.remove("text-white");
    loginEmailInput?.classList.remove("text-white");
    loginPasswordInput?.classList.remove("text-white");
    loginBtn?.classList.remove("text-white");
    registerPage?.classList.remove("text-white");
  }
});






// localStorage.setItem("user","Murad")
// localStorage.setItem("isUserRegistered",JSON.stringify(true))

// const isUserRegistered = JSON.parse(localStorage.getItem("isUserRegistered"))


// console.log(typeof isUserRegistered)

// localStorage.removeItem("user")
// localStorage.clear()
// const date = new Date()
// date.setTime(date.getDate() +(1*60*1000) )

// document.cookie = "user=Murad; expires=" + date.toUTCString()

// cookieStore.delete("")

// document.cookie = "user=Murad"

// document.cookie = "isRegistered=true"

// console.log(document.cookie)


// function getCookie(name){
//   const cookie = document.cookie.split("; ")

//   for(let c of cookie){
//     const [ket,value] = c.split("=")
//     if(ket=== name) return value
//   }

//   return null
// }

// console.log(getCookie("user"))


