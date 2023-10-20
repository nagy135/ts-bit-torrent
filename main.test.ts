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
