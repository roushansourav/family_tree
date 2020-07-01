const FamilyTree = require("./familyTree");

function main(err, data) {
  if (err) throw err;
  // family tree population
  let myFamily = new FamilyTree("King Shah", "Queen Anga");
  myFamily.add("Queen Anga", "Chit", "Male", "Amba");
  myFamily.add("Queen Anga", "Ish", "Male");
  myFamily.add("Queen Anga", "Vich", "Male", "Lika");
  myFamily.add("Queen Anga", "Aras", "Male", "Chitra");
  myFamily.add("Queen Anga", "Satya", "Female", "Vyan");
  myFamily.add("Amba", "Dritha", "Female", "Jaya");
  myFamily.add("Amba", "Tritha", "Female");
  myFamily.add("Amba", "Vritha", "Male");
  myFamily.add("Lika", "Vila", "Female");
  myFamily.add("Lika", "Chika", "Female");
  myFamily.add("Chitra", "Jnki", "Female", 'Arit');
  myFamily.add("Chitra", "Ahit", "Male");
  myFamily.add("Satya", "Asva", "Male", 'Satvy');
  myFamily.add("Satya", "Vyas", "Male", 'Krpi');
  myFamily.add("Satya", "Atya", "Female");
  myFamily.add("Jaya", "Yodhan", "Male");
  myFamily.add("Jnki", "Laki", "Male");
  myFamily.add("Jnki", "Lavnya", "Female");
  myFamily.add("Satvy", "Vasa", "Male");
  myFamily.add("Krpi", "Kriya", "Male");
  myFamily.add("Krpi", "Krithi", "Female");

  let inputs = data.split('\n').map(l => l.replace('\r', ''));
  console.log(inputs);
  inputs.map((input) => {
    let inputArr = input.split(' ');
    switch (inputArr[0]) {
      case 'ADD_CHILD':
        let mother_name = inputArr[1];
        let name = inputArr[2]
        let gender = inputArr[3];
        let add_status = myFamily.add(mother_name, name, gender);
        console.log(add_status ? 'CHILD_ADDITION_SUCCEEDED' : 'CHILD_ADDITION_FAILED')
        break;
      case 'GET_RELATIONSHIP':
        let pname = inputArr[1];
        let relationship = inputArr[2];
        switch (relationship) {
          case 'Paternal-Uncle':
            let p_uncles = myFamily.getUncles(pname, 'paternal');
            console.log(p_uncles.err ? p_uncles.err : p_uncles.data.join(' '));
            break;
          case 'Maternal-Uncle':
            let m_uncles = myFamily.getUncles(pname, 'maternal');
            console.log(m_uncles.err ? m_uncles.err : m_uncles.data.join(' '));
            break;
          case 'Paternal-Aunt':
            let p_aunties = myFamily.getAunties(pname, 'paternal');
            console.log(p_aunties.err ? p_aunties.err : p_aunties.data.join(' '));
            break;
          case 'Maternal-Aunt':
            let m_aunties = myFamily.getAunties(pname, 'maternal');
            console.log(m_aunties.err ? m_aunties.err : m_aunties.data.join(' '));
            break;
          case 'Sister-In-Law':
            let sis_in_laws = myFamily.getInLaws(pname, 'sister');
            console.log(sis_in_laws.err ? sis_in_laws.err : sis_in_laws.data.join(' '));
            break;
          case 'Brother-In-Law':
            let bro_in_laws = myFamily.getInLaws(pname, 'brother');
            console.log(bro_in_laws.err ? bro_in_laws.err : bro_in_laws.data.join(' '));
            break;
          case 'Son':
            let sons = myFamily.getChildren(pname, 'son');
            console.log(sons.err ? sons.err : sons.data.join(' '));
            break;
          case 'Daughter':
            let daughters = myFamily.getChildren(pname, 'daughter');
            console.log(daughters.err ? daughters.err : daughters.data.join(' '));
            break;
          case 'Siblings':
            let siblings = myFamily.getSibling(pname);
            console.log(siblings.err ? siblings.err : siblings.data.join(' '));
            break;
          default:
            console.log('NONE');
            break;
        }
        break;
      default:
        console.log('Input Error');
        break;
    }
  })
}

module.exports = main;
