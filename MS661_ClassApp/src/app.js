/**
 * Class App Week 2 
 * MS 661
 * Bill Beemer
 */
 
 var object = {
 	name: 'Steve',
 	age: 25
 };
 	
 class Person {
 	name;
 	age;
 		
 	constructor(name, age) {
 		this.name = name;
 		this.age = age;
 	}
 	
 	getRetire() {
 		return this.age > 62
 	}
 }
 
 console.log(object);
 console.log(object.getRetire);
 console.log(new Person('Bob', 65));
 console.log(new Person('Bob', 65).getRetire));
 
 		