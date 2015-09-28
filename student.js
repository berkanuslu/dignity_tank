function Student(firstName, subject) {
  Person.call(this, firstName);
    
  this.subject = subject;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.sayHello = function(){
  console.log("Hello, I'm " + this.firstName + ". I'm developing "+ this.subject + ".");
};

Student.prototype.sayGoodBye = function(){
  console.log("Goodbye!");
};
