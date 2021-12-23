$(function () {
    let queryString = location.search.substring(1);
    $.getJSON("/recipes.json", function (json) {
        console.log(json);
        for (var key in json) {
            let recipe = json[key];
            if (recipe.categories.indexOf(queryString) > -1) {
                $('#recipes').append(`
                    <a class="contentBox" href="/recipe.html?${key}" style="background-image: url('/img/recipes/${recipe.image}');">
                        <h3>${toTitleCase(recipe.name)}</h3>
                    </a>
                `);
            }
        }
    });
});