# Tochi's Solution to the Canonical Test

To run this project:
```
    yarn install
```

Then run:
```
    yarn build
```

## Deployed at:
[https://canonical-quest-tochi.netlify.app/](https://canonical-quest-tochi.netlify.app/)'

## Code Structure:

The cards are each taken as a single component and placed in a components folder inside src:
<pre>
    📦src
    ┣ 📂Components
    ┃ ┗ 📂shadowed-vanilla-card
    ┃ ┃ ┗ 📜index.html
    ┗ 📜style.scss
</pre>

A component can be included into the html by adding an `include-component` tag as passing the component directory as it's value. e.g.
```
    <div id="0" include-component="./src/Components/shadowed-vanilla-card"></div> 
```

I then wrote a javascript function to parse the document and replace these place holder elements and the place holder HTML tags in the components with the referenced component and data from the API. I have chosen this structure because it is easily extendable for other types of components if need be and to iterate between builds faster.

-Tochi