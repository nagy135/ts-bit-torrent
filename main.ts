type PossibleValues = string | number;
type Data = PossibleValues | Record<string, PossibleValues> | PossibleValues[];

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
    return [0, ""];
  } else if (str[0] == "d") {
    return [0, ""];
  } else {
    const charCount = Number(str[0]);
    const dataPart = str.split(":");
    const data = dataPart[1].slice(0, charCount);
    return [data, str.slice(charCount + 2)];
  }
};

function main() {
  // const args = process.argv.slice(2);
  const toProcess = "i32e";
  const processed = bencode_decode(toProcess);
  console.log(
    "================\n",
    "processed: ",
    processed,
    "\n================",
  );
}

main();
