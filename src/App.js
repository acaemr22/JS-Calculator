/* eslint-disable no-useless-escape */
import "./App.css";
import { Sun, Moon } from "@phosphor-icons/react";



var dark = true
export default function App() {  

  var calculation = ""
  var operators = ["x", "-", "+", "/"]
  var displayText = ""
  var operator = false
  var zero = false

  const handleClickButton = (e) => {
      e.target.classList.add("clicked")
      e.target.classList.remove("normal")
      setTimeout(function() {
        e.target.classList.add("normal")
        e.target.classList.remove("clicked")
      }, 200)
      var display = document.querySelector(".display")
      var backDisplay = document.querySelector(".back-display")
      var pass = true


      if (e.target.innerText === "AC") {
        operator = false
        calculation = "0"
        displayText= "0"
        display.innerText = displayText
        backDisplay.innerText= ""
      }

      
      
      
      else {
        let check_op_f = operators.includes(e.target.innerText)
        let check_of_n = ["-"].includes(e.target.innerText)
        let check_of_dm = ["x","/"].includes(displayText[0])
        
        // Don't allow a numbers start to be zero
        
        if (calculation === "0" && e.target.innerText === "0") {
          pass = false
        }
        
        // Don allow comma when there is zero in calculation
        else if (calculation === "0" && e.target.innerText === "."){
          calculation+= e.target.innerText
          backDisplay.innerText= calculation
          displayText += e.target.innerText
          display.innerText = displayText
        }
        
        // Don't allow second usage of comma while still writing the same number
        else if (calculation === "0" && !(e.target.innerText === "0")){
          calculation= e.target.innerText
          backDisplay.innerText= calculation
          displayText = e.target.innerText
          display.innerText = displayText
        }
        
        else if(e.target.innerText === "." ) {
          
          if (displayText.includes(".")) {
            pass = false
          }
          
          else if(operator || calculation.includes("=")) {
            operator = false

            if (calculation.includes("=")) {
              calculation = "0."
            }

            else {
              calculation += "0."
            }
            
            backDisplay.innerText= calculation
            displayText = "0."
            display.innerText = displayText  
          }
          else if(!operator){
            operator = false
            calculation+= e.target.innerText
            backDisplay.innerText= calculation
            displayText += e.target.innerText
            display.innerText = displayText  
          }
          
        }
        

        // can't start with a operator
        else if (calculation === "" && check_op_f){
          pass = false
        }


        else if (!check_op_f && e.target.innerText !== "=" && operators.includes(calculation[calculation.length -2] ) && displayText[0]==="-" ) {
          operator = false
          calculation+= e.target.innerText
          backDisplay.innerText= calculation
          displayText += e.target.innerText
          display.innerText = displayText
        }

        // After an operator clicked when clicked a number just display the number and initialize the displayText to that number
        
        else if (!check_op_f && e.target.innerText !== "=" && operators.includes(displayText[0])) {
          operator = false
          calculation+= e.target.innerText
          backDisplay.innerText= calculation
          displayText = e.target.innerText
          display.innerText = displayText
        }
        
        // until one of the operators clicked continue to write numbers on display
        else if (!check_op_f && e.target.innerText !== "=") {
          operator = false
          if (calculation.includes("=")) {
            calculation = e.target.innerText
            displayText = e.target.innerText
          }
          
          else {
            calculation+= e.target.innerText
            displayText += e.target.innerText
          }
          backDisplay.innerText= calculation
          display.innerText = displayText
        }
        
        
        // when one of the operators clean display and the operator's symbol also make available to making new calculasions with the sum
        else if (!operator && e.target.innerText !== "=") {
          operator = true

          if (calculation.includes("=")) {
            calculation= displayText + e.target.innerText
          }

          else {
            calculation+= e.target.innerText
          }
          backDisplay.innerText= calculation
          displayText = e.target.innerText
          display.innerText = displayText
        }

        
        // Can add - if before operator is an x or /
        else if (check_of_n && check_of_dm) {
          operator = false
          calculation+= e.target.innerText
          backDisplay.innerText= calculation
          displayText = e.target.innerText
          display.innerText = displayText
        }

        else if(e.target.innerText === "=") {
          const re = /[+x\-/]{3}|(?<=[x/])[\-+]{1}\d+\.*\d*|[+/x\-]{1}|\-*\d+\.*\d*/g 
          let parts = calculation.match(re);

          // Detectable parts:
          /*
          - Decimal Numbers
          - Negative numbers
          - Can detect operators
          - 
          */
          
          
          // console.log(parts, "splitted to the parts");
          
          
          // let index_d = parts.findIndex((e) => String(e).includes("x"))
          // let index_m = parts.findIndex((e) => String(e).includes("/"))

          // let multiple = (index, index2=true) => {
            
          //   return parts[index].length === 1 && index2!==true ? parts[index].length : true 
          // } 
          
          // while (index_d > 0 || index_m > 0) {
            
          //   index_m = parts.findIndex((e) => String(e).includes("x"))
           
          //   index_d = parts.findIndex((e) => String(e).includes("/"))
            
          //   console.log(parts);
            
          //   if (index_m>0 && index_d>0) {
          //     if (index_d < index_m) {
          //       let first = Number(parts[index_d - 1])
          //       let second = Number(parts[index_d + 1])
          //       let condition = parts[index_d].replace(/[x/+\-]*([x/+\-])/, "$1")
          //       let total = condition === "x" ? first*second 
          //       : condition === "/" ? first/second
          //       : condition === "+" ? first+second
          //       : first-second
          //       parts[index_d - 1] = total;
          //       parts.splice(index_d,2)
          //     }

          //     else {
          //       let first = Number(parts[index_m - 1])
          //       let second = Number(parts[index_m + 1])
          //       let condition = parts[index_m].replace(/[x/+\-]*([x/+\-])/, "$1")
          //       let total = condition === "x" ? first*second 
          //       : condition === "/" ? first/second
          //       : condition === "+" ? first+second
          //       : first-second
          //       parts[index_m - 1] = total
          //       parts.splice(index_m,2)
          //     }
          //     console.log("end of while1 ", "parts:", parts );

          //   }

          //   else {
          //     if (index_m>0)  {
          //       let first = Number(parts[index_m - 1])
          //       let second = Number(parts[index_m + 1])
          //       let condition = parts[index_m].replace(/[x/+\-]*([x/+\-])/, "$1")
          //       let total = condition === "x" ? first*second 
          //       : condition === "/" ? first/second
          //       : condition === "+" ? first+second
          //       : first-second
          //       console.log("jjj", parts[index_m].replace(/[x/+\-]*([x/+\-])/, "$1") === "x" ? "x" : "/" ? "/" : "+" ? "+" : first-second);
          //       parts[index_m - 1] = total
          //       parts.splice(index_m,2)
          //     }

          //     else if(index_d>0) {
          //       let first = Number(parts[index_d - 1])
          //       let second = Number(parts[index_d + 1])
          //       let condition = parts[index_d].replace(/[x/+\-]*([x/+\-])/, "$1")
          //       let total = condition === "x" ? first*second 
          //       : condition === "/" ? first/second
          //       : condition === "+" ? first+second
          //       : first-second
          //       parts[index_d - 1] = total;
          //       parts.splice(index_d,2)
          //     }
          //   }
          //   console.log(parts, "multiplication process finished");

          // }
          // console.log("parts:", parts );


          // index_m = parts.findIndex((e) => String(e).includes("+"))
          
          // index_d = parts.findIndex((e) => String(e).includes("-"))

          // while (index_d > 0 || index_m > 0) {
          //   index_m = parts.findIndex((e) => String(e).includes("+"))
          //     console.log(index_m);
            
          //   index_d = parts.findIndex((e) => String(e).includes("-"))

            
          //   if (index_m>0 && index_d>0) {
          //     if (index_d < index_m) {
          //       let first = Number(parts[index_d - 1])  
          //       let second = Number(parts[index_d + 1])
          //       let total = parts[index_d].replace(/[x/+\-]*([x/+\-])/, "$1")  === "+" ? first+second : first-second
          //       parts[index_d - 1] = total;
          //       parts.splice(index_d, 2)
          //     }
              
          //     else {
          //       let first = Number(parts[index_m - 1])
          //       let second = Number(parts[index_m + 1])
          //       let total = parts[index_m].replace(/[x/+\-]*([x/+\-])/, "$1")  === "+" ? first+second :  first-second
          //       parts[index_m - 1] = total
          //       parts.splice(index_m,2)
          //     }
          //   }
            

          //   else {
          //     if (index_m>0) {
          //       let first = Number(parts[index_m - 1])
          //       let second = Number(parts[index_m + 1])
          //       let total = parts[index_m].replace(/[x/+\-]*([x/+\-])/, "$1")  === "+" ? first+second :  first-second
          //       parts[index_m - 1] = total
          //       parts.splice(index_m,2)
          //     }


          //     else if(index_d>0) {
          //       let first = Number(parts[index_d - 1])
          //       let second = Number(parts[index_d + 1])
          //       let total = parts[index_d].replace(/[x/+\-]*([x/+\-])/, "$1")  === "+" ? first+second :  first-second
          //       parts[index_d - 1] = total;
          //       parts.splice(index_d, 2)

          //     }
              
          //   }

            
          // }
          let pastCalc = calculation.replace(/x/g, "*").replace(/[*+\-/]{2,}([*+\-/])/g, "$1")
          let test = calculation.test(/[*+\-/]{3,}/g)
          if (!test) {
            calculation+= e.target.innerText  + String(eval(pastCalc))
            backDisplay.innerText= calculation 
            displayText = String(eval(pastCalc))
            display.innerText = displayText;  
          } 
        }
        
          // when clicked = show answer on display and full calculation on back display

      }
        
      
      
    }
    // Setting mode and adds new styles depending on the new mode 
    let handleClickMode = () => {
      let lightMode = document.querySelector(".light-mode")
      let darkMode = document.querySelector(".dark-mode")


    if (lightMode.classList.contains("selected-mode")) {
      lightMode.classList.remove("selected-mode")
      darkMode.classList.add("selected-mode")
      dark = true
    }
    
    else if (darkMode.classList.contains("selected-mode")){
      darkMode.classList.remove("selected-mode")
      lightMode.classList.add("selected-mode")
      dark = false
    }

    if (!dark) {
      document.querySelector(".App").classList.add("open-bg-yellow")
      document.querySelectorAll(".btn-calc").forEach(e => {
        e.classList.add("open-btn-color", "open-btn-bg");
      });
      document.querySelectorAll(".opened").forEach(e => {
        e.classList.add("open-opened-color", "open-opened-bg");
      });
      document.querySelector("#clear").classList.add("clear-css")
      document.querySelector("#equals").classList.add("equals-css")
  }
    
    else {
      document.querySelector(".App").classList.remove("open-bg-yellow")
      document.querySelectorAll(".btn-calc").forEach(e => {
        e.classList.remove("open-btn-color", "open-btn-bg");
      });
      document.querySelectorAll(".opened").forEach(e => {
        e.classList.remove("open-opened-color", "open-opened-bg");
      });
      document.querySelector("#clear").classList.remove("clear-css")
      document.querySelector("#equals").classList.remove("equals-css")
    }

    
  }

  
  return (
    <div className="App">
      <div className="modes p-2">
        <button onClick={handleClickMode} className="light-mode me-1 mode">
          <Sun size={30} color="#ffffff" />
        </button>
        <button onClick={handleClickMode} className="dark-mode ms-1 selected-mode mode">
          <Moon size={30} color="#ffffff"/>
        </button>
      </div>

      <div className="main-wrapper">
        <div className="calculator">
          <div className="wrapper-display px-1">
            <div className="back-display d-flex flex-row-reverse align-items-center"></div>
            <div id="display" className="display d-flex flex-row-reverse align-items-center "></div>
          </div>

          
          <div className="buttons">
            <button className="normal btn-calc" onClick={handleClickButton} id="clear">AC</button>
            <button className="normal btn-calc opened" onClick={handleClickButton} id="divide" >/</button>
            <button className="normal btn-calc opened" onClick={handleClickButton} id="multiply" >x</button>

            <button className="normal btn-calc" onClick={handleClickButton} id="seven">7</button>
            <button className="normal btn-calc" onClick={handleClickButton} id="eight">8</button>
            <button className="normal btn-calc" onClick={handleClickButton} id="nine">9</button>
            <button className="normal btn-calc opened" onClick={handleClickButton} id="subtract" >-</button>
            <button className="normal btn-calc" onClick={handleClickButton} id="four">4</button>
            <button className="normal btn-calc" onClick={handleClickButton} id="five">5</button>
            <button className="normal btn-calc" onClick={handleClickButton} id="six">6</button>
            <button className="normal btn-calc opened" onClick={handleClickButton} id="add" >+</button>
            <button className="normal btn-calc" onClick={handleClickButton} id="one">1</button>
            <button className="normal btn-calc" onClick={handleClickButton} id="two">2</button>
            <button className="normal btn-calc" onClick={handleClickButton} id="three">3</button>
            <button className="normal btn-calc" onClick={handleClickButton} id="zero">0</button>
            <button className="normal btn-calc" onClick={handleClickButton} id="decimal">.</button>
            <button className="normal btn-calc" onClick={handleClickButton} id="equals">=</button>
          </div>
          


      </div>
        <div className="footer">
          <div className="explain">Designed and Coded By</div>
          <div className="author"><a target="_blank" rel="noreferrer" href="https://codepen.io/acaemr22">Emre Açar</a></div>
        </div>
    </div>
    </div>
  );
}
