import { Component, Prop } from '@stencil/core';

import { controlNames } from './control-list.interface';

@Component({
  tag: 'kv-control-list',
  styleUrl: './control-list.css',
  shadow: true,
})
export class ControlListComponent {
  /** star count */
  @Prop() count = 5;
  /** rating */
  @Prop() rating = 0;
  /** star size */
  @Prop() size = 16;

  render() {
    return (
      <div class="kv-control-list">
        <label class="kv-control-list__label" htmlFor={ controlNames.RATING }>
          <slot name={ controlNames.RATING }></slot>
          <kv-input type="number" name={ controlNames.RATING } value={ this.rating }/>
        </label>
        <label class="kv-control-list__label" htmlFor={ controlNames.COUNT }>
          <slot name={ controlNames.COUNT }></slot>
          <kv-input type="number" name={ controlNames.COUNT } value={ this.count }/>
        </label>
        <label class="kv-control-list__label" htmlFor={ controlNames.SIZE }>
          <slot name={ controlNames.SIZE }></slot>
          <kv-input type="number" name={ controlNames.SIZE } value={ this.size }/>
        </label>
      </div>
    )
  }
}
