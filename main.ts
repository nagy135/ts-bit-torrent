// @ts-ignore
type Data = number | string | Record<string, Data> | Data[];

export const bencode_decode = (str: string): Data => {
  const [data, remainder] = bencode_decode_recurse(str);
  if (remainder) console.error(`remainder: "${remainder}"`);
  return data;
};
const bencode_decode_recurse = (str: string): [Data, string] => {
  if (str[0] == "i") {
    const ePosition = str.indexOf("e", 1);
    if (ePosition === -1) throw Error("missing number ending");
    return [Number(str.slice(1, ePosition)), str.slice(ePosition + 1)];
  } else if (str[0] == "l") {
    let innerListStr = str.slice(1);
    const values: Data = [];
    while (innerListStr[0] != "e") {
      const [data, remainder] = bencode_decode_recurse(innerListStr);
      values.push(data);
      innerListStr = remainder;
    }
    return [values, innerListStr.slice(1)];
  } else if (str[0] == "d") {
    let innerDictStr = str.slice(1);
    const dict: Data = {};
    while (innerDictStr[0] != "e") {
      const [key, remainder] = bencode_decode_recurse(innerDictStr);
      const [value, remainder2] = bencode_decode_recurse(remainder);

      if (typeof key !== "string") throw Error("key is not a string");
      dict[key] = value;
      innerDictStr = remainder2;
    }
    return [dict, innerDictStr.slice(1)];
  } else {
    const charCount = Number(str[0]);
    const dataPart = str.split(":");
    const data = dataPart[1].slice(0, charCount);
    return [data, str.slice(charCount + 2)];
  }
};

function main() {
  // const args = process.argv.slice(2);
  const toProcess = "d4:nestd1:ai33ee3:loli32e4:hahal3:lol3:yesee";
  const processed = bencode_decode(toProcess);
}

main();
