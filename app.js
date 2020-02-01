let myGame = {
  totalFish: 0,
  items: [],
  autoItems: [],
  fishPerSecond: 0,
}


let clickUpgrades = {
  pole: {
    price: 15,
    quantity: 0,
    multiplier: 5
  },
  net: {
    price: 100,
    quantity: 0,
    multiplier: 25
  }
}

let automaticUpgrades = {
  fisher: {
    price: 60,
    quantity: 0,
    multiplier: 35
  },
  boat: {
    price: 1000,
    quantity: 0,
    multiplier: 120
  }
}

let itemName = 0

function goFish() {
  if (myGame.items.length === 0) {
    myGame.totalFish += 1
  } else {
    myGame.totalFish += 1 + addMods()
  }
  updateFish()
}

function updateFish() {
  document.getElementById("total-fish").textContent = myGame.totalFish.toString()
  document.getElementById("total-poles").textContent = clickUpgrades.pole.quantity.toString()
  document.getElementById("total-nets").textContent = clickUpgrades.net.quantity.toString()
  document.getElementById("total-fishers").textContent = automaticUpgrades.fisher.quantity.toString()
  document.getElementById("total-boats").textContent = automaticUpgrades.boat.quantity.toString()
  document.getElementById("total-price-pole").textContent = clickUpgrades.pole.price.toString()
  document.getElementById("total-price-net").textContent = clickUpgrades.net.price.toString()
  document.getElementById("total-price-fisher").textContent = automaticUpgrades.fisher.price.toString()
  document.getElementById("total-price-boat").textContent = automaticUpgrades.boat.price.toString()
  checkButton()
}

function buyPole() {
  let itemPrice = clickUpgrades.pole.price
  if (itemPrice <= myGame.totalFish) {
    clickUpgrades.pole.quantity++
    myGame.totalFish -= clickUpgrades.pole.price
    myGame.items.push(clickUpgrades.pole)
    updateFish()
    clickUpgrades.pole.price += 5
  } else {
    alert("not enough fish")
  }
}

function buyNet() {
  let itemPrice = clickUpgrades.net.price
  if (itemPrice <= myGame.totalFish) {
    clickUpgrades.net.quantity++
    myGame.totalFish -= clickUpgrades.net.price
    myGame.items.push(clickUpgrades.net)
    updateFish()
    clickUpgrades.net.price += 10
  } else {
    alert("not enough fish")
  }
}

function buyFisher() {
  let itemPrice = automaticUpgrades.fisher.price
  if (itemPrice <= myGame.totalFish) {
    automaticUpgrades.fisher.quantity++
    myGame.totalFish -= automaticUpgrades.fisher.price
    myGame.autoItems.push(automaticUpgrades.fisher)
    setInterval(collectFish, 1000)
    updateFish()
    automaticUpgrades.fisher.price += 50
    checkButton()
    myGame.fishPerSecond += 35
    document.getElementById("total-auto-mods").textContent = myGame.fishPerSecond.toString()
  } else {
    alert("not enough fish")
  }
}

function buyBoat() {
  let itemPrice = automaticUpgrades.boat.price
  if (itemPrice <= myGame.totalFish) {
    automaticUpgrades.boat.quantity++
    myGame.totalFish -= automaticUpgrades.boat.price
    myGame.autoItems.push(automaticUpgrades.boat)
    setInterval(collectFish, 3000)
    updateFish()
    automaticUpgrades.boat.price += 200
    checkButton()
    myGame.fishPerSecond += 40
    document.getElementById("total-auto-mods").textContent = myGame.fishPerSecond.toString()
  } else {
    alert("not enough fish")
  }
}

function addMods() {
  let totalMods = 0
  for (let i = 0; i < myGame.items.length; i++) {
    totalMods += myGame.items[i].multiplier
    return totalMods
  }
}

function addAutoMods() {
  let totalAutoMods = 0
  for (let i = 0; i < myGame.autoItems.length; i++) {
    totalAutoMods += myGame.autoItems[i].multiplier * myGame.autoItems[i].quantity
    return totalAutoMods
  }
}

function collectFish() {
  if (myGame.autoItems.length > 0) {
    myGame.totalFish += addAutoMods()
    updateFish()
  }
}

function checkButton() {
  checkButtonBoat()
  checkButtonFisher()
  checkButtonPole()
  checkButtonNet()
}

function checkButtonPole() {
  if (myGame.totalFish >= clickUpgrades.pole.price) {
    document.getElementById("pole-button").style.pointerEvents = "auto"
    document.getElementById("pole-button").className = ("btn btn-success p-3 click-me")
  } else {
    document.getElementById("pole-button").style.pointerEvents = "none"
    document.getElementById("pole-button").className = ("btn btn-success p-3")
  }
}

function checkButtonNet() {
  if (myGame.totalFish >= clickUpgrades.net.price) {
    document.getElementById("net-button").style.pointerEvents = "auto"
    document.getElementById("net-button").className = ("btn btn-danger p-3 click-me")
  } else {
    document.getElementById("net-button").style.pointerEvents = "none"
    document.getElementById("net-button").className = ("btn btn-danger p-3")
  }
}

function checkButtonFisher() {
  if (myGame.totalFish >= automaticUpgrades.fisher.price) {
    document.getElementById("fisher-button").style.pointerEvents = "auto"
    document.getElementById("fisher-button").className = ("btn btn-warning p-3 click-me")
  } else {
    document.getElementById("fisher-button").style.pointerEvents = "none"
    document.getElementById("fisher-button").className = ("btn btn-warning p-3")
  }
}

function checkButtonBoat() {
  if (myGame.totalFish >= automaticUpgrades.boat.price) {
    document.getElementById("boat-button").style.pointerEvents = "auto"
    document.getElementById("boat-button").className = ("btn btn-info p-3 click-me")
  } else {
    document.getElementById("boat-button").style.pointerEvents = "none"
    document.getElementById("boat-button").className = ("btn btn-info p-3")
  }
}

function moveBoatLeft() {
  document.getElementById("move-boat").className = ("row boats-row-move")
}

function moveBoat() {
  document.getElementById("move-boat").className = ("row boats-row")
}

updateFish()

setInterval(moveBoatLeft, 1000)

setInterval(moveBoat, 2000)