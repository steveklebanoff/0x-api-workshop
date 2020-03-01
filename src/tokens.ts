export const getTokenAddress = (name: string): string => {
  switch (name) {
    case "WETH":
      return "0xd0a1e359811322d97991e03f863a0c30c2cf029c";
    case "REP":
      return "0x4e5cb5a0caca30d1ad27d8cd8200a907854fb518";
    case "MKR":
      return "0xaaf64bfcc32d0f15873a02163e7e500671a4ffcd";
    case "DAI":
      return "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa";
    default:
      throw new Error(`Cant find token address for ${name}`);
  }
};
