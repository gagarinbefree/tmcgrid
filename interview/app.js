// Тест на глубину понимания работы интерпретатора
async function delay(ms) {
    return new Promise(r=>setTimeout(r,ms))
}
async function short(){
    await delay(500)
    throw new Error("short() thrown");
}
async function long(){
    await delay(1000)
    return 'long() result';
}
async function start() {
    try{
        console.log(await long());
        console.log(await short());
        console.log('success');
    }
    catch(e){
        console.error("CATCH ERROR");
    }
}

(async () => {
    await start();
    console.log('test done');
})();

// yarn run start
// выходные данные
// long() result
// CATCH ERROR
// test done