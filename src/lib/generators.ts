function* DelayGenerator() {
  let test = 1;
  while (true) {
    yield test;
    test += 0.25;
  }
}
