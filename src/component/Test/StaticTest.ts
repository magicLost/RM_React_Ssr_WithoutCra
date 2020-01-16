
class StaticTest {

    constructor(){
        console.log("StaticTest constructor");
    }

    hello = () => "hello";

    static getHello(): string { return "Static Hello";}

}

export default StaticTest;