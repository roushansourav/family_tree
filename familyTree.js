const Member = require("./member");
/**
 * FamilyTree Contructor
 * @param {String} father 
 * @param {String} mother
 * Fields:
 * 1. members : hashmap to store family members in form of key & value, where key is member name & value is Member object
 * 2. total_member : count of members in FamilyTree 
 * 
 * Methods:
 * 1. add() : To add a new member in family tree.
 * 2. getUncles() : To get maternal or paternal uncle.
 * 3. getAunties() : To get matrnal or paternal aunties.
 * 4. getChildren() : To get children.
 * 5. getSiblings() : To get siblings
 */
function FamilyTree(father, mother) {
  
  this.members = {
    [father]: new Member(father, "Male"),
    [mother]: new Member(mother, "Female"),
  };
  this.members[father].spouse=this.members[mother];
  this.members[mother].spouse=this.members[father];
  this.members[father].children=this.members[mother].children;
  this.total_member = 2;

  /**
   * To add the member to the family
   * @param {String} mother_name 
   * @param {String} name 
   * @param {String} gender 
   * @param {String} spouse
   * @returns {Object} {msg:String} msg can be['CHILD_ADDITION_FAILED','PERSON_NOT_FOUND']
   */
  this.add = (mother_name, name, gender, spouse) => {
    if(!this.members[mother_name]) return {msg:'PERSON_NOT_FOUND'};
    if(this.members[mother_name].gender !=='Female') return {msg:'CHILD_ADDITION_FAILED'};
    this.total_member++;
    this.members[name] = new Member(name, gender);
    this.members[name].parents.push(this.members[mother_name]);
    this.members[name].parents.push(this.members[mother_name].spouse)
    this.members[mother_name].children.push(this.members[name]);
    if (spouse) {
      if(!this.members[spouse]){
        this.total_member++;
        this.members[spouse]=new Member(spouse,gender=gender==='Male'?'Female':'Male');
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

  /**
   * To get maternal or paternal uncle.
   * @param {String} name : Name of member for whom uncles has to find.
   * @param {string} key : key can be either maternal or paternal.
   * @return {object} {err:string or null,data: 'array of names of uncle' or null}
   */
  this.getUncles=(name,key)=>{
    if(!this.members[name]) return {err:'PERSON_NOT_FOUND',data:null};
    let data;
    switch(key){
      case 'maternal':
        let mom=this.members[name].parents.filter(p=>p.gender==='Female')[0];
        if(!mom) return {err:'NONE',data:null};
        let maternal_grandmother=this.members[mom.name].parents.filter(p=>p.gender==='Female')[0];
        if(!maternal_grandmother) return {err:'NONE',data:null};
        data= maternal_grandmother.children.filter(u=>u.gender==='Male');
        return data.length?{err:null,data}:{err:'NONE',data:null};
      case 'paternal':
        let dad=this.members[name].parents.filter(p=>p.gender==='Male')[0];
        if(!dad) return {err:'NONE',data:null};
        let paternal_grandmother=this.members[dad.name].parents.filter(p=>p.gender==='Female')[0];
        if(!paternal_grandmother) return [];
        data= paternal_grandmother.children.filter(u=>u.gender==='Male').filter(u=>u.name!==dad.name);
        return data.length?{err:null,data}:{err:'NONE',data:null};
      default:
        return {err:'NONE',data:null};
    }    
  }
  /**
   * To get maternal or paternal aunties.
   * @param {String} name : Name of member for whom aunties has to find.
   * @param {string} key : key can be either maternal or paternal.
   * @return {object} {err:string or null,data: 'array of names of aunties' or null}
   */
  this.getAunties=(name,key)=>{
    if(!this.members[name]) return {err:'PERSON_NOT_FOUND',data:null};
    let data;
    switch(key){
      case 'maternal':
        let mom=this.members[name].parents.filter(p=>p.gender==='Female')[0];
        if(!mom) return {err:'NONE',data:null};
        let maternal_grandmother=this.members[mom.name].parents.filter(p=>p.gender==='Female')[0];
        if(!maternal_grandmother) return {err:'NONE',data:null};
        data=maternal_grandmother.children.filter(u=>u.gender==='Female').filter(a=>a.name!==mom.name)
        return data.length?{err:null,data}:{err:'NONE',data:null};
      case 'paternal':
        let dad=this.members[name].parents.filter(p=>p.gender==='Male')[0];
        if(!dad) return {err:'NONE',data:null};
        let paternal_grandmother=this.members[dad.name].parents.filter(p=>p.gender==='Female')[0];
        if(!paternal_grandmother) return {err:'NONE',data:null};
        data = paternal_grandmother.children.filter(u=>u.gender==='Female');
        return data.length?{err:null,data}:{err:'NONE',data:null};
      default:
        return {err:'NONE',data:null};
    }
  }
  /**
   * To get son or daughter.
   * @param {String} name : Name of member for whom children has to find.
   * @param {string} key : key can be either son or daughter.
   * @return {object} {err:string or null,data: 'array of names of son or daughter' or null}
   */
  this.getChildren=(name,key)=>{
    let data;
    if(!this.members[name]) return {err:'PERSON_NOT_FOUND',data:null};
    switch(key){
      case 'son':
        data = this.members[name].children.filter(c=>c.gender==='Male');
        return data.length?{err:null,data}:{err:'NONE',data:null};
      case 'daughter':
        data = this.members[name].children.filter(c=>c.gender==='Female');
        return data.length?{err:null,data}:{err:'NONE',data:null};
        default:
          return {err:'NONE',data:null};
    }
  }
  /**
   * To get siblings.
   * @param {String} name : Name of member for whom uncles has to find..
   * @return {object} {err:string or null,data: 'array of names of siblings' or null}
   */
  this.getSiblings=(name)=>{
    if(!this.members[name]) return {err:'PERSON_NOT_FOUND',data:null};
    if(!this.members[name].parents.length){
      return {err:'NONE',data:null};
    }
    let data = (this.members[name].parents.filter(p=>p.gender==='Female'))[0].children.filter(c=>c.name!==name);
    return data.length?{err:null,data}:{err:'NONE',data:null};
  }

  /**
   * To get In-Laws bro & sis.
   * @param {String} name : Name of member for whom in-laws has to find.
   * @param {string} key : key can be either brother or sister.
   * @return {object} {err:string or null,data: 'array of names of in-laws' or null}
   */
  this.getInLaws=(name,key)=>{
    if(!this.members[name]) return {err:'PERSON_NOT_FOUND',data:null};
    let data=null,
    spouse=this.members[name].spouse,
    siblings=this.getSiblings(name),
    spouse_mom=spouse?spouse.parents.filter(p=>p.gender==='Female')[0]:spouse;
    siblings=siblings.err?[]:siblings.data;
    if(!spouse && siblings.err) return {err:'NONE',data:null};
    switch(key){      
      case 'sister':        
        siblings=siblings.filter((s=>s.gender==='Male'));
        if(!spouse_mom && !siblings.length) return {err:'NONE',data:null};
        data=siblings.length?siblings.map(s=>s.spouse):[];
        let spouse_sis=spouse_mom?this.members[spouse_mom.name].children.filter(s=>s.gender==='Female' && s.name !==spouse.name):[];
        data=spouse_sis.length?[...data,...spouse_sis]:data;
        return data && data.length?{err:null,data}:{err:'NONE',data:null};
        break;
      case 'brother':
        siblings=siblings.filter((s=>s.gender==='Female'));
        if(!spouse_mom && !siblings.length) return {err:'NONE',data:null};
        data=siblings.length?siblings.map(s=>s.spouse):[];
        let spouse_bro=spouse_mom?this.members[spouse_mom.name].children.filter(s=>s.gender==='Male' && s.name !==spouse.name):[];
        data=spouse_bro.length?[...data,...spouse_bro]:data;
        return data.length?{err:null,data}:{err:'NONE',data:null};
        break;
    }
  }
  this.output=(obj)=>{
    let {err,data}=obj;
    if(err){
      console.log(err);
    }
    else{
      data=data.filter(d=>d);
      console.log(data.map(d=>d.name).join(' '));
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

