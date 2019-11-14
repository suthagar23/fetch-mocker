
const parseUrl = (url) => {
  const element = document.createElement('a');
  element.href = url;
  return {
    host: element.host,
    hostname: element.hostname,
    pathname: element.pathname,
    port: element.port,
    protocol: element.protocol,
    search: element.search,
    hash: element.hash,
    url,
    fullPathName: `${element.pathname}${element.search}`,
  };
};

module.exports = {
  parseUrl,
};
