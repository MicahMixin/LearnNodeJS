const { add } = require("../src/math");

test("Chnir", () => {});

test("Async test demo", (done) => {
  setTimeout(() => {
    expect(1).toBe(1);
    done();
  }, 2000);
});

test("Should add two numbers", (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

test("should add two number async", async () => {
  const sum = await add(10, 15);
  expect(sum).toBe(25);
});
