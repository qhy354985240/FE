
async function a(next) {
  console.log(1);
  await next();
  console.log(2);
}

async function b(next) {
  console.log(3);
  await next();
  console.log(4);
}

async function c(next) {
  console.log(5, toString(next[0]));
  await next();
  console.log(6);
}

class App {
  middle = [];

  use(fn) {
    this.middle.push(fn);
  }

  async start() {
    const wrapper = (fn, old) => {
      return async function () {
        await fn(old);
      };
    };
    let res = async () => {
      return Promise.resolve();
    };
    this.middle.forEach(item => {
      res = wrapper(item, res);
    });
    await res();
  }
}

const d = new App();
d.use(a);
d.use(b);
d.use(c);
d.start();
