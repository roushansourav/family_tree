const myFamily = require('./myFamily');

function main(err, data) {
  if (err) throw err;

  let inputs = data.split('\n').map(l => l.replace('\r', ''));
  inputs.map((input) => {
    let inputArr = input.split(' ');
    switch (inputArr[0]) {
      case 'ADD_CHILD':
        let motherName = inputArr[1];
        let childName = inputArr[2]
        let gender = inputArr[3];
        let status = myFamily.addChild(motherName, childName, gender);
        myFamily.output(status);
        break;
      case 'GET_RELATIONSHIP':
        let pName = inputArr[1];
        let relationship = inputArr[2];
        switch (relationship) {
          case 'Paternal-Uncle':
            myFamily.output(myFamily.getUncles(pName, 'paternal'));
            break;
          case 'Maternal-Uncle':
            myFamily.output(myFamily.getUncles(pName, 'maternal'));
            break;
          case 'Paternal-Aunt':
            myFamily.output(myFamily.getAunties(pName, 'paternal'));
            break;
          case 'Maternal-Aunt':
            myFamily.output(myFamily.getAunties(pName, 'maternal'));
            break;
          case 'Sister-In-Law':
            myFamily.output(myFamily.getInLaws(pName, 'sister'));
            break;
          case 'Brother-In-Law':
            myFamily.output(myFamily.getInLaws(pName, 'brother'));
            break;
          case 'Son':
            myFamily.output(myFamily.getChildrenByKey(pName, 'son'));
            break;
          case 'Daughter':
            myFamily.output(myFamily.getChildrenByKey(pName, 'daughter'));
            break;
          case 'Siblings':
            myFamily.output(myFamily.getSiblings(pName));
            break;
          default:
            myFamily.output('NONE',null,null);
            break;
        }
        break;
      default:
        myFamily.output('Input Error',null,null);
        break;
    }
  })
}

module.exports = main;
