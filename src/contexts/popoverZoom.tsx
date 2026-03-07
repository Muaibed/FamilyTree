import { createContext, useContext } from "react";

/**
 * Provides the CSS zoom value applied to a container, so that portaled
 * Popover/Select dropdowns (which escape the zoom context) can re-apply
 * the same zoom to their content.
 */
export const PopoverZoomContext = createContext<number | undefined>(undefined);

export const usePopoverZoom = () => useContext(PopoverZoomContext);