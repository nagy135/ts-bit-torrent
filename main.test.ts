import { test, expect } from "bun:test";
import { bencode_decode } from "./main";

test("bencode_decode string", () => {
  const result = bencode_decode("5:hello");
  expect(result).toBe("hello");
});

test("bencode_decode int", () => {
  const result = bencode_decode("i32e");
  expect(result).toBe(32);

  const result2 = bencode_decode("i-32e");
  expect(result2).toBe(-32);
});

test("bencode_decode list", () => {
  const result = bencode_decode("li32e3:lole");
  expect(result).toMatchObject([32, "lol"]);
});

test("bencode_decode dict", () => {
  const result = bencode_decode("d3:loli32ee");
  expect(result).toMatchObject({
    lol: 32,
  });

  const result2 = bencode_decode("d3:loli32e4:hahal4:lole3:yesee");
  expect(result2).toMatchObject({
    lol: 32,
    haha: ["lole", "yes"],
  });

  const result3 = bencode_decode(
    "d4:nestd1:ai33ee3:loli32e4:hahal3:lol3:yesee",
  );
  expect(result3).toMatchObject({
    nest: {
      a: 33,
    },
    lol: 32,
    haha: ["lol", "yes"],
  });
});
