import React from 'react';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        
        // Contrôle de la valeur des this
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    // Stockage dans le state de la valeur de l'input email
    handleEmailChange(e){
        this.setState({
            email : e.target.value
        })
    }

    // Stockage dans le state de la valeur de l'input mot de passe
    handlePasswordChange(e){
        this.setState({
            password : e.target.value
        })
    }

    // Envoi dà l'API des informations nécessaire à la connexion de l'utilisateur 
    handleSubmit(click){
        click.preventDefault();

        const submitData = {
            email : this.state.email, 
            password : this.state.password
        };

        fetch('http://localhost:5000/api/auth/login',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('user')
            },
            body : JSON.stringify(submitData)
        })
        .then(response => {
            if(response.status === 200){
                response.json()
                .then((resp) => {
                    localStorage.setItem('user', resp.token)
                    localStorage.setItem('id', resp.userId)
                    window.location = './Dashboard'
                })
                .catch(() => {
                    alert('Une erreur est survenue ! Veuillez réessayer plus tard !')
                })
            } else{
                alert('Email ou mot de passe incorrect ! Veuillez réessayer !');
            }
            return response.data
        })
        .catch(err => {
            console.log('err', err)
        })
    }

    render(){
        return(
            <>
                <form>
                    <label htmlFor='emailLogin'>
                        <input type='email' name='email' id='emailLogin' placeholder='E-mail' onChange={this.handleEmailChange} required></input>
                    </label>
                    <label htmlFor='passwordLogin'>
                        <input type='password' name='password' id='passwordLogin' placeholder='Mot de passe' onChange={this.handlePasswordChange} required></input>
                    </label>
                    <button type='submit' onClick={this.handleSubmit}>Connexion</button>
                </form>
            </>
        )
    }
}

export default Login;