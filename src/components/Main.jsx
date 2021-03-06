import React,{Children, Component, createElement, Fragment} from "react";
import Result from './Result';
import '../../node_modules/font-awesome/css/font-awesome.min.css'
import './Main.css'
    const inicialState= {
        cep: '',
        response:'Inicial'
    }
export default class Input extends Component{
    state= {...inicialState}
   

    async searchCep(){
        const field = document.querySelector('input').value.replace('-','')
        
        const url = `https://viacep.com.br/ws/${field}/json/ `    
        let result 
      await fetch(url)
                .then(resp => resp.json())
                .then(resp=>{
                   result = resp                   
                    return (
                        this.setState({response: result})
                        )
                    })
                 .then(resp => {
                    this.mountResult( this.state.response)
                 })
                 .catch(err => this.mountError(err, field))
                    
    }
 
    mountResult(e){
        const resultHtml = document.querySelector('.result')
        resultHtml.innerHTML = 
       ` <div className="result">
            <h2>Dados encontrados</h2>
            <p>Dados encontrados</p>
            <ul>
                <li>Cep: ${e.cep}</li>
                <li>Logradouro: ${e.logradouro}</li>
                <li>Bairro: ${e.bairro}</li>
                <li>Cidade: ${e.localidade}</li>
                <li>UF: ${e.uf}</li>
                <li>DDD: ${e.ddd}</li>
              
            </ul>
        </div>`
        this.startState()
    }
    mountError(err, field = '1'){
        const resultHtml = document.querySelector('.result')
        field.replace('-', '')
        let msgError 
        !isNaN(field) ? msgError = 'CEP não encontrado!' : msgError = 'CEP digitado invalido!' 
      
        resultHtml.innerHTML = 
            ` <div className="result">
                 <h2 id="error">${msgError}</h2>
             </div>`
        console.log('Erro 400 na requisição ')
    }

    render(){
        return(
            <Fragment>
                <div className="field">
                    <input onKeyPress= {e => {
                        if (e.key === 'Enter') {
                           this.searchCep(e)
                          }
                    }} type="text" id="cep" placeholder={this.props.placeholder} autoComplete="on" />
                    <button onClick={e => this.searchCep(e)}><i className="fa fa-search"></i></button>
                </div>
                <Result />
            </Fragment>
        )
    }
} 
    