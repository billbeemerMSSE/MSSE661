/**
 * Class App Week 3 
 * MS 661
 * Bill Beemer
 */
 

 class Person {
 	name;
 	age;
 		
 	constructor(name, age) {
 		this.name = name;
 		this.age = age;
 	}
 	
 	getRetire() {
 		return this.age > 62;
 	}
 }
 
 var person1 = new Person('Steve', 25);
 var person2 = new Person('Bob', 65);
 
 console.log(person1);
 console.log(person1.getRetire.apply(person1));
 console.log(person2);
 console.log(person2.getRetire.apply(person2));
 
 		