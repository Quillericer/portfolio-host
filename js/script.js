const hamburger = document.querySelector(".hamburger"),
  menu = document.querySelector(".menu"),
  closeElem = menu.querySelector(".menu__close"),
  menuOverlay = menu.querySelector(".menu__overlay"),
  percent = document.querySelectorAll(".statistic__percent"),
  lines = document.querySelectorAll(".statistic__line span"),
  btn = document.querySelector("button"),
  form = document.querySelector("form");


hamburger.addEventListener("click", showHamburger);

closeElem.addEventListener("click", hideHamburger);

percent.forEach((item, i) => {
  lines[i].style.width = item.innerHTML;
});

function showHamburger() {
  menu.classList.add("active");
  document.body.style.overflow = "hidden";
}

function hideHamburger() {
  menu.classList.remove("active");
  document.body.style.overflow = "";
}

menuOverlay.addEventListener("click", hideHamburger);

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" || menu.classList.contains("active")) {
    hideHamburger();
  }
});

const postData = async (url, data) => {
  const res = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: data,
  });
  return await res.json();
};



function bindPostData(item) {
  item.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(item);
    const toJSON = JSON.stringify(Object.fromEntries(formData.entries()));
    postData("http://localhost:3000/requests", toJSON)
      .then((data) => {
        console.log(data, 'Данные отправлены успешно')
      })
      .catch(() => {
        console.log("Произошла ошибка");
      })
  
  });
}

bindPostData(form);