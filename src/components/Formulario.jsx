import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../Hooks/useSelectMonedas'
import Error from './Error'

const InputSubmit = styled.input`
background-color:#9497ff;
border:none;
width:100%;
padding:10px;
color:#fff;
font-weight:700;
text-transform:uppercase;
font-size:20px;
border-radius:5px;
transition: background-color .3s ease;
margin-top:10px;

&:hover{
    background-color:#7a70fe;
    cursor: pointer;
}
`
const Formulario = ({setMonedas}) => {

   

    useEffect(() => {
        const concultarAPI = async() => {
            const url ="https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
            const respuesta =  await fetch(url)
            const resultado =  await respuesta.json()
            console.log(resultado)


            const arrayCripto = resultado.Data.map(cripto => {
                const objeto = {
                    id:cripto.CoinInfo.Name,
                    nombre:cripto.CoinInfo.FullName
                }
                return objeto
            })
            setCriptos(arrayCripto)

        }
        concultarAPI();
    }, [])
    

    const monedas = [
    {id: 'USD', nombre: "Dolar de Estados Unidos"},
    {id: 'MXN', nombre: "Peso Mexicano"},
    {id: 'EUR', nombre: "Euro"},
    {id: 'GBP', nombre: "Libra Esterlina"}
    
    ]

    const [cripto, setCriptos] = useState([]);
    const [error, setError] = useState(false);

    const [moneda, SelectMonedas] = useSelectMonedas("que moneda quieres", monedas);

    const [criptomoneda, SelectCriptoMoneda] = useSelectMonedas("Elige tu CriptoMoneda", cripto);  

const handleSubmit = e =>{
    e.preventDefault()
    if([moneda, criptomoneda].includes("")){
        setError(true)
        return
    }
    setError(false)
    setMonedas({
        moneda,
        criptomoneda
    })
}

return (
    <>
    {error&& <Error>Todos los elementos son obligaotorios</Error>}
    <form
    onSubmit={handleSubmit}
    >
        <SelectMonedas/>
        <SelectCriptoMoneda/>

        <InputSubmit type="submit" value="Cotizar"/>
    </form>
    </>
)
}

export default Formulario