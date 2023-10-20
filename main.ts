type PossibleValues = string | number;
type Data = PossibleValues | Record<string, PossibleValues> | PossibleValues[];

export const bencode_decode = (str: string): Data => {
  if (str[0] == "i") {
    return 0;
  } else if (str[0] == "l") {
    return 0;
  } else if (str[0] == "d") {
    return 0;
  } else {
    const charCount = Number(str[0]);
    const dataPart = str.split(":");
    const data = dataPart[1].slice(0, charCount);
    return data;
  }
};

function main() {
  // const args = process.argv.slice(2);
  const toProcess = "5:hello";
  const processed = bencode_decode(toProcess);
}

main();
