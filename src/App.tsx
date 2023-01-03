import React from "react";
import logo from "./logo.svg";
import "./App.css";

//§ Процедурное программирование
//Изначально все программы писались с процедурным подходом.
const width = 5
const height = 10

const calcRectArea = (width, height) => {
    return width * height
}

calcRectArea(width, height)

//§ ОО программирование
/*
* У любого класса есть конструктор, это специальный метод, некоторый блок инструкций, который вызывает при создании объекта.
* Обычно это присваивание конкретных значений свойства путем передачи аргументов в конструктор.
*
* Чаще всего все свойства делают приватными, а для того, получать их или изменять создаются так называемые геттеры и сеттеры
*
* если не устанавливать модификаторы доступа, то умолчанию они устанавливаются как public, но хорошей практикой является указывать его явно
*
* */


//? Инкапсуляция (сокрытие, геттеры, сеттеры и модификаторы доступа)
class Rectangle {
    private _width
    private _height

    constructor(w, h) {
        this._width = w
        this._height = h
    }

    public get width() {
        return this._width
    }

    public set width(w) {
        if (w <= 0) {
            this._width = 1
        } else {
            this._width = w
        }

    }

    public get height() {
        return this._height
    }

    calcArea() {
        return this._width * this._height
    }
}


//? Наследование
class Person {
    private _firstname
    private _lastname
    private _age

    constructor(firstname, lastname, age) {
        this._firstname = firstname
        this._lastname = lastname
        this._age = age
    }

    //? полиморфизм

    public greeting() {
        console.log("Привет, я человек и меня зовут " + this._firstname)
    }

    public get fullName() {
        return this._firstname + " " + this._lastname
    }

    get firstname() {
        return this._firstname
    }

    get lastname() {
        return this._lastname
    }

    set firstname(firstname) {
        this._firstname = firstname
    }

    set lastname(lastname) {
        this._lastname = lastname
    }

    get age() {
        return this._age
    }

    set age(value) {
        if (value < 0) {
            this._age = 0
        } else {
            this._age = value
        }

    }
}


class Employee extends Person {
    private _inn
    private _number
    private _snils

    constructor(firstname, lastname, age, inn, number, snils) {
        super(firstname, lastname, age) // вызов конструктора родительского класса
        this._inn = inn
        this._number = number
        this._snils = snils
    }

    public greeting() {
        console.log("Привет, я работник и меня зовут " + this._firstname)
    }
}

class Developer extends Employee {
    private _level

    constructor(firstname, lastname, age, inn, number, snils, level) {
        super(firstname, lastname, age, inn, number, snils) // вызов конструктора родительского класса
        this._level = level
    }

    public greeting() {
        console.log("Привет, я разработчик и меня зовут " + this._firstname)
    }
}


//? Композиция и агрегация
class Engine {
    drive() {
        console.log("двигатель работает")
    }
}

class Wheel {
    drive() {
        console.log("колеса едут")
    }
}

class Freshener {

}

class Car {
    _engine: Engine
    _wheels: Wheel[] = []
    _freshener: Freshener

    constructor(freshener) {
        //агрегация - через параметр
        this._freshener = freshener
        //композиция - самое важное здесь, что все объекты создаются здесь внутри конструктора класса Car, они не создаются где-то вне
        this._engine = new Engine()
        this._wheels.push(new Wheel())
        this._wheels.push(new Wheel())
        this._wheels.push(new Wheel())
        this._wheels.push(new Wheel())
    }

    //делегирование
    drive() {
        this._engine.drive()
        for (let i = 0; i < this._wheels.length; i++) {
            this._wheels[i].drive()
        }
    }
}

function App() {

    //?инкапсуляция
    const rect1 = new Rectangle(5, 10)
    const rect2 = new Rectangle(3, 2)
    console.log(rect1.calcArea(), rect2.calcArea())

    rect1.width = 7 // отработает сеттер
    console.log(rect1.calcArea())

    //?наследование
    const developer1 = new Developer("anton", "orlov", 31, 12, 13, 15, "middle")
    console.log(developer1)
    console.log(developer1.fullName)

    //?полиморфизм
    const person2 = new Person("Маша", "Орлова", 31)
    const employee2 = new Employee("Алексей", "Орлов", 29, 1, 2, 3)
    const developer2 = new Developer("Антон", "Орлов", 31, 1, 2, 3, "middle")

    person2.greeting()
    employee2.greeting()
    developer2.greeting()

    //применение полиморфизма
    const personList: Person[] = [person2, employee2, developer2] //явным образом не указываем, что помимо типа Person у нас в массиве находятся и другие наследуемы от Person типы.

    //функция работает с разными типами данных и для каждого типа вызывается свой метод greeting - такое поведение и называется полиморфизмом. У нас в массиве находятся 3 разных типа, но функция massGreeting работает с ними одинаково, но при этом когда вызывается соответствующий метод greeting логика в этом методе у разных типов разная. В этом и заключается смысл полиморфизма. То есть у нас много форм, но работаем мы с ними мы одинаково
    function massGreeting(persons: Person[]) {
        for (let i = 0; i < persons.length; i++) {
            const person = persons[i]
            person.greeting()
        }
    }

    massGreeting(personList)


    //? Композиция
    const car = new Car()
    console.log(car.drive())



    return (
        <div className="App">
        </div>
    );
}

export default App;
