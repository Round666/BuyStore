const Install = (app)=>{
    Data.forEach(d=>app.provide(d.name,d.value))
}

const BaseURL = 'http://127.0.0.1:3001/'

const Data = [
    {
        name:'$remoteServer',
        value:BaseURL,
    },
    {
        name:'$notify',
        value:()=>{
            console.log(123);
        }
    }
]


export default {
    Install,
    BaseURL
}