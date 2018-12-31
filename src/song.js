function compile(source) {
  return source
    .split(/\s/)
    .filter(Boolean)
    .map(s => s.toLowerCase())
    .map(toBytecode);
}

function toBytecode(s) {
  const colorMap = {
    y: "yellow",
    r: "red",
    g: "green",
    b: "blue"
  };
  const delay = Number(s);
  if (!isNaN(delay)) {
    return { op: "delay", arg: delay };
  }
  const op = s[1] === "1" ? "on" : s[1] === "0" ? "off" : null;
  const color = colorMap[s[0]];
  if (!op || !color) {
    return null;
  }
  return { op, arg: color };
}
