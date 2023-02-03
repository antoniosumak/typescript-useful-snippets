export type Config = {
  [key: string]: string | string[] | number | number[];
};

function GenerateUrl({ path, config, prefixPath }: { path: string; config?: Config; prefixPath?: string }) {
  const url = new URL(`${prefixPath}${path}`, process.env.VUE_APP_BASE_URL);

  if (!config) {
    return url.toString();
  }

  Object.entries(config).forEach((config: [string, string | number | string[] | number[]]) => {
    if (Array.isArray(config[1])) {
      config[1].forEach((value: string | number) => {
        url.searchParams.append(String(config[0]), String(value));
      });
    } else {
      url.searchParams.append(String(config[0]), String(config[1]));
    }
  });

  return url.toString();
}

const url = GenerateUrl({
  path: "/api/test",
  prefixPath: "/platform/management/v1",
  config: {
    "PageSize": 1000,
    "PageNumber": 1,
    "Include": ["a", "b", "c"],
  },
});

//Example output:
//http://example.url.com/platform/management/v1/api/test?PageSize=1000&PageNumber=1&Include=a&Include=b&Include=c
