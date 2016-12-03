// this is the central data storage!
import {Injectable} from '@angular/core';

import {Recipe} from './recipe';
import {Ingredient} from '../ingredient';

@Injectable()
export class RecipeService {
private recipes: Recipe[] = [

    new Recipe('Char Kuay Teow',
    'Very Shiok!',
    'http://sethlui.com/wp-content/uploads/2016/01/zion-road-char-kway-teow.jpg',
    [
    new Ingredient('Kuay Teow', 1),
    new Ingredient('Lup Cheong', 1)
    ]),

    new Recipe('Nasi Lemak',
    'Mmm...Sedap!',
    'https://www.purelyb.com/images/easyblog_shared/2e1ax_content_entry_blog-Nasi-Lemak-A-Traditional-Mala-119568677-1.jpg',
    [
    new Ingredient('Steamed Coconut Rice', 1),
    new Ingredient('Ikan Bilis', 1)
    ])

  ];

  constructor() { }

  getRecipes() {
    return this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe) { // --> will remove the one that is passed here
    this.recipes.splice(this.recipes.indexOf(recipe), 1); // --> remove one recipe
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

}
