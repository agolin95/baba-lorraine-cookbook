$(function(){
    let queryString = location.search.substring(1);
    $.getJSON("/recipes.json", function(json) {
        let recipe = json[queryString]
        appendBanner(recipe);
        appendOven(recipe);
        appendGuide(recipe);
    });
});

function appendBanner(recipe) {
    $('#recipe').append(`
        <div class="recipeBanner" style="background-image: url('/img/recipes/${recipe.image}')">
            <div class="gradient">
                <div class="titles">
                    <h2>${toTitleCase(recipe.name)}</h2>
                </div>
            </div>
        </div>
    `
    );
    if (recipe.author != undefined) {
        $('.titles').append(`<h3>By ${toTitleCase(recipe.author)}</h3>`);
    }
}

function appendOven(recipe) {
    if (recipe.temp != undefined) {
        $('#recipe').append(`
            <div class="oven">
                <div class="temp">
                    <img src="/img/icons/oven.png"
                    <h3>${recipe.temp}° F</h3>
                </div>
                <div class="time">
                    <img src="/img/icons/clock.png"
                    <h3>${recipe.cooktime} Min</h3>
                </div>
            </div>
        `
        );
    }
}

function appendGuide(recipe) {
    $('#recipe').append(`
        <div class="panels">
            <div class="panel ingredients">
                <h3>Ingredients</h3>
                <ul></ul>
            </div>
            <div class="panel instructions">
                <h3>Instructions</h3>
                <ol></ol>
            </div>
        </div>
    `
    );
    appendIngredients(recipe.ingredients);
    appendInstructions(recipe.instructions);
}

function appendIngredients(ingredients) {
    ingredients.forEach(function(ingredient){
        let str = '<li>'
        let quant = ''
        let unit = '<span class="unit"></span> '
        if (ingredient.quantity != undefined) {
            quant = `<span class="quantity">${ingredient.quantity}</span>`
        } 
        else {
            unit = ''
        }
        if (ingredient.unit != undefined) {
            if (ingredient.unit.length > 3) {
                unit = `<span class="unit"> ${ingredient.unit}</span> `
            }
            else {
                unit = `<span class="unit">${ingredient.unit}</span> `
            }
        }
        let food = `<span class="food">${toTitleCase(ingredient.food)}</span>`
        let style = ''
        if (ingredient.style != undefined) {
            style = ` <span class="style">${ingredient.style}</span>`
        }
        str += quant + unit + food + style + '</li>'
        $('.ingredients').append(str);
    });
}

function appendInstructions(instructions) {
    instructions.forEach(function(instruction){
        let str = `<li>${instruction}</li>`
        $('.instructions').append(str);
    });
}