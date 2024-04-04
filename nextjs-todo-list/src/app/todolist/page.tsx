"use client";
import Image from "next/image";
import React, { useState } from "react";
import Head from "next/head";

interface TodoItem {
  id: number;
  type: "Fruit" | "Vegetable"; // Define the possible values for the 'type' property
  name: string;
}

export default function TodoList() {
  const initialTodoItems: TodoItem[] = [
    { id: 1, type: "Fruit", name: "Apple" },
    { id: 2, type: "Vegetable", name: "Broccoli" },
    { id: 3, type: "Vegetable", name: "Mushroom" },
    { id: 4, type: "Fruit", name: "Banana" },
    { id: 5, type: "Vegetable", name: "Tomato" },
    { id: 6, type: "Fruit", name: "Orange" },
    { id: 7, type: "Fruit", name: "Mango" },
    { id: 8, type: "Fruit", name: "Pineapple" },
    { id: 9, type: "Vegetable", name: "Cucumber" },
    { id: 10, type: "Fruit", name: "Watermelon" },
    { id: 11, type: "Vegetable", name: "Carrot" },
  ];

  const [todoItems, setTodoItems] = useState<TodoItem[]>(initialTodoItems);
  const [fruitItems, setFruitItems] = useState<TodoItem[]>([]);
  const [vegetableItems, setVegetableItems] = useState<TodoItem[]>([]);

  console.log();
  const moveItem = (item: TodoItem, type: "Fruit" | "Vegetable") => {
    if (type === "Fruit") {
      setFruitItems((prevItems) => [...prevItems, item]);
      setTimeout(() => {
        setFruitItems((prevItems) =>
          prevItems.filter((fruitItem) => fruitItem.id !== item.id)
        );
        setTodoItems((prevItems) =>
          [...prevItems, item].sort((a, b) => a.id - b.id)
        );
        const uniqueArray = Array.from(new Set(todoItems));
        setTodoItems(uniqueArray);
      }, 5000);
    } else {
      setVegetableItems((prevItems) => [...prevItems, item]);
      setTimeout(() => {
        setVegetableItems((prevItems) =>
          prevItems.filter((vegetableItem) => vegetableItem.id !== item.id)
        );
        setTodoItems((prevItems) =>
          [...prevItems, item].sort((a, b) => a.id - b.id)
        );
        const uniqueArray = Array.from(new Set(todoItems));
        setTodoItems(uniqueArray);
      }, 5000);
    }
    setTodoItems((prevItems) =>
      prevItems
        .filter((todoItem) => todoItem.id !== item.id)
        .sort((a, b) => a.id - b.id)
    );
  };

  const moveToTodo = (item: TodoItem) => {
    setTodoItems((prevItems) =>
      [...prevItems, item].sort((a, b) => a.id - b.id)
    );
    if (fruitItems.some((fruitItem) => fruitItem.id === item.id)) {
      setFruitItems((prevItems) =>
        prevItems.filter((fruitItem) => fruitItem.id !== item.id)
      );
    }
    if (vegetableItems.some((vegetableItem) => vegetableItem.id === item.id)) {
      setVegetableItems((prevItems) =>
        prevItems.filter((vegetableItem) => vegetableItem.id !== item.id)
      );
    }
    console.log(item.id);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-5 mx-auto bg-white">
      <div className="flex">
        <Head>
          <title>Auto Delete Todo List</title>
          <meta name="description" content="Auto Delete Todo List" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="grid grid-cols-3 gap-4">
          <div className="">
            <h2 className="text-center mb-5">Main List</h2>
            <div className="flex flex-col gap-2">
              {todoItems.map((item) => (
                <button
                  className="py-5 px-20 border border-gray-900"
                  key={item.id}
                  onClick={() => moveItem(item, item.type)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          <div className="">
            <h2 className="text-center mb-5">Fruit</h2>
            <div className="flex flex-col gap-2">
              {fruitItems.map((item) => (
                <button
                  className="p-5 border border-gray-900"
                  key={item.id}
                  onClick={() => moveToTodo(item)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          <div className="">
            <h2 className="text-center mb-5">Vegetable</h2>
            <div className="flex flex-col gap-2">
              {vegetableItems.map((item) => (
                <button
                  className="p-5 border border-gray-900"
                  key={item.id}
                  onClick={() => moveToTodo(item)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
