

const btnGenerate = document.getElementById('btnGenerate')

const input=document.getElementById('prompt')

const apiKey = "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"



const girilenDeger = input.value

const params = {
  "prompt": 'red car',
  "n": 1,
  "size": '1024x2034'
};


const getData=()=>{


    fetch(`https://api.openai.com/v1/images/generations`,{

    method:'post',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
        "prompt": input.value,
        "n": 1,
        "size": "1024x1024"
      }),
    cache:'default'

    
    }).then(res=>{  

    
    if(!res.ok){

        throw new Error('Hata Var')
    }

    return  res.json()
    

    }).then(data=>{

        sendToDom(data)
        

    }).catch(err=>{

        console.log(err);
    })


}



const sendToDom=(gelenData)=>{

    const responseImg = document.querySelector('.responseImg').innerHTML =`
    
        <a href="${gelenData.data[0].url}" download target="blank_"><img src="${gelenData.data[0].url}" alt="" id="responseImg"></a>
    
    
    `

}



btnGenerate.addEventListener('click',e => {

    e.preventDefault()

    if(input.value){

        getData()
        
    }
    

})









