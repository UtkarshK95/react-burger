import React, { useState } from "react";
import "./BurgerStyle.css";

// Ingredient Component
const Ingredient = ({ type }) => {
  return <div className={`${type}Side`}></div>;
};

// Ingredient Control Component
const IngredientControl = ({ label, onAdd, onRemove }) => {
  return (
    <div className="ingredientsBlock">
      <p>{label.toUpperCase()}</p>
      <div className="ingrBtns">
        <button className="ingrBtn" onClick={onAdd}>
          Add
        </button>
        <button className="ingrBtn" onClick={onRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

const Burger = () => {
  const [ingredients, setIngredients] = useState({
    lettuce: 0,
    tomato: 0,
    cheese: 0,
    meat: 0,
  });

  const addRemoveIngredient = (action, ingredient) => {
    setIngredients((prevIngredients) => ({
      ...prevIngredients,
      [ingredient]:
        action === "add"
          ? prevIngredients[ingredient] + 1
          : Math.max(0, prevIngredients[ingredient] - 1),
    }));
  };

  const ingredientTypes = Object.keys(ingredients);

  const renderIngredients = () => {
    return ingredientTypes.flatMap((type) =>
      Array.from({ length: ingredients[type] }, (_, index) => (
        <Ingredient key={`${type}-${index}`} type={type} />
      ))
    );
  };

  return (
    <>
      <div className="burgerIngredients">
        <div className="topSide"></div>
        {renderIngredients()}
        <div className="bottomSide"></div>
      </div>
      {ingredientTypes.map((type) => (
        <IngredientControl
          key={type}
          label={type}
          onAdd={() => addRemoveIngredient("add", type)}
          onRemove={() => addRemoveIngredient("remove", type)}
        />
      ))}
    </>
  );
};

export default Burger;
