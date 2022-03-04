import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

class HeaderHome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            connected: false,
        }

        // Contrôle de la valeur des this
        this.handleSignout = this.handleSignout.bind(this);
    }

    // Gestion de la déconnexion de l'utilisateur
    handleSignout(click){
        click.preventDefault()
        localStorage.clear()
        window.location = './Login'
    };

    render(){
        const Div = styled.div`
            &:not(:last-of-type){
                width: fit-content;
                height: fit-content;
                border-right: 1px solid white;
            }

            &:last-of-type{
                padding: 0 3rem 0 1rem;
            }

            padding: 0 1rem;
            height: 60% !important;
            display: flex;
            align-items: center;
        `;

        const H1 = styled.h1`
            color: white;
            padding: 0;
        `;

        const P = styled.p`
            color: white;
            font-weight: bold;
            cursor: pointer;
        `;

        const Access = () =>{
            if (localStorage.getItem('id') === '61fcfc2a1af4c8407cc34665'){
                return(
                    <Div>
                        <Link to='/Add'><H1>Ajouter</H1></Link>
                    </Div>
                )
            } else{
                return null
            }
            
        }

        return(
            <header id='header'>
                <Div>
                    <Link to='/Dashboard'><H1>Accueil</H1></Link>
                </Div>
                
                <Access />
                
                <Div id='divProfile'>
                    <P onClick={this.handleSignout}>Déconnexion</P> 
                </Div>
            </header>
        )
    }
}

export default HeaderHome;