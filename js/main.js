"use strict";
{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
   {q: '世界で一番大きな湖は?', c:['カスピ海','カリブ海','琵琶湖']},
   {q: 'キリンの睡眠時間は?', c:['20分','8時間','20時間']},
   {q: '人間は1日にどれくらいの量の唾液を出す?', c:['1～1.5リットル（牛乳パック程度）','200ミリリットル（缶コーヒー1本程度）','500ミリリットル（ペットボトル1本程度）']},
   {q: '古代ローマでは洗剤の代わりに何で選択をしていた?', c:['おしっこ','砂','ワイン']},
   {q: '中国語で『手紙』と書くと何を意味する?', c:['トイレットペーパー','計算用紙','はがき']},


  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

 

  function shuffle(arr) {
     
     for (let i = arr.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [arr[j],arr[i]] = [arr[i], arr[j]];

     }


    return arr
  }

    function checkAnswer(li) {
      if(isAnswered) {
       return;
      }
      isAnswered = true;
      if (li.textContent === quizSet[currentNum].c[0]) {
       li.classList.add('correct');
       score++;
      } else {
        li.classList.add('wrong');
      }

      btn.classList.remove('disabled');
    }

  function setQuiz() {
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;

    while(choices.firstChild) {
       choices.removeChild(choices.firstChild);
    }
  
     const shuffleChoices = shuffle([...quizSet[currentNum].c]);
      shuffleChoices.forEach(choice => {
       const li = document.createElement('li');
       li.textContent = choice;
       li.addEventListener('click', () => {
         checkAnswer(li);
     });
       choices.appendChild(li);

  });

    if(currentNum === quizSet.length -1) {
      btn.textContent = 'あなたのスコア'
    }
}
   setQuiz();

   btn.addEventListener('click', () => {
     if(btn.classList.contains('disabled')) {
        return;
     } else
     btn.classList.add('disabled');

     if(currentNum === quizSet.length -1) {
      //  console.log(`Score: ${score}/ ${quizSet.length}`);
      scoreLabel.textContent = `Score: ${score}/ ${quizSet.length}`;
       result.classList.remove('hidden');
     } else {
       currentNum++;
       setQuiz();

     }
   });
}