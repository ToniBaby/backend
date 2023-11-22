const obj = {};

for (let i = 0; i < 10000; i++) {

    let number = Math.floor(Math.random()*20+1)

    if(obj[number]){
        obj[number]++;
    }else{
        obj[number]=1
    }
    
}

console.log(obj);