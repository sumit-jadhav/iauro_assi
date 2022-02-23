let display = document.getElementById("display")

let buttons = Array.from(document.getElementsByClassName("button"))

buttons.map((button) => {
  button.addEventListener("click", (e) => {
    switch (e.target.innerText) {
      case "C":
        display.innerText = ""
        break

      case "←":
        if (display.innerText) {
          display.innerText = display.innerText.slice(0, -1)
        }
        break

      case "sin":
        display.innerText = Math.sin(display.innerText)
        break

      case "cos":
        display.innerText = Math.cos(display.innerText)
        break

      case "tan":
        display.innerText = Math.tan(display.innerText)
        break

      case "log":
        display.innerText = Math.log(display.innerText)
        break

      case "x2":
        display.innerText = Math.pow(display.innerText, 2)
        break

      case "x!":
        var i, num, f
        f = 1
        num = display.innerText
        for (i = 1; i <= num; i++) {
          f = f * i
        }
        i = i - 1
        display.innerText = f
        break

      case "√":
        display.innerText = Math.sqrt(display.innerText, 2)
        break

      case "π":
        display.innerText = 3.14159265359
        break

      case "e":
        display.innerText = 2.71828182846
        break
      case "=":
        try {
          //if (display.innerText.includes("sin")) {
          //console.log("hello")
          //display.innerText = Math.sin(display.innerText)
          // break
          //} else if (true) {
          display.innerText = eval(display.innerText)
          break
        } catch {
          //}
          display.innerText = "ERROR!"
        }
        break
      default:
        display.innerText += e.target.innerText
    }
  })
})

function sin() {
  display.value = Math.sin(display.value)
}
