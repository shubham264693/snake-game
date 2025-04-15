function test(...numbers){
    console.log(numbers)
   let sum = 0
    for(let i=0;i<numbers.length;i++){
        console.log(numbers[i])
        sum += numbers[i];
   }
   return sum
}
let arr = [1,2,3,4]
console.log(typeof arr);

let getData = test(...arr);
console.log(getData,'Print data details');
