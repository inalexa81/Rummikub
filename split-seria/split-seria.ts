


function splitSeria (existSeria:Card[], cardsToAdd:Card[]){
    try {
       const temporaryArr = existSeria.concat(cardsToAdd)
       temporaryArr.sort(compare)
       const startOfNewSeria = temporaryArr.findIndex((card, index)=>card.value===temporaryArr[index+1].value)+1
       console.log(startOfNewSeria);
       const newSeria1 = temporaryArr.slice(0,startOfNewSeria)
       const newSeria2 = temporaryArr.slice(startOfNewSeria)

       //add afunction that check the new serias
       
       
    } catch (error) {
        console.error(error)
    }
}

splitSeria([new Card(2,'hh','jj', false),new Card(3,'hh','jj', false),new Card(4,'hh','jj', false)],[new Card(1,'hh','jj', false),new Card(3,'hh','jj', false),new Card(5,'hh','jj', false)])