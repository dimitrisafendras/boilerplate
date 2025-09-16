import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import type { ReactElement } from "react";
import { store as appStore } from "@/app/store";

interface RenderOptions {
  preloadedState?: Record<string, unknown>;
  store?: ReturnType<typeof configureStore>;
  routerOptions?: {
    path?: string;
  };
}

/**
 * Renders a React component with Redux and Router providers for testing
 * @param ui - The component to render
 * @param options - Configuration options for the test
 * @returns The rendered component with testing utilities
 */
export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = undefined,
    routerOptions = { path: "/" },
  }: RenderOptions = {},
) {
  const testStore = store || appStore;

  if (preloadedState && Object.keys(preloadedState).length > 0 && !store) {
    console.warn(
      "preloadedState is provided but not used when using the real app store. Provide a custom store to use preloadedState.",
    );
  }

  const router = createBrowserRouter(
    [
      {
        path: routerOptions.path || "/",
        element: ui,
      },
    ],
    {
      basename: "",
    },
  );
  return {
    ...render(
      <Provider store={testStore}>
        <RouterProvider router={router} />
      </Provider>,
    ),
    store: testStore,
  };
}
