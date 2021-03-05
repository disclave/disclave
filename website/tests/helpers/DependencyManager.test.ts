import {DependencyManager} from "../../helpers/DependencyManager";

interface TestInterface {
  val: string
}

class TestClassA implements TestInterface {
  val: string
  constructor() {
    this.val = 'A'
  }
}

class TestClassB implements TestInterface {
  val: string
  constructor() {
    this.val = 'B'
  }
}

test('should allow to manipulate instances', () => {
  const classA = new TestClassA()
  const classB = new TestClassB()

  const manager = new DependencyManager<TestInterface>(classA)
  expect(manager.get()).toEqual(classA)

  manager.set(classB)
  expect(manager.get()).toEqual(classB)

  manager.reset()
  expect(manager.get()).toEqual(classA)
})
