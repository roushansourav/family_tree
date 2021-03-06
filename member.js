/**
 * Represent a member in family tree.
 * @constructor  
 */
function Member(name,gender){
  this.name=name;
  this.spouse=null;
  this.gender=gender;
  this.children=[];
  this.parents=[];

  /**
   * To add children 
   * @param {member} member 
   */
  this.addChildren=(member)=>{
    this.children.push(member);
  }

  /**
   * To add parents
   * @param {member} member 
   */
  this.addParent=(member)=>{
    this.parents.push(member);
  }

/**
 * To set children
 * @param {Object[]} children 
 */
  this.setChildren=(children)=>{
    this.children=children;
  }

  /**
   * To set spouse
   * @param {member} member 
   */
  this.setSpouse=(member)=>{
    this.spouse=member;
    member.children=this.getChildren();
  }

  /**
   * to get name
   */
  this.getName=()=>{
    return this.name;
  }
/**
 * to get spouse
 */
  this.getSpouse=()=>{
    return this.spouse;
  }
/**
 * to get gender
 */
  this.getGender=()=>{
    return this.gender;
  }
/**
 * to get children
 */
  this.getChildren=()=>{
    return this.children;
  }
/**
 * to get parents
 */
  this.getParents=()=>{
    return this.parents;
  }
/**
 * To check member is Female or not
 */
  this.isFemale=()=>{
    return this.gender==='Female';
  }

  /**
   * to check member is Male or not
   */
  this.isMale=()=>{
    return this.gender==='Male';
  }

}

module.exports= Member;