const get = key => {
    try{
        if(window.localStorage){
            const str = window.localStorage.getItem(key)
            if(str){
                const wrapper = JSON.parse(str)
                if(wrapper.exp > new Date().getTime()){
                    return wrapper.data
                }else{
                    window.localStorage.removeItem(key)
                    return null
                }
            }
        }
    }catch(e){
        console.error(e)
    }
    
    return null
}

const set = (key, value, exp) => {
    try{
        if(window.localStorage){
            const wrapper = {
                exp: new Date().getTime() + (exp ? exp : (24*60*60))*1000,
                data: value
            }
            window.localStorage.setItem(key, JSON.stringify(wrapper))
        }
    }catch(e){
        console.log(e)
    }
}

const remove = key => {
    try{
        if(window.localStorage){
            window.localStorage.removeItem(key)
        }
    }catch(e){
        console.log(e)
    }
}

export default {
    get,
    set,
    remove
}