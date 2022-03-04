import React from 'react';
import styled from 'styled-components';

class Add extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            text: "",
            image: [],
            questionNumber: [],
            questions: [],
            answers: []
        }
        
        // Contrôle de la valeur des this
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fileInput = React.createRef()
        this.handleQuestionChange = this.handleQuestionChange.bind(this)
        this.handleQcmQuestion = this.handleQcmQuestion.bind(this)
        this.handleQcmAnswer = this.handleQcmAnswer.bind(this)
    }
    
    // Stockage dans le state de la valeur de l'input email
    handleTitleChange(e){
        this.setState({
            title : e.target.value
        })
    }

    // Stockage dans le state de la valeur de l'input mot de passe
    handleTextChange(e){
        this.setState({
            text : e.target.value
        })
    }

    handleImageChange(e){
        this.setState({
            image : this.fileInput.current.files[0]
        })
    }

    // Envoi dà l'API des informations nécessaire à la connexion de l'utilisateur 
    handleSubmit(click){
        click.preventDefault();
        const object = {
            title : this.state.title,
            text : this.state.text,
            questions : this.state.questions,
            answers : this.state.answers
        }

        const submitData = new FormData();
        submitData.append('object', JSON.stringify(object));
        submitData.append('file', this.state.image);

        fetch('http://localhost:5000/api/article/',{
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('user')
            },
            body : submitData
        })
        .then(response => {
            if (response.status === 201) alert('Article posté !')
        })
        .catch(() => {
            alert('Une erreur est survenue ! Veuillez réessayer plus tard !')
        })
    }

    handleQuestionChange(e){
        this.setState({questionNumber: e.target.value})
    }

    handleQcmQuestion(e){
        if (e.key === 'Enter'){
            this.setState({questions : [...this.state.questions, e.target.value]})
        }
    }

    handleQcmAnswer(e){
        if (e.key === 'Enter'){
            this.setState({answers : [...this.state.answers, e.target.value]})
        }
    }

    componentDidMount(){
        if (localStorage.getItem('id') != '61fcfc2a1af4c8407cc34665'){
            alert("Vous n'avez pas l'autorisation d'accéder à cette page");
            window.location = './Login';
        }
    }

    render(){
        // const Form = styled.form`
        //     width: 75%;
        //     margin: auto;
        //     padding : 2rem;
        //     border: 3px solid gray;
        //     border-radius: 10px;
        // `;

        // const Label = styled.label`
        //     width: 90%;
        //     margin: auto;
        //     padding: 1rem 0;
        // `;

        // const Input = styled.input`
        //     width: 100%;
        // `;

        // const Textarea = styled.textarea`
        //     width: 100%;
        //     height: 15rem;
        //     border: 1px solid black;
        // `;

        // const InputImage = styled.input.attrs({
        //     type: 'file'
        // })`
        //     padding: 1rem;
        //     width: 100%;
        // `

        let questionArray = [];
        for (let i = 0; i < this.state.questionNumber; i++){
            questionArray.push(this.state.questionNumber)
        }

        let answerArray = [];
        for (let o = 0; o < this.state.answerNumber; o++){
            answerArray.push(this.state.answerNumber)
        }

        return(
            <>
                <form className='formAdd'>
                    <label htmlFor='title' className='labels'>
                        <input type="text" name='title' placeholder='Titre' id='titre' onChange={this.handleTitleChange} required />
                    </label>
                    <label htmlFor='texte' className='labels'>
                        <textarea type="text" name='texte' placeholder='Contenu' id='texte' onChange={this.handleTextChange} required />
                    </label>
                    <label htmlFor='image' className='labels'>
                        <input type="file" accept="image/png, image/jpeg, image/gif" name='image' onChange={this.handleImageChange} ref={this.fileInput} />
                    </label>
                </form>

                <form className='formAdd'>
                    <h1>QCM associé</h1>
                    <div>
                        <h5>Combien de questions ?</h5>
                        <input id='questionNumber' type='number' onChange={this.handleQuestionChange}/>
                    </div>
                    
                    {questionArray.map((qunbr) => {
                        return <div className='qcmComponent' key={qunbr.value}>
                            <input type='text' className='question' placeholder='Question' onKeyPress={this.handleQcmQuestion}/>
                            <input className='answer' placeholder='Réponse' onKeyPress={this.handleQcmAnswer}/>
                            <input className='answer' placeholder='Réponse' onKeyPress={this.handleQcmAnswer}/>
                            <input className='answer' placeholder='Réponse' onKeyPress={this.handleQcmAnswer}/>
                            <input className='good' placeholder='Bonne réponse' onKeyPress={this.handleQcmAnswer}/>
                        </div>
                    })}
                </form>
                <button type='submit' onClick={this.handleSubmit}>Valider</button>
            </>
        )
    }
}

export default Add;