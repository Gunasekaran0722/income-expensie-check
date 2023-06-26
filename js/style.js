const balance = document.querySelector("#balance");
const inc_amt = document.querySelector("#inc-amt");
const exp_amt = document.querySelector("#exp-amt");
const trans = document.querySelector("#trans");
const form = document.querySelector("#form");
const description = document.querySelector("#desc");
const amount = document.querySelector("#amount");


// const dummyData = [
//     { id: 1, description: "Flower", amount: -20 },
//     { id: 2, description: "Salary", amount: 35000 },
//     { id: 3, description: "Book", amount: 10 },
//     { id: 4, description: "Camera", amount: -150 },
//     { id: 5, description: "Petrol", amount: -250 },
//     { id: 6, description: "Book", amount: 150 },
//   ];


// let transcrtion = dummyData;

const localstoragetrans = JSON.parse(localStorage.getItem("exp_inx"));
let transcrtion = localStorage.getItem("exp_inx") !== null? localstoragetrans : [];


function loadtransctiondata(transcrtion){
    let sign = transcrtion.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(transcrtion.amount < 0 ? "exp":"inc" );
    item.innerHTML = `  ${transcrtion.description}
    <span>${sign} ${Math.abs(transcrtion.amount)}</span>
    <button class="btn-del" onclick="removeTrans(${transcrtion.id})">x</button>`;

    trans.appendChild(item);


}

function removeTrans(id)
{
    if(confirm("ARe your sure")){
    transcrtion = transcrtion.filter((transcrtion)=>transcrtion.id != id);
    updatelocalstorage();
    config();
    }else{
        return;
    }
}

function updateamount(){

    const amount = transcrtion.map((transcrtion)=>
        transcrtion.amount);

    const total = amount.reduce((acc,val)=> (acc += val),0).toFixed(2);
    balance.innerText = total;


    const income = amount.filter((values)=> values > 0).reduce((acc,vak)=>(acc+=vak),0).toFixed(2);
    inc_amt.innerText = income;

    const expensie = (amount.filter((values)=> values < 0).reduce((acc,vak)=>(acc+=vak),0)*-1).toFixed(2);
    exp_amt.innerText = expensie;

}



function config(){
    trans.innerHTML= " ";
    transcrtion.forEach(loadtransctiondata);
    updateamount();
}

function addTransaction(e){

    e.preventDefault();
    if (description.value.trim() == "" || amount.value.trim() == ""){
       alert("pls ntercrt values"); 
    }else{
        const transaction = {
            id: uniqueid(),
            description: description.value,
            amount: +amount.value,
          };

        transcrtion.push(transaction);
        loadtransctiondata(transaction);
        description.value = "";
        amount.value = "";
        updateamount();
        updatelocalstorage();
    }

}

function uniqueid(){
    return Math.floor(Math.random()* 1000000);
}

form.addEventListener("submit",addTransaction);

window.addEventListener("load",function(){
    config();
});

function updatelocalstorage(){
    localStorage.setItem("exp_inx",JSON.stringify(transcrtion));
}