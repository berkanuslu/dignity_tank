var Person = function(firstName) {
  this.firstName = firstName;
};

Person.prototype.develop = function(){
  console.log("I am developing!");
};

Person.prototype.sayHello = function(){
  console.log("Hello, I'm " + this.firstName);
};
