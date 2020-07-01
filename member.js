/**
 * //Member constructor
 * @param {String} name 
 * @param {String} gender
 * 
 * Fields:
 * 1. name {String} : name of family member.
 * 2. spouse {Member} : reference to member object, whose is spouse of this member.
 * 3. gender {String} : 'Male' or 'Female'
 * 4. children {Array of Member} : Array contains reference to all children member.
 * 5. parents {Array of Member} : Array contains reference to all parents member.
 */
function Member(name,gender){
  this.name=name;
  this.spouse=null;
  this.gender=gender;
  this.children=[];
  this.parents=[];
}

module.exports= Member;