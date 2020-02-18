interface Person {
  name: string;
  age: number;
}

class People {
  constructor(private info: Person) {}
  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key];
  }
}

let person: Person = {
  name: 'mzy',
  age: 20
};
let me = new People(person);
console.log(me.getInfo('name'));

type PersonKeys = keyof Person;
const nameM: PersonKeys = 'name';
const ageM: PersonKeys = 'age';
