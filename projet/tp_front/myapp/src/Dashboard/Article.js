import React from 'react';

class Article extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            post: []
        }

        this.handleAnswer = this.handleAnswer.bind(this);
    }

    handleAnswer(e){
        if (e.target.value === this.state.post.answers[3]){
            e.target.parentNode.children[3].style.color = 'green'
            e.target.parentNode.children[3].innerHTML = 'Bonne réponse'
        } else if (e.target.value === 'Choisissez une réponse ...'){
            e.target.parentNode.children[3].innerHTML = ''        
        } else{
            e.target.parentNode.children[3].style.color = 'red'
            e.target.parentNode.children[3].innerHTML = 'Mauvaise réponse' 
        }
    }

    componentDidMount(){
        const url = new URLSearchParams(document.location.search);

        fetch('http://localhost:5000/api/article/' + url.get('id'),{
            method : 'GET',
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('user')
            }
        })
        .then(post => post.json())
        .then(post => {
            this.setState({post})
        })
    }
    

    render(){
        if (this.state.post.questions !== undefined){
            console.log(this.state.post)
            return(
                <section> 
                    <div id='divChildArticle'>
                        <h1>{this.state.post.title}</h1>
                        <p>{this.state.post.text}</p>
                        <img id='image' src={this.state.post.image} />
                    </div>
                    <div className='divQcm'>
                        <h1>QCM</h1>
                        <h5>Question : {this.state.post.questions[0]}</h5>
                        <select onChange={this.handleAnswer}>
                            <option>Choisissez une réponse ...</option>
                            <option>{this.state.post.answers[0]}</option>
                            <option>{this.state.post.answers[1]}</option>
                            <option>{this.state.post.answers[2]}</option>
                        </select>
                        <p></p>
                    </div>
                </section>
            )
        } else{
            return <p>Loading ...</p>
        }
    }
}

export default Article;