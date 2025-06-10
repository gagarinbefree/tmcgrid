// Тест на глубину понимания работы интерпретатора

async function delay(ms) {
    return new Promise(r=>setTimeout(r,ms))
}
async function short(){
    await delay(500)
    throw new Error("short() throwed");
}

async function long(){
    await delay(1000)
    return 'long() result';
}
async function start() {
    try{
        let promise1 = short();
        let promise2 = long();
        console.log(await promise2); // 1000ms timeout
        console.log(await promise1); // 500ms timeout
        console.log('success');
    }
    catch(e){
        console.error("CATCH ERROR");
    }
}
start().then(()=>console.log('test done'));

// описать выходные данные, пример:
// 1 - CATCH ERROR
// 2 - test done