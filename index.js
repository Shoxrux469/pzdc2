let doc = document;
let cont = doc.querySelector(".container");
let h2 = doc.querySelector("h2");
let btnCount = doc.querySelector("[data-count]");
let btnAll = doc.querySelector("[data-all]");
let btnBusket = document.querySelector("[data-basket]");
let basket = document.querySelector(".basket");
let basketCOntent = document.querySelector(".basket-content");
let busketClose = document.querySelector("[data-busketClose]");
let scrollable = doc.querySelector(".scrollable");
let busket = [];

function calculateBusket() {
  h2.innerHTML = `You have <b>${busket.length}</b> elements in busket`;
}
calculateBusket();

reload(arr);

function reload(arr) {
  cont.innerHTML = "";

  for (let item of arr) {
    let mainDiv = doc.createElement("div");
    let mainImg = doc.createElement("img");
    let middleDiv = document.createElement("div");
    let h1 = doc.createElement("h1");
    let p = doc.createElement("p");
    let btn = doc.createElement("button");
    let bottomDiv = doc.createElement("div");
    let bottomDivBox1 = doc.createElement("div");
    let bottomDivBox2 = doc.createElement("div");
    let bottomDivBox3 = doc.createElement("div");
    let box1p = doc.createElement("p");
    let box2p = doc.createElement("p");
    let box3p = doc.createElement("p");
    let box1img = doc.createElement("img");
    let box2img = doc.createElement("img");
    let box3img = doc.createElement("img");

    mainDiv.classList.add("mainDiv");
    mainImg.classList.add("mainImg");
    middleDiv.classList.add("middleDiv");
    h1.classList.add("h1");
    p.classList.add("p");
    bottomDiv.classList.add("bottomDiv");
    bottomDivBox1.classList.add("bottomDivBox");
    bottomDivBox2.classList.add("bottomDivBox");
    bottomDivBox3.classList.add("bottomDivBox");
    box1p.classList.add("boxP");
    box2p.classList.add("boxP");
    box3p.classList.add("boxP");
    btn.classList.add("btn");
    box1img.classList.add("boxImg");
    box2img.classList.add("boxImg");
    box3img.classList.add("boxImg");

    mainImg.setAttribute("src", item.image);
    mainImg.classList.add("image");
    box1img.setAttribute("src", "./icons/price.svg");
    box2img.setAttribute("src", "./icons/star.svg");
    box3img.setAttribute("src", "./icons/box.svg");

    h1.innerHTML = `${item.category} (${item.rating.count})`;
    p.innerHTML =
      item.description.length > 100
        ? item.description.slice(0, 90) + " <b>...read</b>"
        : item.description;
    box1p.innerHTML = item.price;
    box2p.innerHTML = item.rating.rate;
    box3p.innerHTML = item.rating.count;
    btn.innerHTML = "В избранное";

    cont.append(mainDiv);
    mainDiv.append(mainImg, middleDiv);
    middleDiv.append(h1, p, bottomDiv, btn);
    bottomDiv.append(bottomDivBox1, bottomDivBox2, bottomDivBox3);
    bottomDivBox1.append(box1img, box1p);
    bottomDivBox2.append(box2img, box2p);
    bottomDivBox3.append(box3img, box3p);

    btn.onclick = () => {
      if (busket.includes(item.id)) {
        // delete
        // let idx = busket.indexOf(item.id)
        // busket.splice(idx, 1)

        busket = busket.filter((id) => id !== item.id);

        btn.classList.remove("btn_added");
        btn.innerHTML = "В избранное";
      } else {
        busket.push(item.id);
        btn.classList.add("btn_added");
        btn.innerHTML = "Added";
      }
      calculateBusket();
      busket_reload(busket);
    };
  }
}
busket_reload(busket);
function busket_reload(ids_arr) {
  let temp = [];
  scrollable.innerHTML = "";

  for (let item of arr) {
    for (let id of ids_arr) {
      if (id === item.id) {
        temp.push(item);
      }
    }
  }
  for (let item of temp) {
    let numValue = 0
    // console.log(item);
    let mainItemCard = doc.createElement("div");
    let ItemLeft = doc.createElement("div");
    let mainImgCard = doc.createElement("img");
    let ItemProductInf = doc.createElement("div");
    let ItemText = doc.createElement("h4");
    let ItemDaughSize = doc.createElement("p");
    let ItemRight = doc.createElement("div");
    let ItemCount = doc.createElement("div");
    let num = doc.createElement("p");
    let minus = doc.createElement("span");
    let plus = doc.createElement("span");
    let ItemPrice = document.createElement("p");

    mainItemCard.classList.add("item");
    ItemLeft.classList.add("itemLeft");
    mainImgCard.classList.add("itemImg");
    ItemProductInf.classList.add("itemInf");
    ItemText.classList.add("itemH4");
    ItemDaughSize.classList.add("discription");
    ItemRight.classList.add("itemRight");
    ItemCount.classList.add("itemCount");
    ItemPrice.classList.add("ItemPrice");

    mainImgCard.setAttribute("src", item.image);
    ItemText.innerHTML = item.category;
    ItemDaughSize.innerHTML = "small";
    minus.innerHTML = "-";
    num.innerHTML = 1;
    plus.innerHTML = "+";
    ItemPrice.innerHTML = item.price;

    scrollable.append(mainItemCard);
    mainItemCard.append(ItemLeft, ItemRight);
    ItemLeft.append(mainImgCard, ItemProductInf);
    ItemProductInf.append(ItemText, ItemDaughSize);
    ItemRight.append(ItemCount, ItemPrice);
    ItemCount.append(minus, num, plus);
    // console.log(typeof +ItemPrice.innerHTML);
    plus.onclick = () => {
      num.innerHTML++;
      numValue += +ItemPrice.innerHTML
      // item.price + ItemPrice.innerHTML
      // +ItemPrice.innerHTML + (+item.innerHTML)
    };
    minus.onclick = () => {
      num.innerHTML--;
      // ItemPrice.innerHTML - ItemPrice.innerHTML
      numValue += +ItemPrice.innerHTML
      if (num.innerHTML == 0) {
        // let idx = temp.indexOf(item.id)
        // temp.splice(idx, 1)
        busket = busket.filter((id) => id !== item.id);
        busket_reload(busket);
      }
    };
    // console.log(item);
    console.log(typeof ItemPrice.innerHTML);  
  }
}

btnCount.onclick = () => {
  reload(arr.slice(0, 5));
};

btnAll.onclick = () => {
  reload(arr);
};

btnBusket.onclick = () => {
  basket.classList.add("backet_active");
  basket.classList.remove("backet_hide");
  document.body.style.overflowY = "hidden";
};
busketClose.onclick = () => {
  basket.classList.remove("backet_active");
  basket.classList.add("backet_hide");
  document.body.style.overflowY = "auto";
};
