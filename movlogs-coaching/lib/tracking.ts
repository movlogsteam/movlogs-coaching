type TrackingPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function emit(eventType: "click" | "form_submit", eventName: string, payload: TrackingPayload = {}) {
  if (typeof window === "undefined") return;

  const event = {
    eventType,
    eventName,
    timestamp: Date.now(),
    ...payload,
  };

  console.log("[tracking]", event);

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(event);
  }
}

export function trackClick(eventName: string, payload?: TrackingPayload) {
  emit("click", eventName, payload);
}

export function trackFormSubmit(eventName: string, payload?: TrackingPayload) {
  emit("form_submit", eventName, payload);
}
