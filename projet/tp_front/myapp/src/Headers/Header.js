import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component{

    render(){
        return(
            <header>
                    <Link to='/Login'><h1>Connexion</h1></Link>
                    <Link to='/'><h1>Inscription</h1></Link>
            </header>
        )
    }
}

export default Header;