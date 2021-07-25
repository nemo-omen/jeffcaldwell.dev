var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// .svelte-kit/netlify/entry.js
__export(exports, {
  handler: () => handler
});

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.137_svelte@3.38.3/node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require("http"));
var import_https = __toModule(require("https"));
var import_zlib = __toModule(require("zlib"));
var import_stream = __toModule(require("stream"));
var import_util = __toModule(require("util"));
var import_crypto = __toModule(require("crypto"));
var import_url = __toModule(require("url"));
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var { Readable } = import_stream.default;
var wm = new WeakMap();
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
var Blob = class {
  constructor(blobParts = [], options2 = {}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let buffer;
      if (element instanceof Buffer) {
        buffer = element;
      } else if (ArrayBuffer.isView(element)) {
        buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
      } else if (element instanceof ArrayBuffer) {
        buffer = Buffer.from(element);
      } else if (element instanceof Blob) {
        buffer = element;
      } else {
        buffer = Buffer.from(typeof element === "string" ? element : String(element));
      }
      size += buffer.length || buffer.size || 0;
      return buffer;
    });
    const type = options2.type === void 0 ? "" : String(options2.type).toLowerCase();
    wm.set(this, {
      type: /[^\u0020-\u007E]/.test(type) ? "" : type,
      size,
      parts
    });
  }
  get size() {
    return wm.get(this).size;
  }
  get type() {
    return wm.get(this).type;
  }
  async text() {
    return Buffer.from(await this.arrayBuffer()).toString();
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of this.stream()) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    return Readable.from(read(wm.get(this).parts));
  }
  slice(start = 0, end = this.size, type = "") {
    const { size } = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = wm.get(this).parts.values();
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
        blobParts.push(chunk);
        added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
        relativeStart = 0;
        if (added >= span) {
          break;
        }
      }
    }
    const blob = new Blob([], { type: String(type).toLowerCase() });
    Object.assign(wm.get(blob), { size: span, parts: blobParts });
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
};
Object.defineProperties(Blob.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
});
var fetchBlob = Blob;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && object[NAME] === "AbortSignal";
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (import_util.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = import_stream.default.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_stream.default) {
      body.on("error", (err) => {
        const error2 = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
        this[INTERNALS$2].error = error2;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new fetchBlob([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true }
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    if (error2 instanceof FetchBaseError) {
      throw error2;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_stream.PassThrough({ highWaterMark });
    p2 = new import_stream.PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof import_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const { body } = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    body.stream().pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(err, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw err;
  }
};
var validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const err = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(err, "code", { value: "ERR_INVALID_CHAR" });
    throw err;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback) {
    for (const name of this.keys()) {
      callback(this.get(name), name);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = { enumerable: true };
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status || 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response(clone(this, this.highWaterMark), {
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response.prototype, {
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal !== null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return (0, import_url.format)(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = src(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error2) {
                reject(error2);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error2) => {
        reject(error2);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), (error2) => {
          reject(error2);
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error2) => {
          reject(error2);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), (error2) => {
              reject(error2);
            });
          } else {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), (error2) => {
              reject(error2);
            });
          }
          response = new Response(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), (error2) => {
          reject(error2);
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.137_svelte@3.38.3/node_modules/@sveltejs/kit/dist/adapter-utils.js
function isContentTypeTextual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.137_svelte@3.38.3/node_modules/@sveltejs/kit/dist/ssr.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
  options: options2,
  $session,
  page_config,
  status,
  error: error2,
  branch,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options2.get_stack(error2);
  }
  if (branch) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page && page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page && page.path)},
						query: new URLSearchParams(${page ? s$1(page.query.toString()) : ""}),
						params: ${page && s$1(page.params)}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options2.service_worker) {
    init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    let attributes = `type="application/json" data-type="svelte-data" data-url="${url}"`;
    if (body2)
      attributes += ` data-body="${hash(body2)}"`;
    return `<script ${attributes}>${json}<\/script>`;
  }).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize({ ...error2, name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
var absolute = /^([a-z]+:)?\/?\//;
function resolve(base, path) {
  const base_match = absolute.exec(base);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base}"`);
  }
  const baseparts = path_match ? [] : base.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  context,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  if (module2.load) {
    const load_input = {
      page,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        const resolved = resolve(request.path, url.split("?")[0]);
        let response;
        const filename = resolved.replace(options2.paths.assets, "").slice(1);
        const filename_html = `${filename}/index.html`;
        const asset = options2.manifest.assets.find((d2) => d2.file === filename || d2.file === filename_html);
        if (asset) {
          response = options2.read ? new Response(options2.read(asset.file), {
            headers: asset.type ? {
              "content-type": asset.type
            } : {}
          }) : await fetch(`http://${page.host}/${asset.file}`, opts);
        } else if (resolved.startsWith(options2.paths.base || "/")) {
          const relative = resolved.replace(options2.paths.base, "");
          const headers = { ...opts.headers };
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            headers.cookie = request.headers.cookie;
            if (!headers.authorization) {
              headers.authorization = request.headers.authorization;
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const search = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
          const rendered = await respond({
            host: request.host,
            method: opts.method || "GET",
            headers,
            path: relative,
            rawBody: opts.body,
            query: new URLSearchParams(search)
          }, options2, {
            fetched: url,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
          }
          if (typeof request.host !== "undefined") {
            const { hostname: fetch_hostname } = new URL(url);
            const [server_hostname] = request.host.split(":");
            if (`.${fetch_hostname}`.endsWith(`.${server_hostname}`) && opts.credentials !== "omit") {
              uses_credentials = true;
              opts.headers = {
                ...opts.headers,
                cookie: request.headers.cookie
              };
            }
          }
          const external_request = new Request(url, opts);
          response = await options2.hooks.serverFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: { ...context }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  if (!loaded) {
    throw new Error(`${node.entry} - load must return a value except for page fall through`);
  }
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function coalesce_to_error(err) {
  return err instanceof Error ? err : new Error(JSON.stringify(err));
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error2 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    context: {},
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      context: loaded ? loaded.context : {},
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error2,
      branch,
      page
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
async function respond$1({ request, options: options2, state, $session, route }) {
  const match = route.pattern.exec(request.path);
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => options2.load_component(id)));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  const page_config = {
    ssr: "ssr" in leaf ? !!leaf.ssr : options2.ssr,
    router: "router" in leaf ? !!leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options2.hydrate
  };
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: ""
    };
  }
  let branch;
  let status = 200;
  let error2;
  ssr:
    if (page_config.ssr) {
      let context = {};
      branch = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              request,
              options: options2,
              state,
              route,
              page,
              node,
              $session,
              context,
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              };
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            } else {
              branch.push(loaded);
            }
          } catch (err) {
            const e = coalesce_to_error(err);
            options2.handle_error(e);
            status = 500;
            error2 = e;
          }
          if (error2) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let error_loaded;
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  error_loaded = await load_node({
                    request,
                    options: options2,
                    state,
                    route,
                    page,
                    node: error_node,
                    $session,
                    context: node_loaded.context,
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (err) {
                  const e = coalesce_to_error(err);
                  options2.handle_error(e);
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            });
          }
        }
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      options: options2,
      $session,
      page_config,
      status,
      error: error2,
      branch: branch && branch.filter(Boolean),
      page
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
}
async function render_page(request, route, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const $session = await options2.hooks.getSession(request);
  if (route) {
    const response = await respond$1({
      request,
      options: options2,
      state,
      $session,
      route
    });
    if (response) {
      return response;
    }
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  } else {
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 404,
      error: new Error(`Not found: ${request.path}`)
    });
  }
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s2) {
  return typeof s2 === "string" || s2 instanceof String;
}
async function render_route(request, route) {
  const mod = await route.load();
  const handler2 = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler2) {
    return error("no handler");
  }
  const match = route.pattern.exec(request.path);
  if (!match) {
    return error("could not parse parameters from request path");
  }
  const params = route.params(match);
  const response = await handler2({ ...request, params });
  const preface = `Invalid response from route ${request.path}`;
  if (!response) {
    return error("no response");
  }
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = headers["content-type"];
  const is_type_textual = isContentTypeTextual(type);
  if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = { ...headers, "content-type": "application/json; charset=utf-8" };
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        (map.get(key) || []).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  #map;
  constructor(map) {
    this.#map = map;
  }
  get(key) {
    const value = this.#map.get(key);
    return value && value[0];
  }
  getAll(key) {
    return this.#map.get(key);
  }
  has(key) {
    return this.#map.has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key] of this.#map)
      yield key;
  }
  *values() {
    for (const [, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield value[i];
      }
    }
  }
};
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  if (typeof raw === "string") {
    const [type, ...directives] = headers["content-type"].split(/;\s*/);
    switch (type) {
      case "text/plain":
        return raw;
      case "application/json":
        return JSON.parse(raw);
      case "application/x-www-form-urlencoded":
        return get_urlencoded(raw);
      case "multipart/form-data": {
        const boundary = directives.find((directive) => directive.startsWith("boundary="));
        if (!boundary)
          throw new Error("Missing boundary");
        return get_multipart(raw, boundary.slice("boundary=".length));
      }
      default:
        throw new Error(`Invalid Content-Type ${type}`);
    }
  }
  return raw;
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !(incoming.path.split("/").pop() || "").includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: encodeURI(path + (q ? `?${q}` : ""))
        }
      };
    }
  }
  try {
    const headers = lowercase_keys(incoming.headers);
    return await options2.hooks.handle({
      request: {
        ...incoming,
        headers,
        body: parse_body(incoming.rawBody, headers),
        params: {},
        locals: {}
      },
      resolve: async (request) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            branch: []
          });
        }
        for (const route of options2.manifest.routes) {
          if (!route.pattern.test(request.path))
            continue;
          const response = route.type === "endpoint" ? await render_route(request, route) : await render_page(request, route, options2, state);
          if (response) {
            if (response.status === 200) {
              if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
                const etag = `"${hash(response.body || "")}"`;
                if (request.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: ""
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        return await render_page(request, null, options2, state);
      }
    });
  } catch (err) {
    const e = coalesce_to_error(err);
    options2.handle_error(e);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}

// .svelte-kit/output/server/app.js
var import_path = __toModule(require("path"));
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
Promise.resolve();
var escaped2 = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape2(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped2[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape2(value)) : `"${value}"`}`}`;
}
var css$i = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        navigated = true;
        title = document.title || "untitled page";
      }
    });
    mounted = true;
    return unsubscribe;
  });
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$i);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${mounted ? `<div id="${"svelte-announcer"}" aria-live="${"assertive"}" aria-atomic="${"true"}" class="${"svelte-1j55zn5"}">${navigated ? `${escape2(title)}` : ``}</div>` : ``}`;
});
function set_paths(paths) {
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({ head, body }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		<link rel="preconnect" href="https://fonts.googleapis.com">\n		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n		<link \n			href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Work+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"> \n		<link rel="stylesheet" href="/fonts.css">\n		<title>Jeff Caldwell - web designer and developer</title>\n		' + head + "\n	</head>\n	<body>\n		" + body + "\n	</body>\n</html>\n";
var options = null;
var default_settings = { paths: { "base": "", "assets": "/." } };
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: "/./_app/start-713c9949.js",
      css: ["/./_app/assets/start-a8cd1609.css"],
      js: ["/./_app/start-713c9949.js", "/./_app/chunks/vendor-941e9029.js", "/./_app/chunks/preload-helper-08cc8e69.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => "/./_app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2) => {
      if (error2.frame) {
        console.error(error2.frame);
      }
      console.error(error2.stack);
      error2.stack = options.get_stack(error2);
    },
    hooks: get_hooks(user_hooks),
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    read: settings.read,
    root: Root,
    service_worker: null,
    router: true,
    ssr: true,
    target: "body",
    template,
    trailing_slash: "never"
  };
}
var d = decodeURIComponent;
var empty = () => ({});
var manifest = {
  assets: [{ "file": "FeedMe-Screenshot.png", "size": 66714, "type": "image/png" }, { "file": "JCdevscreenshot.png", "size": 135095, "type": "image/png" }, { "file": "MeIllustration.svg", "size": 36316, "type": "image/svg+xml" }, { "file": "PrelimDesign.png", "size": 88132, "type": "image/png" }, { "file": "PrelimDesign2.png", "size": 76296, "type": "image/png" }, { "file": "favicon.png", "size": 800, "type": "image/png" }, { "file": "fonts/Atkinson-Hyperlegible-Bold-102a.woff2", "size": 16484, "type": "font/woff2" }, { "file": "fonts/Atkinson-Hyperlegible-BoldItalic-102a.woff2", "size": 18068, "type": "font/woff2" }, { "file": "fonts/Atkinson-Hyperlegible-Italic-102a.woff2", "size": 17712, "type": "font/woff2" }, { "file": "fonts/Atkinson-Hyperlegible-Regular-102a.woff2", "size": 15884, "type": "font/woff2" }, { "file": "fonts/Urbanist/Urbanist-Black.woff2", "size": 19724, "type": "font/woff2" }, { "file": "fonts/Urbanist/Urbanist-BlackItalic.woff2", "size": 20748, "type": "font/woff2" }, { "file": "fonts/Urbanist/Urbanist-Bold.woff2", "size": 20216, "type": "font/woff2" }, { "file": "fonts/Urbanist/Urbanist-BoldItalic.woff2", "size": 21132, "type": "font/woff2" }, { "file": "fonts/Urbanist/Urbanist-ExtraBold.woff2", "size": 20364, "type": "font/woff2" }, { "file": "fonts/Urbanist/Urbanist-ExtraBoldItalic.woff2", "size": 21332, "type": "font/woff2" }, { "file": "fonts/Urbanist/Urbanist-ExtraLight.woff2", "size": 20044, "type": "font/woff2" }, { "file": "fonts/Urbanist/Urbanist-ExtraLightItalic.woff2", "size": 21032, "type": "font/woff2" }, { "file": "fonts/Urbanist/Urbanist-Italic.woff2", "size": 21140, "type": "font/woff2" }, { "file": "fonts/Urbanist/Urbanist-Light.woff2", "size": 20128, "type": "font/woff2" }, { "file": "fonts/Urbanist/Urbanist-LightItalic.woff2", "size": 21080, "type": "font/woff2" }, { "file": "fonts/Urbanist/Urbanist-Medium.woff2", "size": 20156, "type": "font/woff2" }, { "file": "fonts/Urbanist/Urbanist-MediumItalic.woff2", "size": 21248, "type": "font/woff2" }, { "file": "fonts/Urbanist/Urbanist-Regular.woff2", "size": 20324, "type": "font/woff2" }, { "file": "fonts/Urbanist/Urbanist-SemiBold.woff2", "size": 20388, "type": "font/woff2" }, { "file": "fonts/Urbanist/Urbanist-SemiBoldItalic.woff2", "size": 21320, "type": "font/woff2" }, { "file": "fonts/Urbanist/Urbanist-Thin.woff2", "size": 19180, "type": "font/woff2" }, { "file": "fonts/Urbanist/Urbanist-ThinItalic.woff2", "size": 20088, "type": "font/woff2" }, { "file": "fonts/Zaio.woff", "size": 13740, "type": "font/woff" }, { "file": "fonts/Zaio.woff2", "size": 11028, "type": "font/woff2" }, { "file": "fonts.css", "size": 3950, "type": "text/css" }, { "file": "hero.png", "size": 59562, "type": "image/png" }, { "file": "papertexture.jpg", "size": 10789, "type": "image/jpeg" }],
  layout: "src/routes/__layout.svelte",
  error: "src/routes/__error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/writing\.json$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return index_json$2;
      })
    },
    {
      type: "page",
      pattern: /^\/writing\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/writing/index.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/writing\/making-an-rss-reader-1\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/writing/making-an-rss-reader-1/index.svx"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/writing\/test-three\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/writing/test-three/index.svx"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/writing\/test-post\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/writing/test-post/index.svx"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/writing\/test-two\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/writing/test-two/index.svx"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/writing\/layouts\/writing\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/writing/layouts/writing.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/writing\/layouts\/work\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/writing/layouts/work.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/about\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/about/index.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/hire\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/hire/index.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/work\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/work/index.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/work\/feedme\.json$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return index_json$1;
      })
    },
    {
      type: "page",
      pattern: /^\/work\/feedme\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/work/feedme/index.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/tag\.json$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return index_json;
      })
    },
    {
      type: "page",
      pattern: /^\/tag\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/tag/index.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/tag\/([^/]+?)\/?$/,
      params: (m) => ({ tag: d(m[1]) }),
      a: ["src/routes/__layout.svelte", "src/routes/tag/[tag].svelte"],
      b: ["src/routes/__error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
  serverFetch: hooks.serverFetch || fetch
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  "src/routes/__error.svelte": () => Promise.resolve().then(function() {
    return __error;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index$a;
  }),
  "src/routes/writing/index.svelte": () => Promise.resolve().then(function() {
    return index$9;
  }),
  "src/routes/writing/making-an-rss-reader-1/index.svx": () => Promise.resolve().then(function() {
    return index$8;
  }),
  "src/routes/writing/test-three/index.svx": () => Promise.resolve().then(function() {
    return index$7;
  }),
  "src/routes/writing/test-post/index.svx": () => Promise.resolve().then(function() {
    return index$6;
  }),
  "src/routes/writing/test-two/index.svx": () => Promise.resolve().then(function() {
    return index$5;
  }),
  "src/routes/writing/layouts/writing.svelte": () => Promise.resolve().then(function() {
    return writing;
  }),
  "src/routes/writing/layouts/work.svelte": () => Promise.resolve().then(function() {
    return work;
  }),
  "src/routes/about/index.svelte": () => Promise.resolve().then(function() {
    return index$4;
  }),
  "src/routes/hire/index.svelte": () => Promise.resolve().then(function() {
    return index$3;
  }),
  "src/routes/work/index.svelte": () => Promise.resolve().then(function() {
    return index$2;
  }),
  "src/routes/work/feedme/index.svelte": () => Promise.resolve().then(function() {
    return index$1;
  }),
  "src/routes/tag/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/tag/[tag].svelte": () => Promise.resolve().then(function() {
    return _tag_;
  })
};
var metadata_lookup = { "src/routes/__layout.svelte": { "entry": "/./_app/pages/__layout.svelte-4b8395b7.js", "css": ["/./_app/assets/pages/__layout.svelte-9df56d59.css"], "js": ["/./_app/pages/__layout.svelte-4b8395b7.js", "/./_app/chunks/vendor-941e9029.js"], "styles": [] }, "src/routes/__error.svelte": { "entry": "/./_app/pages/__error.svelte-88baab4a.js", "css": ["/./_app/assets/pages/__error.svelte-3550d300.css"], "js": ["/./_app/pages/__error.svelte-88baab4a.js", "/./_app/chunks/vendor-941e9029.js"], "styles": [] }, "src/routes/index.svelte": { "entry": "/./_app/pages/index.svelte-67299caf.js", "css": ["/./_app/assets/pages/index.svelte-e7e39283.css", "/./_app/assets/Card.svelte_svelte&type=style&lang-d9554398.css"], "js": ["/./_app/pages/index.svelte-67299caf.js", "/./_app/chunks/vendor-941e9029.js", "/./_app/chunks/Card.svelte_svelte&type=style&lang-850321e7.js"], "styles": [] }, "src/routes/writing/index.svelte": { "entry": "/./_app/pages/writing/index.svelte-e57b73aa.js", "css": ["/./_app/assets/PostItem-dd4d3294.css"], "js": ["/./_app/pages/writing/index.svelte-e57b73aa.js", "/./_app/chunks/vendor-941e9029.js", "/./_app/chunks/PostItem-c7ae68e6.js"], "styles": [] }, "src/routes/writing/making-an-rss-reader-1/index.svx": { "entry": "/./_app/pages/writing/making-an-rss-reader-1/index.svx-147b14d7.js", "css": ["/./_app/assets/writing-6c87c5a6.css"], "js": ["/./_app/pages/writing/making-an-rss-reader-1/index.svx-147b14d7.js", "/./_app/chunks/vendor-941e9029.js", "/./_app/chunks/writing-698e4e09.js"], "styles": [] }, "src/routes/writing/test-three/index.svx": { "entry": "/./_app/pages/writing/test-three/index.svx-b6803228.js", "css": ["/./_app/assets/writing-6c87c5a6.css"], "js": ["/./_app/pages/writing/test-three/index.svx-b6803228.js", "/./_app/chunks/vendor-941e9029.js", "/./_app/chunks/writing-698e4e09.js"], "styles": [] }, "src/routes/writing/test-post/index.svx": { "entry": "/./_app/pages/writing/test-post/index.svx-83f9ab25.js", "css": ["/./_app/assets/writing-6c87c5a6.css"], "js": ["/./_app/pages/writing/test-post/index.svx-83f9ab25.js", "/./_app/chunks/vendor-941e9029.js", "/./_app/chunks/writing-698e4e09.js"], "styles": [] }, "src/routes/writing/test-two/index.svx": { "entry": "/./_app/pages/writing/test-two/index.svx-cefdf822.js", "css": ["/./_app/assets/writing-6c87c5a6.css"], "js": ["/./_app/pages/writing/test-two/index.svx-cefdf822.js", "/./_app/chunks/vendor-941e9029.js", "/./_app/chunks/writing-698e4e09.js"], "styles": [] }, "src/routes/writing/layouts/writing.svelte": { "entry": "/./_app/pages/writing/layouts/writing.svelte-d242abec.js", "css": ["/./_app/assets/writing-6c87c5a6.css"], "js": ["/./_app/pages/writing/layouts/writing.svelte-d242abec.js", "/./_app/chunks/vendor-941e9029.js"], "styles": [] }, "src/routes/writing/layouts/work.svelte": { "entry": "/./_app/pages/writing/layouts/work.svelte-ff6208c1.js", "css": ["/./_app/assets/pages/writing/layouts/work.svelte-2a6d3bcc.css"], "js": ["/./_app/pages/writing/layouts/work.svelte-ff6208c1.js", "/./_app/chunks/vendor-941e9029.js"], "styles": [] }, "src/routes/about/index.svelte": { "entry": "/./_app/pages/about/index.svelte-1128dc6d.js", "css": [], "js": ["/./_app/pages/about/index.svelte-1128dc6d.js", "/./_app/chunks/vendor-941e9029.js"], "styles": [] }, "src/routes/hire/index.svelte": { "entry": "/./_app/pages/hire/index.svelte-df48cb4e.js", "css": [], "js": ["/./_app/pages/hire/index.svelte-df48cb4e.js", "/./_app/chunks/vendor-941e9029.js"], "styles": [] }, "src/routes/work/index.svelte": { "entry": "/./_app/pages/work/index.svelte-dbee24ff.js", "css": [], "js": ["/./_app/pages/work/index.svelte-dbee24ff.js", "/./_app/chunks/vendor-941e9029.js"], "styles": [] }, "src/routes/work/feedme/index.svelte": { "entry": "/./_app/pages/work/feedme/index.svelte-a4b26aef.js", "css": ["/./_app/assets/pages/work/feedme/index.svelte-699f787f.css", "/./_app/assets/Card.svelte_svelte&type=style&lang-d9554398.css", "/./_app/assets/PostItem-dd4d3294.css"], "js": ["/./_app/pages/work/feedme/index.svelte-a4b26aef.js", "/./_app/chunks/vendor-941e9029.js", "/./_app/chunks/Card.svelte_svelte&type=style&lang-850321e7.js", "/./_app/chunks/PostItem-c7ae68e6.js"], "styles": [] }, "src/routes/tag/index.svelte": { "entry": "/./_app/pages/tag/index.svelte-83e74716.js", "css": [], "js": ["/./_app/pages/tag/index.svelte-83e74716.js", "/./_app/chunks/vendor-941e9029.js"], "styles": [] }, "src/routes/tag/[tag].svelte": { "entry": "/./_app/pages/tag/[tag].svelte-d47dbcf7.js", "css": ["/./_app/assets/pages/tag/[tag].svelte-012837b0.css", "/./_app/assets/PostItem-dd4d3294.css"], "js": ["/./_app/pages/tag/[tag].svelte-d47dbcf7.js", "/./_app/chunks/preload-helper-08cc8e69.js", "/./_app/chunks/vendor-941e9029.js", "/./_app/chunks/PostItem-c7ae68e6.js"], "styles": [] } };
async function load_component(file) {
  return {
    module: await module_lookup[file](),
    ...metadata_lookup[file]
  };
}
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender });
}
var get$1 = async () => {
  const modules = { "./making-an-rss-reader-1/index.svx": () => Promise.resolve().then(function() {
    return index$8;
  }), "./test-post/index.svx": () => Promise.resolve().then(function() {
    return index$6;
  }), "./test-three/index.svx": () => Promise.resolve().then(function() {
    return index$7;
  }), "./test-two/index.svx": () => Promise.resolve().then(function() {
    return index$5;
  }) };
  const posts = [];
  await Promise.all(Object.entries(modules).map(async ([file, module2]) => {
    const { metadata: metadata2 } = await module2();
    posts.push({
      author: metadata2.author,
      created: metadata2.created,
      slug: (0, import_path.parse)(file).dir,
      subtitle: metadata2.subtitle,
      title: metadata2.title,
      excerpt: metadata2.excerpt,
      tags: metadata2.tags
    });
  }));
  posts.sort((a, b) => a.created > b.created ? 1 : -1);
  return {
    body: {
      posts
    }
  };
};
var index_json$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get: get$1
});
var getWorkPosts = async (tagName) => {
  const modules = { "../../routes/writing/making-an-rss-reader-1/index.svx": () => Promise.resolve().then(function() {
    return index$8;
  }), "../../routes/writing/test-post/index.svx": () => Promise.resolve().then(function() {
    return index$6;
  }), "../../routes/writing/test-three/index.svx": () => Promise.resolve().then(function() {
    return index$7;
  }), "../../routes/writing/test-two/index.svx": () => Promise.resolve().then(function() {
    return index$5;
  }) };
  let posts = [];
  await Promise.all(Object.entries(modules).map(async ([file, module2]) => {
    const { metadata: metadata2 } = await module2();
    const pathArray = (0, import_path.parse)(file).dir.split("/");
    const slug = pathArray[pathArray.length - 1];
    posts.push({
      author: metadata2.author,
      created: metadata2.created,
      slug,
      subtitle: metadata2.subtitle,
      title: metadata2.title,
      excerpt: metadata2.excerpt,
      tags: metadata2.tags
    });
  }));
  posts = posts.filter((post) => post.tags.includes(tagName));
  posts.sort((a, b) => a.created > b.created ? 1 : -1);
  return posts;
};
var get = async () => {
  const posts = await getWorkPosts("FeedMe");
  return {
    body: {
      posts
    }
  };
};
var index_json$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get
});
var index_json = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var css$h = {
  code: ".logo.svelte-ik16cw{height:clamp(3rem, 4vw, 5rem);width:clamp(3rem, 4vw, 5rem);display:flex;justify-content:center;align-items:center;background-color:var(--red);border:3px solid transparent;padding:0.5rem;transition:background 300ms ease-out, border-color 300ms ease-out 100ms}.logo.svelte-ik16cw:hover{border-color:var(--red);background-color:var(--whitish)}.logo-svg.svelte-ik16cw{height:clamp(2.5rem, 3.5vw, 4.5rem)}.letter.svelte-ik16cw{transition:fill 300ms ease-out}",
  map: `{"version":3,"file":"Logo.svelte","sources":["Logo.svelte"],"sourcesContent":["<script>\\n  const red = '#ff6347';\\n  const darkBlue = '#373043';\\n  const whitish = '#ffeae6';\\n\\n  $: logoColor = red;\\n\\n  let isHovering = false;\\n\\n  function setHoverStyles() {\\n    isHovering = !isHovering;\\n  }\\n\\n<\/script>\\n<div class=\\"logo\\" on:mouseenter={setHoverStyles} on:mouseleave={setHoverStyles}>\\n  <!-- Idle Logo -->\\n  <svg class=\\"logo-svg\\" viewBox=\\"0 0 49 36\\" fill=\\"none\\" xmlns=\\"http://www.w3.org/2000/svg\\">\\n    <path class=\\"letter\\" d=\\"M41.478 26.7272L48.2113 30.3673C47.0642 31.9297 45.6261 33.1846 43.897 34.132C42.168 35.0795 40.281 35.5532 38.236 35.5532C35.9417 35.5532 33.8469 34.9631 31.9516 33.783C30.0729 32.6029 28.5683 31.0238 27.4377 29.0459C26.3238 27.0513 25.7668 24.849 25.7668 22.4388C25.7668 20.0121 26.3238 17.8015 27.4377 15.8069C28.5683 13.8123 30.0729 12.225 31.9516 11.0448C33.8469 9.86472 35.9417 9.27466 38.236 9.27466C40.281 9.27466 42.168 9.74837 43.897 10.6958C45.6261 11.6432 47.0642 12.9148 48.2113 14.5104L41.478 18.1505C40.547 17.2197 39.4663 16.7543 38.236 16.7543C37.2884 16.7543 36.4404 17.0203 35.6923 17.5521C34.9441 18.084 34.3456 18.7821 33.8967 19.6464C33.4645 20.5108 33.2483 21.4416 33.2483 22.4388C33.2483 23.4195 33.4645 24.342 33.8967 25.2063C34.3456 26.054 34.9441 26.7438 35.6923 27.2757C36.4404 27.8076 37.2884 28.0735 38.236 28.0735C39.4497 28.0735 40.5303 27.6247 41.478 26.7272Z\\" fill={isHovering ? red : whitish}/>\\n    <path class=\\"letter\\" d=\\"M7.53137 35.5533C6.16807 35.5533 4.82972 35.3206 3.5163 34.8552C2.21951 34.3898 1.04741 33.7083 0 32.8107L4.78815 27.0763C5.07079 27.2924 5.43655 27.5168 5.88544 27.7495C6.33433 27.9656 6.88297 28.0736 7.53137 28.0736C8.71178 28.0736 9.71763 27.6498 10.5489 26.8021C11.3968 25.9544 11.8208 24.9488 11.8208 23.7853V0H19.3022V23.7853C19.3022 25.9461 18.7702 27.9157 17.7062 29.6942C16.6422 31.4727 15.2207 32.8938 13.4417 33.9576C11.6628 35.0214 9.69269 35.5533 7.53137 35.5533Z\\" fill={isHovering ? red : whitish}/>\\n  </svg>\\n</div>\\n\\n<style lang=\\"scss\\">.logo {\\n  height: clamp(3rem, 4vw, 5rem);\\n  width: clamp(3rem, 4vw, 5rem);\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  background-color: var(--red);\\n  border: 3px solid transparent;\\n  padding: 0.5rem;\\n  transition: background 300ms ease-out, border-color 300ms ease-out 100ms;\\n}\\n\\n.logo:hover {\\n  border-color: var(--red);\\n  background-color: var(--whitish);\\n}\\n\\n.logo-svg {\\n  height: clamp(2.5rem, 3.5vw, 4.5rem);\\n}\\n\\n.rect, .letter {\\n  transition: fill 300ms ease-out;\\n}\\n\\n.site-head-logo {\\n  position: relative;\\n}</style>"],"names":[],"mappings":"AAsBmB,KAAK,cAAC,CAAC,AACxB,MAAM,CAAE,MAAM,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAC9B,KAAK,CAAE,MAAM,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAC7B,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,gBAAgB,CAAE,IAAI,KAAK,CAAC,CAC5B,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,WAAW,CAC7B,OAAO,CAAE,MAAM,CACf,UAAU,CAAE,UAAU,CAAC,KAAK,CAAC,QAAQ,CAAC,CAAC,YAAY,CAAC,KAAK,CAAC,QAAQ,CAAC,KAAK,AAC1E,CAAC,AAED,mBAAK,MAAM,AAAC,CAAC,AACX,YAAY,CAAE,IAAI,KAAK,CAAC,CACxB,gBAAgB,CAAE,IAAI,SAAS,CAAC,AAClC,CAAC,AAED,SAAS,cAAC,CAAC,AACT,MAAM,CAAE,MAAM,MAAM,CAAC,CAAC,KAAK,CAAC,CAAC,MAAM,CAAC,AACtC,CAAC,AAEM,OAAO,cAAC,CAAC,AACd,UAAU,CAAE,IAAI,CAAC,KAAK,CAAC,QAAQ,AACjC,CAAC"}`
};
var whitish = "#ffeae6";
var Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$h);
  return `<div class="${"logo svelte-ik16cw"}">
  <svg class="${"logo-svg svelte-ik16cw"}" viewBox="${"0 0 49 36"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path class="${"letter svelte-ik16cw"}" d="${"M41.478 26.7272L48.2113 30.3673C47.0642 31.9297 45.6261 33.1846 43.897 34.132C42.168 35.0795 40.281 35.5532 38.236 35.5532C35.9417 35.5532 33.8469 34.9631 31.9516 33.783C30.0729 32.6029 28.5683 31.0238 27.4377 29.0459C26.3238 27.0513 25.7668 24.849 25.7668 22.4388C25.7668 20.0121 26.3238 17.8015 27.4377 15.8069C28.5683 13.8123 30.0729 12.225 31.9516 11.0448C33.8469 9.86472 35.9417 9.27466 38.236 9.27466C40.281 9.27466 42.168 9.74837 43.897 10.6958C45.6261 11.6432 47.0642 12.9148 48.2113 14.5104L41.478 18.1505C40.547 17.2197 39.4663 16.7543 38.236 16.7543C37.2884 16.7543 36.4404 17.0203 35.6923 17.5521C34.9441 18.084 34.3456 18.7821 33.8967 19.6464C33.4645 20.5108 33.2483 21.4416 33.2483 22.4388C33.2483 23.4195 33.4645 24.342 33.8967 25.2063C34.3456 26.054 34.9441 26.7438 35.6923 27.2757C36.4404 27.8076 37.2884 28.0735 38.236 28.0735C39.4497 28.0735 40.5303 27.6247 41.478 26.7272Z"}"${add_attribute("fill", whitish, 0)}></path><path class="${"letter svelte-ik16cw"}" d="${"M7.53137 35.5533C6.16807 35.5533 4.82972 35.3206 3.5163 34.8552C2.21951 34.3898 1.04741 33.7083 0 32.8107L4.78815 27.0763C5.07079 27.2924 5.43655 27.5168 5.88544 27.7495C6.33433 27.9656 6.88297 28.0736 7.53137 28.0736C8.71178 28.0736 9.71763 27.6498 10.5489 26.8021C11.3968 25.9544 11.8208 24.9488 11.8208 23.7853V0H19.3022V23.7853C19.3022 25.9461 18.7702 27.9157 17.7062 29.6942C16.6422 31.4727 15.2207 32.8938 13.4417 33.9576C11.6628 35.0214 9.69269 35.5533 7.53137 35.5533Z"}"${add_attribute("fill", whitish, 0)}></path></svg>
</div>`;
});
var css$g = {
  code: "header.svelte-nprna9.svelte-nprna9{display:flex;justify-content:center;background-color:var(--bg__primary);padding:1rem;font-family:var(--display)}.site-head_inner.svelte-nprna9.svelte-nprna9{display:flex;justify-content:space-between;align-items:center;width:var(--width-body)}.site-head_inner.svelte-nprna9 a.svelte-nprna9{line-height:1}#site-logo.svelte-nprna9.svelte-nprna9{margin:0;padding:0;text-decoration:none}#site-logo.svelte-nprna9.svelte-nprna9:focus{outline-offset:0.25rem}nav.svelte-nprna9.svelte-nprna9{margin:0}nav.svelte-nprna9 ul.svelte-nprna9{display:flex;gap:clamp(1vw, 2rem, 4vw);padding:0}nav.svelte-nprna9 ul li.svelte-nprna9{list-style-type:none;display:inline-block;margin:0;padding:0}nav.svelte-nprna9 ul li a.svelte-nprna9{color:var(--red);letter-spacing:0.125em;text-transform:uppercase;text-decoration:none;transition:color 300ms ease-out;font-size:clamp(var(--size-400), 4vw, var(--size-500));line-height:1}nav.svelte-nprna9 ul li a.svelte-nprna9:hover{text-decoration:underline;color:var(--darkblue);text-decoration-thickness:2px;text-underline-offset:6px}@media screen and (max-width: 460px){header.svelte-nprna9.svelte-nprna9{border-width:0}.site-head_inner.svelte-nprna9.svelte-nprna9{flex-direction:column;align-items:center}}",
  map: `{"version":3,"file":"Header.svelte","sources":["Header.svelte"],"sourcesContent":["<script>\\n  import Logo from './Logo.svelte';\\n<\/script>\\n\\n<header class=\\"site-head\\" role=\\"banner\\">\\n  <div class=\\"site-head_inner\\">\\n    <div class=\\"site-head_logo\\">\\n      <h1 id=\\"site-label\\" class=\\"visually-hidden\\">Jeff Caldwell - web designer and developer</h1>\\n      <a href=\\"/\\" id=\\"site-logo\\" aria-labelledby=\\"site-label\\">\\n        <Logo />\\n      </a>\\n    </div>\\n    <nav id=\\"primary-nav\\" aria-label=\\"primary\\" tabindex=\\"-1\\">\\n      <ul role=\\"list\\">\\n        <li><a href=\\"/work\\">Work</a></li>\\n        <li><a href=\\"/writing\\">Writing</a></li>\\n        <li><a href=\\"/about\\">About</a></li>\\n        <li><a href=\\"/hire\\">Hire</a></li>\\n      </ul>\\n    </nav>\\n  </div>\\n</header>\\n\\n<style lang=\\"scss\\">header {\\n  display: flex;\\n  justify-content: center;\\n  background-color: var(--bg__primary);\\n  padding: 1rem;\\n  font-family: var(--display);\\n}\\n\\n.site-head_inner {\\n  display: flex;\\n  justify-content: space-between;\\n  align-items: center;\\n  width: var(--width-body);\\n}\\n.site-head_inner a {\\n  line-height: 1;\\n}\\n\\n#site-logo {\\n  margin: 0;\\n  padding: 0;\\n  text-decoration: none;\\n}\\n\\n#site-logo:focus {\\n  outline-offset: 0.25rem;\\n}\\n\\nnav {\\n  margin: 0;\\n}\\nnav ul {\\n  display: flex;\\n  gap: clamp(1vw, 2rem, 4vw);\\n  padding: 0;\\n}\\nnav ul li {\\n  list-style-type: none;\\n  display: inline-block;\\n  margin: 0;\\n  padding: 0;\\n}\\nnav ul li a {\\n  color: var(--red);\\n  letter-spacing: 0.125em;\\n  text-transform: uppercase;\\n  text-decoration: none;\\n  transition: color 300ms ease-out;\\n  font-size: clamp(var(--size-400), 4vw, var(--size-500));\\n  line-height: 1;\\n}\\nnav ul li a:hover {\\n  text-decoration: underline;\\n  color: var(--darkblue);\\n  text-decoration-thickness: 2px;\\n  text-underline-offset: 6px;\\n}\\n\\n@media screen and (max-width: 460px) {\\n  header {\\n    border-width: 0;\\n  }\\n\\n  .site-head_inner {\\n    flex-direction: column;\\n    align-items: center;\\n  }\\n}</style>"],"names":[],"mappings":"AAuBmB,MAAM,4BAAC,CAAC,AACzB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,gBAAgB,CAAE,IAAI,aAAa,CAAC,CACpC,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,IAAI,SAAS,CAAC,AAC7B,CAAC,AAED,gBAAgB,4BAAC,CAAC,AAChB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IAAI,YAAY,CAAC,AAC1B,CAAC,AACD,8BAAgB,CAAC,CAAC,cAAC,CAAC,AAClB,WAAW,CAAE,CAAC,AAChB,CAAC,AAED,UAAU,4BAAC,CAAC,AACV,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,eAAe,CAAE,IAAI,AACvB,CAAC,AAED,sCAAU,MAAM,AAAC,CAAC,AAChB,cAAc,CAAE,OAAO,AACzB,CAAC,AAED,GAAG,4BAAC,CAAC,AACH,MAAM,CAAE,CAAC,AACX,CAAC,AACD,iBAAG,CAAC,EAAE,cAAC,CAAC,AACN,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,MAAM,GAAG,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,CAC1B,OAAO,CAAE,CAAC,AACZ,CAAC,AACD,iBAAG,CAAC,EAAE,CAAC,EAAE,cAAC,CAAC,AACT,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,YAAY,CACrB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACZ,CAAC,AACD,iBAAG,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,cAAC,CAAC,AACX,KAAK,CAAE,IAAI,KAAK,CAAC,CACjB,cAAc,CAAE,OAAO,CACvB,cAAc,CAAE,SAAS,CACzB,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,KAAK,CAAC,KAAK,CAAC,QAAQ,CAChC,SAAS,CAAE,MAAM,IAAI,UAAU,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,UAAU,CAAC,CAAC,CACvD,WAAW,CAAE,CAAC,AAChB,CAAC,AACD,iBAAG,CAAC,EAAE,CAAC,EAAE,CAAC,eAAC,MAAM,AAAC,CAAC,AACjB,eAAe,CAAE,SAAS,CAC1B,KAAK,CAAE,IAAI,UAAU,CAAC,CACtB,yBAAyB,CAAE,GAAG,CAC9B,qBAAqB,CAAE,GAAG,AAC5B,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,MAAM,4BAAC,CAAC,AACN,YAAY,CAAE,CAAC,AACjB,CAAC,AAED,gBAAgB,4BAAC,CAAC,AAChB,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,AACrB,CAAC,AACH,CAAC"}`
};
var Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$g);
  return `<header class="${"site-head svelte-nprna9"}" role="${"banner"}"><div class="${"site-head_inner svelte-nprna9"}"><div class="${"site-head_logo"}"><h1 id="${"site-label"}" class="${"visually-hidden"}">Jeff Caldwell - web designer and developer</h1>
      <a href="${"/"}" id="${"site-logo"}" aria-labelledby="${"site-label"}" class="${"svelte-nprna9"}">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</a></div>
    <nav id="${"primary-nav"}" aria-label="${"primary"}" tabindex="${"-1"}" class="${"svelte-nprna9"}"><ul role="${"list"}" class="${"svelte-nprna9"}"><li class="${"svelte-nprna9"}"><a href="${"/work"}" class="${"svelte-nprna9"}">Work</a></li>
        <li class="${"svelte-nprna9"}"><a href="${"/writing"}" class="${"svelte-nprna9"}">Writing</a></li>
        <li class="${"svelte-nprna9"}"><a href="${"/about"}" class="${"svelte-nprna9"}">About</a></li>
        <li class="${"svelte-nprna9"}"><a href="${"/hire"}" class="${"svelte-nprna9"}">Hire</a></li></ul></nav></div>
</header>`;
});
var css$f = {
  code: ".c.svelte-1ei8xa2{width:1em;height:1em;fill:currentColor;overflow:visible}",
  map: '{"version":3,"file":"Icon.svelte","sources":["Icon.svelte"],"sourcesContent":["<script>\\n  export let name = twitter;\\n\\n  const iconPaths = {\\n      twitter: [\\n        \\"M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z\\"\\n      ],\\n      github: [\\n        \\"M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z\\"\\n      ],\\n      linkedin: [\\n        \\"M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 0 1-1.548-1.549 1.548 1.548 0 1 1 1.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z\\"\\n      ],\\n      polywork: [\\n        \\"M19.125 0H4.875A4.865 4.865 0 0 0 0 4.875v14.25C0 21.825 2.175 24 4.875 24h6.6c2.7 0 4.875-2.175 4.875-4.875V16.65h2.775c2.7 0 4.875-2.175 4.875-4.875v-6.9C24 2.175 21.825 0 19.125 0zM16.5 1.275h2.625a3.6 3.6 0 0 1 3.6 3.6v2.7H16.5v-6.3zM15.075 9v6.45H8.85V9h6.225zM8.85 1.2h6.225v6.375H8.85V1.2zM1.275 4.8a3.6 3.6 0 0 1 3.6-3.6H7.5v6.375H1.275V4.8zM7.5 9v6.45H1.2V9h6.3zm0 13.725H4.8a3.6 3.6 0 0 1-3.6-3.6V16.8h6.3v5.925zm7.575-3.525a3.6 3.6 0 0 1-3.6 3.6H8.85v-5.925h6.225V19.2zm7.65-7.35a3.6 3.6 0 0 1-3.6 3.6H16.5V9h6.225v2.85z\\"\\n      ],\\n  };\\n\\n  let paths = iconPaths[name];\\n<\/script>\\n\\n<svg\\n  class=\\"c\\"\\n  viewBox=\\"0 0 24 24\\"\\n  fill-rule=\\"evenodd\\"\\n  clip-rule=\\"evenodd\\"\\n>\\n{#each paths as path}\\n  <path d=\\"{path}\\"></path>\\n{/each}\\n</svg>\\n\\n<style>\\n  .c {\\n    width: 1em;\\n    height: 1em;\\n    fill: currentColor;\\n    overflow: visible;\\n  }\\n</style>"],"names":[],"mappings":"AAiCE,EAAE,eAAC,CAAC,AACF,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,IAAI,CAAE,YAAY,CAClB,QAAQ,CAAE,OAAO,AACnB,CAAC"}'
};
var Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name = twitter } = $$props;
  const iconPaths = {
    twitter: [
      "M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"
    ],
    github: [
      "M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"
    ],
    linkedin: [
      "M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 0 1-1.548-1.549 1.548 1.548 0 1 1 1.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"
    ],
    polywork: [
      "M19.125 0H4.875A4.865 4.865 0 0 0 0 4.875v14.25C0 21.825 2.175 24 4.875 24h6.6c2.7 0 4.875-2.175 4.875-4.875V16.65h2.775c2.7 0 4.875-2.175 4.875-4.875v-6.9C24 2.175 21.825 0 19.125 0zM16.5 1.275h2.625a3.6 3.6 0 0 1 3.6 3.6v2.7H16.5v-6.3zM15.075 9v6.45H8.85V9h6.225zM8.85 1.2h6.225v6.375H8.85V1.2zM1.275 4.8a3.6 3.6 0 0 1 3.6-3.6H7.5v6.375H1.275V4.8zM7.5 9v6.45H1.2V9h6.3zm0 13.725H4.8a3.6 3.6 0 0 1-3.6-3.6V16.8h6.3v5.925zm7.575-3.525a3.6 3.6 0 0 1-3.6 3.6H8.85v-5.925h6.225V19.2zm7.65-7.35a3.6 3.6 0 0 1-3.6 3.6H16.5V9h6.225v2.85z"
    ]
  };
  let paths = iconPaths[name];
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  $$result.css.add(css$f);
  return `<svg class="${"c svelte-1ei8xa2"}" viewBox="${"0 0 24 24"}" fill-rule="${"evenodd"}" clip-rule="${"evenodd"}">${each(paths, (path) => `<path${add_attribute("d", path, 0)}></path>`)}</svg>`;
});
var css$e = {
  code: "footer.svelte-p3ukwr.svelte-p3ukwr{display:flex;justify-content:center;align-items:center;background:var(--red);color:var(--whitish);padding:var(--space-small);margin-top:auto}.footer-inner.svelte-p3ukwr.svelte-p3ukwr{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:var(--space)}.footer-copy.svelte-p3ukwr.svelte-p3ukwr{font-size:var(--font-size-medium);line-height:1;margin:0;padding:0;color:var(--whitish)}.menu.svelte-p3ukwr.svelte-p3ukwr{display:flex;justify-content:center;align-items:center;gap:var(--space);list-style-type:none;margin:0;padding:0}.menu.svelte-p3ukwr li.svelte-p3ukwr{line-height:1;margin:0;padding:0}.menu.svelte-p3ukwr li a.svelte-p3ukwr{font-size:var(--font-size-medium);color:var(--whitish);transition:color 300ms ease-out}.menu.svelte-p3ukwr li a.svelte-p3ukwr:hover{color:var(--darkblue)}",
  map: `{"version":3,"file":"Footer.svelte","sources":["Footer.svelte"],"sourcesContent":["<script>\\n  import Icon from './Icon.svelte';\\n<\/script>\\n\\n<footer id=\\"site-footer\\">\\n  <div class=\\"footer-inner\\">\\n    <p class=\\"footer-copy\\">\\n      &copy 2021 Jeff Caldwell\\n    </p>\\n    <section class=\\"footer-menu\\">\\n      <ul class=\\"menu\\">\\n        <li><a href=\\"https://twitter.com/trainingm0ntage\\" aria-label=\\"Twitter\\"><Icon name=\\"twitter\\" /></a></li>\\n        <li><a href=\\"https://github.com/nemo-omen\\" aria-label=\\"GitHub\\"><Icon name=\\"github\\" /></a></li>\\n        <li><a href=\\"https://www.linkedin.com/in/jeff-caldwell-4424181a/\\" aria-label=\\"LinkedIn\\"><Icon name=\\"linkedin\\" /></a></li>\\n        <li><a href=\\"https://www.polywork.com/trainingmontage\\" aria-label=\\"PolyWork\\"><Icon name=\\"polywork\\" /></a></li>\\n      </ul>\\n    </section>\\n  </div>\\n</footer>\\n\\n<style>\\n footer {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  background: var(--red);\\n  color: var(--whitish);\\n  padding: var(--space-small);\\n  margin-top: auto;\\n }\\n .footer-inner {\\n   display: flex;\\n   flex-wrap: wrap;\\n   align-items: center;\\n   justify-content: center;\\n   gap: var(--space);\\n }\\n .footer-copy {\\n   font-size: var(--font-size-medium);\\n   line-height: 1;\\n   margin: 0;\\n   padding: 0;\\n   color: var(--whitish);\\n }\\n .menu {\\n   display: flex;\\n   justify-content: center;\\n   align-items: center;\\n   gap: var(--space);\\n   list-style-type: none;\\n   margin: 0;\\n   padding: 0;\\n }\\n .menu li {\\n   line-height: 1;\\n   margin: 0;\\n   padding: 0;\\n }\\n .menu li a {\\n   font-size: var(--font-size-medium);\\n   color: var(--whitish);\\n   transition: color 300ms ease-out;\\n  }\\n  .menu li a:hover {\\n    color: var(--darkblue);\\n  }\\n</style>"],"names":[],"mappings":"AAqBC,MAAM,4BAAC,CAAC,AACP,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,IAAI,KAAK,CAAC,CACtB,KAAK,CAAE,IAAI,SAAS,CAAC,CACrB,OAAO,CAAE,IAAI,aAAa,CAAC,CAC3B,UAAU,CAAE,IAAI,AACjB,CAAC,AACD,aAAa,4BAAC,CAAC,AACb,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,GAAG,CAAE,IAAI,OAAO,CAAC,AACnB,CAAC,AACD,YAAY,4BAAC,CAAC,AACZ,SAAS,CAAE,IAAI,kBAAkB,CAAC,CAClC,WAAW,CAAE,CAAC,CACd,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,IAAI,SAAS,CAAC,AACvB,CAAC,AACD,KAAK,4BAAC,CAAC,AACL,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,OAAO,CAAC,CACjB,eAAe,CAAE,IAAI,CACrB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACZ,CAAC,AACD,mBAAK,CAAC,EAAE,cAAC,CAAC,AACR,WAAW,CAAE,CAAC,CACd,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACZ,CAAC,AACD,mBAAK,CAAC,EAAE,CAAC,CAAC,cAAC,CAAC,AACV,SAAS,CAAE,IAAI,kBAAkB,CAAC,CAClC,KAAK,CAAE,IAAI,SAAS,CAAC,CACrB,UAAU,CAAE,KAAK,CAAC,KAAK,CAAC,QAAQ,AACjC,CAAC,AACD,mBAAK,CAAC,EAAE,CAAC,eAAC,MAAM,AAAC,CAAC,AAChB,KAAK,CAAE,IAAI,UAAU,CAAC,AACxB,CAAC"}`
};
var Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$e);
  return `<footer id="${"site-footer"}" class="${"svelte-p3ukwr"}"><div class="${"footer-inner svelte-p3ukwr"}"><p class="${"footer-copy svelte-p3ukwr"}">\xA9 2021 Jeff Caldwell
    </p>
    <section class="${"footer-menu"}"><ul class="${"menu svelte-p3ukwr"}"><li class="${"svelte-p3ukwr"}"><a href="${"https://twitter.com/trainingm0ntage"}" aria-label="${"Twitter"}" class="${"svelte-p3ukwr"}">${validate_component(Icon, "Icon").$$render($$result, { name: "twitter" }, {}, {})}</a></li>
        <li class="${"svelte-p3ukwr"}"><a href="${"https://github.com/nemo-omen"}" aria-label="${"GitHub"}" class="${"svelte-p3ukwr"}">${validate_component(Icon, "Icon").$$render($$result, { name: "github" }, {}, {})}</a></li>
        <li class="${"svelte-p3ukwr"}"><a href="${"https://www.linkedin.com/in/jeff-caldwell-4424181a/"}" aria-label="${"LinkedIn"}" class="${"svelte-p3ukwr"}">${validate_component(Icon, "Icon").$$render($$result, { name: "linkedin" }, {}, {})}</a></li>
        <li class="${"svelte-p3ukwr"}"><a href="${"https://www.polywork.com/trainingmontage"}" aria-label="${"PolyWork"}" class="${"svelte-p3ukwr"}">${validate_component(Icon, "Icon").$$render($$result, { name: "polywork" }, {}, {})}</a></li></ul></section></div>
</footer>`;
});
var css$d = {
  code: "main.svelte-wtju1t{width:var(--width-body);margin:0 auto;margin-bottom:var(--space)}",
  map: `{"version":3,"file":"__layout.svelte","sources":["__layout.svelte"],"sourcesContent":["<script>\\n  import \\"$lib/style/app.scss\\";\\n  import Header from '$lib/components/Header.svelte';\\n  import Footer from '$lib/components/Footer.svelte';\\n\\n<\/script>\\n\\n<Header />\\n\\n<main role=\\"main\\" tabindex=\\"-1\\">\\n  <slot></slot>\\n</main>\\n\\n<Footer />\\n\\n<style>\\n  main {\\n    width: var(--width-body);\\n    margin: 0 auto;\\n    margin-bottom: var(--space);\\n  }\\n</style>"],"names":[],"mappings":"AAgBE,IAAI,cAAC,CAAC,AACJ,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,aAAa,CAAE,IAAI,OAAO,CAAC,AAC7B,CAAC"}`
};
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$d);
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

<main role="${"main"}" tabindex="${"-1"}" class="${"svelte-wtju1t"}">${slots.default ? slots.default({}) : ``}</main>

${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
var css$c = {
  code: ".error-page.svelte-1ntmab4.svelte-1ntmab4{display:flex;flex-direction:column;align-items:center;gap:var(--space);margin-block:var(--space);text-align:center}.error-page.svelte-1ntmab4 .svelte-1ntmab4{text-align:center}.error-heading.svelte-1ntmab4.svelte-1ntmab4{font-size:var(--font-size-xxl)}.status.svelte-1ntmab4.svelte-1ntmab4{font-size:var(--font-size-xxl);font-weight:900;text-decoration:underline;text-decoration-color:var(--red);text-decoration-thickness:0.25rem;text-underline-offset:0.5rem}.form-section.svelte-1ntmab4.svelte-1ntmab4{display:flex;justify-content:center}button.svelte-1ntmab4.svelte-1ntmab4{justify-self:center}form.svelte-1ntmab4.svelte-1ntmab4{display:flex;flex-direction:column;gap:var(--space-small);min-width:50vw}textarea.svelte-1ntmab4.svelte-1ntmab4{text-align:left;padding:0.5rem 1rem}@media screen and (max-width: 550px){form.svelte-1ntmab4.svelte-1ntmab4{max-width:100%}}",
  map: `{"version":3,"file":"__error.svelte","sources":["__error.svelte"],"sourcesContent":["<script context=\\"module\\">\\n  export const load = ({error, status}) => {\\n    return {\\n      props: {\\n        status,\\n        error\\n      }\\n    }\\n  };\\n<\/script>\\n<script>\\n  import { slide } from 'svelte/transition';\\n  export let status;\\n  export let error;\\n\\n  let formVisible = false;\\n  \\n  let message = \`Hey Jeff,\\nIt looks like you have a problem on your site!\\nHere's the error message:\\nStatus: \${status}\\nMessage: \${error?.message}\\n\\nGood luck fixing it!\\n\`;\\n\\n  const toggleForm = () => {\\n    formVisible = !formVisible;\\n  }\\n\\n  const sendErrorReport = async() => {\\n    // do something to send the message!\\n  };\\n<\/script>\\n\\n<div class=\\"error-page\\">\\n  <h2 class=\\"error-heading\\">OOPS!</h2>\\n  \\n  <h3 class=\\"status\\">{status}</h3>\\n  \\n  <p class=\\"message\\">{error.message}</p>\\n  <button on:click={toggleForm}>\\n    {formVisible ?  'Nevermind' : 'Let Jeff Know'}\\n  </button>\\n</div>\\n\\n{#if formVisible}\\n<div class=\\"form-section\\" transition:slide>\\n  <form on:submit|preventDefault={sendErrorReport}>\\n    <textarea bind:value={message} rows=\\"8\\"/>\\n    <input type=\\"submit\\" value=\\"Send\\">\\n  </form>\\n</div>\\n{/if}\\n\\n<style>\\n  .error-page {\\n    display: flex;\\n    flex-direction: column;\\n    align-items: center;\\n    gap: var(--space);\\n    margin-block: var(--space);\\n    text-align: center;\\n  }\\n\\n  .error-page * {\\n    text-align: center;\\n  }\\n\\n  .error-heading {\\n    font-size: var(--font-size-xxl);\\n  }\\n\\n  .status{ \\n    font-size: var(--font-size-xxl);\\n    font-weight: 900;\\n    text-decoration: underline;\\n    text-decoration-color: var(--red);\\n    text-decoration-thickness: 0.25rem;\\n    text-underline-offset: 0.5rem;\\n  }\\n  .form-section {\\n    display: flex;\\n    justify-content: center;\\n  }\\n  button {\\n    justify-self: center;\\n  }\\n  form {\\n    display: flex;\\n    flex-direction: column;\\n    gap: var(--space-small);\\n    min-width: 50vw;\\n  }\\n  textarea {\\n    text-align: left;\\n    padding: 0.5rem 1rem;\\n  }\\n\\n  @media screen and (max-width: 550px) {\\n    form {\\n      max-width: 100%;\\n    }\\n  }\\n</style>"],"names":[],"mappings":"AAwDE,WAAW,8BAAC,CAAC,AACX,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,OAAO,CAAC,CACjB,YAAY,CAAE,IAAI,OAAO,CAAC,CAC1B,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,0BAAW,CAAC,eAAE,CAAC,AACb,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,cAAc,8BAAC,CAAC,AACd,SAAS,CAAE,IAAI,eAAe,CAAC,AACjC,CAAC,AAED,qCAAO,CAAC,AACN,SAAS,CAAE,IAAI,eAAe,CAAC,CAC/B,WAAW,CAAE,GAAG,CAChB,eAAe,CAAE,SAAS,CAC1B,qBAAqB,CAAE,IAAI,KAAK,CAAC,CACjC,yBAAyB,CAAE,OAAO,CAClC,qBAAqB,CAAE,MAAM,AAC/B,CAAC,AACD,aAAa,8BAAC,CAAC,AACb,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,AACzB,CAAC,AACD,MAAM,8BAAC,CAAC,AACN,YAAY,CAAE,MAAM,AACtB,CAAC,AACD,IAAI,8BAAC,CAAC,AACJ,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,IAAI,aAAa,CAAC,CACvB,SAAS,CAAE,IAAI,AACjB,CAAC,AACD,QAAQ,8BAAC,CAAC,AACR,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,MAAM,CAAC,IAAI,AACtB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,IAAI,8BAAC,CAAC,AACJ,SAAS,CAAE,IAAI,AACjB,CAAC,AACH,CAAC"}`
};
var load$4 = ({ error: error2, status }) => {
  return { props: { status, error: error2 } };
};
var _error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error: error2 } = $$props;
  `Hey Jeff,
It looks like you have a problem on your site!
Here's the error message:
Status: ${status}
Message: ${error2 == null ? void 0 : error2.message}

Good luck fixing it!
`;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
    $$bindings.error(error2);
  $$result.css.add(css$c);
  return `<div class="${"error-page svelte-1ntmab4"}"><h2 class="${"error-heading svelte-1ntmab4"}">OOPS!</h2>
  
  <h3 class="${"status svelte-1ntmab4"}">${escape2(status)}</h3>
  
  <p class="${"message svelte-1ntmab4"}">${escape2(error2.message)}</p>
  <button class="${"svelte-1ntmab4"}">${escape2("Let Jeff Know")}</button></div>

${``}`;
});
var __error = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _error,
  load: load$4
});
var css$b = {
  code: ".intro-image.svelte-u6ku6p{margin:0;z-index:50;flex:1;pointer-events:none;overflow:hidden;clip-path:polygon(0 0, 99% 0, 99% 99%, 0 99%)}img.svelte-u6ku6p{z-index:5;pointer-events:all;filter:drop-shadow(var(--elevation-05));clip-path:view-box}@media screen and (max-width: 550px){.intro-image.svelte-u6ku6p{position:absolute;top:calc(var(--space) * -1);right:50%;transform:translateX(50%);width:24vw}}@media screen and (max-width: 350px){.intro-image.svelte-u6ku6p{top:calc(var(--space-small) * -1)}}@media screen and (max-width: 603px){.intro-image.svelte-u6ku6p{max-width:40vw}}@media screen and (max-width: 769px){.intro-image.svelte-u6ku6p{max-width:37vw}}@media screen and (max-width: 1700px){.intro-image.svelte-u6ku6p{max-width:32vw}}",
  map: `{"version":3,"file":"IntroImage.svelte","sources":["IntroImage.svelte"],"sourcesContent":["<script>\\n  function imgFunction() {\\n    console.log('DOOOKIE!!');\\n  }\\n<\/script>\\n\\n<section class=\\"intro-image\\">\\n  <img class=\\"image\\" src=\\"/MeIllustration.svg\\" alt=\\"Illustration of Jeff Caldwell.\\" on:mouseenter={imgFunction} on:mouseleave={imgFunction}>\\n</section>\\n\\n<style>\\n  .intro-image {\\n    margin: 0;\\n    z-index: 50;\\n    flex: 1;\\n    pointer-events: none;\\n    overflow: hidden;\\n    clip-path: polygon(0 0, 99% 0, 99% 99%, 0 99%);\\n  }\\n\\n    img { \\n      z-index: 5;\\n      pointer-events: all;\\n      filter: drop-shadow(var(--elevation-05));\\n      clip-path: view-box;\\n    }\\n\\n    @media screen and (max-width: 550px) {\\n      .intro-image {\\n        position: absolute;\\n        top: calc(var(--space) * -1);\\n        right: 50%;\\n        transform: translateX(50%);\\n        width: 24vw;\\n        }\\n    }\\n\\n    @media screen and (max-width: 350px) {\\n      .intro-image {\\n        top: calc(var(--space-small) * -1);\\n      }\\n    }\\n\\n    @media screen and (max-width: 603px) {\\n        .intro-image {\\n            max-width: 40vw;\\n        }\\n    }\\n\\n    @media screen and (max-width: 769px) {\\n        .intro-image {\\n            max-width: 37vw;\\n        }\\n    }\\n\\n    @media screen and (max-width: 1700px) {\\n        .intro-image {\\n            max-width: 32vw;\\n        }\\n    }\\n</style>"],"names":[],"mappings":"AAWE,YAAY,cAAC,CAAC,AACZ,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,EAAE,CACX,IAAI,CAAE,CAAC,CACP,cAAc,CAAE,IAAI,CACpB,QAAQ,CAAE,MAAM,CAChB,SAAS,CAAE,QAAQ,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,AAChD,CAAC,AAEC,GAAG,cAAC,CAAC,AACH,OAAO,CAAE,CAAC,CACV,cAAc,CAAE,GAAG,CACnB,MAAM,CAAE,YAAY,IAAI,cAAc,CAAC,CAAC,CACxC,SAAS,CAAE,QAAQ,AACrB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,YAAY,cAAC,CAAC,AACZ,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,IAAI,OAAO,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAC5B,KAAK,CAAE,GAAG,CACV,SAAS,CAAE,WAAW,GAAG,CAAC,CAC1B,KAAK,CAAE,IAAI,AACX,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,YAAY,cAAC,CAAC,AACZ,GAAG,CAAE,KAAK,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,AACpC,CAAC,AACH,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAClC,YAAY,cAAC,CAAC,AACV,SAAS,CAAE,IAAI,AACnB,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAClC,YAAY,cAAC,CAAC,AACV,SAAS,CAAE,IAAI,AACnB,CAAC,AACL,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AACnC,YAAY,cAAC,CAAC,AACV,SAAS,CAAE,IAAI,AACnB,CAAC,AACL,CAAC"}`
};
var IntroImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$b);
  return `<section class="${"intro-image svelte-u6ku6p"}"><img class="${"image svelte-u6ku6p"}" src="${"/MeIllustration.svg"}" alt="${"Illustration of Jeff Caldwell."}">
</section>`;
});
var css$a = {
  code: "#intro.svelte-suqs54.svelte-suqs54{position:relative;display:flex;align-items:center;z-index:20;font-family:var(--sans)}.intro-border-top.svelte-suqs54.svelte-suqs54{z-index:10;border-top:calc(1vw / 3) solid var(--red);position:absolute;top:var(--space);right:0;left:0;bottom:0;pointer-events:none;box-shadow:var(--elevation-3)}.intro-border-bottom.svelte-suqs54.svelte-suqs54{position:absolute;z-index:60;border:calc(1vw / 3) solid var(--red);border-top:none;top:0;right:0;left:0;bottom:0}.intro_greeting.svelte-suqs54.svelte-suqs54{z-index:100;flex:2;justify-self:stretch}.hero-callout.svelte-suqs54.svelte-suqs54{max-width:60ch;margin:var(--space-small);padding:0;display:block;line-height:1}.hero-callout.svelte-suqs54 .svelte-suqs54{display:block}.greeting.svelte-suqs54.svelte-suqs54{-webkit-text-stroke:calc(1vw / 4.5) var(--red);word-break:break-word;word-wrap:break-word;max-width:10ch;color:var(--whitish);font-size:clamp(var(--size-900), 9vw, 9.969rem);letter-spacing:0.05em;line-height:1;text-shadow:var(--elevation-1)}.greeting.svelte-suqs54.svelte-suqs54::selection{color:var(--red)}.sub-greeting.svelte-suqs54.svelte-suqs54{font-size:clamp(var(--size-600), 5vw, var(--size-900));letter-spacing:0.25rem;color:var(--darkblue);margin-top:var(--space-small)}@media screen and (max-width: 550px){#intro.svelte-suqs54.svelte-suqs54{justify-content:center;margin-inline:auto;background-size:35vw;background-position:top right var(--space)}.sub-greeting.svelte-suqs54.svelte-suqs54{margin-top:0;font-size:clamp(var(--size-400), 4vw, var(--size-700))}.greeting.svelte-suqs54.svelte-suqs54{margin:0;word-break:unset;max-width:unset;-webkit-text-stroke:calc(1vw / 3) var(--red);font-size:clamp(var(--size-700), 6vw, var(--size-800))}.hero-callout.svelte-suqs54.svelte-suqs54{text-align:center}}@media screen and (min-width: 2000px){.greeting.svelte-suqs54.svelte-suqs54{-webkit-text-stroke:calc(1vw / 8) var(--red)}}",
  map: `{"version":3,"file":"IntroSection.svelte","sources":["IntroSection.svelte"],"sourcesContent":["<script>\\n    import IntroImage from '../../IntroImage.svelte'\\n<\/script>\\n\\n<section id=\\"intro\\" class=\\"flow space__outer_bottom\\">\\n    <div class=\\"intro-border-top\\"></div>\\n\\n    <section class=\\"intro_greeting\\">\\n        <h2 class=\\"hero-callout\\">\\n            <span class=\\"greeting\\">\\n                Jeff Caldwell\\n            </span>\\n            <br>\\n            <span class=\\"sub-greeting\\">Makes Websites.</span>\\n        </h2>\\n    </section>\\n    <IntroImage />\\n\\n    <div class=\\"intro-border-bottom\\"></div>\\n</section>\\n\\n\\n\\n<style lang=\\"scss\\">#intro {\\n  position: relative;\\n  display: flex;\\n  align-items: center;\\n  z-index: 20;\\n  font-family: var(--sans);\\n}\\n\\n.intro-border-top {\\n  z-index: 10;\\n  border-top: calc(1vw / 3) solid var(--red);\\n  position: absolute;\\n  top: var(--space);\\n  right: 0;\\n  left: 0;\\n  bottom: 0;\\n  pointer-events: none;\\n  box-shadow: var(--elevation-3);\\n}\\n\\n.intro-border-bottom {\\n  position: absolute;\\n  z-index: 60;\\n  border: calc(1vw / 3) solid var(--red);\\n  border-top: none;\\n  top: 0;\\n  right: 0;\\n  left: 0;\\n  bottom: 0;\\n}\\n\\n.intro_greeting {\\n  z-index: 100;\\n  flex: 2;\\n  justify-self: stretch;\\n}\\n\\n.hero-callout {\\n  max-width: 60ch;\\n  margin: var(--space-small);\\n  padding: 0;\\n  display: block;\\n  line-height: 1;\\n}\\n\\n.hero-callout * {\\n  display: block;\\n}\\n\\n.greeting {\\n  -webkit-text-stroke: calc(1vw / 4.5) var(--red);\\n  word-break: break-word;\\n  word-wrap: break-word;\\n  max-width: 10ch;\\n  color: var(--whitish);\\n  font-size: clamp(var(--size-900), 9vw, 9.969rem);\\n  letter-spacing: 0.05em;\\n  line-height: 1;\\n  text-shadow: var(--elevation-1);\\n}\\n\\n.greeting::selection {\\n  color: var(--red);\\n}\\n\\n.sub-greeting {\\n  font-size: clamp(var(--size-600), 5vw, var(--size-900));\\n  letter-spacing: 0.25rem;\\n  color: var(--darkblue);\\n  margin-top: var(--space-small);\\n}\\n\\n.message {\\n  font-size: clamp(var(--size-500), 3vw, var(--size-600));\\n  max-width: 50ch;\\n  letter-spacing: 0.25rem;\\n}\\n\\na {\\n  color: var(--red);\\n  text-decoration-thickness: 1px;\\n  text-underline-offset: auto;\\n  transition: text-decoration-thickness 300ms ease-out;\\n}\\n\\na:hover {\\n  text-decoration-thickness: 6px;\\n}\\n\\n@media screen and (max-width: 550px) {\\n  #intro {\\n    justify-content: center;\\n    margin-inline: auto;\\n    background-size: 35vw;\\n    background-position: top right var(--space);\\n  }\\n\\n  .sub-greeting {\\n    margin-top: 0;\\n    font-size: clamp(var(--size-400), 4vw, var(--size-700));\\n  }\\n\\n  .greeting {\\n    margin: 0;\\n    word-break: unset;\\n    max-width: unset;\\n    -webkit-text-stroke: calc(1vw / 3) var(--red);\\n    font-size: clamp(var(--size-700), 6vw, var(--size-800));\\n  }\\n\\n  .hero-callout {\\n    text-align: center;\\n  }\\n}\\n@media screen and (min-width: 2000px) {\\n  .greeting {\\n    -webkit-text-stroke: calc(1vw / 8) var(--red);\\n  }\\n}</style>\\n"],"names":[],"mappings":"AAuBmB,MAAM,4BAAC,CAAC,AACzB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,EAAE,CACX,WAAW,CAAE,IAAI,MAAM,CAAC,AAC1B,CAAC,AAED,iBAAiB,4BAAC,CAAC,AACjB,OAAO,CAAE,EAAE,CACX,UAAU,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,IAAI,KAAK,CAAC,CAC1C,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,OAAO,CAAC,CACjB,KAAK,CAAE,CAAC,CACR,IAAI,CAAE,CAAC,CACP,MAAM,CAAE,CAAC,CACT,cAAc,CAAE,IAAI,CACpB,UAAU,CAAE,IAAI,aAAa,CAAC,AAChC,CAAC,AAED,oBAAoB,4BAAC,CAAC,AACpB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,IAAI,KAAK,CAAC,CACtC,UAAU,CAAE,IAAI,CAChB,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,CAAC,CACR,IAAI,CAAE,CAAC,CACP,MAAM,CAAE,CAAC,AACX,CAAC,AAED,eAAe,4BAAC,CAAC,AACf,OAAO,CAAE,GAAG,CACZ,IAAI,CAAE,CAAC,CACP,YAAY,CAAE,OAAO,AACvB,CAAC,AAED,aAAa,4BAAC,CAAC,AACb,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,IAAI,aAAa,CAAC,CAC1B,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,KAAK,CACd,WAAW,CAAE,CAAC,AAChB,CAAC,AAED,2BAAa,CAAC,cAAE,CAAC,AACf,OAAO,CAAE,KAAK,AAChB,CAAC,AAED,SAAS,4BAAC,CAAC,AACT,mBAAmB,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,KAAK,CAAC,CAC/C,UAAU,CAAE,UAAU,CACtB,SAAS,CAAE,UAAU,CACrB,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IAAI,SAAS,CAAC,CACrB,SAAS,CAAE,MAAM,IAAI,UAAU,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,QAAQ,CAAC,CAChD,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,CAAC,CACd,WAAW,CAAE,IAAI,aAAa,CAAC,AACjC,CAAC,AAED,qCAAS,WAAW,AAAC,CAAC,AACpB,KAAK,CAAE,IAAI,KAAK,CAAC,AACnB,CAAC,AAED,aAAa,4BAAC,CAAC,AACb,SAAS,CAAE,MAAM,IAAI,UAAU,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,UAAU,CAAC,CAAC,CACvD,cAAc,CAAE,OAAO,CACvB,KAAK,CAAE,IAAI,UAAU,CAAC,CACtB,UAAU,CAAE,IAAI,aAAa,CAAC,AAChC,CAAC,AAmBD,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,MAAM,4BAAC,CAAC,AACN,eAAe,CAAE,MAAM,CACvB,aAAa,CAAE,IAAI,CACnB,eAAe,CAAE,IAAI,CACrB,mBAAmB,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,OAAO,CAAC,AAC7C,CAAC,AAED,aAAa,4BAAC,CAAC,AACb,UAAU,CAAE,CAAC,CACb,SAAS,CAAE,MAAM,IAAI,UAAU,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,UAAU,CAAC,CAAC,AACzD,CAAC,AAED,SAAS,4BAAC,CAAC,AACT,MAAM,CAAE,CAAC,CACT,UAAU,CAAE,KAAK,CACjB,SAAS,CAAE,KAAK,CAChB,mBAAmB,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,KAAK,CAAC,CAC7C,SAAS,CAAE,MAAM,IAAI,UAAU,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,UAAU,CAAC,CAAC,AACzD,CAAC,AAED,aAAa,4BAAC,CAAC,AACb,UAAU,CAAE,MAAM,AACpB,CAAC,AACH,CAAC,AACD,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AACrC,SAAS,4BAAC,CAAC,AACT,mBAAmB,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,KAAK,CAAC,AAC/C,CAAC,AACH,CAAC"}`
};
var IntroSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$a);
  return `<section id="${"intro"}" class="${"flow space__outer_bottom svelte-suqs54"}"><div class="${"intro-border-top svelte-suqs54"}"></div>

    <section class="${"intro_greeting svelte-suqs54"}"><h2 class="${"hero-callout svelte-suqs54"}"><span class="${"greeting svelte-suqs54"}">Jeff Caldwell
            </span>
            <br class="${"svelte-suqs54"}">
            <span class="${"sub-greeting svelte-suqs54"}">Makes Websites.</span></h2></section>
    ${validate_component(IntroImage, "IntroImage").$$render($$result, {}, {}, {})}

    <div class="${"intro-border-bottom svelte-suqs54"}"></div>
</section>`;
});
var css$9 = {
  code: ".switcher.svelte-15vcgjd{display:grid;grid-template-columns:repeat(auto-fit, minmax(275px, 1fr));grid-gap:var(--space-small)}p{color:var(--blackish)}",
  map: '{"version":3,"file":"FlexSwitcher.svelte","sources":["FlexSwitcher.svelte"],"sourcesContent":["<script>\\n<\/script>\\n\\n<section class=\\"switcher\\">\\n  <slot></slot>\\n</section>\\n\\n<style>\\n  .switcher {\\n    display: grid;\\n    grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));\\n    grid-gap: var(--space-small);\\n  }\\n  :global(p) {\\n    color: var(--blackish);\\n  }\\n</style>"],"names":[],"mappings":"AAQE,SAAS,eAAC,CAAC,AACT,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,OAAO,QAAQ,CAAC,CAAC,OAAO,KAAK,CAAC,CAAC,GAAG,CAAC,CAAC,CAC3D,QAAQ,CAAE,IAAI,aAAa,CAAC,AAC9B,CAAC,AACO,CAAC,AAAE,CAAC,AACV,KAAK,CAAE,IAAI,UAAU,CAAC,AACxB,CAAC"}'
};
var FlexSwitcher = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$9);
  return `<section class="${"switcher svelte-15vcgjd"}">${slots.default ? slots.default({}) : ``}
</section>`;
});
var css$8 = {
  code: ".parent-link.svelte-exn1v7.svelte-exn1v7.svelte-exn1v7{text-decoration:none}.card.svelte-exn1v7.svelte-exn1v7.svelte-exn1v7{display:flex;flex-direction:column;box-shadow:var(--elevation-3);border-right:1px solid rgb(var(--primary-rgb), 0.2);border-bottom:1px solid rgb(var(--primary-rgb), 0.2);transition:box-shadow 200ms ease-out, background-color 200ms ease-out}.card.svelte-exn1v7.svelte-exn1v7.svelte-exn1v7:hover{box-shadow:var(--elevation-4)}.card-image.svelte-exn1v7.svelte-exn1v7.svelte-exn1v7,.card-image img,.content-text.svelte-exn1v7.svelte-exn1v7.svelte-exn1v7{min-width:100%}.card-body.svelte-exn1v7.svelte-exn1v7.svelte-exn1v7{display:flex;flex-direction:column;flex:3;padding:var(--space-xsmall)}.card-body.svelte-exn1v7>.svelte-exn1v7+.svelte-exn1v7{margin-top:1rem}.card h3{color:var(--red);text-align:center;letter-spacing:0.2em;font-size:var(--font-size-medium);text-align:center;transition:color 300ms ease-out}.card:hover h3{color:var(--darkblue)}.card.svelte-exn1v7:hover .status.svelte-exn1v7.svelte-exn1v7{background:var(--whitish);color:var(--secondary)}header.svelte-exn1v7.svelte-exn1v7.svelte-exn1v7{display:flex;flex-direction:column;align-items:center;position:relative;gap:var(--space-xsmall)}.status.svelte-exn1v7.svelte-exn1v7.svelte-exn1v7{position:absolute;top:calc(var(--space-xsmall) * -1);right:calc(var(--space-xsmall) * -1);font-size:var(--font-size-xsmall);color:var(--whitish);font-weight:600;letter-spacing:0.125rem;text-transform:uppercase;border-left:1px solid var(--red);border-bottom:1px solid var(--red);padding:0.25rem;line-height:1;background:var(--red);transition:all 300ms ease-out;text-align:center}@media screen and (min-width: 1024px){.card-image.svelte-exn1v7.svelte-exn1v7.svelte-exn1v7,.card-image > img,.content-text p{min-width:50%}.card-image.svelte-exn1v7.svelte-exn1v7.svelte-exn1v7,.content-text.svelte-exn1v7.svelte-exn1v7.svelte-exn1v7{display:flex;justify-content:center;padding-block:var(--space-small)}.card h3{font-size:var(--font-size-large)}}",
  map: '{"version":3,"file":"Card.svelte","sources":["Card.svelte"],"sourcesContent":["<script>\\n  export let status = \\"\\"; // can also be \\"Ongoing\\" || \\"Complete\\";\\n  export let title;\\n  export let link;\\n  export let subtitle;\\n<\/script>\\n\\n<a href={link} class=\\"parent-link\\">\\n  <article class=\\"card\\">\\n    <section class=\\"card-body flow\\">\\n      <header>\\n        {#if status === \\"Ongoing\\"}\\n          <h4 class=\\"status\\">{status}</h4>\\n        {/if}\\n\\n        {#if title}\\n        <h3>{title}</h3>\\n        {/if}\\n        {#if subtitle}\\n        <h4>{subtitle}</h4>\\n        {/if}\\n        <slot name=\\"title\\"></slot>\\n      </header>\\n      <section class=\\"card-image\\">\\n        <slot name=\\"image\\"></slot>\\n      </section>\\n      <section class=\\"content-text\\">\\n        <slot name=\\"content\\"></slot>\\n      </section>\\n    </section>\\n  </article>\\n</a>\\n\\n<style>\\n  .parent-link {\\n    text-decoration: none;\\n  }\\n  .card {\\n    display: flex;\\n    flex-direction: column;\\n    box-shadow: var(--elevation-3);\\n    /* border-top: 1px solid rgb(var(--primary-rgb), 0.1);\\n    border-left: 1px solid rgb(var(--primary-rgb), 0.1); */\\n    border-right: 1px solid rgb(var(--primary-rgb), 0.2);\\n    border-bottom: 1px solid rgb(var(--primary-rgb), 0.2);\\n    transition: box-shadow 200ms ease-out, background-color 200ms ease-out;\\n  }\\n  \\n  .card:hover {\\n    box-shadow: var(--elevation-4);\\n  }\\n  \\n  .card-image, :global(.card-image img), .content-text {\\n    min-width: 100%;\\n    /* width: 100%; */\\n    /* flex: 2; */\\n  }\\n\\n  .card-body {\\n    display: flex;\\n    flex-direction: column;\\n    flex: 3;\\n    padding: var(--space-xsmall);\\n  }\\n\\n  .card-body > * + * {\\n    margin-top: 1rem;\\n  }\\n  :global(.card h3) {\\n    color: var(--red);\\n    text-align: center;\\n    letter-spacing: 0.2em;\\n    /* font-weight: 900; */\\n    font-size: var(--font-size-medium);\\n    text-align: center;\\n    transition: color 300ms ease-out;\\n  }\\n\\n  :global(.card:hover h3) {\\n    color: var(--darkblue);\\n  }\\n  .card:hover .status {\\n    background: var(--whitish);\\n    color: var(--secondary);\\n  }\\n\\n  header {\\n    display: flex;\\n    flex-direction: column;\\n    align-items: center;\\n    position: relative;\\n    gap: var(--space-xsmall);\\n  }\\n  .status {\\n    position: absolute;\\n    top: calc(var(--space-xsmall) * -1);\\n    right: calc(var(--space-xsmall) * -1);\\n    font-size: var(--font-size-xsmall);\\n    color: var(--whitish);\\n    font-weight: 600;\\n    letter-spacing: 0.125rem;\\n    text-transform: uppercase;\\n    border-left: 1px solid var(--red);\\n    border-bottom: 1px solid var(--red);\\n    padding: 0.25rem;\\n    line-height: 1;\\n    background: var(--red);\\n    transition: all 300ms ease-out;\\n    text-align: center;\\n  }\\n\\n  @media screen and (min-width: 1024px) {\\n    .card-image, :global(.card-image > img), :global(.content-text p) {\\n      min-width: 50%;\\n    }\\n    .card-image, .content-text {\\n      display: flex;\\n      justify-content: center;\\n      padding-block: var(--space-small);\\n    }\\n    :global(.card h3) {\\n      font-size: var(--font-size-large);\\n    }\\n\\n  }\\n</style>"],"names":[],"mappings":"AAkCE,YAAY,0CAAC,CAAC,AACZ,eAAe,CAAE,IAAI,AACvB,CAAC,AACD,KAAK,0CAAC,CAAC,AACL,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,UAAU,CAAE,IAAI,aAAa,CAAC,CAG9B,YAAY,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,IAAI,aAAa,CAAC,CAAC,CAAC,GAAG,CAAC,CACpD,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,IAAI,aAAa,CAAC,CAAC,CAAC,GAAG,CAAC,CACrD,UAAU,CAAE,UAAU,CAAC,KAAK,CAAC,QAAQ,CAAC,CAAC,gBAAgB,CAAC,KAAK,CAAC,QAAQ,AACxE,CAAC,AAED,+CAAK,MAAM,AAAC,CAAC,AACX,UAAU,CAAE,IAAI,aAAa,CAAC,AAChC,CAAC,AAED,qDAAW,CAAU,eAAe,AAAC,CAAE,aAAa,0CAAC,CAAC,AACpD,SAAS,CAAE,IAAI,AAGjB,CAAC,AAED,UAAU,0CAAC,CAAC,AACV,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,IAAI,cAAc,CAAC,AAC9B,CAAC,AAED,wBAAU,CAAG,cAAC,CAAG,cAAE,CAAC,AAClB,UAAU,CAAE,IAAI,AAClB,CAAC,AACO,QAAQ,AAAE,CAAC,AACjB,KAAK,CAAE,IAAI,KAAK,CAAC,CACjB,UAAU,CAAE,MAAM,CAClB,cAAc,CAAE,KAAK,CAErB,SAAS,CAAE,IAAI,kBAAkB,CAAC,CAClC,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,KAAK,CAAC,KAAK,CAAC,QAAQ,AAClC,CAAC,AAEO,cAAc,AAAE,CAAC,AACvB,KAAK,CAAE,IAAI,UAAU,CAAC,AACxB,CAAC,AACD,mBAAK,MAAM,CAAC,OAAO,4BAAC,CAAC,AACnB,UAAU,CAAE,IAAI,SAAS,CAAC,CAC1B,KAAK,CAAE,IAAI,WAAW,CAAC,AACzB,CAAC,AAED,MAAM,0CAAC,CAAC,AACN,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,cAAc,CAAC,AAC1B,CAAC,AACD,OAAO,0CAAC,CAAC,AACP,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,IAAI,cAAc,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CACnC,KAAK,CAAE,KAAK,IAAI,cAAc,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CACrC,SAAS,CAAE,IAAI,kBAAkB,CAAC,CAClC,KAAK,CAAE,IAAI,SAAS,CAAC,CACrB,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,QAAQ,CACxB,cAAc,CAAE,SAAS,CACzB,WAAW,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,KAAK,CAAC,CACjC,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,KAAK,CAAC,CACnC,OAAO,CAAE,OAAO,CAChB,WAAW,CAAE,CAAC,CACd,UAAU,CAAE,IAAI,KAAK,CAAC,CACtB,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,QAAQ,CAC9B,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AACrC,qDAAW,CAAU,iBAAiB,AAAC,CAAU,eAAe,AAAE,CAAC,AACjE,SAAS,CAAE,GAAG,AAChB,CAAC,AACD,qDAAW,CAAE,aAAa,0CAAC,CAAC,AAC1B,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,aAAa,CAAE,IAAI,aAAa,CAAC,AACnC,CAAC,AACO,QAAQ,AAAE,CAAC,AACjB,SAAS,CAAE,IAAI,iBAAiB,CAAC,AACnC,CAAC,AAEH,CAAC"}'
};
var Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status = "" } = $$props;
  let { title } = $$props;
  let { link } = $$props;
  let { subtitle } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.link === void 0 && $$bindings.link && link !== void 0)
    $$bindings.link(link);
  if ($$props.subtitle === void 0 && $$bindings.subtitle && subtitle !== void 0)
    $$bindings.subtitle(subtitle);
  $$result.css.add(css$8);
  return `<a${add_attribute("href", link, 0)} class="${"parent-link svelte-exn1v7"}"><article class="${"card svelte-exn1v7"}"><section class="${"card-body flow svelte-exn1v7"}"><header class="${"svelte-exn1v7"}">${status === "Ongoing" ? `<h4 class="${"status svelte-exn1v7"}">${escape2(status)}</h4>` : ``}

        ${title ? `<h3>${escape2(title)}</h3>` : ``}
        ${subtitle ? `<h4>${escape2(subtitle)}</h4>` : ``}
        ${slots.title ? slots.title({}) : ``}</header>
      <section class="${"card-image svelte-exn1v7"}">${slots.image ? slots.image({}) : ``}</section>
      <section class="${"content-text svelte-exn1v7"}">${slots.content ? slots.content({}) : ``}</section></section></article>
</a>`;
});
var css$7 = {
  code: "#work .switcher{margin-top:var(--space)}",
  map: `{"version":3,"file":"ServicesSection.svelte","sources":["ServicesSection.svelte"],"sourcesContent":["<script>\\n  import FlexSwitcher from '../../FlexSwitcher.svelte';\\n  import Card from '../../Card.svelte';\\n<\/script>\\n\\n<section id=\\"work\\" class=\\"width__body\\">\\n  <header class=\\"section-header\\">\\n    <h2 class=\\"section-title\\">Services</h2>\\n  </header>\\n  <FlexSwitcher>\\n    <Card link=\\"/services/web-development\\">\\n      <h3 slot=\\"title\\">Web<br>Development</h3>\\n      <p slot=\\"content\\">This is going to be a blurb about making awesome websites.</p>\\n    </Card>\\n    <Card link=\\"/services/web-design\\">\\n      <h3 slot=\\"title\\">Web<br>Design</h3>\\n      <p slot=\\"content\\">This is going to be a blurb about making awesome websites.</p>\\n    </Card>\\n    <Card link=\\"/services/wordpress-development\\">\\n      <h3 slot=\\"title\\">WordPress<br>Development</h3>\\n      <p slot=\\"content\\">This is going to be a blurb about making awesome websites.</p>\\n    </Card>\\n  </FlexSwitcher>\\n</section>\\n\\n<style>\\n\\n  :global(#work .switcher) {\\n    margin-top: var(--space);\\n  }\\n</style>"],"names":[],"mappings":"AA2BU,eAAe,AAAE,CAAC,AACxB,UAAU,CAAE,IAAI,OAAO,CAAC,AAC1B,CAAC"}`
};
var ServicesSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$7);
  return `<section id="${"work"}" class="${"width__body"}"><header class="${"section-header"}"><h2 class="${"section-title"}">Services</h2></header>
  ${validate_component(FlexSwitcher, "FlexSwitcher").$$render($$result, {}, {}, {
    default: () => `${validate_component(Card, "Card").$$render($$result, { link: "/services/web-development" }, {}, {
      content: () => `<p slot="${"content"}">This is going to be a blurb about making awesome websites.</p>`,
      title: () => `<h3 slot="${"title"}">Web<br>Development</h3>`
    })}
    ${validate_component(Card, "Card").$$render($$result, { link: "/services/web-design" }, {}, {
      content: () => `<p slot="${"content"}">This is going to be a blurb about making awesome websites.</p>`,
      title: () => `<h3 slot="${"title"}">Web<br>Design</h3>`
    })}
    ${validate_component(Card, "Card").$$render($$result, { link: "/services/wordpress-development" }, {}, {
      content: () => `<p slot="${"content"}">This is going to be a blurb about making awesome websites.</p>`,
      title: () => `<h3 slot="${"title"}">WordPress<br>Development</h3>`
    })}`
  })}
</section>`;
});
var ProjectsSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section id="${"work"}" class="${"width__body"}"><header class="${"section-header"}"><h2 class="${"section-title"}">Work</h2>
    <p class="${"landing-description"}">My goal is to make fast, accessible, great-looking websites and web applications.<br>
      The projects below showcase my commitment to that goal. <br></p></header>
  ${validate_component(FlexSwitcher, "FlexSwitcher").$$render($$result, {}, {}, {
    default: () => `${validate_component(Card, "Card").$$render($$result, {
      link: "/work/feedme",
      status: "Ongoing",
      title: "FeedMe",
      subtitle: "The simple RSS reader"
    }, {}, {
      image: () => `<img src="${"/FeedMe-Screenshot.png"}" alt="${"FeedMe front page interface."}" slot="${"image"}">`,
      content: () => `<p slot="${"content"}">This is a moderate amount of content that I&#39;ll use to take up some space temporarily.
      </p>`
    })}
    `
  })}
</section>`;
});
var css$6 = {
  code: ".intro.svelte-zzaaaz{z-index:10}.services.svelte-zzaaaz{margin-top:var(--space)}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script>\\n    import Intro from '$lib/components/partials/home/IntroSection.svelte';\\n    import ServicesSection from '$lib/components/partials/home/ServicesSection.svelte';\\n    import ProjectsSection from '$lib/components/partials/home/ProjectsSection.svelte';\\n\\n<\/script>\\n<section class=\\"intro\\">\\n  <Intro />\\n</section>\\n<section class=\\"projects\\">\\n  <ProjectsSection />\\n</section>\\n<section class=\\"services\\">\\n  <ServicesSection />\\n</section>\\n\\n<style>\\n  .intro {\\n    z-index: 10;\\n  }\\n  .services {\\n    margin-top: var(--space);\\n  }\\n</style>"],"names":[],"mappings":"AAiBE,MAAM,cAAC,CAAC,AACN,OAAO,CAAE,EAAE,AACb,CAAC,AACD,SAAS,cAAC,CAAC,AACT,UAAU,CAAE,IAAI,OAAO,CAAC,AAC1B,CAAC"}`
};
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$6);
  return `<section class="${"intro svelte-zzaaaz"}">${validate_component(IntroSection, "Intro").$$render($$result, {}, {}, {})}</section>
<section class="${"projects"}">${validate_component(ProjectsSection, "ProjectsSection").$$render($$result, {}, {}, {})}</section>
<section class="${"services svelte-zzaaaz"}">${validate_component(ServicesSection, "ServicesSection").$$render($$result, {}, {}, {})}
</section>`;
});
var index$a = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes
});
var css$5 = {
  code: ".post-item.svelte-1rp94rm>.svelte-1rp94rm+.svelte-1rp94rm{margin-top:0.75rem}h4.svelte-1rp94rm.svelte-1rp94rm.svelte-1rp94rm{font-size:var(--font-size-small)}.post-item.svelte-1rp94rm a.svelte-1rp94rm.svelte-1rp94rm{text-decoration-color:var(--red);color:var(--red);transition:color 300ms ease-out, text-decoration-color 300ms ease-out}.post-item.svelte-1rp94rm a.svelte-1rp94rm.svelte-1rp94rm:hover{color:var(--dark-blue);text-decoration-color:transparent}",
  map: '{"version":3,"file":"PostItem.svelte","sources":["PostItem.svelte"],"sourcesContent":["<script>\\n  export let post;\\n<\/script>\\n\\n<article class=\\"post-item\\">\\n  <h3>\\n    <a href=\\"/writing/{post.slug}\\">\\n      {post.title}\\n    </a>\\n  </h3> \\n    <h4>{post.created}</h4>\\n  <p>{post.excerpt}</p>\\n</article>\\n\\n<style>\\n  .post-item > * + * {\\n    margin-top: 0.75rem;\\n  }\\n  h4 {\\n    font-size: var(--font-size-small);\\n  }\\n  .post-item a {\\n    text-decoration-color: var(--red);\\n    color: var(--red);\\n    transition: color 300ms ease-out, text-decoration-color 300ms ease-out;\\n  }\\n\\n  .post-item a:hover {\\n    color: var(--dark-blue);\\n    text-decoration-color: transparent;\\n  }\\n</style>"],"names":[],"mappings":"AAeE,yBAAU,CAAG,eAAC,CAAG,eAAE,CAAC,AAClB,UAAU,CAAE,OAAO,AACrB,CAAC,AACD,EAAE,6CAAC,CAAC,AACF,SAAS,CAAE,IAAI,iBAAiB,CAAC,AACnC,CAAC,AACD,yBAAU,CAAC,CAAC,8BAAC,CAAC,AACZ,qBAAqB,CAAE,IAAI,KAAK,CAAC,CACjC,KAAK,CAAE,IAAI,KAAK,CAAC,CACjB,UAAU,CAAE,KAAK,CAAC,KAAK,CAAC,QAAQ,CAAC,CAAC,qBAAqB,CAAC,KAAK,CAAC,QAAQ,AACxE,CAAC,AAED,yBAAU,CAAC,+BAAC,MAAM,AAAC,CAAC,AAClB,KAAK,CAAE,IAAI,WAAW,CAAC,CACvB,qBAAqB,CAAE,WAAW,AACpC,CAAC"}'
};
var PostItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { post } = $$props;
  if ($$props.post === void 0 && $$bindings.post && post !== void 0)
    $$bindings.post(post);
  $$result.css.add(css$5);
  return `<article class="${"post-item svelte-1rp94rm"}"><h3 class="${"svelte-1rp94rm"}"><a href="${"/writing/" + escape2(post.slug)}" class="${"svelte-1rp94rm"}">${escape2(post.title)}</a></h3> 
    <h4 class="${"svelte-1rp94rm"}">${escape2(post.created)}</h4>
  <p class="${"svelte-1rp94rm"}">${escape2(post.excerpt)}</p>
</article>`;
});
var load$3 = async ({ fetch: fetch2 }) => {
  const response = await fetch2("/writing.json");
  const { posts } = await response.json();
  return { props: { posts } };
};
var Writing$2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { posts } = $$props;
  if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0)
    $$bindings.posts(posts);
  return `<section class="${"flow space__outer_top"}">${each(posts, (post) => `${validate_component(PostItem, "PostItem").$$render($$result, { post }, {}, {})}`)}
</section>`;
});
var index$9 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Writing$2,
  load: load$3
});
var css$4 = {
  code: ".post-header.svelte-1nv9e5y>.svelte-1nv9e5y+.svelte-1nv9e5y{margin-top:0.5rem}.title.svelte-1nv9e5y.svelte-1nv9e5y.svelte-1nv9e5y{font-size:var(--font-size-xl);font-weight:900}.sub-header.svelte-1nv9e5y.svelte-1nv9e5y.svelte-1nv9e5y{display:flex;flex-wrap:wrap;justify-content:space-between;gap:var(--space-small);margin-inline:0.5rem}.post-meta.svelte-1nv9e5y.svelte-1nv9e5y.svelte-1nv9e5y{font-weight:500;font-size:var(--font-size-small);color:var(--darkblue);text-decoration:underline;color:var(--red);text-underline-offset:0.75rem;text-decoration-thickness:2px}.nav-list.svelte-1nv9e5y.svelte-1nv9e5y.svelte-1nv9e5y{display:flex;flex-wrap:wrap;gap:1rem;font-size:var(--font-size-small)}.nav-list.svelte-1nv9e5y a.svelte-1nv9e5y.svelte-1nv9e5y{color:var(--red);text-decoration:underline;transition:color 300ms ease-out, text-decoration-color 300ms ease-out}.nav-list.svelte-1nv9e5y a.svelte-1nv9e5y.svelte-1nv9e5y:hover{text-decoration-color:transparent;color:var(--darkblue)}",
  map: `{"version":3,"file":"writing.svelte","sources":["writing.svelte"],"sourcesContent":["<script>\\n  export let title = '';\\n  export let author = 'Jeff Caldwell';\\n  export let created;\\n  export let slug;\\n  export let subtitle = '';\\n  export let tags = [];\\n<\/script>\\n\\n\\n<section class=\\"flow post\\">\\n  <section class=\\"post-header\\">\\n    <h2 class=\\"title\\">{title}</h2>\\n    \\n    <div class=\\"sub-header\\">\\n      <h3 class=\\"post-meta\\">by {author} on {created}</h3>\\n      <nav class=\\"nav-list\\">\\n        {#each tags as tag}\\n          <a href=\\"/tag/{tag}\\" class=\\"tag\\">{tag}</a>\\n        {/each}\\n      </nav>\\n    </div>\\n  </section>\\n  <slot></slot>\\n</section>\\n\\n<style>\\n  .post-header > * + *{\\n    margin-top: 0.5rem;\\n  }\\n  .title {\\n    font-size: var(--font-size-xl);\\n    font-weight: 900;\\n  }\\n  .sub-header {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-between;\\n    gap: var(--space-small);\\n    margin-inline: 0.5rem;\\n  }\\n  .post-meta {\\n    font-weight: 500;\\n    font-size: var(--font-size-small);\\n    color: var(--darkblue);\\n    text-decoration: underline;\\n    color: var(--red);\\n    text-underline-offset: 0.75rem;\\n    text-decoration-thickness: 2px;\\n  }\\n  .nav-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    gap: 1rem;\\n    font-size: var(--font-size-small);\\n  }\\n\\n  .nav-list a {\\n    color: var(--red);\\n    text-decoration: underline;\\n    transition: color 300ms ease-out, text-decoration-color 300ms ease-out;\\n  }\\n\\n  .nav-list a:hover {\\n    text-decoration-color: transparent;\\n    color: var(--darkblue);\\n  }\\n</style>"],"names":[],"mappings":"AA2BE,2BAAY,CAAG,eAAC,CAAG,eAAC,CAAC,AACnB,UAAU,CAAE,MAAM,AACpB,CAAC,AACD,MAAM,6CAAC,CAAC,AACN,SAAS,CAAE,IAAI,cAAc,CAAC,CAC9B,WAAW,CAAE,GAAG,AAClB,CAAC,AACD,WAAW,6CAAC,CAAC,AACX,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,eAAe,CAAE,aAAa,CAC9B,GAAG,CAAE,IAAI,aAAa,CAAC,CACvB,aAAa,CAAE,MAAM,AACvB,CAAC,AACD,UAAU,6CAAC,CAAC,AACV,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,iBAAiB,CAAC,CACjC,KAAK,CAAE,IAAI,UAAU,CAAC,CACtB,eAAe,CAAE,SAAS,CAC1B,KAAK,CAAE,IAAI,KAAK,CAAC,CACjB,qBAAqB,CAAE,OAAO,CAC9B,yBAAyB,CAAE,GAAG,AAChC,CAAC,AACD,SAAS,6CAAC,CAAC,AACT,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,GAAG,CAAE,IAAI,CACT,SAAS,CAAE,IAAI,iBAAiB,CAAC,AACnC,CAAC,AAED,wBAAS,CAAC,CAAC,8BAAC,CAAC,AACX,KAAK,CAAE,IAAI,KAAK,CAAC,CACjB,eAAe,CAAE,SAAS,CAC1B,UAAU,CAAE,KAAK,CAAC,KAAK,CAAC,QAAQ,CAAC,CAAC,qBAAqB,CAAC,KAAK,CAAC,QAAQ,AACxE,CAAC,AAED,wBAAS,CAAC,+BAAC,MAAM,AAAC,CAAC,AACjB,qBAAqB,CAAE,WAAW,CAClC,KAAK,CAAE,IAAI,UAAU,CAAC,AACxB,CAAC"}`
};
var Writing$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { author = "Jeff Caldwell" } = $$props;
  let { created } = $$props;
  let { slug } = $$props;
  let { subtitle = "" } = $$props;
  let { tags = [] } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.author === void 0 && $$bindings.author && author !== void 0)
    $$bindings.author(author);
  if ($$props.created === void 0 && $$bindings.created && created !== void 0)
    $$bindings.created(created);
  if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0)
    $$bindings.slug(slug);
  if ($$props.subtitle === void 0 && $$bindings.subtitle && subtitle !== void 0)
    $$bindings.subtitle(subtitle);
  if ($$props.tags === void 0 && $$bindings.tags && tags !== void 0)
    $$bindings.tags(tags);
  $$result.css.add(css$4);
  return `<section class="${"flow post"}"><section class="${"post-header svelte-1nv9e5y"}"><h2 class="${"title svelte-1nv9e5y"}">${escape2(title)}</h2>
    
    <div class="${"sub-header svelte-1nv9e5y"}"><h3 class="${"post-meta svelte-1nv9e5y"}">by ${escape2(author)} on ${escape2(created)}</h3>
      <nav class="${"nav-list svelte-1nv9e5y"}">${each(tags, (tag) => `<a href="${"/tag/" + escape2(tag)}" class="${"tag svelte-1nv9e5y"}">${escape2(tag)}</a>`)}</nav></div></section>
  ${slots.default ? slots.default({}) : ``}
</section>`;
});
var metadata$3 = {
  "title": "Making an RSS reader - Part 1",
  "author": "Jeff Caldwell",
  "created": "July, 24, 2021",
  "slug": "making-an-rss-reader-1",
  "subtitle": "How I got started building FeedMe",
  "excerpt": "Getting started with a new project comes with a lot of considerations. Luckily, modern tools make it easier than ever.",
  "tags": ["SvelteKit", "Web Dev", "CSS", "JavaScript", "HTML", "FeedMe"]
};
var Making_an_rss_reader_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Writing$1, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$3), {}, {
    default: () => `<h2>Getting started with FeedMe</h2>`
  })}`;
});
var index$8 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Making_an_rss_reader_1,
  metadata: metadata$3
});
var metadata$2 = {
  "title": "Third Test",
  "author": "Jeff Caldwell",
  "created": "July 7, 2021",
  "excerpt": "This is another excerpt in order to fill up some space.",
  "subtitle": "",
  "slug": "third-test",
  "tags": ["one", "two", "three", "SvelteKit", "Web Dev", "CSS", "JavaScript", "HTML"]
};
var Test_three = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Writing$1, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$2), {}, {
    default: () => `<p>Just more testing!</p>`
  })}`;
});
var index$7 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Test_three,
  metadata: metadata$2
});
var metadata$1 = {
  "title": "Test Post",
  "author": "Jeff Caldwell",
  "created": "July, 4, 2021",
  "slug": "test-post",
  "subtitle": "Testing, testing!",
  "excerpt": "This is a test post that we'll use to judge what the layout and design looks like when there's some content.",
  "tags": ["SvelteKit", "Web Dev", "CSS", "JavaScript", "HTML"]
};
var Test_post = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Writing$1, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$1), {}, {
    default: () => `<p>Okay, this is a paragraph so I can see what\u2019s what. I\u2019ll be writing more and more in this space as time goes on, so I want to make sure it looks good.</p>
<p>There are going to be paragraphs, lists, images, figures, headings, etc, etc.</p>`
  })}`;
});
var index$6 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Test_post,
  metadata: metadata$1
});
var metadata = {
  "title": "Second Test",
  "author": "Jeff Caldwell",
  "created": "July 6, 2021",
  "excerpt": "This is another excerpt in order to fill up some space.",
  "subtitle": "",
  "slug": "second-test",
  "tags": ["one", "two", "three"]
};
var Test_two = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Writing$1, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => `<p>Just more testing!</p>`
  })}`;
});
var index$5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Test_two,
  metadata
});
var css$3 = {
  code: ".post-header.svelte-1nv9e5y>.svelte-1nv9e5y+.svelte-1nv9e5y{margin-top:0.5rem}.title.svelte-1nv9e5y.svelte-1nv9e5y.svelte-1nv9e5y{font-size:var(--font-size-xl);font-weight:900}.sub-header.svelte-1nv9e5y.svelte-1nv9e5y.svelte-1nv9e5y{display:flex;flex-wrap:wrap;justify-content:space-between;gap:var(--space-small);margin-inline:0.5rem}.post-meta.svelte-1nv9e5y.svelte-1nv9e5y.svelte-1nv9e5y{font-weight:500;font-size:var(--font-size-small);color:var(--darkblue);text-decoration:underline;color:var(--red);text-underline-offset:0.75rem;text-decoration-thickness:2px}.nav-list.svelte-1nv9e5y.svelte-1nv9e5y.svelte-1nv9e5y{display:flex;flex-wrap:wrap;gap:1rem;font-size:var(--font-size-small)}.nav-list.svelte-1nv9e5y a.svelte-1nv9e5y.svelte-1nv9e5y{color:var(--red);text-decoration:underline;transition:color 300ms ease-out, text-decoration-color 300ms ease-out}.nav-list.svelte-1nv9e5y a.svelte-1nv9e5y.svelte-1nv9e5y:hover{text-decoration-color:transparent;color:var(--darkblue)}",
  map: `{"version":3,"file":"writing.svelte","sources":["writing.svelte"],"sourcesContent":["<script>\\n  export let title = '';\\n  export let author = 'Jeff Caldwell';\\n  export let created;\\n  export let slug;\\n  export let subtitle = '';\\n  export let tags = [];\\n<\/script>\\n\\n\\n<section class=\\"flow post\\">\\n  <section class=\\"post-header\\">\\n    <h2 class=\\"title\\">{title}</h2>\\n    \\n    <div class=\\"sub-header\\">\\n      <h3 class=\\"post-meta\\">by {author} on {created}</h3>\\n      <nav class=\\"nav-list\\">\\n        {#each tags as tag}\\n          <a href=\\"/tag/{tag}\\" class=\\"tag\\">{tag}</a>\\n        {/each}\\n      </nav>\\n    </div>\\n  </section>\\n  <slot></slot>\\n</section>\\n\\n<style>\\n  .post-header > * + *{\\n    margin-top: 0.5rem;\\n  }\\n  .title {\\n    font-size: var(--font-size-xl);\\n    font-weight: 900;\\n  }\\n  .sub-header {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-between;\\n    gap: var(--space-small);\\n    margin-inline: 0.5rem;\\n  }\\n  .post-meta {\\n    font-weight: 500;\\n    font-size: var(--font-size-small);\\n    color: var(--darkblue);\\n    text-decoration: underline;\\n    color: var(--red);\\n    text-underline-offset: 0.75rem;\\n    text-decoration-thickness: 2px;\\n  }\\n  .nav-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    gap: 1rem;\\n    font-size: var(--font-size-small);\\n  }\\n\\n  .nav-list a {\\n    color: var(--red);\\n    text-decoration: underline;\\n    transition: color 300ms ease-out, text-decoration-color 300ms ease-out;\\n  }\\n\\n  .nav-list a:hover {\\n    text-decoration-color: transparent;\\n    color: var(--darkblue);\\n  }\\n</style>"],"names":[],"mappings":"AA2BE,2BAAY,CAAG,eAAC,CAAG,eAAC,CAAC,AACnB,UAAU,CAAE,MAAM,AACpB,CAAC,AACD,MAAM,6CAAC,CAAC,AACN,SAAS,CAAE,IAAI,cAAc,CAAC,CAC9B,WAAW,CAAE,GAAG,AAClB,CAAC,AACD,WAAW,6CAAC,CAAC,AACX,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,eAAe,CAAE,aAAa,CAC9B,GAAG,CAAE,IAAI,aAAa,CAAC,CACvB,aAAa,CAAE,MAAM,AACvB,CAAC,AACD,UAAU,6CAAC,CAAC,AACV,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,iBAAiB,CAAC,CACjC,KAAK,CAAE,IAAI,UAAU,CAAC,CACtB,eAAe,CAAE,SAAS,CAC1B,KAAK,CAAE,IAAI,KAAK,CAAC,CACjB,qBAAqB,CAAE,OAAO,CAC9B,yBAAyB,CAAE,GAAG,AAChC,CAAC,AACD,SAAS,6CAAC,CAAC,AACT,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,GAAG,CAAE,IAAI,CACT,SAAS,CAAE,IAAI,iBAAiB,CAAC,AACnC,CAAC,AAED,wBAAS,CAAC,CAAC,8BAAC,CAAC,AACX,KAAK,CAAE,IAAI,KAAK,CAAC,CACjB,eAAe,CAAE,SAAS,CAC1B,UAAU,CAAE,KAAK,CAAC,KAAK,CAAC,QAAQ,CAAC,CAAC,qBAAqB,CAAC,KAAK,CAAC,QAAQ,AACxE,CAAC,AAED,wBAAS,CAAC,+BAAC,MAAM,AAAC,CAAC,AACjB,qBAAqB,CAAE,WAAW,CAClC,KAAK,CAAE,IAAI,UAAU,CAAC,AACxB,CAAC"}`
};
var Writing = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { author = "Jeff Caldwell" } = $$props;
  let { created } = $$props;
  let { slug } = $$props;
  let { subtitle = "" } = $$props;
  let { tags = [] } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.author === void 0 && $$bindings.author && author !== void 0)
    $$bindings.author(author);
  if ($$props.created === void 0 && $$bindings.created && created !== void 0)
    $$bindings.created(created);
  if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0)
    $$bindings.slug(slug);
  if ($$props.subtitle === void 0 && $$bindings.subtitle && subtitle !== void 0)
    $$bindings.subtitle(subtitle);
  if ($$props.tags === void 0 && $$bindings.tags && tags !== void 0)
    $$bindings.tags(tags);
  $$result.css.add(css$3);
  return `<section class="${"flow post"}"><section class="${"post-header svelte-1nv9e5y"}"><h2 class="${"title svelte-1nv9e5y"}">${escape2(title)}</h2>
    
    <div class="${"sub-header svelte-1nv9e5y"}"><h3 class="${"post-meta svelte-1nv9e5y"}">by ${escape2(author)} on ${escape2(created)}</h3>
      <nav class="${"nav-list svelte-1nv9e5y"}">${each(tags, (tag) => `<a href="${"/tag/" + escape2(tag)}" class="${"tag svelte-1nv9e5y"}">${escape2(tag)}</a>`)}</nav></div></section>
  ${slots.default ? slots.default({}) : ``}
</section>`;
});
var writing = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Writing
});
var css$2 = {
  code: ".work-section.svelte-14laxvf{margin-block:var(--space-small)}",
  map: `{"version":3,"file":"work.svelte","sources":["work.svelte"],"sourcesContent":["<script>\\n  export let name;\\n  export let tagline;\\n  export let featureImageUrl;\\n  export let featureImageDescription;\\n<\/script>\\n\\n<section class=\\"work-section flow\\">\\n  <header class=\\"work-header flow-small\\">\\n    {#if featureImageUrl}\\n    <img src=\\"{featureImageUrl}\\" alt=\\"{featureImageDescription ? featureImageDescription : ''}\\">\\n    {/if}\\n\\n    <h2>{name}</h2>\\n    <h3>{tagline}</h3>\\n    \\n  </header>\\n  <slot></slot>\\n</section>\\n\\n<style>\\n  .work-section {\\n    margin-block: var(--space-small);\\n  }\\n</style>"],"names":[],"mappings":"AAqBE,aAAa,eAAC,CAAC,AACb,YAAY,CAAE,IAAI,aAAa,CAAC,AAClC,CAAC"}`
};
var Work$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  let { tagline } = $$props;
  let { featureImageUrl } = $$props;
  let { featureImageDescription } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.tagline === void 0 && $$bindings.tagline && tagline !== void 0)
    $$bindings.tagline(tagline);
  if ($$props.featureImageUrl === void 0 && $$bindings.featureImageUrl && featureImageUrl !== void 0)
    $$bindings.featureImageUrl(featureImageUrl);
  if ($$props.featureImageDescription === void 0 && $$bindings.featureImageDescription && featureImageDescription !== void 0)
    $$bindings.featureImageDescription(featureImageDescription);
  $$result.css.add(css$2);
  return `<section class="${"work-section flow svelte-14laxvf"}"><header class="${"work-header flow-small"}">${featureImageUrl ? `<img${add_attribute("src", featureImageUrl, 0)}${add_attribute("alt", featureImageDescription ? featureImageDescription : "", 0)}>` : ``}

    <h2>${escape2(name)}</h2>
    <h3>${escape2(tagline)}</h3></header>
  ${slots.default ? slots.default({}) : ``}
</section>`;
});
var work = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Work$1
});
var About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
var index$4 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": About
});
var Hire = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
var index$3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Hire
});
var Work = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section class="${"space__outer_top"}"><h2>Work</h2></section>`;
});
var index$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Work
});
var css$1 = {
  code: ".work-section.svelte-ztr0g.svelte-ztr0g.svelte-ztr0g{margin-block:var(--space-large)\n  }.work-heading-group.svelte-ztr0g>.svelte-ztr0g+.svelte-ztr0g{margin-top:var(--space-xsmall)}",
  map: `{"version":3,"file":"ProjectPage.svelte","sources":["ProjectPage.svelte"],"sourcesContent":["<script>\\n  export let name;\\n  export let dates;\\n  export let featuredImage;\\n  export let goal;\\n  export let technologies;\\n<\/script>\\n\\n<section class=\\"work-section flow\\">\\n  <header class=\\"work-header flow-small\\">\\n    {#if featuredImage}\\n    <img src=\\"{featuredImage.url}\\" alt=\\"{featuredImage.description ? featuredImage.description : ''}\\" class=\\"featured\\">\\n    {/if}\\n  </header>\\n  <div class=\\"work-body flow-small\\">\\n    <section class=\\"name work-heading-group\\">\\n      <h2>{name}</h2>\\n      <p>{dates}</p>\\n    </section>\\n    <section class=\\"technology work-heading-group\\">\\n      <h3>\\n        Technology\\n      </h3>\\n      <p>\\n        {#each technologies as technology}\\n        {technologies.indexOf(technology) !== technologies.length - 1 ? technology + ', ' : technology}\\n        {/each}\\n      </p>\\n    </section>\\n    <section class=\\"goal work-heading-group\\">\\n      <h3>\\n        Goal\\n      </h3>\\n      <p>\\n        {goal}\\n      </p>\\n    </section>\\n  </div>\\n\\n  <h3>Blog Posts About {name}</h3>\\n  <slot></slot>\\n</section>\\n\\n<style>\\n  .work-section {\\n    margin-block: var(--space-large)\\n  }\\n  .work-heading-group > * + * {\\n    margin-top: var(--space-xsmall);\\n  }\\n</style>"],"names":[],"mappings":"AA4CE,aAAa,uCAAC,CAAC,AACb,YAAY,CAAE,IAAI,aAAa,CAAC;EAClC,CAAC,AACD,gCAAmB,CAAG,aAAC,CAAG,aAAE,CAAC,AAC3B,UAAU,CAAE,IAAI,cAAc,CAAC,AACjC,CAAC"}`
};
var ProjectPage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  let { dates } = $$props;
  let { featuredImage } = $$props;
  let { goal } = $$props;
  let { technologies } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.dates === void 0 && $$bindings.dates && dates !== void 0)
    $$bindings.dates(dates);
  if ($$props.featuredImage === void 0 && $$bindings.featuredImage && featuredImage !== void 0)
    $$bindings.featuredImage(featuredImage);
  if ($$props.goal === void 0 && $$bindings.goal && goal !== void 0)
    $$bindings.goal(goal);
  if ($$props.technologies === void 0 && $$bindings.technologies && technologies !== void 0)
    $$bindings.technologies(technologies);
  $$result.css.add(css$1);
  return `<section class="${"work-section flow svelte-ztr0g"}"><header class="${"work-header flow-small"}">${featuredImage ? `<img${add_attribute("src", featuredImage.url, 0)}${add_attribute("alt", featuredImage.description ? featuredImage.description : "", 0)} class="${"featured"}">` : ``}</header>
  <div class="${"work-body flow-small"}"><section class="${"name work-heading-group svelte-ztr0g"}"><h2 class="${"svelte-ztr0g"}">${escape2(name)}</h2>
      <p class="${"svelte-ztr0g"}">${escape2(dates)}</p></section>
    <section class="${"technology work-heading-group svelte-ztr0g"}"><h3 class="${"svelte-ztr0g"}">Technology
      </h3>
      <p class="${"svelte-ztr0g"}">${each(technologies, (technology) => `${escape2(technologies.indexOf(technology) !== technologies.length - 1 ? technology + ", " : technology)}`)}</p></section>
    <section class="${"goal work-heading-group svelte-ztr0g"}"><h3 class="${"svelte-ztr0g"}">Goal
      </h3>
      <p class="${"svelte-ztr0g"}">${escape2(goal)}</p></section></div>

  <h3>Blog Posts About ${escape2(name)}</h3>
  ${slots.default ? slots.default({}) : ``}
</section>`;
});
var load$2 = async ({ page, fetch: fetch2 }) => {
  const response = await fetch2("/work/feedme.json");
  const data = await response.json();
  return { props: { posts: data.posts } };
};
var Feedme = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { posts } = $$props;
  console.log("posts in FeedMe index: ", posts);
  if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0)
    $$bindings.posts(posts);
  return `${validate_component(ProjectPage, "ProjectPage").$$render($$result, {
    name: "FeedMe",
    tagLine: "An Easy RSS Reader",
    featuredImage: {
      url: "/FeedMe-Screenshot.png",
      description: "FeedMe - An Easy RSS Reader"
    },
    goal: "To build an accessible, full-featured RSS reader that allows users to subscribe to feeds, and tag, favorite, and share posts.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "SvelteKit",
      "SupaBase",
      "W3C Accessibility",
      "Vite"
    ],
    dates: "July, 2021 (In-Progress)"
  }, {}, {
    default: () => `${posts ? `${validate_component(FlexSwitcher, "FlexSwitcher").$$render($$result, {}, {}, {
      default: () => `${each(posts, (post) => `${validate_component(PostItem, "PostItem").$$render($$result, { post }, {}, {})}`)}`
    })}` : ``}`
  })}`;
});
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Feedme,
  load: load$2
});
var load$1 = async ({ fetch: fetch2 }) => {
  const response = await fetch2("/tag.json");
  const { posts } = await response.json();
  return { props: { posts } };
};
var Tag = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { posts } = $$props;
  if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0)
    $$bindings.posts(posts);
  return `${each(posts, (post) => `${escape2(post.title)}`)}`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Tag,
  load: load$1
});
var css = {
  code: ".tag.svelte-1ugv6eq{color:var(--red)}",
  map: `{"version":3,"file":"[tag].svelte","sources":["[tag].svelte"],"sourcesContent":["<script context=\\"module\\">\\n  export const load = async({page, fetch, context, session}) => {\\n    \\n    const tag = page.params.tag;\\n\\n    const modules = import.meta.glob('../writing/**/index.svx');\\n\\n    const posts = [];\\n\\n    await Promise.all(Object.entries(modules).map(async([file, module]) => {\\n      const { metadata } = await module();\\n\\n      if(metadata.tags.includes(tag)) {\\n        posts.push({\\n          author: metadata.author,\\n          created: metadata.created,\\n          slug: metadata.slug,\\n          subtitle: metadata.subtitle,\\n          title: metadata.title,\\n          excerpt: metadata.excerpt,\\n          tags: metadata.tags\\n        });\\n      }\\n    }));\\n\\n    console.log('posts: ', posts);\\n\\n    posts.sort((a,b) => (a.created > b.created) ? 1 : -1);\\n\\n    return {\\n      props: {\\n        posts: posts,\\n        tag\\n      },\\n    }\\n  }\\n<\/script>\\n\\n<script>\\n  import PostItem from '$lib/components/PostItem.svelte'\\n  export let posts = [];\\n  export let tag;\\n  console.log(posts);\\n<\/script>\\n<section class=\\"flow\\">\\n  {#if posts.length > 0}\\n  <h2>Posts tagged <span class=\\"tag\\">{tag}</span></h2>\\n  {#each posts as post}\\n  <PostItem {post} />\\n  {/each}\\n  {:else}\\n  <h2>Oops!</h2>\\n  <p>No posts tagged <span class=\\"tag\\">{tag}</span> could be found.</p>\\n  <a href=\\"/writing\\">Back to the blog</a>\\n  {/if}\\n</section>\\n\\n<style>\\n  .tag {\\n    color: var(--red);\\n  }\\n</style>"],"names":[],"mappings":"AA0DE,IAAI,eAAC,CAAC,AACJ,KAAK,CAAE,IAAI,KAAK,CAAC,AACnB,CAAC"}`
};
var load = async ({ page, fetch: fetch2, context, session }) => {
  const tag = page.params.tag;
  const modules = { "../writing/making-an-rss-reader-1/index.svx": () => Promise.resolve().then(function() {
    return index$8;
  }), "../writing/test-post/index.svx": () => Promise.resolve().then(function() {
    return index$6;
  }), "../writing/test-three/index.svx": () => Promise.resolve().then(function() {
    return index$7;
  }), "../writing/test-two/index.svx": () => Promise.resolve().then(function() {
    return index$5;
  }) };
  const posts = [];
  await Promise.all(Object.entries(modules).map(async ([file, module2]) => {
    const { metadata: metadata2 } = await module2();
    if (metadata2.tags.includes(tag)) {
      posts.push({
        author: metadata2.author,
        created: metadata2.created,
        slug: metadata2.slug,
        subtitle: metadata2.subtitle,
        title: metadata2.title,
        excerpt: metadata2.excerpt,
        tags: metadata2.tags
      });
    }
  }));
  console.log("posts: ", posts);
  posts.sort((a, b) => a.created > b.created ? 1 : -1);
  return { props: { posts, tag } };
};
var U5Btagu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { posts = [] } = $$props;
  let { tag } = $$props;
  console.log(posts);
  if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0)
    $$bindings.posts(posts);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  $$result.css.add(css);
  return `<section class="${"flow"}">${posts.length > 0 ? `<h2>Posts tagged <span class="${"tag svelte-1ugv6eq"}">${escape2(tag)}</span></h2>
  ${each(posts, (post) => `${validate_component(PostItem, "PostItem").$$render($$result, { post }, {}, {})}`)}` : `<h2>Oops!</h2>
  <p>No posts tagged <span class="${"tag svelte-1ugv6eq"}">${escape2(tag)}</span> could be found.</p>
  <a href="${"/writing"}">Back to the blog</a>`}
</section>`;
});
var _tag_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": U5Btagu5D,
  load
});

// .svelte-kit/netlify/entry.js
init();
async function handler(event) {
  const { path, httpMethod, headers, rawQuery, body, isBase64Encoded } = event;
  const query = new URLSearchParams(rawQuery);
  const type = headers["content-type"];
  const rawBody = type && isContentTypeTextual(type) ? isBase64Encoded ? Buffer.from(body, "base64").toString() : body : new TextEncoder("base64").encode(body);
  const rendered = await render({
    method: httpMethod,
    headers,
    path,
    query,
    rawBody
  });
  if (rendered) {
    return {
      isBase64Encoded: false,
      statusCode: rendered.status,
      ...splitHeaders(rendered.headers),
      body: rendered.body
    };
  }
  return {
    statusCode: 404,
    body: "Not found"
  };
}
function splitHeaders(headers) {
  const h = {};
  const m = {};
  for (const key in headers) {
    const value = headers[key];
    const target = Array.isArray(value) ? m : h;
    target[key] = value;
  }
  return {
    headers: h,
    multiValueHeaders: m
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
