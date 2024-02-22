import { a } from './common';

export const aa = function component() {
  const element = document.createElement('div');

  element.innerHTML = 'hello';
  element.classList.add('hello');
  console.log(a);
  return element;
};

document.body.appendChild(component());
