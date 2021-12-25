$(function () {
    let queryString = location.search.substring(1);
    $.getJSON("/recipes.json", function (json) {
        setSubtitle(queryString);
        if (queryString == "all") {
            let sorted = sortObject(json);
            for (var key in sorted) {
                let recipe = sorted[key];
                $('#recipes').append(`
                    <a class="contentBox" href="/recipe.html?${key}" style="background-image: url('/img/recipes/${recipe.image}');">
                        <h3>${toTitleCase(recipe.name)}</h3>
                    </a>
                `);
            }
        }
        else {
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
        }
    });
});

function sortObject(o) {
    var sorted = {},
    key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
                a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}

function setSubtitle(queryString) {
    switch (queryString) {
        case "all":
            $('#subtitle').html("All Recipes");
            break;
        case "appetizer":
            $('#subtitle').html("Appetizers");
            break;
        case "bread":
            $('#subtitle').html("Breads");
            break;
        case "brunch":
            $('#subtitle').html("Brunch");
            break;
        case "cheese":
            $('#subtitle').html("Cheese");
            break;
        case "dessert":
            $('#subtitle').html("Desserts");
            break;
        case "eggs":
            $('#subtitle').html("Eggs");
            break;
        case "entree":
            $('#subtitle').html("Entrees");
            break;
        case "vegetable":
            $('#subtitle').html("Vegetables");
            break;
    }
}