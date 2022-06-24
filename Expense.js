const balance = document.getElementById('balance');
const money_plus = document.getElementById('money plus');
const money_minus = document.getElementById('money minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text')
const amount = document.getElementById('amount');

form.addEventListener('submit', addTransaction);

const localStorageTransactions = JSON.parse(localStorage.getItem('trans'))

let transactions = localStorage.getItem('trans') !== null ? localStorageTransactions : [];
console.log(transactions)

function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const data = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        };
        console.log(data)
        transactions.push(data);
        addTransactionInDOM(data)

        UpdateLocalStorage();
        updateValue();


        text.value = '';
        amount.value = '';
    }
}

// Generating random ID
function generateID() {
    return Math.floor(Math.random() * 100000000)
}

// Add transactions to DOM list
function addTransactionInDOM(data) {
    // get the sign
    const sign = data.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    item.classList.add(data.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `${data.text} <span>${sign}${Math.abs(data.amount)}</span> <button type='button' class="delete-btn" onClick='removeItem(${data.id})'>X</button>`;

    list.appendChild(item)
}

//UPDATE LOCALSTORAGE
function UpdateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

function removeItem(id){
    transactions = transactions.filter(trans => trans.id !== id)
    UpdateLocalStorage();
    removeElementFromPage();
}

// UPDATING VALUES
function updateValue() {
    const amounts = transactions.map((item) => item.amount)
    console.log('amounts: ' + amounts)
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
    console.log("total: "+total)

    const income = amounts.filter((item) => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    console.log('income: '+income)

    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item),0) * -1).toFixed(2);
    console.log('expenses: '+expense)
     balance.innerHTML = `$${total}`;
     money_plus.innerHTML = `$${income}`
     money_minus.innerHTML = `$${expense}`
}

function removeElementFromPage() {
    list.innerHTML = '';
    transactions.forEach(addTransactionInDOM);
    updateValue();
}

removeElementFromPage();