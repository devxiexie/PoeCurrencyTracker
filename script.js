const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);


var request1 = new XMLHttpRequest()

request1.open('GET', 'https://api.poe.watch/get?category=currency&league=Affliction', true)

const watcharr=[];

request1.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request1.status >= 200 && request1.status < 400) {
    data.forEach((thing) => {   
    //   console.log(thing.name,thing.mean,"poe.watch")
      watcharr.push([thing.name,thing.mean]);
    })
  } else {
    console.log('error')
  }
}

request1.send()



var request2 = new XMLHttpRequest()

const ninjaurl = 'https://corsproxy.io/?' + encodeURIComponent('https://poe.ninja/api/data/currencyoverview?league=Affliction&type=Currency');
request2.open('GET', ninjaurl , true)

const ninjaarr=[];

request2.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    
    if (request2.status >= 200 && request2.status < 400) {
      data.lines.forEach((thing) => {
        // console.log(thing.currencyTypeName,thing.chaosEquivalent,"poe.ninja");
        ninjaarr.push([thing.currencyTypeName,thing.chaosEquivalent])


        // const card = document.createElement('div');
        // card.setAttribute('class', 'card');

        // const h1 = document.createElement('h1');
        // h1.textContent = thing.currencyTypeName;

        // const p = document.createElement('p');
        // p.textContent = `${thing.chaosEquivalent}...`;

        // container.appendChild(card);
        // card.appendChild(h1);
        // card.appendChild(p);
      })
        
    } else {
      console.log('error')
    }
    displayCards();
};
  
request2.send()


console.log(watcharr)
console.log(ninjaarr)
function displayCards() {
    ninjaarr.forEach((thing) => {
        var goon=false;
        var thing2=0;
        for(var i=0;i<watcharr.length;i++){
            if(watcharr[i].includes(thing[0])){
                goon=true
                thing2=watcharr[i][1];
                break;
            }
        }
        if(goon){
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
    
            const h1 = document.createElement('h1');
            h1.textContent = thing[0];
    
            const p = document.createElement('p');
            p.textContent = `poe.ninja: ${thing[1]} \n poe.watch: ${thing2}`;
    
            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(p);
        }
        
    })
}
