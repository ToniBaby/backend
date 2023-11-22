import fs from 'fs';
import crypto from 'crypto';

export default class UserManager {

    constructor(path){
        this.path = path 
    }

    getUsuarios = async ()=>{

        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const usuarios = JSON.parse(data);
            return usuarios;

        }else{
            return[]
        }
    }
    crearUsuario = async (usuario)=>{
        const usuarios = await this.getUsuarios();
        if(usuarios.length === 0){
            usuario.id = 1;
        }else{
            usuario.id = usuarios[usuarios.length-1].id + 1 ;
        }
    }
}