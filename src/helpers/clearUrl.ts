const clearUrl = (url: string) => {
  return url.replace(/\/+$/, '').replace(/(^\w+:|^)\/\//, '');
};

export default clearUrl;