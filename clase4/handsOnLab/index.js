    import ManagersUsuarios from "./managers/ManagersUsuarios.js";

    const managers = new ManagersUsuarios();

    const env = async ()=>{

        let primerConsulta = await managers.consultarUsuarios();
        console.log(primerConsulta);
        let user = {
            nombre : 'Luis',
            apellido : 'Perez',
            edad : 32 , 
            curso : 'Backend'
        }
        let result = await managers.crearUsuario(user);
        console.log(result);
    }

    env()