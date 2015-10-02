function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


document.body.addEventListener("click", function() {
  var pic = document.createElement('div')
  var x = getRandomArbitrary(0, 100)
  var y = getRandomArbitrary(0, 100)
  pic.style.cssText = 'background:red;position:absolute;left:' + x + 'vw;top:' + y + 'vh;width:10px;height:100px;'
  document.body.appendChild(pic)
})
