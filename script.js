const registerNameInput = document.getElementById("registerNameInput");
const registerLastNameInput = document.getElementById("registerLastNameInput");
const registerEmailInput = document.getElementById("registerEmailInput");
const registerPasswordInput = document.getElementById("registerPasswordInput");

const registerBtn = document.getElementById("registerBtn");

const loginEmailInput = document.getElementById("loginEmailInput");
const loginPasswordInput = document.getElementById("loginPasswordInput");

const loginBtn = document.getElementById("loginBtn");

const registerUser = async () => {
  try {
    const res = await fetch("https://ilkinibadov.com/api/v1/auth/signup", {
      method: "POST",
      body: JSON.stringify(
          {
            firstname: registerNameInput.value,
            lastname: registerLastNameInput.value,
            email: registerEmailInput.value,
            password: registerPasswordInput.value,
          }
      ),
      headers:{
        "Content-Type": "application/json"
      }
    })

    const data = await res.json()
    if(res.ok){
      window.location.href="http://127.0.0.1:5500/index.html"
    }
    else{
      alert(data.error)
    }

  } catch (error) {
    console.error(error);
  }
}
 
registerBtn?.addEventListener("click", registerUser)

const loginUser = async () => {
  try {
    const res = await fetch("https://ilkinibadov.com/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(
          {
            email: loginEmailInput.value,
            password: loginPasswordInput.value,
          }
      ),
      headers:{
        "Content-Type": "application/json"
      }
    })

    const data = await res.json()
    if(res.ok){
      window.location.href="http://127.0.0.1:5500/index.html"
    }
    else{
      alert(data.error)
    }

  } catch (error) {
    console.error(error);
  }
}


loginBtn?.addEventListener("click", loginUser)


const productsContainer = document.getElementById("productsContainer")

const getProductData = async () =>{
  try{
    const res = await fetch("https://ilkinibadov.com/api/v1/products")
    const data = await res.json()

    return data.products
  }catch(error){
    console.error(error)
  }
}

const renderProduct = async () => {
  const products = await getProductData()

  products.forEach((product) => {
    const productCard = document.createElement("div")
    const imgContainer = document.createElement("div")
    const productPhoto = document.createElement("img")
    const addToCart = document.createElement("button")
    const productTitle = document.createElement("p")
    const productPrice = document.createElement("p")

    productPhoto.src = product.images?.[0]
    productPhoto.alt = product.title
    productPhoto.classList.add("w-full", "h-60", "object-contain")

    addToCart.innerText = "Add To Basket"
    addToCart.classList.add("inter-medium","absolute","bottom-0","left-0","right-0","bg-black","text-white","py-2","opacity-0","group-hover:opacity-100","transition","duration-300")

    productTitle.innerText = product.title
    productPrice.innerText = `${product.currency}${product.price}`

    productCard.classList.add("group","cursor-pointer","transition","duration-300")

    imgContainer.classList.add("relative","bg-[#F5F5F5]","flex","items-center","justify-center","p-7")

    productTitle.classList.add("inter-medium", "text-lg", "pt-4", "pb-2", "truncate")
    productPrice.classList.add("inter-medium", "text-xl", "text-[#DB4444]")

    imgContainer.append(productPhoto, addToCart)
    productCard.append(imgContainer, productTitle, productPrice)
    productsContainer.append(productCard)
  });
};


renderProduct()