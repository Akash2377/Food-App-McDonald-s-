var images = [
  "https://www.mcdonalds.com/content/dam/sites/usa/nfl/publication/2Pub_Q3_1LargeFries_574x384.jpg",
  "https://www.mcdonalds.com/content/dam/sites/usa/nfl/publication/2Pub_Q3_ASCoffee_574x384.png",
  "https://www.mcdonalds.com/content/dam/sites/usa/nfl/publication/2pub_Q3_FreeFriesFriday_574x384.jpg",
  "https://www.mcdonalds.com/content/dam/sites/usa/nfl/publication/1pub_FreeNugv4_1168x520.jpg",
  "https://www.mcdonalds.com/content/dam/sites/usa/nfl/publication/1PUB_CampMcDonalds_1168x520_v1.jpg",
  "https://www.mcdonalds.com/content/dam/sites/usa/nfl/publication/2PUB_1500_574x384.jpg",
  "https://www.mcdonalds.com/content/dam/sites/usa/nfl/publication/2PUB_3000_574x384.jpg",
];
var menuITM = [
  {
    image:
      "https://s7d1.scene7.com/is/image/mcdonalds/drinks_300x300:menu-category-desktop",
    Name: "Beverages",
    id: 1,
  },
  {
    image:
      "https://s7d1.scene7.com/is/image/mcdonalds/nav_combo_meal_160x160_:menu-category-desktop",
    Name: "Combo Meal",
    id: 2,
  },
  {
    image:
      "https://s7d1.scene7.com/is/image/mcdonalds/breakfast_300x300:menu-category-desktop",
    Name: "Breakfast",
    id: 3,
  },
  {
    image:
      "https://s7d1.scene7.com/is/image/mcdonalds/desserts_shakes_300x300:menu-category-desktop",
    Name: "Desserts & Shakes",
    id: 4,
  },
  {
    image:
      "https://s7d1.scene7.com/is/image/mcdonalds/snacks_sides_300x300:menu-category-desktop",
    Name: "Snacks & Sides",
    id: 5,
  },
  {
    image:
      "https://s7d1.scene7.com/is/image/mcdonalds/burgers_300x300:menu-category-desktop",
    Name: "Burger",
    id: 6,
  },
  {
    image:
      "https://s7d1.scene7.com/is/image/mcdonalds/nav_happy_meal_160x160:menu-category-desktop",
    Name: "Happy Meal",
    id: 7,
  },
  {
    image:
      "https://s7d1.scene7.com/is/image/mcdonalds/chicken_sandwiches_300x300:menu-category-desktop",
    Name: "Chicken & Sandwiches",
    id: 8,
  },
  {
    image:
      "https://s7d1.scene7.com/is/image/mcdonalds/Menu_LeftRail_mcd-160x160:menu-category-desktop",
    Name: "Bakery",
    id: 9,
  },
];
function openPopUp() {
  document.getElementById("popupSection").style.display = "block";
  document.getElementById("popupDiv-container").innerHTML = "";
  displayData(menuITM);
  function displayData(menuITM) {
    menuITM.map(function (item) {
      var storedITM = `<img
                src="${item.image}"
                alt=""
              />
              <h4><input type="checkbox" style="cursor: pointer;" id="selected_${item.id}" onclick="SOR(${item.id})"/>${item.Name}</h4>`;
      var div = document.createElement("div");
      div.innerHTML = storedITM;
      document.getElementById("popupDiv-container").append(div);
    });
  }
}
function closePopup() {
  document.getElementById("popupSection").style.display = "none";
  document.getElementById("popupSection2").style.display = "none";
}
var imageMovies = document.createElement("img");

var i = 0;

x = setInterval(function () {
  if (i === images.length) {
    i = 0;
  }
  imageMovies.src = images[i];
  imageMovies.className = "slideshowIMG";
  i++;
}, 2000);
document.getElementById("slideshow").append(imageMovies);

var orderLIST = JSON.parse(localStorage.getItem("LIST")) || [];
function SOR(foodID) {
  orderLIST = JSON.parse(localStorage.getItem("LIST")) || [];
  if (document.getElementById(`selected_${foodID}`).checked) {
    var foodD = menuITM.filter(function (el) {
      return el.id == foodID;
    });
    orderLIST.push(foodD[0]);
  } else {
    var foodD = menuITM.filter(function (el) {
      return el.id == foodID;
    });
    orderLIST.splice(orderLIST[foodD[0]], 1);
  }
  localStorage.setItem("LIST", JSON.stringify(orderLIST));
}
document.getElementById("PlaceOrder").addEventListener("click", function () {
  placeTheOrder(orderLIST);
});
function placeTheOrder(orderLIST) {
  document.getElementById("popupSection").style.display = "none";
  setTimeout(() => {
    workorderdone(orderLIST);
  }, 8000);
  // setTimeout(() => {
  //     test(orderLIST);
  //   }, 2000);
  // async function test(){
  //   let promise = new Promise(function (resolve, reject) {
  //   setTimeout(() => {
  //     workorderdone(orderLIST);
  //   }, 2000);
  //   let result = await promise;
  //   alert(result)
  // });
  // }
}
function workorderdone(orderLIST) {
  document.getElementById("orderID").innerText = "Order ID : " + Date.now();
  document.getElementById("popupDiv-container2").innerHTML = "";
  document.getElementById("popupSection2").style.display = "block";
  orderLIST.map(function (item) {
    var storedITM = `<img
                  src="${item.image}"
                  alt=""
                />
                <h4>${item.Name}</h4>`;
    var div = document.createElement("div");
    div.innerHTML = storedITM;
    document.getElementById("popupDiv-container2").append(div);
  });
}
document.getElementById("closeorder").addEventListener("click", function () {
  deleteFromLocal(orderLIST);
});
function deleteFromLocal(orderLIST) {
  document.getElementById("popupSection2").style.display = "none";
  orderLIST = [];
  localStorage.setItem("LIST", JSON.stringify(orderLIST));
}
