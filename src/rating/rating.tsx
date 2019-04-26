import { Component, Prop, State, Watch } from '@stencil/core';

import { PERCENT_IN_ONE } from './rating.interface';

@Component({
  tag: 'kv-rating',
  styleUrl: 'rating.css',
  shadow: true,
})
export class RatingComponent {
  /** star count */
  @Prop({reflectToAttr: true}) count = 5;
  /** rating watcher */
  @Watch('count')
  countChanged() {
    this._getStarList();
  }
  /** rating */
  @Prop({reflectToAttr: true}) rating = 0;
  /** rating watcher */
  @Watch('rating')
  ratingChanged() {
    this._getStarList();
  }
  /** star size */
  @Prop({reflectToAttr: true}) size = 16;
  @Watch('size')
  sizeChanged() {
    this._getStarList();
  }
  /** star list params for rating */
  @State() starList = [];
  /** base star size */
  private _baseSize = 16;

  componentWillLoad(): void {
    this._getStarList();
  }

  svgElement: SVGElement;

  /**
   * Get star list
   */
  private _getStarList(): void {
    const oneStarRating = 1 / this.count;
    let newRating = this.rating / PERCENT_IN_ONE;
    const starElementList = [];

    for (let i = this.count; i > 0; i--) {
      let width = this._baseSize;

      if (newRating <= oneStarRating) {
        width = this._baseSize * newRating / oneStarRating;
      }

      if (newRating < 0) {
        width = 0;
      } else {
        newRating -= oneStarRating;
      }

      starElementList.push({ width });
    }
    this.starList = starElementList;
  }

  render() {
    const ratio = this.size / this._baseSize;

    return [
      ...this.starList.map(star => {
        return <svg
          className="kv-rating__svg"
          viewBox={`0 0 ${this.size} ${this.size}`}
          width={this.size}
          height={this.size}
          ref={el => this.svgElement = el}>
          <clipPath id="star">
            <path
              className="kv-rating__star"
              d="M7.99988 12.6085L3.67365 15L4.49988 9.93475L0.999884 6.34752L5.83676 5.60851L7.99988 1L10.163 5.60851L14.9999 6.34752L11.4999 9.93475L12.3261 15L7.99988 12.6085Z"
            />
          </clipPath>
          <g transform={`scale(${ratio})`}>
            <path
              className="kv-rating__star"
              d="M7.99988 12.6085L3.67365 15L4.49988 9.93475L0.999884 6.34752L5.83676 5.60851L7.99988 1L10.163 5.60851L14.9999 6.34752L11.4999 9.93475L12.3261 15L7.99988 12.6085Z"
            />
            <rect className="kv-rating__rect" width={star.width}></rect>
          </g>
        </svg>
      })
    ];
  }
}
