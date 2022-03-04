import React from 'react';

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            connected: true,
            posts: []
        }

        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleRedirect(e){
        e.preventDefault();
        window.location = "./Article?id=" + e.target.className;
    }

    componentDidMount(){
        fetch('http://localhost:5000/api/article/', {
            method : 'GET',
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('user')
            }
        })
        .then(posts => posts.json())
        .then(posts => {
            this.setState({posts})
            console.log(posts[0].image)
            posts.forEach(post => {
                if (post.image === undefined){
                    post.image.remove();
                }
            })
        })
    }
    

    render(){
        return(
            <section>
                <div className='headTitle'>
                    Liste des articles !
                </div>
                {this.state.posts.map((post) => 
                    <div id='divChildPost' key={post._id} className={post._id} onClick={this.handleRedirect}>
                        <h1 className={post._id}>{post.title}</h1>
                        <p className={post._id}>{post.text}</p>
                        <img id='image' src={post.image} className={post._id}/>
                    </div>
                )}
            </section>
        )
    }
}

export default Dashboard;