/**
 * @fileoverview Item
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */

import addClass from 'tui-code-snippet/domUtil/addClass';
import removeClass from 'tui-code-snippet/domUtil/removeClass';
import removeElement from 'tui-code-snippet/domUtil/removeElement';
import { classNames } from './constants';

/**
 * @class
 * @ignore
 * @param {object} options - options
 *   @param {string} [options.text] - label to be displayed in the drop-down list
 *   @param {string} options.value - value to be sent to a server
 *   @param {boolean} [options.disabled=false] - whether an Item should be disabled or not
 *   @param {boolean} [options.selected=false] - whether an Item should be pre-selected or not
 *   @param {number} [options.index] - Item's index
 */
export default class Item {
  constructor({ value, text, disabled, selected, index }) {
    /**
     * value to be sent to a server
     * @type {string}
     * @private
     */
    this.value = value.toString();

    /**
     * label to be displayed in the drop-down list
     * if label is an empty string, it should be same as its value
     * @type {string}
     * @private
     */
    this.label = text || this.value;

    /**
     * @type {number}
     * @private
     */
    this.index = index;

    /**
     * @type {boolean}
     * @private
     */
    this.disabled = false;

    /**
     * @type {boolean}
     * @private
     */
    this.selected = false;

    /**
     * <li> element for a custom dropdown item
     * @type {HTMLElement}
     * @private
     */
    this.el = this.createElement(this.value, this.label, this.index);

    /**
     * <option> element for a select element
     * @type {HTMLElement}
     * @private
     */
    this.nativeEl = this.createNativeElement(this.value, this.label);

    this.initialize(disabled, selected);
  }

  /**
   * Create <li> element
   * @returns {HTMLElement}
   * @private
   */
  createElement(value, label, index) {
    const el = document.createElement('li');
    el.innerText = label;
    el.className = classNames.ITEM;
    el.tabIndex = -1;
    el.setAttribute('data-value', value);
    el.setAttribute('data-index', index);

    return el;
  }

  /**
   * Create <option> element
   * @returns {HTMLElement}
   * @private
   */
  createNativeElement(value, label) {
    const nativeEl = document.createElement('option');
    nativeEl.value = value;
    nativeEl.label = label;

    return nativeEl;
  }

  /**
   * Initialize
   * @private
   */
  initialize(disabled, selected) {
    if (selected) {
      this.select();
    }

    if (disabled) {
      this.disable();
    }
  }

  /**
   * Disable an Item
   */
  disable() {
    this.disabled = this.nativeEl.disabled = true;
    addClass(this.el, classNames.DISABLED);
  }

  /**
   * Enable an Item
   */
  enable() {
    this.disabled = this.nativeEl.disabled = false;
    removeClass(this.el, classNames.DISABLED);
  }

  /**
   * Select an Item
   * @returns {boolean} result
   */
  select() {
    if (!this.disabled) {
      this.selected = this.nativeEl.selected = true;
      addClass(this.el, classNames.SELECTED);

      return true;
    }

    return false;
  }

  /**
   * Deselect an Item
   */
  deselect() {
    this.selected = this.nativeEl.selected = false;
    removeClass(this.el, classNames.SELECTED);
  }

  /**
   * Highlight an Item
   */
  highlight() {
    addClass(this.el, classNames.HIGHLIGHT);
    this.el.focus();
  }

  /**
   * Remove a highlight from an Item
   */
  dehighlight() {
    removeClass(this.el, classNames.HIGHLIGHT);
    this.el.blur();
  }

  /**
   * Return an Item's value
   * @return {string}
   */
  getValue() {
    return this.value;
  }

  /**
   * Return an Item's label
   * @return {string}
   */
  getLabel() {
    return this.label;
  }

  /**
   * Return an Item's index
   * @return {number}
   */
  getIndex() {
    return this.index;
  }

  /**
   * Return whether an Item is selected or not
   * @return {boolean}
   */
  isSelected() {
    return this.selected;
  }

  /**
   * Append the element and native element to the containers
   * @param {HTMLElement} container - container element
   * @param {HTMLElement} nativeContainer - native container element
   */
  appendToContainer(container, nativeContainer) {
    container.appendChild(this.el);
    nativeContainer.appendChild(this.nativeEl);
  }

  /**
   * Destroy an Item
   */
  destroy() {
    removeElement(this.el);
    removeElement(this.nativeEl);
    this.el = this.nativeEl = null;
  }
}
