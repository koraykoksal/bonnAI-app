

const btnGenerate = document.getElementById('btnGenerate')

const input=document.getElementById('prompt')

const girilenData = document.querySelector('.prompt')

const girilenDeger = input.value

const notification = document.getElementById('modalNotification')



const getApiKey= async ()=>{

    
    fetch('https://6492f274428c3d2035d0f765.mockapi.io/openai_key', {

    method: 'GET',
    headers: {'content-type':'application/json'},

    }).then(res => {

    if (!res.ok) {

        throw new Error('Get Data Error')
    }

    return res.json();

    }).then(tasks => {

        const apiK=tasks[0].apiKey
        getData(apiK)

    }).catch(error => {

        writeError(error)
    })


}


const getData=(gelenData)=>{


    if(gelenData){

        fetch(`https://api.openai.com/v1/images/generations`,{

        method:'post',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${gelenData}`
        },
        body: JSON.stringify({
            "prompt": input.value,
            "n": 1,
            "size": "1024x1024"
          }),
        cache:'default'
    
        
        }).then(res=>{  
    
        
            if(!res.ok){
        
                throw new Error('Get Data Error')
            }
            else{


                return  res.json()

            }

        }).then(data=>{
    

            sendToDom(data)

            deger2()
    
        }).catch(err=>{
    
            writeError(err)
    
        })

    }



}


const sendToDom=(gelenData)=>{

    const responseImg = document.querySelector('.responseImg').innerHTML =`
    
        <a href="${gelenData.data[0].url}" download target="blank_"><img src="${gelenData.data[0].url}" alt="" id="responseImg"></a>
    
    
    `

}



btnGenerate.addEventListener('click',e => {

    e.preventDefault()

    if(input.value){

        
        deger1()
  
        getApiKey()

        getData()


    }



})



const writeError=(gelenHata)=>{

    const resultError = document.getElementById('notification')

    resultError.textContent = `${gelenHata}`

}



const deger1 = ()=>{

    girilenData.style.display="none"
    notification.style.display="block"

}

const deger2 =()=>{


    girilenData.style="display:block;display:flex;justify-content:center;align-items:center;gap:1rem;"
    notification.style.display="none"

}


