function test(){
    return new Promise((resolve,reject)=>{
        resolve('success')
    })
}

let getData = test();
console.log(getData,'Print data details');
