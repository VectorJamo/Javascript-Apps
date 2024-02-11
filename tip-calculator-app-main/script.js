let no_of_people = ''
let bill_amount = ''
let tip_rate = ''

const bill_amount_element = document.querySelector('#bill')
const tip_buttons = document.querySelector('.tip-select')
const custom_tip = document.querySelector('.custom-tip')
const no_of_people_element = document.querySelector('#people')

const bill_wrong_element = document.querySelector('.bill-wrong')
const no_of_people_wrong_element = document.querySelector('.no-of-people-wrong')
const tip_wrong = document.querySelector('.tip-wrong')

const tip_per_person = document.querySelector('.tip-per-person')
const total_per_person = document.querySelector('.total-per-person')

function tipClick(element, rate){
    tip_rate = rate
    for (const button of tip_buttons.children){
        if(button.nodeName == 'BUTTON'){
            button.style.backgroundColor = 'hsl(183, 100%, 15%)'
        }
    }
    element.style.backgroundColor = 'hsl(185, 41%, 84%)'
    // Check if all three values are filled
    if(checkAllFilled()){
        console.log("ALL FILLED!")
        calculateTip()
    }
}

function checkAllFilled() {
    if(no_of_people != '' && bill_amount != '' && tip_rate != ''){
        return true
    }
    return false
}

function calculateTip(){
    const tip_amount = parseFloat((tip_rate/100.0)*bill_amount)
    const tip_value = parseFloat(tip_amount / no_of_people).toFixed(2)

    const total_bill_with_tip = ((parseFloat(bill_amount) + tip_amount)).toFixed(2)
    const bill_value = ((total_bill_with_tip / parseFloat(no_of_people))).toFixed(2)

    tip_per_person.innerHTML = tip_value
    total_per_person.innerHTML = bill_value
}

function handleBillAmount(element) {
    if(isNaN(element.value)){
        bill_wrong_element.innerHTML = 'Only numbers allowed'
    }else{
        bill_wrong_element.innerHTML = ''
        bill_amount = element.value
    }

    // Check if all three values are filled
    if(checkAllFilled()){
        console.log("ALL FILLED!")
        calculateTip()
    }
}
function handleNoOfPeople(element) {
    if(isNaN(element.value)){
        no_of_people_wrong_element.innerHTML = 'Only numbers allowed'
    }else{
        no_of_people_wrong_element.innerHTML = ''
        no_of_people = element.value
    }

    // Check if all three values are filled
    if(checkAllFilled()){
        console.log("ALL FILLED!")
        calculateTip()
    }
}

function handleCustomTip(element) {
    if(isNaN(element.value)){
        tip_wrong.innerHTML = 'Only numbers allowed'
    }else{
        tip_wrong.innerHTML = ''
        tip_rate = element.value
    }

    // Check if all three values are filled
    if(checkAllFilled()){
        console.log("ALL FILLED!")
        calculateTip()
    }
}

function handleReset() {
    no_of_people = ''
    bill_amount = ''
    tip_rate = ''
    bill_amount_element.value = ''

    for (const button of tip_buttons.children){
        if(button.nodeName == 'BUTTON'){
            button.style.backgroundColor = 'hsl(183, 100%, 15%)'
        }
    }

    custom_tip.value = ''
    no_of_people_element.value = ''
    tip_per_person.innerHTML = '0.00'
    total_per_person.innerHTML = '0.00'
}