function f1() {
    try {
        f2()
    } catch (error) {
        throw error
    }
}

function f2() {
    try {
        f3()
    } catch (error) {
        throw error
    }
}

function f3() {
    try{
        0/a
    } catch (error) {
        throw error
    }
    return 'success'
}

// 没有发生异常 正常返回结果
// 发生了异常


// 函数设计
// 函数内部判断异常 return false || null
// throw new Error 规范 throw 抛出异常