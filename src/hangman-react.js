/**
 * @file hangman-react.js   Implementation of a Hangman game with React.
 *
 * @brief
 *  Implementation of methods for a Hangman game. The file will handle the
 *  word to be guessed, the words characters, the hangman image that is displayed
 *  to the screen, and the game status.
 *
 * @author Alex Johnson
 * @date 11/6/2019
 */
import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components'; //CSS directly in components https://www.styled-components.com/
import Characters from './components/Characters';
import Title from './components/Title';
import Diagram from './components/Diagram';
import GameOver from './components/GameOver';
import NewGame from './components/NewGame';
import AltNewGame from './components/AltNewGame';
import fetchWords from './fetchWords';

/**
 * CSS component for the main title, (Hangman with React!).
 */
 const Name = styled.h1`
  font-size: 80px;
  font-family: 'Vollkorn';
  position: center;
  margin: 0;
`;

/**
 * CSS component for the subtitle (Guess the title), it will disappear when you win or lose.
 */
const SubTitle = styled.h3`
  font-size: 30px;
  font-family: 'Vollkorn';
  padding: 25px 0;
  text-transform: uppercase;
  margin: 0;
  position: center;
  visibility: ${props => (props.newGame ? 'visible' : 'hidden')};
`;

/**
 * CSS component for NewGame, Diagram, and GameOver
 */
const Block = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: center;
  /*min-height: 300px;*/
`;

const letters = /^[a-z]+$/i; // Generates the alphabet.
const characters = document.getElementsByClassName('character');
const winText = `Congratulations!`;
const loseText = 'Maybe Next Time!';

/**
 * Foundation for all components.
 */
class App extends Component{
  state = {
    data: [],
    lose: false,
    currentWords: 0,
    guesses: [],
    currentDiagram: 1,
    correctGuesses: [],
    incorrectLetters: [],
    newGame: true,
  };
  constructor(props){
    super(props);
    this.getData();
  }

  /**
   * Inserts into the tree (DOM).
   */
  componentDidMount(){
    const wrapper = document.getElementsByClassName('App')[0];

    // Rule disabler, https://eslint.org/docs/user-guide/configuring
    wrapper ? wrapper.focus() : null; // eslint-disable-line
  }

  /**
   * Grabs from three themes using unique integer ids, and finds a random key value pair.
   *
   * @return selects a random word from the JSON list.
   * @return returns the selected random word.
   */
  getData(){
    Promise.all([fetchWords(53), fetchWords(37), fetchWords(10402)])
      .then(([thriller, western, music]) => [...thriller, ...western, ...music])
        .then(
          function(selectWord){
            const randomWords = selectWord.sort(() => {
              return 0.5 - Math.random();
            });
            return this.setState({data: randomWords});
          }.bind(this)
        );
  }

  /**
   * Converts the entire key value pair to lowercase and stores it as a character string.
   *
   * @return joins the character string together.
   */
  getWord(){
    const currentWords = this.state.data[this.state.currentWords].toLowerCase();
    const data = [];
    console.log("Word/phrase is: ", currentWords);
    for(let i = 0; i < currentWords.length; i++){
      if(letters.test(currentWords[i]) || currentWords[i] === ' '){
        data.push(currentWords[i]);
      }
    }
    return data.join('');
  }

  /**
   * Handles clicking on the alphabet line when guessing.
   *
   * @return Checks if you've clicked a correct letter.
   */
  handleClick = e => {
    const letter = e.target.textContent.toLowerCase();
    return letter.length > 1 ? null : this.checkLetter(letter);
  };

  /**
   * Handles key presses when guessing.
   *
   * @return Disables a character that you've entered when correct.
   */
  handleKeyUp = e => {
    const keyName = e.key;
    if(letters.test(keyName)){
      return this.isDisabled(keyName) ? null : this.checkLetter(keyName);
    }
  };

  /**
   * Like binary bits, the alphabet can be toggled on from an off state, each correct
   * guesses is disabled (not visable) unless you get a correct guess (visable).
   *
   * @return disables a letter when you get it correct so that it can't be guessed again.
   */
  isDisabled(letter){
    for(let i = 0; i < characters.length; i++){
      if(characters[i].textContent === letter){
        return characters[i].hasAttribute('disabled');
      }
    }
  }

  /**
   * Checks to see if the letter you guessed is correct, updates the
   * diagram if needed (incorrect letter)
   */
  checkLetter = currentLetter => {
    if(this.state.guesses.length > 0){
      this.state.guesses.map(
        letter => letter === currentLetter ? null : this.setState({
            guesses: this.state.guesses.concat(currentLetter),
        })
      );
    }
    else{
      this.setState({
        guesses: this.state.guesses.concat(currentLetter),
      });
    }
    if(!this.getWord().includes(currentLetter)){
      this.updateImage();
    }
    else{
      this.setState({
        correctGuesses: this.state.correctGuesses.concat(currentLetter),
      },
        function(){
          this.isWin();
        }
      );
    }
  };

  /**
   * Updates the diagram using a series of images indexed 1-8.
   *
   * @return If you reach the 8th image, you lose.
   */
  updateImage = () => {
    if(this.state.currentDiagram < 8){
      this.setState({
        currentDiagram: this.state.currentDiagram + 1,
      });
    }
    return this.state.currentDiagram === 8 ? this.gameOver('lose') : null;
  };

  /**
   * Checks if you've won the game.
   *
   * @return if the lettersList is equivalent to the correctGuesses, you win.
   */
  isWin(){
    const lettersList = this.getWord()
      .replace(/ /g, '')
      .split('')
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
    return lettersList.sort().toString() ===
      this.state.correctGuesses.sort().toString() ? this.gameOver('win') : null;
  }

  /**
   * Shows the result of the game, win or lose.
   */
  gameOver = result => {
    if(result === 'lose'){
      this.setState({
        lose: true,
        newGame: false,
      });
      this.showIncorrect();
    }
    else{
      this.setState({
        lose: false,
        newGame: false,
      });
    }
  };

  /**
   * After you lose, you will see what characters you missed in red.
   */
  showIncorrect(){
    const incorrectLetterList = this.getWord()
      .split('')
      .filter(letter => !this.state.correctGuesses.includes(letter));
    this.setState({
      incorrectLetters: incorrectLetterList.join(''),
    });
  }

  /**
   * Resets the game.
   */
  onClickRetry(){
    this.setState({
      currentWords: this.state.currentWords + 1,
      guesses: [],
      currentDiagram: 1,
      correctGuesses: [],
      incorrectLetters: [],
      newGame: true,
    });
  }

  /**
   * Render function that renders all components.
   */
  render(){
    return(
      <div className="App" tabIndex="1" onKeyUp={this.handleKeyUp}>
        <Name>Hangman with React!</Name>
        <SubTitle newGame={this.state.newGame}>Guess the Title</SubTitle>
        {this.state.data.length > 0 && (
          <div>
            <Block>
              <GameOver
                text={this.state.lose ? loseText : winText}
                newGame={this.state.newGame}
                isLose={this.state.lose}
              />
              <Diagram
                currentDiagram={this.state.currentDiagram}
                newGame={this.state.newGame}
              />
              <NewGame
                onClick={this.onClickRetry.bind(this)}
                newGame={this.state.newGame}
              />
              <AltNewGame
                onClick={this.onClickRetry.bind(this)}
                newGame={this.state.newGame}
              />
            </Block>

            <Title
              content={this.getWord()}
              guesses={this.state.guesses}
              incorrectLetters={this.state.incorrectLetters}
            />
            <Characters
              guesses={this.state.guesses}
              onClick={this.handleClick}
              newGame={this.state.newGame}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
