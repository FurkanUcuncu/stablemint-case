import { createApp, h } from 'vue';
import { createPinia } from 'pinia';
import PaymentWidget from './components/templates/PaymentWidget.ce.vue';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import tailwindCSS from './style.css?inline';

export function injectTailwind(shadowRoot: ShadowRoot) {
    const styleTag = document.createElement('style');
    styleTag.textContent = tailwindCSS;
    shadowRoot.appendChild(styleTag);
}

const pinia = createPinia();

class PatchedCustomElement extends HTMLElement {
    private _hasInitialized = false;

    connectedCallback() {
        if (this._hasInitialized) return;

        const shadow = this.attachShadow({ mode: 'open' });
        injectTailwind(shadow);

        const queryClient = new QueryClient();

        // Extract props from attributes
        const apiKey = this.getAttribute('apiKey') || '';
        const themeAttr = this.getAttribute('theme');
        const labelsAttr = this.getAttribute('labels');

        const theme = themeAttr ? JSON.parse(themeAttr) : undefined;
        const labels = labelsAttr ? JSON.parse(labelsAttr) : undefined;

        const app = createApp({
            render: () =>
                h(PaymentWidget, {
                    apiKey,
                    theme,
                    labels,
                    onClose: (payload: any) => {
                        this.dispatchEvent(new CustomEvent('close', {
                            detail: payload,
                            bubbles: true,
                            composed: true,
                        }));
                    },
                }),
        });

        app.use(pinia);
        app.use(VueQueryPlugin, { queryClient });
        app.mount(shadow as unknown as Element);

        this._hasInitialized = true;
    }
}

customElements.define('payment-widget-furkan', PatchedCustomElement);