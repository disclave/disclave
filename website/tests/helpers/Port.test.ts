import {Port} from "../../helpers/Port";

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

  const port = new Port<TestInterface>(TestClassA)
  expect(port.get()).toBeInstanceOf(TestClassA)

  port.set(TestClassB)
  expect(port.get()).toBeInstanceOf(TestClassB)

  port.reset()
  expect(port.get()).toBeInstanceOf(TestClassA)
})
