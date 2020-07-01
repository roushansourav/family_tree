function Person(name,gender){
  this.name=name;
  this.spouse=null;
  this.gender=gender;
  this.children=[];
  this.parents=[];
}

module.exports= Person;