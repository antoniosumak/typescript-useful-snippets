export type Config = {
  name: string;
  value: string | string[];
};

function generateURL({ path, config, prefixPath }: { path: string; config: Config[]; prefixPath: string }) {
  const url = new URL(`${prefixPath}${path}`, "http://example.url.com");
  config.forEach((param) => {
    if (Array.isArray(param.value)) {
      param.value.forEach((arrayValue) => {
        url.searchParams.append(param.name, arrayValue);
      });
    } else {
      url.searchParams.append(param.name, param.value);
    }
  });

  return url.toString();
}

const url = generateURL({
  path: "/api/test",
  prefixPath: "/platform/management/v1",
  config: [
    {
      name: "PageSize",
      value: "1000",
    },
    {
      name: "PageNumber",
      value: "1",
    },
    { name: "Include", value: ["a", "b", "c"] },
  ],
});

console.log(url);
