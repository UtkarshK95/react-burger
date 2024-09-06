import React, { useState } from "react";
import "./BurgerStyle.css";

const Burger = () => {
  const [ingredients, setIngredients] = useState({
    lettuce: 0,
    tomato: 0,
    cheese: 0,
    meat: 0,
  });

  const addRemoveIngredient = (action, ingredient) => {
    const count = ingredients[ingredient];
    const updatedCount = action === "add" ? count + 1 : count - 1;
    setIngredients((prevIngredients) => ({
      ...prevIngredients,
      [ingredient]: updatedCount >= 0 ? updatedCount : 0,
    }));
  };

  const burgerContent = () => {
    const { lettuce, tomato, cheese, meat } = ingredients;
    let burger = [];

    // outputting the ingredients
    for (let i = 0; i < lettuce; i++) {
      burger.push(<div key={burger.length} className="lettuceSide"></div>);
    }
    for (let i = 0; i < tomato; i++) {
      burger.push(<div key={burger.length} className="tomatoSide"></div>);
    }
    for (let i = 0; i < cheese; i++) {
      burger.push(<div key={burger.length} className="cheeseSide"></div>);
    }
    for (let i = 0; i < meat; i++) {
      burger.push(<div key={burger.length} className="meatSide"></div>);
    }
    return burger;
  };

  return (
    <>
      <div className="burgerIngredients">
        <div className="topSide"></div>
        {burgerContent()}
        <div className="bottomSide"></div>
      </div>
      <div className="ingredientsBlock">
        <p>Lettuce</p>
        <div className="ingrBtns">
          <button
            className="ingrBtn"
            onClick={() => addRemoveIngredient("add", "lettuce")}
          >
            Add
          </button>
          <button
            className="ingrBtn"
            onClick={() => addRemoveIngredient("remove", "lettuce")}
          >
            Remove
          </button>
        </div>
        <p>TOMATO</p>
        <div className="ingrBtns">
          <button
            className="ingrBtn"
            onClick={() => addRemoveIngredient("add", "tomato")}
          >
            Add
          </button>
          <button
            className="ingrBtn"
            onClick={() => addRemoveIngredient("remove", "tomato")}
          >
            Remove
          </button>
        </div>
        <p>CHEESE</p>
        <div className="ingrBtns">
          <button
            className="ingrBtn"
            onClick={() => addRemoveIngredient("add", "cheese")}
          >
            Add
          </button>
          <button
            className="ingrBtn"
            onClick={() => addRemoveIngredient("remove", "cheese")}
          >
            Remove
          </button>
        </div>
        <p>MEAT</p>
        <div className="ingrBtns">
          <button
            className="ingrBtn"
            onClick={() => addRemoveIngredient("add", "meat")}
          >
            Add
          </button>
          <button
            className="ingrBtn"
            onClick={() => addRemoveIngredient("remove", "meat")}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
};

export default Burger;
