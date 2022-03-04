import React from 'react';
import './signup.css';

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            confirm : '',
            email : '',
            password : ''
        }

        // Contrôle de la valeur des this
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Méthodes 'handle...' permettant de récupérer les informations passées par l'utilisateur
    handleConfirmPassword(e){
        this.setState({
            confirm : e.target.value
        })
    }

    handleEmailChange(e){
        this.setState({
            email : e.target.value
        });
    };

    handlePasswordChange(e){
        this.setState({
            password : e.target.value
        });
    };

    // Méthode permettant de s'assurer de la remise à zéro du formulaire
    resetForm() {
        this.setState({
            lastName: '',
            firstName: '',
            email: '',
            password: '',
            redirection: false,
        });
    }

    // Envoi à l'API des informations nécessaire à la création du compte de l'utilisateur
    handleSubmit(click){
        click.preventDefault();

        if (this.state.confirm === this.state.password){
            const submitData = {
                email : this.state.email,
                password : this.state.password
            };

            fetch('http://localhost:5000/api/auth/signup',{
                method : 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify(submitData)
            })

            .then(() =>{
                window.location = './Login'
            })
            
            .catch(err=> {
                console.log('err', err);
                alert(err.error);
                this.resetForm();
            })
        }else{
            alert('Les deux mots de passe ne correspondent pas')
        }
    }

    render(){
        return(
            <>
                <form>
                    <label htmlFor='email'>
                        <input type='email' id='email' name='email' onChange={this.handleEmailChange} placeholder='Adresse e-mail' required></input>
                    </label>
                    <label htmlFor='password'>
                        <input type='password' id='password' name='password' onChange={this.handlePasswordChange} placeholder='Mot de passe' required></input>
                    </label>
                    <label htmlFor='confirmPassword'>
                        <input type='password' id='confirmPassword' name='confirmPassword' onChange={this.handleConfirmPassword} placeholder='Confirmer le mot de passe' required></input>
                    </label>
                    <button type='submit' onClick={this.handleSubmit}>Inscription</button>
                </form>
            </>
        )
    };
};

export default Signup;