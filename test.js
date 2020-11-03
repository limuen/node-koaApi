function fun1() {
    fun2()
}


async function fun2() {
    try{
       await fun3()
    } catch (error) {
       console.log('error')
    }
}

function fun3() {
    // return await setTimeout(()=> {
    //   throw new Error('error')
    // },1000)
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            const random = Math.random()
            if(random < 0.5) {
                reject('error')
            }
        },1000)
    })
}
fun1()









// 没有发生异常 正常返回结果
// 发生了异常


// 函数设计
// 函数内部判断异常 return false || null
// throw new Error 规范 throw 抛出异常