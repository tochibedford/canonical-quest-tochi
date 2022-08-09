let dataJSON = fetch('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json')
    .then(res=>res.json())
    .catch(err=>{console.log(err)});

const componentFinder = ()=>{
    // query all elements in the DOM
    const allComponents = document.getElementsByTagName("*");
    Array.from(allComponents).forEach((componentContainer, index)=>{
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
                    dataMounting(componentContainer);

                })
                .catch(res=>{
                    componentContainer.innerHTML = "404: Component not Found"
                })
        }
    })
}

const dataMounting = async (component) =>{
    // this function mounts data gotten from the api to the DOM
    const newData = await dataJSON;
    const categoryElement = component.querySelector('[placeholder-id="category"]');
    categoryElement.innerHTML = newData[component.id]._embedded['wp:term'][2][0]? newData[component.id]._embedded['wp:term'][2][0].name : newData[component.id]._embedded['wp:term'][1][0].name;

    const imageElement = component.querySelector('[placeholder-id="image"]');
    imageElement.src = newData[component.id].featured_media;

    const imageLinkElement = component.querySelector('[placeholder-id="image-link"]');
    imageLinkElement.href = newData[component.id].link;

    const titleElement = component.querySelector('[placeholder-id="title"]');
    titleElement.innerHTML = newData[component.id].title.rendered;

    const titleLinkElement = component.querySelector('[placeholder-id="title-link"]');
    titleLinkElement.href = newData[component.id].link

    const authorElement = component.querySelector('[placeholder-id="author"]');
    authorElement.innerHTML = newData[component.id]._embedded.author[0].name;
    authorElement.href = newData[component.id]._embedded.author[0].link;

    const dateElement = component.querySelector('[placeholder-id="date"]');
    const date = new Date(newData[component.id].date);
    const formattedDate = date.getDay()+ " " + date.toLocaleDateString('default', {month: 'long'})+ " " + date.getFullYear();
    dateElement.innerHTML = formattedDate;

    const postTypeElement = component.querySelector('[placeholder-id="post-type"]');
    postTypeElement.innerHTML = newData[component.id]._embedded['wp:term'][0][0].name;
}

componentFinder();
