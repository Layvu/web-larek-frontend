import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';

import { BasketActs, Events } from '../../../utils/constants';
import { ViewCard } from './ViewCard';
import { TCardPreview, IViewCard } from '../../../types/index';

export class ViewCardPreview extends ViewCard<TCardPreview> implements IViewCard {
	//*
	protected _buyBtn: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._buyBtn = ensureElement<HTMLButtonElement>('.button', container);

		this._buyBtn.addEventListener('click', () => {
			const action =
				this._buyBtn.textContent === BasketActs.REMOVE ? Events.BASKET_REMOVE : Events.BASKET_ADD;
			this.events.emit(action, { id: this.id });
		});
	}

	get invalidPrice() {
		return this._buyBtn.disabled;
	}
	set invalidPrice(value: boolean) {
		//* isPriceInvalid
		this.setDisabled(this._buyBtn, value);
	}

	set buttonValidation(isInBasket: boolean) {
		//* updateBuyButtonText
		const buttonText = isInBasket ? BasketActs.REMOVE : BasketActs.ADD;
		if (this.invalidPrice) {
			this.setText(this._buyBtn, BasketActs.NOT_FOR_SALE);
		} else {
			this.setText(this._buyBtn, buttonText);
		}
	}
}