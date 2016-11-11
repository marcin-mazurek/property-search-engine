const polishCharsMap = {
  'ą': 'a',
  'ć': 'c',
  'ę': 'e',
  'ó': 'o',
  'ł': 'l',
  'ś': 's',
  'ń': 'n',
  'ż': 'z',
  'ź': 'z'
};

export default function slugify(input: string): string {
  input = input.toLowerCase();

  for (let char in polishCharsMap) {
    input = input.replace(char, polishCharsMap[char]);
  }

  return input.replace(' ', '-')
    .replace(/[^a-z0-9-]+/g, '');
}