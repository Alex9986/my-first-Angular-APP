import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();


  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/4/4d/Cheeseburger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]),
    new Recipe(
        'BBQ',
        'I Love It!!!',
        'https://images2.minutemediacdn.com/image/upload/c_crop,h_2172,w_3864,x_0,y_202/f_auto,q_auto,w_1100/v1558021472/shape/mentalfloss/80312-istock-957009874.jpg',
        [
          new Ingredient('Beef', 10),
          new Ingredient('Onion', 10),
          new Ingredient('Peper', 15)
        ])
  ];

  constructor(private slService: ShoppingListService) {}

  updateRecipesChanged() {
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  deleteRecipe(index: number): void{
    this.recipes.splice(index, 1);
    this.updateRecipesChanged();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.updateRecipesChanged();
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.updateRecipesChanged();
  }
}
