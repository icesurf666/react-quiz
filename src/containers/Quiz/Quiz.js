import React, {Component} from 'react';
import './Quiz.sass'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from '../../axios/axios-quiz';
import Loader from "../../components/UI/Loader/Loader";
export default class Quiz extends Component{
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        quiz: [],
        loading: true
    };
    retryHandler = () =>{
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    };
    onAnswerClickHandler = (answerId) =>{
        if(this.state.answerState){
            const key = Object.keys(this.state.answerState)[0];
            if(this.state.answerState[key]==='success'){
                return
            }
        }
        const question  = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;
        if(question.rightAnswerId === answerId){
            if(!results[question.id]){
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            });
            const timeout = window.setTimeout(()=> {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 1000);


        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    };
    isQuizFinished(){
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }
    async componentDidMount() {
        try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
            const quiz = response.data;

            this.setState({
                quiz,
                loading: false
            })
        } catch (error) {
            console.log(error)
        }
    };

    render() {
        return(
          <div className="Quiz">
              <div className="Quiz-wrapper">
                  <h1>Ответьте на все вопросы</h1>

                  {
                      this.state.loading
                      ? <Loader />
                      :  this.state.isFinished ?
                          <FinishedQuiz
                              results={this.state.results}
                              quiz={this.state.quiz}
                              onRetry={this.retryHandler}
                          />
                          : <ActiveQuiz
                              answers = {this.state.quiz[this.state.activeQuestion].answers}
                              question = {this.state.quiz[this.state.activeQuestion].question}
                              onAnswerClick = {this.onAnswerClickHandler}
                              quizLength={this.state.quiz.length}
                              answerNumber={this.state.activeQuestion + 1}
                              state={this.state.answerState}
                          />
                  }
              </div>
          </div>
        );
    }
}