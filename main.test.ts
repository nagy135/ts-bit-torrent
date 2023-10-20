import { test, expect } from "bun:test";
import { bencode_decode } from "./main";

test("bencode_decode string", () => {
  const result = bencode_decode("5:hello");
  expect(result).toBe("hello");
});
