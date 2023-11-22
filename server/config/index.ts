import dbConfig from './db' 
import Path from 'path'

interface IConfig {
    dbConfig:Object,
    starticDir:string
}

const config:IConfig = {
    dbConfig,
    starticDir:Path.resolve('./public')
}

export default config