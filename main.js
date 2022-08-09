let dataJSON = fetch('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json')
    .then(res=>res.json())
    .catch(err=>{console.log(err)});

const componentFinder = ()=>{
    // query all elements in the DOM
    const allComponents = document.getElementsByTagName("*");
    let cardNumber = 0; 
    Array.from(allComponents).forEach((componentContainer)=>{
        // iterate throgh each element and attempt to find the "include-component" attribute
        const componentDir = componentContainer.getAttribute("include-component");
        if(componentDir){
            // if the include component attribute exists look for an index.html in the component directory
            const filePath = componentDir + '/index.html';
            fetch(filePath)
                .then(res=>res.text())
                .then(res=>{
                    const parser = new DOMParser();
                    const componentBody = parser.parseFromString(res, "text/html").querySelector('body');

                    // insert that component into the DOM from it's index.htmk file
                    componentContainer.innerHTML = componentBody.innerHTML;

                    // do somethings to the component
                    dataMounting(componentContainer, cardNumber++);

                })
                .catch(res=>{
                    componentContainer.innerHTML = "404: Component not Found"
                })
        }
    })
}

const dataMounting = async (component, index) =>{
    // this function mounts data gotten from the api to the DOM
    const newData = await dataJSON;

    const categoryElement = component.querySelector('[placeholder-id="category"]');
    categoryElement.innerHTML = newData[index]._embedded['wp:term'][2][0]? newData[index]._embedded['wp:term'][2][0].name : newData[index]._embedded['wp:term'][1][0].name;

    const imageElement = component.querySelector('[placeholder-id="image"]');
    imageElement.src = newData[index].featured_media;

    const imageLinkElement = component.querySelector('[placeholder-id="image-link"]');
    imageLinkElement.href = newData[index].link;

    const titleElement = component.querySelector('[placeholder-id="title"]');
    titleElement.innerHTML = newData[index].title.rendered;

    const titleLinkElement = component.querySelector('[placeholder-id="title-link"]');
    titleLinkElement.href = newData[index].link

    const authorElement = component.querySelector('[placeholder-id="author"]');
    authorElement.innerHTML = newData[index]._embedded.author[0].name;
    authorElement.href = newData[index]._embedded.author[0].link;

    const dateElement = component.querySelector('[placeholder-id="date"]');
    const date = new Date(newData[index].date);
    const formattedDate = date.getDay()+ " " + date.toLocaleDateString('default', {month: 'long'})+ " " + date.getFullYear();
    dateElement.innerHTML = formattedDate;

    const postTypeElement = component.querySelector('[placeholder-id="post-type"]');
    postTypeElement.innerHTML = newData[index]._embedded['wp:term'][0][0].name;
}

componentFinder();
