
import React, { useState } from "react";
import './star.css'
const StarsDisplay = props => (
  <>
    {utils.range(1, props.count).map(starId => (
      <div key={starId} className="star" />
    ))}
  </>
);

const PlayNumber = props => (
	<button className="number" 
  style={{backgroundColor:colors[props.status]}}
  onClick={() => props.onClick(props.number,props.status)}>
    {props.number}
  </button>
);


const StarMatch = () => {
  const [stars,setStars] = useState(utils.random(1,9));
  const [availableNums,setavailableNums] = useState(utils.range(1,9));
  const [candidateNums,setCandidateNums]=useState([]);

  const candidatesAreWrong= utils.sum(candidateNums) > stars;
 
  const numberStatus = (number)=>{
    if(!availableNums.includes(number)){
      return 'used';
    }
    if(candidateNums.includes(number)){
      return candidatesAreWrong ? 'wrong': 'candidate';
    }
    return 'available';
  };

  const onNumberClick = (number,currentStatus)=>{
    if(currentStatus ==='used'){
      return ;
    }
    const newcandidatenums = currentStatus === 'available'
    ? candidateNums.concat(number)
    : candidateNums.filter(cn => cn !== number);

    if(utils.sum(newcandidatenums)!==stars){
      setCandidateNums(newcandidatenums);
    }
    else{
      const newavailablenums = availableNums.filter(
        n=>!newcandidatenums.includes(n)
      );
      setStars(utils.randomSumIn(newavailablenums,9));
      setavailableNums(newavailablenums);
      setCandidateNums([]);
    }
  }
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
        <StarsDisplay count={stars}/>
        </div>
        <div className="right">
        {utils.range(1, 9).map(number =>
          	<PlayNumber key={number} 
            status={numberStatus(number)}
            number={number}
            onClick={onNumberClick}/>
          )}
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};

export default StarMatch