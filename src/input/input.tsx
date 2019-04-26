import { Component, Event, EventEmitter, Prop } from '@stencil/core';

import { IInputEvent } from './input.interface';

@Component({
  tag: 'kv-input',
  styleUrl: 'input.css',
  shadow: true,
})
export class InputComponent {
  /** change input event */
  @Event({ bubbles: true, composed: true })
  inputChange: EventEmitter<IInputEvent>;
  /** type of input field */
  @Prop() type = 'text';
  /** input element of DOM */
  inputElement: HTMLInputElement;
  /** name of input field */
  @Prop() name = '';

  @Prop() value: string | number;

  render() {
    return (
      <input
          class="kv-input"
          type={ this.type }
          ref={ el => this.inputElement = el }
          onInput={ this.onInputChange.bind(this) }
          value={ this.value }
      />
    )
  }

  /** handler of input changes */
  onInputChange() {
    this.inputChange.emit({
      fieldName: this.name,
      value: this.inputElement.value,
    });
  }
}
