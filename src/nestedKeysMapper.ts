function GenerateValueFromKey(o: any, s: string): any {
  s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  s = s.replace(/^\./, ""); // strip a leading dot
  const a = s.split(".");
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }

  return o;
}

const data = {
  person: {
    name: "John",
    age: 30,
    education: {
      school: {
        name: "School A",
      },
    },
  },
};

console.log(GenerateValueFromKey(data, "person.education.school.name")); // School A
