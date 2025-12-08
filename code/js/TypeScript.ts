export { myAdd1 }

let myAdd1 = function(x: number, y: number): number { return  x + y; };

// The parameters 'x' and 'y' have the type number
const myAdd2: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };


/*
    -------    Optional and Default Parameters    -------
*/
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

// let result = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result1 = buildName("Bob");                  // works
let result2 = buildName("Bob", "Adams");         // works




function buildName2(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
let result3 = buildName("Bob", "Adams");         // ah, just right
// let result4 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters


/*
buildName3 & buildName4 share the same type
(firstName: string, lastName?: string) => string
*/
function buildName3(firstName: string, lastName?: string) {}
function buildName4(firstName: string, lastName = "Smith") {}

/*
    -------    Rest Parameters    -------
*/
let muFunc: (fname: string, ...rest: string[]) => string =
    function(firstName: string, ...restOfName: string[]) {
        return firstName + " " + restOfName.join(" ");
    }

// employeeName will be "Joseph Samuel Lucas MacKinzie"
let employeeName = muFunc("Joseph", "Samuel", "Lucas", "MacKinzie");

/*
    -------    Overloads    -------
*/
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];

let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);



/*
    -------    Global Variables & functions    -------
    https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html#global-variables
*/

declare var   foo: number;
declare const foo2: number;    // if variable is read-only
declare let   foo3: number;    // if variable is block-scoped

declare function greet(greeting: string): void;

/*
The global variable myLib has a function makeGreeting for creating greetings, and a property numberOfGreetings indicating the number of greetings made so far.
*/
// Code:
let result = myLib.makeGreeting("hello, world");
console.log("The computed greeting is:" + result);

// Declaration:
let count = myLib.numberOfGreetings;
declare namespace myLib {
    function makeGreeting(s: string): string;
    let numberOfGreetings: number;
}

/*      Overloaded Functions        */
// Code
let x: Widget = getWidget(43);

let arr: Widget[] = getWidget("all of them");

// Declaration
interface Widget {}
declare function getWidget(n: number): Widget;
declare function getWidget(s: string): Widget[];


/*      Reusable Types (Interfaces)     */

// Code
greet({
    greeting: "hello world",
    duration: 4000
});

// Use an interface to define a type with properties.

interface GreetingSettings {
    greeting: string;
    duration?: number;
    color?: string;
}

declare function greet(setting: GreetingSettings): void;


/*      Reusable Types (Type Aliases)

Anywhere a greeting is expected, you can provide a string, a function returning a string, or a Greeter instance.
*/

// Code
class Greeter {
    constructor (greeting) {}
}

function getGreeting() {
    return "howdy";
}
class MyGreeter extends Greeter { }

greet("hello");
greet(getGreeting);
greet(new MyGreeter("hello"));

// You can use a type alias to make a shorthand for a type:

type GreetingLike = string | (() => string) | MyGreeter;

declare function greet(g: GreetingLike): void;


/*      Organizing Types

The greeter object can log to a file or display an alert.
You can provide LogOptions to .log(...) and alert options to .alert(...)
*/

interface GreeterWithLog {
    log: GreetingLib.Options.Log;
    alert: GreetingLib.Options.Alert;
}
const GreeterWithLog = msg => {}

// Code
const g = new GreeterWithLog("Hello");
g.log({ verbose: true });
g.alert({ modal: false, title: "Current Greeting" });

// Use namespaces to organize types.

declare namespace GreetingLib {
    interface LogOptions {
        verbose?: boolean;
    }
    interface AlertOptions {
        modal: boolean;
        title?: string;
        color?: string;
    }
}

// You can also create nested namespaces in one declaration:

declare namespace GreetingLib.Options {
    // Refer to via GreetingLib.Options.Log
    interface Log {
        verbose?: boolean;
    }
    interface Alert {
        modal: boolean;
        title?: string;
        color?: string;
    }
}

/*      Classes

You can create a greeter by instantiating the Greeter object, or create a customized greeter by extending from it.
*/

const myGreeter = new LaGreeter("hello, world");
myGreeter.greeting = "howdy";
myGreeter.showGreeting();

class SpecialGreeter extends Greeter {
    constructor() {
        super("Very special greetings");
    }
}

/*
Use declare class to describe a class or class-like object. Classes can have properties and methods as well as a constructor.
*/
declare class LaGreeter {
    constructor(greeting: string);

    greeting: string;
    showGreeting(): void;
}
