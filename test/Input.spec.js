import Input from '@src/Input';
import { DISABLED_CLASS_NAME } from '@src/statics';

describe('Input', () => {
  let input;

  beforeEach(() => {
    input = new Input({ placeholder: 'Please select an option.' });
  });

  it('should make a div and p elements.', () => {
    const { el, placeholderEl } = input;

    expect(el.tagName).toBe('DIV');
    expect(placeholderEl.tagName).toBe('P');
    expect(placeholderEl.innerText).toBe('Please select an option.');
  });

  it('should disable and enable an input.', () => {
    input.changeDisabled(true);
    expect(input.disabled).toBe(true);
    expect(input.el.className.indexOf(DISABLED_CLASS_NAME) > -1).toBe(true);

    input.changeDisabled(false);
    expect(input.disabled).toBe(false);
    expect(input.el.className.indexOf(DISABLED_CLASS_NAME) > -1).toBe(false);
  });
});
