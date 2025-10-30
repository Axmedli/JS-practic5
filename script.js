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
