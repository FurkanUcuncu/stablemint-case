# Payment Widget

A reusable, customizable web component for selecting and converting payment amounts using real-time exchange rates.

## Tech Stack

- **Vue 3**
- **TypeScript**
- **Pinia** – State Management
- **TanStack Query** – Data Fetching and Caching
- **TailwindCSS** – Utility-first CSS Framework

## Design Decisions, Assumptions, and Limitations

- Components are structured using **Atomic Design** for reusability and scalability.
- We use [Fixer.io](https://fixer.io) to get exchange rates. Due to the trial key limitations:
    - We can only retrieve rates against **EUR**.
    - We are limited to **100 API requests**.
- **TanStack Query** is used to cache exchange rate responses, avoiding unnecessary API calls.
    - `staleTime` is set to `1000 * 60` (1 minute).
    - We can reduce `staleTime` for more real-time data, but this would consume more of the limited requests.
- **TailwindCSS** is used for styling due to its simplicity and configurability. However, since Tailwind purges unused styles during build, **dynamically passed class names** may not work unless predeclared or safelisted.
- **Pinia** is used to manage global state, such as selected currency and amount, to avoid prop drilling across components.

## Scripts

```json
"scripts": {
  "dev": "vite",
  "build": "vue-tsc -b && vite build",
  "preview": "vite preview"
}
```

## Web Component Usage

The main web component is defined in `PaymentWidget.ce.vue` and can be used across frameworks by installing the npm package:

```
npm install payment-widget-furkan
```

### Props

```ts
export interface IPaymentWidgetProps {
  apiKey: string;
  theme?: ITheme;
  labels?: number[];
}
```

- `apiKey`: API key for Fixer.io.
- `theme`: Styling customization through either `customClass` or `customStyles`.
- `labels`: Array of preset values for quick selection.

### Theme Format

```ts
export const theme: ITheme = {
  customClass: {
    layout: 'bg-red-500',
    title: 'text-red-300',
    subtitle: 'text-red-300',
    label: 'bg-blue-300 text-white',
    button: 'bg-blue-300 text-red-300'
  },
  customStyles: {
    layout: { backgroundColor: '#000' },
    title: { color: '#535353' },
    subtitle: { color: '#444444' },
    label: { color: '#fff', backgroundColor: '#000' },
    button: { color: '#fff', backgroundColor: '#000' }
  }
}
```

> ⚠️ **Note**: Avoid using both `customClass` and `customStyles` together to prevent styling conflicts.

> 📌 **TailwindCSS Limitation**: Tailwind only includes styles that are used in the source code at build time. If you pass classes dynamically (e.g., through a `theme` prop), those classes may be purged. To solve this, you can safelist classes or use inline styles instead.

## Custom Event: `@close`

This event is emitted when the close (✖) icon is clicked. It can be listened to via a custom event listener.

## Usage Examples

### Vue Example

```vue
<template>
  <payment-widget-furkan
    apiKey="5feb07b430fd82a65a0a1bd73dd62c75"
    labels='[10, 50, 100]'
    :theme='JSON.stringify({customStyles: {layout: {backgroundColor: "red"}}})'
    @close="() => console.log('Closed!')"
  />
</template>

<script setup>
import 'payment-widget-furkan/dist/payment-widget-furkan.esm.js';
</script>
```

> 🌟 We stringify the `theme` prop because Vue doesn't automatically parse nested object props for custom elements. Using `JSON.stringify()` ensures the object is correctly passed to the web component.

### React Example

```tsx
import { useEffect, useRef } from 'react';

function App() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    const handler = () => console.log('Close event from web component');

    if (el) el.addEventListener('close', handler);
    return () => {
      if (el) el.removeEventListener('close', handler);
    };
  }, []);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <payment-widget-furkan
      ref={ref}
      apiKey="5feb07b430fd82a65a0a1bd73dd62c75"
      labels='[10, 50, 100]'
      theme={JSON.stringify({ customClass: { layout: 'bg-red-300' } })}
    />
  );
}

export default App;
```

> ❗React doesn't recognize Vue-style `@close` events. Instead, we use a `ref` and manually attach an event listener for `close`.

## NPM Package

🔗 [payment-widget-furkan on npm](https://www.npmjs.com/package/payment-widget-furkan)

This package is framework-agnostic and can be used in **Vue**, **React**, or **Angular** projects.

---

Made with ❤️ using Vue, Pinia, TailwindCSS, and TypeScript.