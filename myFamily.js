const FamilyTree = require("./familyTree");
const Member = require("./member");

// family tree instansiating
let myFamily = new FamilyTree();
// myFamily member population
let father=new Member('King Shah',"Male");
let mother=new Member('Queen Anga',"Female");
father.setSpouse(mother);
mother.setSpouse(father);
myFamily.addMemberToFamily(father);
myFamily.addMemberToFamily(mother);
myFamily.addChild("Queen Anga", "Chit", "Male", "Amba");
myFamily.addChild("Queen Anga", "Ish", "Male");
myFamily.addChild("Queen Anga", "Vich", "Male", "Lika");
myFamily.addChild("Queen Anga", "Aras", "Male", "Chitra");
myFamily.addChild("Queen Anga", "Satya", "Female", "Vyan");
myFamily.addChild("Amba", "Dritha", "Female", "Jaya");
myFamily.addChild("Amba", "Tritha", "Female");
myFamily.addChild("Amba", "Vritha", "Male");
myFamily.addChild("Lika", "Vila", "Female");
myFamily.addChild("Lika", "Chika", "Female");
myFamily.addChild("Chitra", "Jnki", "Female", 'Arit');
myFamily.addChild("Chitra", "Ahit", "Male");
myFamily.addChild("Satya", "Asva", "Male", 'Satvy');
myFamily.addChild("Satya", "Vyas", "Male", 'Krpi');
myFamily.addChild("Satya", "Atya", "Female");
myFamily.addChild("Dritha", "Yodhan", "Male");
myFamily.addChild("Jnki", "Laki", "Male");
myFamily.addChild("Jnki", "Lavnya", "Female");
myFamily.addChild("Satvy", "Vasa", "Male");
myFamily.addChild("Krpi", "Kriya", "Male");
myFamily.addChild("Krpi", "Krithi", "Female");

module.exports=myFamily;