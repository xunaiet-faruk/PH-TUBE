const loadMap = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json();
    const phones = data.data
    console.log(phones);

    const containers = document.getElementById('container');

    phones.forEach((phone) => {
        const createElements = document.createElement('container');
        createElements.innerHTML = `
           <button onclick ="containerCard('${phone.category_id}')" class="btn hover:bg-[#FF1F3D] bg-gray-200">${phone.category}</button>
           `
        containers.appendChild(createElements);
    })
}
const containerCard = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const datainfo = data.data;
    const lastbtn = document.getElementById('last')
    const cardall = document.getElementById('card-container')
    cardall.textContent ='';
    if(datainfo.length == 0){

        lastbtn.classList.remove("hidden")
    }else{
        lastbtn.classList.add('hidden')
    }
    datainfo.forEach((carddata) => { 
    
        // console.log(cardall)

        const imageShort = carddata?.authors[0];
        const image = imageShort?.profile_picture;
        const image_name = imageShort?.profile_name
        console.log(image_name)

        const createcard = document.createElement('div');
        createcard.innerHTML = `
       <div class="card card-compact w-72 bg-base-100">
    <figure><img class="h-[200px] rounded-md" src="${carddata.thumbnail}" alt="Shoes" /></figure>
    <div class="items-center mt-6 gap-4 flex justify-start">
     
        <img class="w-10 h-10 rounded-3xl" src="${image}">
        <p class="font-bold"> ${carddata.title}</p>
        </div>        
        <div class="flex justify-start ml-14 gap-4">
       <span> ${carddata.authors[0].profile_name}</span>${carddata.authors[0].verified?
         '<img src="img.svg" alt="" id="logo">':''}
      </div>
            <p class="text-gray ml-14"> ${carddata.others?.views} views</p>
       </div>`
        cardall.appendChild(createcard)

    })
}


loadMap();

containerCard('1000')