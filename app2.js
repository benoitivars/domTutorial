const mainHeading = document.getElementById("main-heading");
mainHeading.classList.add("goodbye");
mainHeading.classList.add("yo");
mainHeading.classList.add("wesh");
console.log(mainHeading.classList);
mainHeading.className = "one two three";
console.log(mainHeading.classList);
mainHeading.classList.remove("two");
console.log(mainHeading.classList);


console.log(mainHeading.classList.contains("one"));


console.log(mainHeading.classList.contains("two"));

mainHeading.classList.toggle("two");
console.log(mainHeading.classList);

mainHeading.classList.toggle("three");
console.log(mainHeading.classList);