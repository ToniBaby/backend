import express from 'express';

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})

let frase = "Frase Inicial";

app.get('/api/frase', (req,res)=>{
    res.send({frase});
})

app.get('/api/palabras/:pos', (req,res)=>{

    const pos = req.params.pos;

    const parsePos = parseInt(pos);

    const palabras = frase.split('');
     
    if(parsePos <= 0 || parsePos > palabras.length){
        return res.status(400).send({
            status: 'Error',
            error: 'Pos fuera de rango'
        })
    }
    res.send({
        palabra: palabras[parsePos-1]
    })
})
app.post('/api/palabras/', (req,res)=>{
    const palabra = req.body.palabra;

    frase = `${frase} ${palabra}`

    res.send({
        palabra,
        pos: frase.split('').length
    })
    
})

app.put('/api/palabras/:pos', (req,res)=>{

    const palabra = req.body.palabra;
    const pos = req.params.pos;

    const parsePos = parseInt(pos);
    const palabras = frase.split('');

    const anterior = palabra[parsePos-1];
    palabras[parsePos-1] = palabra;

    frase = palabras.join('');
    
    res.send({
        actualizada: palabra,
        anterior
    })

})

app.delete('/api/palabras/:pos', (req,res)=>{

    const pos = req.params.pos;

    const parsePos = parseInt(pos);

    const palabras = frase.split('');

    const palabraEliminada = palabras[parsePos-1];

    palabras.splice(parsePos-1,1);

    frase = palabras.join('');

    res.send({
        status: 'Correcto',
        eliminada: palabraEliminada
    })

})