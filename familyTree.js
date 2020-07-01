const Person = require("./person");

function FamilyTree(father, mother) {
  
  this.members = {
    [father]: new Person(father, "Male"),
    [mother]: new Person(mother, "Female"),
  };
  this.members[father].spouse=this.members[mother];
  this.members[mother].spouse=this.members[father];
  this.members[father].children=this.members[mother].children;
  this.total_member = 2;

  this.add = (mother_name, name, gender, spouse) => {
    if(!this.members[mother_name]) return {msg:'PERSON_NOT_FOUND'};
    if(this.members[mother_name].gender !=='Female') return {msg:'CHILD_ADDITION_FAILED'};
    this.total_member++;
    this.members[name] = new Person(name, gender);
    this.members[name].parents.push(this.members[mother_name]);
    this.members[name].parents.push(this.members[mother_name].spouse)
    this.members[mother_name].children.push(this.members[name]);
    if (spouse) {
      if(!this.members[spouse]){
        this.total_member++;
        this.members[spouse]=new Person(spouse,gender=gender==='Male'?'Female':'Male');
        this.members[spouse].spouse=this.members[name];
      }
      else{
        this.members[spouse].spouse=this.members[name];
      }
      if (gender === "Male") {
        this.members[spouse].children = this.members[name].children;
      }
      this.members[name].spouse=this.members[spouse];
    }
    return {msg:'CHILD_ADDITION_SUCCEEDED'};
  };

  this.getUncles=(name,key)=>{
    if(!this.members[name]) return {err:'PERSON_NOT_FOUND',data:null};
    let data;
    switch(key){
      case 'maternal':
        let mom=this.members[name].parents.filter(p=>p.gender==='Female')[0];
        if(!mom) return {err:'NONE',data:null};
        let maternal_grandmother=this.members[mom.name].parents.filter(p=>p.gender==='Female')[0];
        if(!maternal_grandmother) return {err:'NONE',data:null};
        data= maternal_grandmother.children.filter(u=>u.gender==='Male').map(u=>u.name);
        return data.length?{err:null,data}:{err:'NONE',data:null};
      case 'paternal':
        let dad=this.members[name].parents.filter(p=>p.gender==='Male')[0];
        if(!dad) return {err:'NONE',data:null};
        let paternal_grandmother=this.members[dad.name].parents.filter(p=>p.gender==='Female')[0];
        if(!paternal_grandmother) return [];
        data= paternal_grandmother.children.filter(u=>u.gender==='Male').map(u=>u.name).filter(u=>u!==dad.name);
        return data.length?{err:null,data}:{err:'NONE',data:null};
      default:
        return {err:'NONE',data:null};
    }    
  }
  this.getAunties=(name,key)=>{
    if(!this.members[name]) return {err:'PERSON_NOT_FOUND',data:null};
    let data;
    switch(key){
      case 'maternal':
        let mom=this.members[name].parents.filter(p=>p.gender==='Female')[0];
        if(!mom) return {err:'NONE',data:null};
        let maternal_grandmother=this.members[mom.name].parents.filter(p=>p.gender==='Female')[0];
        if(!maternal_grandmother) return {err:'NONE',data:null};
        data=maternal_grandmother.children.filter(u=>u.gender==='Female').map(a=>a.name).filter(a=>a!==mom.name)
        return data.length?{err:null,data}:{err:'NONE',data:null};
      case 'paternal':
        let dad=this.members[name].parents.filter(p=>p.gender==='Male')[0];
        if(!dad) return {err:'NONE',data:null};
        let paternal_grandmother=this.members[dad.name].parents.filter(p=>p.gender==='Female')[0];
        if(!paternal_grandmother) return {err:'NONE',data:null};
        data = paternal_grandmother.children.filter(u=>u.gender==='Female').map(a=>a.name);
        return data.length?{err:null,data}:{err:'NONE',data:null};
      default:
        return {err:'NONE',data:null};
    }
  }
  this.getChildren=(name,key)=>{
    let data;
    if(!this.members[name]) return {err:'PERSON_NOT_FOUND',data:null};
    switch(key){
      case 'son':
        data = this.members[name].children.filter(c=>c.gender==='Male').map(c=>c.name);
        return data.length?{err:null,data}:{err:'NONE',data:null};
      case 'daughter':
        data = this.members[name].children.filter(c=>c.gender==='Female').map(c=>c.name);
        return data.length?{err:null,data}:{err:'NONE',data:null};
        default:
          return {err:'NONE',data:null};
    }
  }
  this.getSiblings=(name)=>{
    if(!this.members[name]) return {err:'PERSON_NOT_FOUND',data:null};
    if(!this.members[name].parents.length){
      return {err:'NONE',data:null};
    }
    let data = (this.members[name].parents.filter(p=>p.gender==='Female'))[0].children.filter(c=>c.name!==name).map(c=>c.name);
    return data.length?{err:null,data}:{err:'NONE',data:null};
  }
  this.getInLaws=(name,key)=>{
    if(!this.members[name]) return {err:'PERSON_NOT_FOUND',data:null};
    let data=null,
    spouse=this.members[name].spouse,
    siblings=this.getSiblings(name),
    spouse_mom=spouse.parents.filter(p=>p.gender==='Female')[0];
    siblings=siblings.err?[]:sibling.data;
    if(!spouse && siblings.err) return {err:'NONE',data:null};
    switch(key){      
      case 'sister':        
        siblings=siblings.filter((s=>s.gender==='Male'));
        if(!spouse_mom && !siblings.length) return {err:'NONE',data:null};
        data=siblings.length?siblings.map(s=>s.spouse.name):[];
        let spouse_sis=spouse_mom?this.members[spouse_mom.name].children.filter(s=>s.gender==='Female').map(s=>s.name):[];
        data=spouse_sis.length?[...data,...spouse_sis]:data;
        return data.length?{err:null,data}:{err:'NONE',data:null};
        break;
      case 'brother':
        siblings=siblings.filter((s=>s.gender==='Female'));
        if(!spouse_mom && !siblings.length) return {err:'NONE',data:null};
        data=siblings.length?siblings.map(s=>s.spouse.name):[];
        let spouse_bro=this.members[spouse_mom.name].children.filter(s=>s.gender==='Male').map(s=>s.name);
        data=spouse_bro.length?[...data,...spouse_bro]:data;
        return data.length?{err:null,data}:{err:'NONE',data:null};
        break;
    }
  }
}

// let myFamily = new FamilyTree("King Shah", "Queen Anga");
// myFamily.add("Queen Anga", "Chit", "Male","Amba");
// myFamily.add("Queen Anga", "Ish", "Male");
// myFamily.add("Queen Anga", "Vich", "Male","Lika");
// myFamily.add("Queen Anga", "Aras", "Male","Chitra");
// myFamily.add("Queen Anga", "Satya", "Female","Vyan");
// myFamily.add("Amba", "Dritha", "Female","Jaya");
// myFamily.add("Amba", "Tritha", "Female");
// myFamily.add("Amba", "Vritha", "Male");
// myFamily.add("Lika", "Vila", "Female");
// myFamily.add("Lika", "Chika", "Female");
// myFamily.add("Chitra", "Jnki", "Female",'Arit');
// myFamily.add("Chitra", "Ahit", "Male");
// myFamily.add("Satya", "Asva", "Male",'Satvy');
// myFamily.add("Satya", "Vyas", "Male",'Krpi');
// myFamily.add("Satya", "Atya", "Female");
// myFamily.add("Jaya", "Yodhan", "Male");
// myFamily.add("Jnki", "Laki", "Male");
// myFamily.add("Jnki", "Lavnya", "Female");
// myFamily.add("Satvy", "Vasa", "Male");
// myFamily.add("Krpi", "Kriya", "Male");
// myFamily.add("Krpi", "Krithi", "Female");

// console.log(myFamily);
// console.log(myFamily.getSiblings('Ish'));
// console.log(myFamily.getSiblings('King Shah'));
// console.log(myFamily.getSiblings('Yodhan'));
// console.log(myFamily.getChildren('Yodhan','son'));
// console.log(myFamily.getChildren('Yodhan','daughter'));
// console.log(myFamily.getAunties('Yodhan','maternal'));
// console.log(myFamily.getAunties('Yodhan','paternal'));
// console.log(myFamily.getUncles('Yodhan','maternal'));
// console.log(myFamily.getUncles('Yodhan','paternal'));
// console.log(myFamily.getUncles('King Shah','maternal'));
// console.log(myFamily.getUncles('King Shah','paternal'));
// console.log(myFamily.getUncles('Queen Anga','maternal'));
// console.log(myFamily.getUncles('Queen Anga','paternal'));
// console.log(myFamily.getUncles('King','maternal'));
// console.log(myFamily.getUncles('King Sh','paternal'));

module.exports=FamilyTree;

